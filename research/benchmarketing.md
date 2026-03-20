# Benchmarketing: Real Persona x Real Learning Need

## Concept: Passion-Led Learning Agent

Create an AI agent simulation (Vercel + Agora + OpenAI + Thymia) that discovers:
1. What the person **truly enjoys**,
2. What they **need to learn**,
3. And what is **most useful now** for their professional goal.

Central example: a lawyer needs English for business, but their authentic interest is cooking.

**Core insight:** "The nucleus is not teaching English. The nucleus is discovering the best emotional vehicle to make the person learn what they avoid, using what they love."

---

## Discovery Questions (Agent Interview Flow)

> The agent asks these during a video call via Agora ConvoAI.

1. What do you need to learn right now, even without motivation?
2. Why is this important for your work or life?
3. What could you talk about for hours without getting tired?
4. What kind of content do you consume for pleasure?
5. When you try to study, at what point do you lose energy?
6. Do you prefer to talk, do, watch, or solve cases?
7. In which situations do you feel most confident?
8. What would make this learning feel less like "studying" and more like "your thing"?

---

## Architecture (hackathon-ready)

### 1) Vercel (orchestration and UI)
- Frontend (Next.js): onboarding + live session + final report (3 screens)
- API Routes / Serverless Functions: session creation, LLM routing, profile persistence
- Deploy: instant via `vercel deploy`

### 2) Agora (real-time audio/video + ConvoAI)
- ConvoAI agent handles STT -> LLM -> TTS pipeline (the interview)
- One channel per student session
- Webhook/callback sends transcriptions to backend
- **Bonus point: +1 for Agora ConvoAI integration**

### 3) OpenAI (agent brain)
- **Interviewer agent**: System prompt drives 8 discovery questions with follow-ups
- **Classifier**: Takes full transcript + Thymia signals, outputs structured JSON
- Signal extraction:
  - `LIKES`: topics with high spontaneous engagement
  - `NEEDS`: linguistic competencies required for professional goal
  - `USEFUL_NOW`: practical intersection of `LIKES` and `NEEDS`
- Generates personalized "learning bridge" recommendation

### 4) Thymia (emotional state and engagement)
- Aggregated signals per time window (enthusiasm, stress, hesitation, energy)
- Simple adaptation rules:
  - High stress + recurring error -> reduce complexity and speed
  - High energy + consistent success -> increase challenge
- Used as enrichment signal, NOT as primary classifier
- Persist only aggregated scores in MVP (privacy)
- **WARNING**: Built for mental health, not linguistic confidence. Use as binary signal.

---

## Pipeline Flow

```
Browser (Next.js on Vercel)
    |
    +-- Agora Web SDK (join channel)
    |-- User speaks into microphone
    |
    v
Agora ConvoAI Agent (server-side, managed by Agora)
    |-- STT: audio -> text
    |-- LLM: system prompt drives discovery interview
    |-- TTS: response -> audio back to user
    |
    +-- Webhook/Callback -> Vercel API Routes
            |-- Save transcriptions per question
            |-- Send audio to Thymia Sentinel API (biomarkers)
            |-- After 8 questions: OpenAI classifier generates JSON
            |-- Frontend renders profile card + learning bridge
```

---

## Demo Simulation Flow (5-10 min)

1. **Min 0-1: Onboarding** -- User joins video call, sees agent greeting
2. **Min 1-4: Discovery interview** -- Agent asks 8 questions, Thymia sidebar shows enthusiasm/stress in real-time
3. **Min 4-5: Processing** -- "Analyzing your learning profile..." loading screen
4. **Min 5-6: Profile reveal** -- Card shows: need, interest, barriers, recommendation
5. **Min 6-7: Learning bridge** -- Personalized plan: "Kitchen Contracts", "Food Startup Lawsuit"
6. **Min 7: Handoff** -- "Connect with a Preply tutor who shares your interests"

---

## Classifier Prompt (OpenAI)

```
You are a pedagogical analyzer specialized in motivation and learning psychology.

Analyze this interview transcript and voice biomarker signals.

Classify the session into a structured profile with these fields:
- required_skill: the language skill the person needs for their professional goal
- explicit_goal: why they need this skill
- real_interest: the topic that generates genuine enthusiasm (detected via linguistic elaboration + biomarker signals)
- interest_signals: array of {topic, weight, evidence} from the conversation
- motivation_signals: behavioral patterns observed (enthusiasm, stress, energy changes)
- learning_barriers: what prevents sustained learning
- preferred_modality: how they learn best (talk, do, watch, solve)
- useful_contexts: practical scenarios connecting interest + need
- recommendation: one-sentence learning bridge strategy

Return ONLY valid JSON. For each field, cite the exact transcript excerpt as evidence.
If evidence is insufficient, mark as "low_confidence".
```

---

