# Hybrid Proposal: "FluentLoop" - The Complete AI Learning Cycle

## Tagline

**One pipeline. Two modes. One confidence arc.**
AI copilot during live lessons + AI agent for practice between lessons + confidence visualization across both.

---

## Concept

FluentLoop is an AI system that covers the **entire learning cycle** of a Preply student:

```
LIVE LESSON (Track 3)          BETWEEN LESSONS (Track 2)         OVER TIME (Track 1)
Tutor + Student + AI Copilot --> AI Agent practices weak spots --> Confidence Arc dashboard
         |                              |                                |
         +--- Thymia confidence --------+--- Thymia confidence ---------+--- Heatmap
         |                              |                                |
         +--- Errors detected ----------+--- Targeted exercises --------+--- Progress Radar
         |                              |                                |
         +--- Tutor gets intel ---------+--- Tutor gets report ---------+--- Tutor sees trend
```

The human tutor stays in control. AI amplifies everything that happens between their sessions and gives them superpowers during the session.

---

## Why This Hybrid Wins

1. **Covers 2.5 out of 3 tracks** - judges from every track see their challenge addressed
2. **One unified pipeline** (Agora audio -> OpenAI analysis -> Thymia biomarkers) - shared infrastructure reduces build time
3. **Perfectly aligned with Preply's identity**: "human-led, AI-enhanced" - the tutor is NEVER replaced
4. **"Confidence Arc" as killer differentiator**: no competitor measures, tracks, or visualizes confidence through voice biomarkers across sessions
5. **Demo tells a complete story**: live lesson -> AI practice -> dashboard -> next lesson is better

---

## Architecture

```
                    SHARED INFRASTRUCTURE
                    ====================

[Agora SDK]  -----> [Audio Stream] -----> [OpenAI Realtime API]
                          |                      |
                          v                      v
                    [Thymia Helios]     [Transcription + Analysis]
                    (confidence,              (errors, vocabulary,
                     stress,                   topics, fluency)
                     engagement)                    |
                          |                         |
                          +----------+--------------+
                                     |
                                     v
                            [Event Bus / State Store]
                            (DynamoDB + Lambda)
                                     |
                    +----------------+----------------+
                    |                |                |
                    v                v                v
              MODE 1: LIVE      MODE 2: AGENT     DASHBOARD
              (Track 3)         (Track 2)         (Track 1)

              Student sidebar   Anam avatar       Confidence heatmap
              Tutor panel       Scenario practice  Skill radar
              Confidence bar    Inline correction   AI narrative
              Live vocab        Tutor report
```

### Key Architectural Decision

Both modes share:
- The same Agora audio pipeline
- The same OpenAI analysis functions
- The same Thymia integration
- The same data model (session events -> DynamoDB)

The ONLY difference is:
- **Live mode**: Agora streams a real tutor-student call. AI is a silent listener that writes to sidebars.
- **Agent mode**: Agora streams a student-avatar call. AI IS the conversation partner via OpenAI Realtime + Anam.

This means ~60% of the backend code is shared between modes.

---

## Tech Stack

| Technology | Role in FluentLoop |
|---|---|
| **Agora** | Real-time audio/video for both live lessons and agent practice |
| **OpenAI Realtime API** | Transcription, analysis, conversation brain (agent mode), suggestion generation (live mode) |
| **Thymia Helios** | Confidence/stress biomarkers - the thread connecting everything |
| **Anam CARA-3** | Avatar for agent practice sessions + post-lesson debrief |
| **AWS** | Lambda (event processing), DynamoDB (session data), S3 (assets) |

All 5 partner technologies used with clear, justified roles.

---

## MVP Features (scoped for 24h)

### MODE 1: Live Lesson Copilot (Track 3) - 3 features

**1.1 Student Sidebar - Contextual Vocabulary**
- OpenAI detects conversation topic in real time
- Shows relevant vocabulary with L1 translation in a sidebar
- Highlights words the student struggled with (hesitation detected)

**1.2 Tutor Intelligence Panel**
- Shows student's recurring errors (without student seeing)
- Thymia confidence indicator: green/yellow/red bar
- One-line suggestion: "Student anxious - consider simplifying"

**1.3 Instant Debrief**
- Lesson ends -> Anam avatar delivers 30-second summary
- Key stats: new vocabulary, errors, confidence trend
- Generates 5 contextual flashcards from the session

### MODE 2: Agent Practice (Track 2) - 2 features

**2.1 Scenario Practice with Avatar**
- Anam avatar assumes a role related to weak areas detected in live lesson
- OpenAI Realtime for natural conversation
- Inline correction via recasting (repeats correct form naturally)

**2.2 Adaptive Difficulty via Emotion**
- Thymia detects high stress -> agent simplifies, slows down
- Thymia detects comfort -> agent increases complexity
- No interruption to conversation flow

### DASHBOARD: Confidence Arc (Track 1) - 2 features

**3.1 Confidence Heatmap**
- Grid: situations (restaurant, work, travel, social) x skills (speaking, listening, vocabulary)
- Color = Thymia confidence score aggregated per category
- Shows data from BOTH live lessons and agent practice sessions

**3.2 Session Timeline**
- "GitHub contributions" style: each cell = a session (live or agent)
- Color intensity = improvement
- Click to see session details

---

## Demo Flow (5-minute pitch)

