# Challenge 3: Live Learning & Real-Time Context

## Context

Preply does 1-on-1 video tutoring. Now it has a Conversational AI Engine. OpenAI has a Realtime API.
Nobody solves: AI copilot during live lessons, contextual vocabulary in real time, adaptive scaffolding, immediate post-conversation debrief.

---

## Proposal: "LiveLens" - AI Copilot for Live Lessons

### Concept
An AI assistant that operates as an "invisible third participant" during live lessons between tutor and student. It listens in real time, provides contextual support for both (tutor and student), and generates an immediate post-session debrief.

### Differentiators vs. Market
1. **Bilateral copilot**: Helps both the tutor and the student in real time
2. **Context-aware**: Uses the conversation topic to surface relevant vocabulary and suggestions
3. **Non-intrusive**: Information appears in a sidebar, does not interrupt the conversation
4. **Instant debrief**: Full analysis available seconds after the lesson ends

### Architecture

```
[Agora Video Call - Tutor + Student]
            |
    [Real-Time Audio Stream]
            |
    [OpenAI Realtime API - Transcription + Analysis]
            |
    +-------+-------+
    |               |
[Student View]  [Tutor View]
    |               |
    |           [Exercise suggestions]
    |           [Notes on student errors]
    |           [Advanced vocabulary to introduce]
    |
    [Contextual L1 translation]
    [Definitions of difficult words]
    [Usage examples]
    [Thymia confidence indicator]
            |
    [Anam Avatar Debrief]
    "Here is the summary of your lesson..."
```

### Tech Stack Used
- **Agora**: Real-time video call + audio stream for processing
- **OpenAI Realtime API**: Streaming transcription, context analysis, suggestion generation
- **Thymia Helios**: Real-time monitoring of student confidence/stress
- **Anam CARA-3**: Avatar that delivers the post-lesson debrief in a personal way
- **AWS**: Lambda for processing, DynamoDB for session data

### Core Features (MVP for the hackathon)

1. **Real-Time Vocabulary Assist (Student View)**
   - Sidebar shows definition + translation when the student hesitates or uses a wrong word
   - OpenAI detects the conversation topic and pre-loads relevant vocabulary
   - Example: conversation about travel -> "boarding pass", "layover", "customs" ready
   - Click to hear correct pronunciation

2. **Tutor Intelligence Panel (Tutor View)**
   - Alerts when the student makes a recurring error (without the student seeing)
   - Suggests a quick exercise for the tutor to apply on the spot
   - Shows the student's confidence level (Thymia) in real time
   - "Student is getting anxious - consider changing topic or simplifying"

3. **Confidence Indicator**
   - Subtle sidebar bar showing the student's confidence level (Thymia)
   - Green = comfortable, Yellow = hesitant, Red = anxious
   - Session history: "Confidence dropped when the topic changed to formal grammar"

4. **Instant Debrief (post-lesson)**
   - Anam avatar appears and delivers a personalized summary in 60 seconds:
     - "You practiced travel vocabulary for 25 minutes"
     - "3 new phrasal verbs used correctly: check in, take off, get through"
     - "Recurring error: 'I have been to travel' - correct: 'I have traveled'"
     - "Your confidence improved 40% when talking about personal experiences"
     - "Suggested exercise before the next lesson: [link]"
   - Debrief also sent to the tutor with notes for the next lesson

5. **Contextual Flashcards**
   - Automatically generated from new vocabulary in the session
   - Include the exact sentence from the context where it appeared
   - Spaced repetition activated automatically

### Demo Flow (for presentation)

1. Open Agora video call between "tutor" and "student"
2. Conversation about a topic (e.g., business travel)
3. Show the student sidebar with contextual vocabulary in real time
4. Show the tutor panel with alerts and suggestions
5. Thymia indicator changes color when the student becomes anxious
6. End the lesson -> Anam avatar delivers debrief in 30 seconds
7. Show automatically generated flashcards

### Effort Estimate (24h hackathon)

| Task | Hours | Who |
|------|-------|-----|
| Agora video call setup + audio stream | 3h | Backend |
| OpenAI Realtime transcription + analysis | 4h | Backend |
| Student sidebar UI (vocabulary assist) | 4h | Frontend |
| Tutor panel UI (intelligence dashboard) | 4h | Frontend |
| Thymia confidence indicator | 2h | Full-stack |
| Anam avatar debrief | 3h | Full-stack |
| Flashcard generation | 2h | Backend |
| Polish and demo prep | 4h | Everyone |
| **Total** | **26h** | **4-5 people** |

### Why It Wins

- **Enhances Preply's core product**: Improves the live lesson that already exists
- Does not replace the tutor - gives them superpowers
- Extremely visual and tangible demo (video call with real-time overlays)
- Uses all 5 technologies in a natural and justified way
- The debrief with Anam avatar is a "wow moment" for the presentation
- Contextual flashcards solve the problem of "what to practice between lessons"
- Thymia as a differentiator that no competitor has