## Expected Output (lawyer + cooking example)

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
    "low energy when discussing exams (Thymia: stress increase at Q1)",
    "faster response latency on cooking topics",
    "spontaneous vocabulary expansion on food-related answers"
  ],
  "learning_barriers": [
    "low intrinsic interest in formal study",
    "fear of speaking mistakes in professional context",
    "grammar-first approaches drain energy quickly"
  ],
  "preferred_modality": "hands-on + conversation",
  "useful_contexts": [
    "Kitchen instructions in English (recipe storytelling)",
    "Negotiation scenarios set in restaurant/food business",
    "Contract vocabulary through supplier agreements for ingredients",
    "Legal case studies involving food industry disputes"
  ],
  "recommendation": "Teach legal English through cooking-centered conversation exercises and food-business negotiation scenarios",
  "thymia_summary": {
    "peak_enthusiasm": "Question 3 -- talking about cooking (engagement: 0.92)",
    "peak_stress": "Question 1 -- discussing legal exams (stress: 0.78)",
    "overall_engagement": "high",
    "confidence_trend": "rising through session"
  }
}
```

---

## 3-Screen UI Flow (UX Researcher consensus)

### Screen 1: "The Conversation"
```
+-----------------------------------------------+
|  [Agent video/avatar]          |  SIDEBAR      |
|                                |               |
|  "What could you talk about   |  Enthusiasm   |
|   for hours without getting   |  [||||||||_]   |
|   tired?"                     |               |
|                                |  Comfort      |
|  [User responds naturally     |  [||||||___]   |
|   via voice]                  |               |
|                                |  Energy       |
|                                |  [|||||____]   |
|                                |               |
|  Question 3 of 8              |  Thymia Live  |
+-----------------------------------------------+
```

### Screen 2: "The Profile"
```
+-----------------------------------------------+
|                                               |
|  YOUR LEARNING PROFILE                        |
|                                               |
|  Need: Legal English                          |
|  Engagement trigger: Cooking                  |
|  Preferred mode: Hands-on + Conversation      |
|  Comfort zone: Informal conversations         |
|  Drop-off point: Isolated grammar drills      |
|                                               |
|  [Thymia graph: peaks and valleys             |
|   marked per question]                        |
|                                               |
|  "You need legal English,                     |
|   but your brain lights up when               |
|   the topic is gastronomy."                   |
|                                               |
+-----------------------------------------------+
```

### Screen 3: "The Bridge"
```
+-----------------------------------------------+
|                                               |
|  YOUR LEARNING BRIDGE                         |
|                                               |
|  Week 1: "Kitchen Contracts"                  |
|  Learn contract terms through a real case:    |
|  negotiating ingredient supply for a          |
|  restaurant.                                  |
|                                               |
|  Week 2: "The Food Startup Lawsuit"           |
|  Practice legal argumentation by analyzing    |
|  a food fraud case.                           |
|                                               |
|  [Connect with Preply tutor          ->]      |
|  [Practice now with AI               ->]      |
|                                               |
|  Powered by Preply + Agora + Thymia           |
+-----------------------------------------------+
```

---

## KPIs (simple and presentable)

- Time to identify dominant interest (`TTFI`, in minutes)
- % of professional scenario sentences completed without help
- Confidence variation (Thymia aggregated) between start and end
- User acceptance rate of the 7-day plan

---

## Positioning for Judges

### For Petro Loboda (Preply, Sr Director Engineering)
"This is an onboarding tool that feeds the human tutor. The AI discovers interests and barriers, then matches the student with a tutor who shares their passions. It improves marketplace matching -- the heart of any platform."

### For Ben Weekes (Agora, Sr Architect)
"Agora ConvoAI powers the entire discovery interview. STT->LLM->TTS pipeline handles the conversational flow natively. The audio stream also feeds Thymia for biomarker analysis."

### For Max Hudlberger (OpenAI, Applied AI)
"Two-stage reasoning: an interviewer agent that adapts questions based on detected enthusiasm, followed by a classifier that extracts structured motivation profiles from unstructured conversation."

---

## Competitive Differentiation

| What exists | What's missing | What we do |
|---|---|---|
| Duolingo gamifies content | Treats everyone the same | Personalizes by passion |
| Speak does speech-first | Generic scenarios | Scenarios from YOUR interests |
| Praktika has multi-agent | No emotional discovery | Discovers what drives YOU |
| ELSA measures pronunciation | Doesn't measure motivation | Measures what makes you engage |
| Preply has human tutors | Matching by price/schedule | Matching by passion + need |

**One-liner:** "Most language apps ask what you want to learn. We ask what makes you want to keep going -- and build the bridge between the two."

---

## Psychological Foundation

- **Self-Determination Theory** (Deci & Ryan, 2000): autonomy, competence, relatedness
- **Interest Theory** (Hidi & Renninger, 2006): triggered interest -> developed interest
- **Transfer-Appropriate Processing** (Morris et al., 1977): learning through familiar schemas
- **Cordova & Lepper (1996)**: personalization of context increased engagement by up to 40%
- **Hulleman & Harackiewicz (2009)**: connecting content to personal interests improved grades

---

## Post-Hackathon Evolution

1. Run with 5 professional profiles (lawyer, dev, salesperson, doctor, founder)
2. Compare "generic session" vs "passion-integrated session"
3. Measure retention at D+3 and D+7
4. Create a "bridge library" by profession x interest (law x cooking, sales x football)
5. Integrate with Preply tutor matching algorithm
6. Portfolio of interests with dynamic weights (not single match)
