# Project Synthesis

> Sources: agent-discussion-synthesis.md, agent-discussion-synthesis-v2.md

---

## Decision: Passion-Led Learning Agent (Proposal E)

**8 out of 10 agents ranked E first. 2 ranked it second. No agent ranked it below 2nd place.**

The previous consensus (v1) was LiveLens/TutorBridge tied. The Passion-Led Learning Agent broke the tie decisively.

### Scoring Summary

| Proposal | Avg Rank | Times 1st | Times Last | Verdict |
|---|---|---|---|---|
| **E. Passion-Led Learning Agent** | **1.2** | **8** | 0 | **CLEAR WINNER** |
| B. TutorBridge | 3.1 | 1 | 0 | Best strategic fit, but overscoped |
| C. LiveLens | 3.0 | 0 | 0 | Strong concept, execution risk too high |
| A. LinguaMap | 3.3 | 0 | 2 | Feasible but "dashboards don't win hackathons" |
| D. FluentLoop | 4.4 | 1 (arch only) | 6 | 44h scope in 6h = impossible |

---

## Core Concept

Create an AI agent that discovers:
1. What the person **truly enjoys** (passions)
2. What they **need to learn** (professional requirement)
3. The **most useful intersection** for their goal

**Central example:** A lawyer needs English for business, but their authentic interest is cooking. The agent discovers this via a voice interview, then builds a "learning bridge" -- legal English taught through cooking scenarios.

**One-liner:** "Most language apps ask what you want to learn. We ask what makes you want to keep going -- and build the bridge between the two."

---

## Why E Wins: Five Pillars

### 1. Feasibility (AI/ML Engineer)
- ~5.5h estimated (most realistic of all proposals)
- Linear pipeline: Agora -> OpenAI -> Thymia -> Frontend
- Each integration is independent with fallbacks
- Risk of total failure: ~15% (vs 55-90% for others)

### 2. Demo Impact (Pitch Coach)
- Passes "10-second silent test": person talking -> enthusiasm bar moves -> profile appears
- Emotional hook: 10/10 -- every judge sees themselves in it
- Memorability after 15+ demos: 10/10 -- retellable in one sentence
- Story arc completes in 2 minutes, leaving time for pitch

### 3. Psychological Validity (Behavioral Psychologist)
- **Self-Determination Theory** (Deci & Ryan, 2000): autonomy, competence, relatedness
- **Interest Theory** (Hidi & Renninger, 2006): triggered interest -> developed interest
- **Transfer-Appropriate Processing** (Morris et al., 1977): learning through familiar schemas
- **Cordova & Lepper (1996)**: personalization of context increased engagement by up to 40%
- **Hulleman & Harackiewicz (2009)**: connecting content to personal interests improved grades
- Addresses the #1 unsolved problem: long-term motivation (gamification saturates in ~90 days)

### 4. Product-Market Fit (Product Manager + EdTech Expert)
- Attacks Preply's matching/retention problem directly
- Creates data that no competitor can replicate (passion + need + tutor matching)
- Evolves into "intelligent intake" for the entire Preply marketplace

### 5. Agora Integration (Voice AI Specialist)
- ConvoAI starter kit solves 70% in 30-60min
- Bonus point almost guaranteed
- Pipeline: Browser -> Agora SDK -> ConvoAI Agent (STT->LLM->TTS) -> Webhook -> Backend

---

## Architecture

```
Browser (Next.js on Vercel)
    |
    |-- Agora Web SDK (join channel)
    |-- User audio -> Agora SD-RTN
    |
    v
Agora ConvoAI Agent (server-side)
    |
    |-- STT (audio -> text)
    |-- LLM (system prompt: discovery interviewer)
    |-- TTS (response -> audio back to user)
    |
    +-- Webhook/Callback -> Vercel API Routes
            |
            |-- Save transcriptions per question
            |-- Send audio to Thymia (biomarkers) [optional]
            |-- After 8 questions: OpenAI classifier
            |-- Output: structured JSON profile
            |-- Frontend renders profile card + learning bridge
```

### Time Budget (5-6h, 1-2 people)

| Task | Hours | Priority |
|---|---|---|
| Vercel + Next.js scaffold + deploy | 0.5h | P0 |
| Agora ConvoAI setup + video call working | 1.0h | P0 |
| Interviewer system prompt (8 questions + follow-ups) | 1.0h | P0 |
| Classifier prompt (transcript -> JSON) | 0.5h | P0 |
| Frontend: profile card + learning bridge screens | 1.5h | P0 |
| Thymia integration (enthusiasm/stress sidebar) | 1.0h | P1 |
| Polish, edge cases, rehearsal | 0.5h | P0 |
| **Total** | **6.0h** | |

---

## Discovery Interview Flow

