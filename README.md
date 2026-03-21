<p align="center">
  <img src="prototype/public/botas-logo.svg" alt="botas" width="120" />
</p>

<h1 align="center">Passion-Led Learning Agent</h1>

<p align="center">
  Voice AI that discovers what learners love and builds personalized learning bridges.
</p>

<p align="center">
  <a href="https://botas.vercel.app"><strong>Live Demo</strong></a> &nbsp;|&nbsp;
  <a href="https://botas.vercel.app/pitch.html"><strong>Pitch Deck</strong></a> &nbsp;|&nbsp;
  <a href="https://botas.vercel.app/pitch-30s.html"><strong>30s Pitch</strong></a>
</p>

---

## How it works

| Step | What happens |
|------|-------------|
| **1. Landing** | Learner arrives and meets the AI Discovery Coach |
| **2. Voice interview** | 90-second real-time voice conversation explores interests, goals, and hidden passions |
| **3. AI classification** | GPT-5.4 analyzes the conversation into a structured learner profile |
| **4. Learning bridge** | A personalized plan connects what they *love* to what they *need* to learn |

---

## The insight

Most language learners quit because lessons feel disconnected from their lives. Research on interest development (Hidi & Renninger, 2006) shows that **triggered situational interest** is the strongest predictor of sustained motivation. We use voice AI to *find* that passion, then *build the bridge* from passion to skill.

---

## Tech stack

| Technology | Role |
|-----------|------|
| **Next.js 16** | App Router + Turbopack |
| **Agora ConvoAI** | Real-time voice AI interview via RTC + RTM |
| **OpenAI GPT-5.4** | Learner classification and learning plan generation |
| **Thymia** | Cognitive signal analysis during voice interaction |
| **Vercel** | Deployment and edge hosting |

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

<p align="center">
  Built with coffee, desperation, and AI at <strong>Preply x Agora Hackathon</strong>, Barcelona 2026
</p>
