/**
 * WAX Integration Module for Agora Custom LLM Server
 *
 * Uses WAX JSON-RPC API (http://127.0.0.1:8080) to:
 * 1. Store user facts via fact.add (entity-attribute-value triples)
 * 2. Retrieve relevant facts via fact.search and recall
 * 3. Inject known facts into the LLM context
 *
 * The original system prompt from .env is forwarded to OpenAI unchanged.
 * This module only ADDS a second system message with:
 *   - Voice brevity rules
 *   - Previously stored facts about the user
 */

const http = require('http');

const WAX_HOST = process.env.WAX_HOST || '127.0.0.1';
const WAX_PORT = parseInt(process.env.WAX_PORT || '8080', 10);

const name = 'wax';

// Per-channel session state
const sessions = new Map();

function log(msg) {
  console.log(`INFO: [WAX] ${msg}`);
}

function init() {
  log(`Module initialized (WAX server at ${WAX_HOST}:${WAX_PORT})`);
}

// ─── WAX JSON-RPC transport ───

function waxCall(method, params) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    });

    const req = http.request(
      {
        hostname: WAX_HOST,
        port: WAX_PORT,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
        timeout: 5000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              reject(new Error(`WAX ${method}: ${JSON.stringify(parsed.error)}`));
            } else {
              // WAX may return JSON-RPC wrapped {"result":...} or raw result
              resolve(parsed.result !== undefined ? parsed.result : parsed);
            }
          } catch (e) {
            reject(new Error(`WAX parse error: ${e.message}`));
          }
        });
      }
    );
    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`WAX ${method} timeout`));
    });
    req.write(body);
    req.end();
  });
}

// ─── WAX API wrappers (per wax-rag-usage-prompt.md) ───

/**
 * fact.add — store an entity-attribute-value triple
 * Example entity: "user:CHANNEL_ID", attribute: "interest", value: "cooking"
 */
async function factAdd(entity, attribute, value, metadata = {}) {
  try {
    metadata.source = metadata.source || 'agora-voice-agent';
    metadata.kind = metadata.kind || 'runtime_eav';
    metadata.timestamp = new Date().toISOString();
    const result = await waxCall('fact.add', { entity, attribute, value, metadata });
    log(`fact.add ${entity}.${attribute} = "${value.substring(0, 60)}" → id=${result?.id || '?'}`);
    return result;
  } catch (e) {
    log(`fact.add failed: ${e.message}`);
    return null;
  }
}

/**
 * fact.search — find facts by entity prefix
 * Returns array of {id, entity, attribute, value, ...}
 */
async function factSearch(entityPrefix, limit = 20) {
  try {
    const result = await waxCall('fact.search', { entity_prefix: entityPrefix, limit });
    const facts = result?.facts || [];
    log(`fact.search "${entityPrefix}": ${facts.length} facts`);
    return facts;
  } catch (e) {
    log(`fact.search failed: ${e.message}`);
    return [];
  }
}

/**
 * recall — full-text search across stored content (BM25)
 * Returns array of {text, score, kind}
 */
async function recall(query, limit = 10) {
  try {
    const result = await waxCall('recall', { query, limit });
    const items = result?.items || [];
    log(`recall "${query.substring(0, 50)}": ${items.length} items`);
    return items;
  } catch (e) {
    log(`recall failed: ${e.message}`);
    return [];
  }
}

// ─── Fact extraction from LLM response ───

/**
 * Parse the LLM's analytical response and extract structured facts.
 * Looks for patterns like interests, motivations, values, etc.
 */