The agent asks these 8 questions during a voice call via Agora ConvoAI:

1. What do you need to learn right now, even without motivation?
2. Why is this important for your work or life?
3. What could you talk about for hours without getting tired?
4. What kind of content do you consume for pleasure?
5. When you try to study, at what point do you lose energy?
6. Do you prefer to talk, do, watch, or solve cases?
7. In which situations do you feel most confident?
8. What would make this learning feel less like "studying" and more like "your thing"?

---

## Classifier Prompt (OpenAI)

```
You are a pedagogical analyzer specialized in motivation and learning psychology.

Analyze this interview transcript and voice biomarker signals.

Classify the session into a structured profile with these fields:
- required_skill: the language skill needed for the professional goal
- explicit_goal: why they need this skill
- real_interest: the topic that generates genuine enthusiasm
- interest_signals: array of {topic, weight, evidence}
- motivation_signals: behavioral patterns observed
- learning_barriers: what prevents sustained learning
- preferred_modality: how they learn best (talk, do, watch, solve)
- useful_contexts: practical scenarios connecting interest + need
- recommendation: one-sentence learning bridge strategy

Return ONLY valid JSON. For each field, cite the exact transcript excerpt as evidence.
If evidence is insufficient, mark as "low_confidence".
```

### Expected Output (lawyer + cooking example)

```json
{
  "required_skill": "Legal English",
  "explicit_goal": "Advance career -- needs to negotiate contracts with international clients",
  "real_interest": "Cooking",
  "interest_signals": [
    {"topic": "cooking", "weight": 0.85, "evidence": "spontaneous elaboration about pasta recipes, speech rate increased"},
    {"topic": "travel", "weight": 0.45, "evidence": "mentioned briefly, moderate enthusiasm"},
    {"topic": "restaurants", "weight": 0.60, "evidence": "unprompted examples from dining experiences"}
  ],
  "motivation_signals": [
    "high enthusiasm when discussing recipes (Thymia: engagement spike at Q3)",
    "low energy when discussing exams (Thymia: stress increase at Q1)"
  ],
  "learning_barriers": [
    "low intrinsic interest in formal study",
    "fear of speaking mistakes in professional context"
  ],
  "preferred_modality": "hands-on + conversation",
  "useful_contexts": [
    "Kitchen instructions in English (recipe storytelling)",
    "Negotiation scenarios set in restaurant/food business",
    "Contract vocabulary through supplier agreements for ingredients"
  ],
  "recommendation": "Teach legal English through cooking-centered conversation exercises and food-business negotiation scenarios",
  "thymia_summary": {
    "peak_enthusiasm": "Question 3 -- talking about cooking (engagement: 0.92)",
    "peak_stress": "Question 1 -- discussing legal exams (stress: 0.78)",
    "overall_engagement": "high"
  }
}
```

---

## 3-Screen UI Flow

### Screen 1: "The Conversation"
- Agent video/avatar on main area
- Current question displayed
- Sidebar: Enthusiasm, Comfort, Energy bars (Thymia live)
- Progress: "Question 3 of 8"

### Screen 2: "The Profile"
- Need, Engagement trigger, Preferred mode, Comfort zone, Drop-off point
- Thymia graph: peaks and valleys marked per question
- Insight: "You need legal English, but your brain lights up when the topic is gastronomy."

### Screen 3: "The Bridge"
- Personalized learning plan (e.g., "Week 1: Kitchen Contracts", "Week 2: The Food Startup Lawsuit")
- CTA: "Connect with Preply tutor who shares your interests" + "Practice now with AI"
- Footer: "Powered by Preply + Agora + Thymia"

---

## Demo Flow (5-7 min)

1. **Min 0-1: Onboarding** -- User joins video call, agent greeting
2. **Min 1-4: Discovery interview** -- 8 questions, Thymia sidebar shows enthusiasm/stress live
3. **Min 4-5: Processing** -- "Analyzing your learning profile..." loading screen
4. **Min 5-6: Profile reveal** -- Card with need, interest, barriers, recommendation
5. **Min 6-7: Learning bridge** -- Personalized plan + tutor handoff

---

## Positioning for Judges

**For Petro Loboda (Preply, Sr Director Engineering):**
"This is an onboarding tool that feeds the human tutor. The AI discovers interests and barriers, then matches the student with a tutor who shares their passions. It improves marketplace matching -- the heart of any platform."

**For Ben Weekes (Agora, Sr Architect):**
"Agora ConvoAI powers the entire discovery interview. STT->LLM->TTS pipeline handles the conversational flow natively. The audio stream also feeds Thymia for biomarker analysis."

**For Max Hudlberger (OpenAI, Applied AI):**
"Two-stage reasoning: an interviewer agent that adapts questions based on detected enthusiasm, followed by a classifier that extracts structured motivation profiles from unstructured conversation."

