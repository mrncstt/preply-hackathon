# Passion-Led Learning Agent

> Voice AI that discovers what learners love and builds personalized learning bridges.

**[Live Demo](https://botas.vercel.app)** | **[Pitch Deck](https://botas.vercel.app/pitch.html)**

---

## How It Works

| Step | What happens |
|------|-------------|
| **1. Landing** | Learner arrives and meets the AI Discovery Coach |
| **2. Voice Interview** | 5-minute real-time voice conversation explores interests, goals, and hidden passions |
| **3. AI Classification** | GPT-5.4 analyzes the conversation into a structured learner profile |
| **4. Learning Bridge** | A personalized 4-week plan connects what they *love* to what they *need* to learn |

---

## The Insight

Most language learners quit because lessons feel disconnected from their lives. Research on interest development (Hidi & Renninger, 2006) shows that **triggered situational interest** -- when learning content connects to a personal passion -- is the strongest predictor of sustained motivation. We use voice AI to *find* that passion, then *build the bridge* from passion to skill.

---

## Tech Stack

| Technology | Role |
|-----------|------|
| **Next.js 16** | App Router + Turbopack for fast, modern frontend |
| **Agora ConvoAI** | Real-time voice AI interview via RTC + RTM |
| **OpenAI GPT-5.4** | Learner classification and learning plan generation |
| **Thymia** | Cognitive signal analysis during voice interaction |
| **Vercel** | One-click deployment and edge hosting |

---

## Setup

```bash
cd prototype
cp .env.example .env.local
npm run dev
```

Three env vars to fill:

```
AGORA_ID=              # Agora Console
AGORA_APP_CERTIFICATE= # Agora Console
OPEN_AI_API_KEY=       # OpenAI
```

---

## Team

**Mariana Costa** - Data
**Timur Losev** - DevOps / AI

---

Built at **Preply x Agora Hackathon** -- Barcelona, March 2026