function extractFactsFromAnalysis(text) {
  const facts = [];
  const lower = text.toLowerCase();

  // Pattern: "interest in X" / "interested in X" / "likes X" / "enjoys X"
  const interestPatterns = [
    /(?:interest(?:ed)? in|likes?|enjoys?|loves?|passionate about|drawn to)\s+([^.,;!?]+)/gi,
  ];
  for (const pat of interestPatterns) {
    let match;
    while ((match = pat.exec(text)) !== null) {
      facts.push({ attribute: 'interest', value: match[1].trim() });
    }
  }

  // Pattern: motivation keywords
  if (lower.includes('motivat')) {
    const motMatch = text.match(/motivat(?:ed|ion)[^.]*?(?:by|:)\s*([^.,;!?]+)/i);
    if (motMatch) facts.push({ attribute: 'motivation', value: motMatch[1].trim() });
  }

  // Pattern: values
  if (lower.includes('value')) {
    const valMatch = text.match(/values?\s+([^.,;!?]+)/i);
    if (valMatch) facts.push({ attribute: 'value', value: valMatch[1].trim() });
  }

  // Pattern: goals
  if (lower.includes('goal') || lower.includes('wants to') || lower.includes('aims to')) {
    const goalMatch = text.match(/(?:goal|wants? to|aims? to)\s+([^.,;!?]+)/i);
    if (goalMatch) facts.push({ attribute: 'goal', value: goalMatch[1].trim() });
  }

  // Pattern: fears / concerns
  if (lower.includes('fear') || lower.includes('worried') || lower.includes('anxious')) {
    const fearMatch = text.match(/(?:fears?|worried about|anxious about)\s+([^.,;!?]+)/i);
    if (fearMatch) facts.push({ attribute: 'fear', value: fearMatch[1].trim() });
  }

  return facts;
}

// ─── Module hooks ───

function onAgentRegistered(appId, channel, agentId, authHeader, agentEndpoint, prompt, earlyParams) {
  // Use a stable entity so facts persist across sessions.
  // user_uid from Agora is per-session (e.g. "101"), so we use appId as the stable scope.
  const userEntity = `user:${appId}`;
  const session = {
    appId,
    agentId,
    userEntity,
    cachedFacts: [],      // cached fact.search results
    factsLoaded: false,
  };
  sessions.set(channel, session);
  log(`Session started: channel=${channel}, entity=${userEntity}`);
}

function onAgentUnregistered(appId, channel) {
  sessions.delete(channel);
  log(`Session ended: channel=${channel}`);
}

/**
 * Detect if user is asking about biomarkers, wellness, or self-description.
 */
const BIOMARKER_TRIGGERS = /\b(biomarker|wellness|stress|fatigue|burnout|emotion|describe\s*(my|me)|my\s*profile|how\s*(am|do)\s*i|my\s*state|self.?esteem|distress|my\s*mood|check.?in|how.?am.?i.?doing)\b/i;

/**
 * onRequest — called before each LLM call.
 * 1. Store raw user utterances as facts in WAX
 * 2. Load cached facts from WAX for injection
 * 3. If user asks about biomarkers/self → force recall with biomarker query
 */
function onRequest(ctx) {
  const { channel, messages } = ctx;
  if (!messages) return;

  const session = sessions.get(channel);
  if (!session) return;

  // Load facts from WAX (async, will be available for next call)
  if (!session.factsLoaded) {
    loadFacts(channel).catch(() => {});
  }

  // Check last user message for biomarker/self-description triggers
  const userMsgs = messages.filter(m => m.role === 'user');
  const lastMsg = userMsgs[userMsgs.length - 1];
  if (lastMsg && typeof lastMsg.content === 'string' && BIOMARKER_TRIGGERS.test(lastMsg.content)) {
    log(`Biomarker trigger detected: "${lastMsg.content.substring(0, 60)}"`);
    session.biomarkerTriggered = true;
  }
}

/**
 * onResponse — called after LLM responds.
 * Parse the response for insights and store as structured facts in WAX.
 */
function onResponse(ctx) {
  const { channel, content } = ctx;
  if (!content || content.length < 10) return;

  const session = sessions.get(channel);
  if (!session) return;

  // Extract structured facts from the analysis
  const extracted = extractFactsFromAnalysis(content);
  for (const fact of extracted) {
    factAdd(session.userEntity, fact.attribute, fact.value).catch(() => {});
    // Also cache locally for immediate use
    session.cachedFacts.push(fact);
  }

  if (extracted.length > 0) {
    log(`Extracted ${extracted.length} facts from response for ${channel}`);
  }
}

