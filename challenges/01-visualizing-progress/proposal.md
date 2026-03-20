# Challenge 1: Visualizing Learning Progress

## Context

Preply has Lesson Insights (post-lesson summary). Duolingo has streaks/XP (shallow).
Nobody solves: invisible progress at the intermediate level, speaking confidence, skill decay, learning narrative.

---

## Proposal: "LinguaMap" - A Living Map of Language Competence

### Concept
An interactive dashboard that transforms every interaction (lesson, exercise, AI conversation) into a visual map of multi-dimensional competence. Not just "how much vocabulary you know", but "how confident you are ordering a coffee in Madrid".

### Differentiators vs. Market
1. **Confidence as a metric**: Using Thymia to measure stress/confidence through voice over time
2. **Situational competence map**: Not a generic "B1 level", but "B2 for ordering food, A2 for discussing politics"
3. **Invisible progress made visible**: Micro-improvements (response speed, less hesitation, pronunciation) captured and visualized
4. **Temporal narrative**: "Your journey" - a visual timeline connecting lessons, practice sessions, and breakthrough moments

### Technical Architecture

```
[Agora Real-Time Audio] --> [OpenAI Transcription + Analysis]
                                    |
                        [AWS Lambda Processing Pipeline]
                        /           |            \
              [Speech Metrics]  [Grammar]   [Thymia Emotion API]
                        \           |            /
                    [Competence Score Engine]
                              |
                    [React Dashboard + D3.js Visualizations]
```

### Tech Stack Used
- **Agora**: Real-time audio capture from sessions
- **OpenAI**: Transcription, grammar/vocabulary analysis, narrative insight generation
- **Thymia Helios API**: Vocal biomarkers for confidence, stress, engagement
- **AWS**: Lambda for pipeline, DynamoDB for time-series, S3 for assets
- **Frontend**: React + D3.js for interactive visualizations

### Core Features (MVP for the Hackathon)

1. **Confidence Heatmap**
   - Visual grid: X-axis = situations (restaurant, work, travel, social), Y-axis = skills (speaking, listening, vocabulary, grammar)
   - Colors based on real data from Thymia (confidence) + OpenAI (accuracy)
   - Updates after each session

2. **Progress Pulse**
   - "GitHub contributions"-style visualization but for learning
   - Each cell = a session/practice, color = improvement intensity
   - Shows consistency and momentum

3. **Skill Radar**
   - Radar chart showing pronunciation, fluency, vocabulary, grammar, confidence, speed
   - Previous month overlay for comparison
   - Based on metrics extracted by OpenAI + Thymia

4. **AI Narrative Summary**
   - OpenAI generates a weekly summary in natural language
   - "This week you significantly improved your fluency when talking about hobbies. Your hesitation dropped 30% and Thymia detected less stress. Suggested next focus: work vocabulary."

### Demo Flow (for Presentation)

1. Simulate 3 practice sessions with Agora audio
2. Pipeline processes and generates metrics
3. Dashboard shows visual evolution in real time
4. AI generates narrative insight

### Effort Estimate (24h Hackathon)

| Task | Hours | Who |
|------|-------|-----|
| Setup pipeline Agora -> OpenAI -> AWS | 4h | Backend |
| Thymia API integration | 3h | Backend |
| Score engine and data model | 3h | Backend |
| React + D3.js dashboard | 6h | Frontend |
| AI narrative generation | 2h | Full-stack |
| Polish and demo prep | 4h | Everyone |
| **Total** | **22h** | **3-4 people** |

### Why This Wins

- Aligned with Preply's strategy: "human-led, AI-enhanced" - tools for both tutor AND student
- Uses all 5 partner technologies
- Solves the #1 problem learners face: "I don't know if I'm making progress"
- Visually impactful for demo
- Thymia as a unique differentiator (nobody else measures confidence through voice)
