# Challenge 2: Accelerating Learning with Agents

## Context

Praktika leads with multi-agent (GPT-5.2). Speak does speech-first. ELSA does pronunciation.
Nobody solves: human tutor <-> AI coordination, proactive agents, real-world contextualized practice, correction without interrupting flow.

---

## Proposal: "TutorBridge" - Multi-Agent System that Connects Human Tutor, Motivation, and AI Practice

### Concept
An agent orchestrator that works as a bridge between the human tutor and the student's autonomous practice. The tutor defines objectives and focus areas. The agents identify the topics that most motivate each student, connect those interests to mandatory curriculum goals, then create, execute, and evaluate personalized sessions between lessons. The tutor receives progress reports before the next session.

### Differentiators vs. Market
1. **Tutor-in-the-loop**: Unlike Praktika/Speak (100% AI), the human tutor defines the strategy
2. **Motivation-to-curriculum mapping**: Connects "what the student likes" with "what the student must learn"
3. **Embodied avatar**: Anam avatar as a visual conversation partner (not just text/voice)
4. **Real-time emotional adaptation**: Thymia detects frustration -> agent changes difficulty/approach

### Multi-Agent Architecture

```
[TUTOR DASHBOARD]
      |
      v
[Planner Agent] - Defines practice plan based on tutor goals
      |
      v
[Interest Mapping Agent] - Detects high-motivation topics using Agora calls + Thymia signals + OpenAI analysis
      |
      v
[Orchestrator Agent] - Selects and schedules sessions that blend curriculum + student interests
      |
      +---> [Conversation Agent] - Conversational practice via Agora + Anam avatar
      |         |
      |         +---> [Feedback Agent] - Evaluates in real time, corrects without interrupting
      |         |
      |         +---> [Emotion Agent] - Monitors Thymia, adjusts difficulty
      |
      +---> [Exercise Agent] - Generates targeted exercises (vocabulary, grammar)
      |
      +---> [Report Agent] - Compiles progress and sends to tutor
```

### Tech Stack Used
- **Agora Conversational AI Engine**: Real-time audio for practice sessions
- **OpenAI GPT-5.2 / Realtime API**: Brain of the agents, speech-to-speech conversation
- **Anam CARA-3**: Photorealistic avatar as conversation partner
- **Thymia Helios**: Real-time emotional monitoring
- **AWS Bedrock**: Agent orchestration, guardrails

Reference:
- Thymia docs: https://docs.thymia.ai/welcome

### Core Features (MVP for the hackathon)

1. **Tutor Goal Setting**
   - Simple interface where the tutor defines: "Student needs to practice business vocabulary and prepare for a presentation in English"
   - Planner Agent decomposes into practice sessions

2. **Interest-to-Need Mapper (NEW)**
   - OpenAI analyzes live transcripts from Agora sessions to extract high-engagement topics (e.g., football, travel, gaming, music)
   - Thymia validates emotional engagement (confidence/energy patterns) to rank the topics
   - System links each "favorite topic" to required learning outcomes (grammar, vocabulary, fluency goals)
   - Example: student likes football + needs conditionals -> drills around match predictions ("If Barça wins, ...")
   - Implementation note: ingest Thymia session-level signals and keep only aggregate scores (no raw biometric storage in MVP)

3. **Scenario Practice with Avatar**
   - Anam avatar assumes a role (coworker, client, boss)
   - Agora real-time streaming
   - OpenAI Realtime for natural conversation
   - Scenarios aligned with tutor goals and motivational topics

4. **Adaptive Difficulty**
   - Thymia detects: high stress -> agent simplifies vocabulary, speaks more slowly
   - Thymia detects: student is comfortable -> agent increases complexity, uses slang
   - All without interrupting the conversation

5. **Inline Correction (non-intrusive)**
   - Instead of stopping the conversation to correct, the Feedback Agent:
     - Repeats the correct phrase naturally in the response (recasting)
     - Saves errors for post-session review
     - Generates a targeted exercise on the most frequent error

6. **Tutor Report**
   - After the session: "Student practiced 15min of business vocabulary through football scenarios. Fluency: +12%. Recurring errors: 'make a meeting' instead of 'have a meeting'. Confidence (Thymia): improved from 3.2 to 4.1/5. Suggestion for next lesson: focus on business phrasal verbs."
   - Includes "Motivation Map": Top engaging topics vs. pending curriculum competencies

### Demo Flow (for presentation)

1. Tutor defines required goals in the interface (e.g., past tense + workplace vocabulary)
2. Interest Mapping Agent finds top motivation topics from recent sessions
3. Planner creates practice session blending both (e.g., workplace role-play about sports sponsorship)
4. Student converses with Anam avatar via Agora
5. Thymia monitors and the agent adapts in real time
6. Post-session report shows outcomes + updated Motivation Map for tutor

### Effort Estimate (24h hackathon)

| Task | Hours | Who |
|------|-------|-----|
| Tutor interface (goal setting) | 3h | Frontend |
| Interest Mapping Agent (topic ranking + linkage) | 4h | Backend/AI |
| Planner + Orchestrator agents | 3h | Backend |
| Conversation Agent (Agora + OpenAI) | 5h | Backend |
| Anam avatar integration | 3h | Full-stack |
| Thymia emotion monitoring | 3h | Backend |
| Report generation | 2h | Backend |
| Polish and demo prep | 4h | Everyone |
| **Total** | **24h** | **4-5 people** |

### Why It Wins

- **Perfectly aligned with Preply**: Strengthens (does not replace) the human tutor
- Uses ALL 5 technologies in an integrated and justified way
- Converts motivation into measurable curriculum progress (a clear pedagogy differentiator)
- Solves the #1 market gap: nobody connects human tutor <-> AI practice
- Avatar + voice + emotion = visually impressive demo
- The "tutor report" is directly sellable as a Preply premium feature
- Addresses the intermediate plateau problem with targeted practice between lessons