---

## Critical Framing

**DO:** "This is an onboarding tool that feeds the human tutor. The AI discovers, the tutor delivers."
**DON'T:** "This is an autonomous agent that creates learning paths alone."

---

## Pitch Script (30-second hook)

> "Everyone in this room has something they need to learn but keep avoiding. English for work. Accounting. Programming. And everyone has something they love -- cooking, football, building Lego with their kids. What if an AI agent could discover, in two minutes of conversation, exactly what you avoid learning and exactly what makes you lose track of time -- and connect the two? Let me show you."

---

## Top 10 Insights from Agent Debate

1. **"Stop researching. Start building."** -- Research phase is over. Time to build.
2. **"Dashboards don't win hackathons."** -- Visualization is output, not innovation.
3. **"The team with the best demo wins."** -- A buggy live demo beats a perfect slide deck.
4. **"Thymia is risky as a dependency."** -- Built for clinical mental health, not linguistic confidence. Use as binary signal. Say "vocal analysis to measure emotional activation" not "we detect genuine interest."
5. **"The judge becomes the user."** -- Unlike other proposals, the judge can participate in the conversation.
6. **"Universal relatability beats technical complexity."** -- Every person has something they need to learn but avoid.
7. **"Graceful degradation -- the killer advantage."** -- Thymia fails? Mock it. Agora fails? Browser audio. OpenAI fails? Cached responses. Each integration is independent.
8. **"Linear architecture = hackathon survival."** -- Question -> answer -> analyze -> show. Three API calls in sequence. Buildable in 5-6 hours.
9. **"Focus on Tier 1 metrics, not Thymia."** -- Speech rate, Mean Length of Run, filled pauses, response latency -- all extractable from Whisper without extra API.
10. **"One sentence test: E wins."** -- "The one that discovered the person liked cooking and built the course around it." Any judge can retell this.

---

## What Faking is Acceptable (consensus)

| REAL (mandatory) | FAKE (guilt-free) |
|---|---|
| Voice conversation via Agora ConvoAI | Thymia scores (generate plausible values if API fails) |
| OpenAI classifying interests into structured JSON | Pre-rehearsed demo volunteer (know their answers) |
| Profile card with personalized recommendation | Historical session data (seed 5-10 fake sessions) |
| 3-screen flow working end-to-end | Complex learning path details (hardcode 2-3 examples) |

---

## Risk Alerts

1. **Thymia measures depression, not linguistic confidence.** If a judge asks, you'll be showing clinical data as a learning metric.
2. **"Uses all 5 technologies" is not a differentiator.** Judges see through it. Use the ones that matter.
3. **No fallback plan = disaster.** HAVE a pre-recorded demo video.
4. **Time estimates are fantasy.** Multiply by 3. Hackathon WiFi + unknown APIs = pain.
5. **Privacy/GDPR.** In Barcelona (EU), add a consent screen.

---

## Thymia Strategy

- Hours 0-4: Build Agora + OpenAI flow WORKING PERFECTLY
- Hours 4-6: Integrate Thymia IF time allows
- Without Thymia: still a strong demo (agent + profile)
- With Thymia: the "enthusiasm bar" moving in real-time is the magic trick

---

## KPIs (simple and presentable)

- Time to identify dominant interest (TTFI, in minutes)
- % of professional scenario sentences completed without help
- Confidence variation (Thymia aggregated) between start and end
- User acceptance rate of the 7-day plan

---

## Post-Hackathon Evolution

1. Run with 5 professional profiles (lawyer, dev, salesperson, doctor, founder)
2. Compare "generic session" vs "passion-integrated session"
3. Measure retention at D+3 and D+7
4. Create a "bridge library" by profession x interest
5. Integrate with Preply tutor matching algorithm
6. Portfolio of interests with dynamic weights (not single match)

---

## Concept Name Options

- **Passion-Led Learning Agent** (descriptive, clear)
- **LearnBridge** (short, connects need + love)
- **Spark** (the moment of connection)
- **Ignite** (activating learning through passion)

---

## Immediate Next Steps

1. Choose E (Passion-Led Learning Agent) -- consensus is overwhelming
2. Setup Vercel + Next.js project in the first 30 min
3. Get Agora ConvoAI running with starter kit (30-60 min)
4. Craft the interviewer system prompt (8 discovery questions with follow-up logic)
5. Build the classifier prompt (transcript -> structured JSON)
6. Frontend: 3 screens -- video call, profile card, learning bridge
7. Thymia integration only if time remains after hour 4
8. Record backup video of a successful demo
9. Rehearse pitch minimum 3x
10. Always end demo with "and now the tutor receives this profile"