/**
 * Load facts from WAX into session cache.
 */
async function loadFacts(channel) {
  const session = sessions.get(channel);
  if (!session) return;

  try {
    // Try fact.search first (structured EAV)
    const facts = await factSearch(session.userEntity, 30);
    const structured = facts
      .filter(f => !f.deleted && f.attribute !== 'utterance' && f.attribute !== 'agent_response')
      .map(f => ({ attribute: f.attribute, value: f.value }));
    log(`fact.search loaded ${structured.length} facts for ${channel}`);

    // Also try recall (BM25 full-text) as fallback/supplement
    let recallFacts = [];
    try {
      const items = await recall(`user interests values motivations goals behavior preferences background`, 15);
      recallFacts = items
        .filter(item => {
          const text = item.text || '';
          return text.includes(session.userEntity) &&
                 !text.includes('utterance') &&
                 !text.includes('agent_response');
        })
        .map(item => {
          const text = item.text || '';
          // Parse "user:APP_ID category value" format
          const parts = text.replace(session.userEntity + ' ', '').split(' ');
          const attr = parts[0] || 'insight';
          const val = parts.slice(1).join(' ') || text;
          return { attribute: attr, value: val };
        });
      log(`recall loaded ${recallFacts.length} additional facts for ${channel}`);
    } catch (e) {
      log(`recall fallback failed: ${e.message}`);
    }

    // Merge: structured facts take priority, add recall extras
    const seen = new Set();
    const merged = [];
    for (const f of structured) {
      const key = `${f.attribute}:${f.value}`;
      if (!seen.has(key)) { seen.add(key); merged.push(f); }
    }
    for (const f of recallFacts) {
      const key = `${f.attribute}:${f.value}`;
      if (!seen.has(key)) { seen.add(key); merged.push(f); }
    }

    session.cachedFacts = merged;
    session.factsLoaded = true;
    log(`Total loaded: ${merged.length} facts for ${channel}`);
  } catch (e) {
    log(`loadFacts failed: ${e.message}`);
  }
}

/**
 * Load facts with additional biomarker-specific recall query.
 * Called when user asks about biomarkers, wellness, or self-description.
 */
async function loadFactsWithBiomarkers(channel) {
  const session = sessions.get(channel);
  if (!session) return;

  // First do normal load
  await loadFacts(channel);

  // Then add biomarker-specific recall
  try {
    const items = await recall(`biomarker stress fatigue burnout distress wellness emotion self-esteem session snapshot`, 10);
    const bioFacts = items
      .filter(item => {
        const text = item.text || '';
        return text.includes(session.userEntity);
      })
      .map(item => {
        const text = item.text || '';
        const parts = text.replace(session.userEntity + ' ', '').split(' ');
        const attr = parts[0] || 'biomarker';
        const val = parts.slice(1).join(' ') || text;
        return { attribute: attr, value: val };
      });

    if (bioFacts.length > 0) {
      // Merge with existing, avoid duplicates
      const seen = new Set(session.cachedFacts.map(f => `${f.attribute}:${f.value}`));
      for (const f of bioFacts) {
        const key = `${f.attribute}:${f.value}`;
        if (!seen.has(key)) {
          seen.add(key);
          session.cachedFacts.push(f);
        }
      }
      log(`Biomarker recall added ${bioFacts.length} facts for ${channel}, total=${session.cachedFacts.length}`);
    }
  } catch (e) {
    log(`Biomarker recall failed: ${e.message}`);
  }
}

/**
 * getSystemInjection — adds a SECOND system message (after the .env prompt).
 *
 * The .env system prompt (analytical role) goes to OpenAI first, unchanged.
 * This injection adds:
 *   1. Voice brevity rules
 *   2. Known facts about the user from WAX
 */