```
MINUTE 0-1: Problem + Context
  "Learners don't know if they're progressing. Tutors fly blind between lessons.
   AI apps replace the tutor. We enhance them."

MINUTE 1-3: Live Demo
  [Screen: Agora video call between "tutor" and "student"]
  - They discuss business travel in English
  - Student sidebar shows vocabulary: "layover", "boarding pass"
  - Tutor panel shows: "Recurring error: 'I have been to travel'" + confidence bar yellow
  - Lesson ends -> Anam avatar delivers 30-second debrief
  - 5 flashcards generated automatically

MINUTE 3-4: Agent Practice Demo
  [Screen: Student alone with Anam avatar]
  - Avatar plays a hotel receptionist (targeted: travel vocabulary was weak)
  - Student gets stressed -> avatar simplifies (Thymia in action)
  - Non-intrusive correction: student says "I want check in", avatar responds
    "Sure, I can help you check in. Your room is on the third floor."

MINUTE 4-5: Dashboard + Closing
  [Screen: FluentLoop dashboard]
  - Confidence heatmap shows: travel went from red to yellow after agent practice
  - Session timeline shows consistency
  - "The tutor opens the next lesson knowing exactly what happened.
     The student sees their confidence growing.
     The AI connects everything - but the human tutor stays at the center."
```

---

## Effort Estimate (24h, 4 people)

### Team Allocation

| Person | Role | Focus |
|---|---|---|
| **P1** | Backend Lead | Shared pipeline: Agora + OpenAI + Thymia integration |
| **P2** | Backend/AI | Agent logic: conversation agent, adaptive difficulty, correction |
| **P3** | Frontend Lead | Student sidebar, tutor panel, dashboard |
| **P4** | Full-stack | Anam avatar integration, debrief, demo prep |

### Timeline

```
HOURS 0-2: Setup & Foundation (everyone)
  - Agora SDK setup, OpenAI API keys, Thymia sandbox, Anam account
  - Shared audio pipeline: Agora -> OpenAI transcription -> event bus
  - React app scaffold with routing (live view, agent view, dashboard)

HOURS 2-8: Core Build (parallel tracks)
  P1: Shared pipeline complete (transcription + analysis + Thymia)     [6h]
  P2: Conversation agent with OpenAI Realtime (agent mode)             [6h]
  P3: Student sidebar + tutor panel UI (live mode)                     [6h]
  P4: Anam avatar integration + debrief generation                     [6h]

HOURS 8-12: Integration (merge the pieces)
  P1+P2: Connect pipeline to agent mode (Thymia adaptive + correction) [4h]
  P3+P4: Connect pipeline to live mode UI (real-time updates)          [4h]

HOURS 12-16: Dashboard + Polish
  P3: Confidence heatmap + session timeline (D3.js or Recharts)        [4h]
  P1: Data aggregation for dashboard (Lambda + DynamoDB queries)       [4h]
  P2: Tutor report generation (OpenAI summary)                        [4h]
  P4: Debrief polish + flashcard generation                           [4h]

HOURS 16-20: Integration Testing + Bug Fixes
  Everyone: End-to-end flow testing, bug fixes, edge cases             [4h]

HOURS 20-24: Demo Prep
  - Script the demo flow (who clicks what, when)                       [1h]
  - Prepare fallback recordings in case of API failures                [1h]
  - Pitch deck (5 slides max)                                         [1h]
  - Rehearse 3x                                                        [1h]
```

### Total Effort

| Component | Hours | Shared Code % |
|---|---|---|
| Shared pipeline (Agora + OpenAI + Thymia) | 8h | 100% (used by both modes) |
| Live mode UI (student sidebar + tutor panel) | 8h | - |
| Agent mode (conversation + avatar + correction) | 10h | - |
| Dashboard (heatmap + timeline) | 6h | - |
| Debrief + flashcards | 4h | - |
| Integration + testing | 4h | - |
| Demo prep | 4h | - |
| **Effective total** | **44h person-hours** | **4 people x ~11h each** |

Buffer of ~13h per person for debugging, API issues, and sleep.

---

## What to Cut if Running Behind

Priority order (cut from the bottom):

1. **MUST HAVE**: Live lesson copilot with student sidebar + tutor panel + confidence bar (this IS the demo)
2. **MUST HAVE**: Anam avatar debrief post-lesson (the "wow" moment)
3. **SHOULD HAVE**: Agent practice with avatar (demonstrates the full cycle)
4. **NICE TO HAVE**: Adaptive difficulty via Thymia in agent mode
5. **NICE TO HAVE**: Dashboard with heatmap
6. **CAN FAKE**: Session timeline (can show with mock data)
7. **CAN FAKE**: Flashcard generation (can show a static example)

If time runs out at hour 16, features 1-3 make a complete and winning demo.

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| Thymia API not responding | Pre-record biomarker data, use mock values with realistic variation |
| Anam avatar latency >500ms | Pre-render avatar for debrief, use audio-only for practice |
| OpenAI Realtime quota limits | Cache common analysis patterns, have GPT-4o fallback for non-realtime |
| Agora setup takes too long | Start with local audio files, add Agora streaming later |
| Demo fails live | Record a golden-path video as backup, narrate over it |

---

## Scoring Alignment

Based on typical hackathon judging criteria:

| Criteria | How FluentLoop Scores |
|---|---|
| **Innovation** | Confidence Arc (Thymia + situational competence) is unprecedented in the market |
| **Technical Complexity** | Shared pipeline serving two modes, 5 partner APIs integrated |
| **Business Viability** | Directly enhanceable on Preply's existing product - not a rebuild |
| **Use of Partner Tech** | All 5 partners with clear, justified roles (not forced) |
| **Demo Quality** | Complete story arc: live lesson -> practice -> dashboard -> improvement |
| **Alignment with Preply** | "Human-led, AI-enhanced" - tutor stays at the center, AI amplifies |

---

## One-Liner for the Judges

> "FluentLoop is the AI nervous system for language learning: it assists during live lessons, practices with you between them, and makes your confidence growth visible - all while keeping your human tutor at the center."
