<p align="center">
  <img src="prototype/public/botas-logo.svg" alt="botas" width="120" />
</p>

<h1 align="center">Passion-Led Learning Agent</h1>

<p align="center">
  <strong>What if Preply knew what you love before lesson 1?</strong><br>
  A voice AI that replaces static forms with a 90-second conversation, discovers your passions, and builds a personalized learning bridge between what you love and what you need to learn.
</p>

<p align="center">
  <a href="https://botas.vercel.app"><strong>Live Demo</strong></a> &nbsp;|&nbsp;
  <a href="https://botas.vercel.app/pitch.html"><strong>Pitch Deck</strong></a> &nbsp;|&nbsp;
  <a href="https://botas.vercel.app/pitch-30s.html"><strong>30s Pitch</strong></a>
</p>

---

## The problem: before vs. after

| | Before (current Preply) | After (our agent) |
|---|---|---|
| **Onboarding** | Fill a form, pick from a list | Talk for 90 seconds about what you love |
| **Matching** | Filter by price, rating, availability | AI maps your passions to the right tutor |
| **First lesson** | Tutor starts from zero | Tutor gets a full passion profile before lesson 1 |
| **Retention** | 73% quit within 3 months | Lessons built around your interests keep you engaged |

---

## Architecture

```
 User opens botas.vercel.app
           |
           v
  +------------------+
  |   Next.js App    |
  |   (Vercel)       |
  +--------+---------+
           |
           v
  +------------------+       +------------------+
  |  Agora ConvoAI   | <---> |   OpenAI GPT-5.4 |
  |  (Voice RTC/RTM) |       |   (LLM + TTS)    |
  +--------+---------+       +--------+---------+
           |                          |
           v                          v
  +------------------+       +------------------+
  |  Thymia          |       |  /api/classify   |
  |  (Cognitive      |       |  (Structured     |
  |   signals)       |       |   profile JSON)  |
  +------------------+       +--------+---------+
                                      |
                                      v
                             +------------------+
                             |  Learning Bridge  |
                             |  (Personalized    |
                             |   plan + tutor    |
                             |   recommendation) |
                             +------------------+
```

**Flow:** User clicks "Find your tutor" > 90-second voice interview via Agora ConvoAI > OpenAI classifies the transcript into a structured learner profile > Learning Bridge connects passions to goals > Tutor gets the profile before lesson 1.

---

## How it works

| Step | What happens |
|------|-------------|
| **1. Landing** | Learner arrives at a Preply-style homepage and clicks "Find your tutor" |
| **2. Voice interview** | 90-second real-time voice conversation explores interests, goals, and hidden passions |
| **3. AI classification** | GPT-5.4 analyzes the transcript into a structured learner profile |
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
| **OpenAI GPT-5.4** | Learner classification, conversation, and TTS |
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