async function getSystemInjection(appId, channel) {
  const session = sessions.get(channel);
  log(`getSystemInjection called: channel=${channel}, hasSession=${!!session}, cachedFacts=${session?.cachedFacts?.length || 0}`);

  // Load facts from WAX BEFORE building injection
  if (session) {
    if (session.biomarkerTriggered) {
      await loadFactsWithBiomarkers(channel);
      session.biomarkerTriggered = false;
      log(`After loadFactsWithBiomarkers: cachedFacts=${session.cachedFacts.length}`);
    } else {
      await loadFacts(channel);
      log(`After loadFacts: cachedFacts=${session.cachedFacts.length}`);
    }
  }

  let injection = `VOICE OUTPUT RULES (you MUST follow these):
- You speak through a real-time voice interface. The user HEARS your response.
- Keep spoken responses to 1-3 sentences. Be concise and natural.
- Do NOT read out lists, enumerations, bullet points, or structured analysis.
- Do NOT say "Observable signals", "Conclusions about", "It can be hypothesized" — these are for internal analysis only.
- Perform your full analysis internally, then speak ONLY the key insight + one clarifying question.
- Sound like a thoughtful coach, not a report.`;

  // Inject known facts from WAX
  if (session && session.cachedFacts.length > 0) {
    injection += `\n\nKNOWN FACTS ABOUT THIS USER (from previous analysis):`;
    const seen = new Set();
    for (const fact of session.cachedFacts) {
      const key = `${fact.attribute}:${fact.value}`;
      if (seen.has(key)) continue;
      seen.add(key);
      injection += `\n- [${fact.attribute}] ${fact.value}`;
    }
    injection += `\n\nUse these facts to personalize your response. Do not repeat them verbatim — weave them naturally.`;
  }

  return injection;
}

// ─── Tool definitions for LLM tool-calling ───

function getToolDefinitions() {
  return [
    {
      type: 'function',
      function: {
        name: 'remember_user_fact',
        description: 'Store a fact about the user in persistent memory. Use after every exchange to build the user profile. Categories: interest, motivation, value, fear, goal, behavior, preference, background.',
        parameters: {
          type: 'object',
          properties: {
            fact: { type: 'string', description: 'The fact to store' },
            category: {
              type: 'string',
              enum: ['interest', 'motivation', 'value', 'fear', 'goal', 'behavior', 'preference', 'background'],
            },
          },
          required: ['fact', 'category'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'recall_user_facts',
        description: 'Search stored facts about the user. Use to recall what you know before responding.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query for user facts' },
          },
          required: ['query'],
        },
      },
    },
  ];
}

function getToolHandlers() {
  return {
    remember_user_fact: (appId, userId, channel, args) => {
      const { fact, category } = args;
      const session = sessions.get(channel);
      const entity = session?.userEntity || `user:${channel}`;

      // Store in WAX via fact.add
      factAdd(entity, category, fact, { source: 'llm_tool_call' }).catch(() => {});

      // Cache locally
      if (session) {
        session.cachedFacts.push({ attribute: category, value: fact });
      }

      log(`Tool remember: [${category}] ${fact}`);
      return JSON.stringify({ stored: true, category, fact });
    },

    recall_user_facts: async (appId, userId, channel, args) => {
      const { query } = args;
      const session = sessions.get(channel);

      // Try WAX recall (full-text search)
      let results = [];
      try {
        const items = await recall(query, 10);
        results = items.map(i => i.text || '').filter(Boolean);
      } catch (e) {
        // fallback to cached
      }

      // Also include cached structured facts
      const cached = (session?.cachedFacts || [])
        .filter(f => {
          const q = query.toLowerCase();
          return f.value.toLowerCase().includes(q) || f.attribute.toLowerCase().includes(q);
        })
        .map(f => `[${f.attribute}] ${f.value}`);

      const all = [...new Set([...cached, ...results])].slice(0, 10);

      log(`Tool recall "${query}": ${all.length} results`);
      return JSON.stringify({ facts: all, count: all.length });
    },
  };
}

function shutdown() {
  sessions.clear();
  log('Module shutdown');
}

module.exports = {
  name,
  init,
  onAgentRegistered,
  onAgentUnregistered,
  onRequest,
  onResponse,
  getSystemInjection,
  getToolDefinitions,
  getToolHandlers,
  shutdown,
};
