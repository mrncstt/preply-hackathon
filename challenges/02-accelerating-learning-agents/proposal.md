# Challenge 2: Accelerating Learning with Agents

## Context

Praktika leads with multi-agent (GPT-5.2). Speak does speech-first. ELSA does pronunciation.
Nobody solves: human tutor <-> AI coordination, proactive agents, real-world contextualized practice, correction without interrupting flow.

---

## Proposal: "TutorBridge" - Multi-Agent System that Connects Human Tutor and AI Practice

### Concept
An agent orchestrator that works as a bridge between the human tutor and the student's autonomous practice. The tutor defines objectives and focus areas. The agents create, execute, and evaluate personalized practice sessions between lessons. The tutor receives progress reports before the next session.

### Differentiators vs. Market
1. **Tutor-in-the-loop**: Unlike Praktika/Speak (100% AI), the human tutor defines the strategy
2. **Proactive agents**: The system initiates practice at the right moment ("You have a trip to Spain in 2 weeks, let's practice?")
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
[Orchestrator Agent] - Selects and schedules sessions
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

### Core Features (MVP for the hackathon)

1. **Tutor Goal Setting**
   - Simple interface where the tutor defines: "Student needs to practice business vocabulary and prepare for a presentation in English"
   - Planner Agent decomposes into practice sessions

2. **Scenario Practice with Avatar**
   - Anam avatar assumes a role (coworker, client, boss)
   - Agora real-time streaming
   - OpenAI Realtime for natural conversation
   - Scenarios aligned with tutor goals

3. **Adaptive Difficulty**
   - Thymia detects: high stress -> agent simplifies vocabulary, speaks more slowly
   - Thymia detects: student is comfortable -> agent increases complexity, uses slang
   - All without interrupting the conversation

4. **Inline Correction (non-intrusive)**
   - Instead of stopping the conversation to correct, the Feedback Agent:
     - Repeats the correct phrase naturally in the response (recasting)
     - Saves errors for post-session review
     - Generates a targeted exercise on the most frequent error

5. **Tutor Report**
   - After the session: "Student practiced 15min of business vocabulary. Fluency: +12%. Recurring errors: 'make a meeting' instead of 'have a meeting'. Confidence (Thymia): improved from 3.2 to 4.1/5. Suggestion for next lesson: focus on business phrasal verbs."

### Demo Flow (for presentation)

1. Tutor defines goal in the interface
2. Planner creates practice session
3. Student converses with Anam avatar via Agora (scenario: work meeting)
4. Thymia monitors and agent adapts in real time
5. Post-session: report automatically generated for tutor

### Effort Estimate (24h hackathon)

| Task | Hours | Who |
|------|-------|-----|
| Tutor interface (goal setting) | 3h | Frontend |
| Planner + Orchestrator agents | 4h | Backend |
| Conversation Agent (Agora + OpenAI) | 5h | Backend |
| Anam avatar integration | 3h | Full-stack |
| Thymia emotion monitoring | 3h | Backend |
| Report generation | 2h | Backend |
| Polish and demo prep | 4h | Everyone |
| **Total** | **24h** | **4-5 people** |

### Why It Wins

- **Perfectly aligned with Preply**: Strengthens (does not replace) the human tutor
- Uses ALL 5 technologies in an integrated and justified way
- Solves the #1 market gap: nobody connects human tutor <-> AI practice
- Avatar + voice + emotion = visually impressive demo
- The "tutor report" is directly sellable as a Preply premium feature
- Addresses the intermediate plateau problem with targeted practice between lessons
