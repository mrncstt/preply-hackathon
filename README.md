<p align="center">
  <img src="prototype/public/botas-logo.svg" alt="botas" width="140" />
</p>

<h1 align="center">Passion-Led Learning Agent</h1>

<h3 align="center">What if Preply knew what you love before lesson 1?</h3>

<p align="center">
  A voice AI that replaces static forms with a 90-second conversation,<br>
  discovers your passions, and builds a personalized learning bridge<br>
  between what you love and what you need to learn.
</p>

<p align="center">
  <a href="https://botas.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-FF7AAC?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://botas.vercel.app/long-pitch.html"><img src="https://img.shields.io/badge/Long_Pitch-121118?style=for-the-badge&logo=slides&logoColor=white" alt="Pitch Deck" /></a>
  <a href="https://botas.vercel.app/short-pitch.html"><img src="https://img.shields.io/badge/Short_Pitch-018058?style=for-the-badge&logo=slides&logoColor=white" alt="30s Pitch" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Agora_ConvoAI-099DFD?style=flat-square&logo=agora&logoColor=white" alt="Agora" />
  <img src="https://img.shields.io/badge/OpenAI_GPT--5.4-10A37F?style=flat-square&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Thymia-A78BFA?style=flat-square" alt="Thymia" />
  <img src="https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel" alt="Vercel" />
</p>

---

## The problem

> **73% of language learners quit within 3 months.** Not because learning is hard. Because no one really understood what they care about.

| | Before (current Preply) | After (our agent) |
|:---:|---|---|
| **Onboarding** | Fill a form, pick from a list | Talk for 90 seconds about what you love |
| **Matching** | Filter by price, rating, availability | AI maps your passions to the right tutor |
| **First lesson** | Tutor starts from zero | Tutor gets a full passion profile before lesson 1 |
| **Retention** | 73% quit within 3 months | Lessons built around your interests keep you engaged |

---

## How it works

```mermaid
flowchart LR
    A["Click **Find your tutor**"] --> B["Agora ConvoAI\n90s voice chat"]
    B --> C["OpenAI GPT-5.4\nProfile + Plan"]
    B --> D["Thymia\nCognitive signals"]
    C --> E["Learning Bridge\nPassions + Goals"]
    E --> F["Tutor match\nPersonalized plan"]

    style A fill:#FF7AAC,stroke:#D4457A,color:#fff
    style B fill:#099DFD,stroke:#0077CC,color:#fff
    style C fill:#10A37F,stroke:#0D8A6A,color:#fff
    style D fill:#A78BFA,stroke:#7C5FD3,color:#fff
    style E fill:#FF7AAC,stroke:#D4457A,color:#fff
    style F fill:#018058,stroke:#016045,color:#fff
```

| Step | What happens |
|:---:|---|
| **1** | Learner arrives at a Preply-style homepage and clicks "Find your tutor" |
| **2** | 90-second real-time voice conversation explores interests, goals, and hidden passions |
| **3** | GPT-5.4 analyzes the transcript into a structured learner profile |
| **4** | A personalized plan connects what they *love* to what they *need* to learn |

---

## The insight

> Research on interest development (Hidi & Renninger, 2006) shows that **triggered situational interest** is the strongest predictor of sustained motivation.

We use voice AI to *find* that passion, then *build the bridge* from passion to skill.

---

## Tech stack

| Technology | Role | Why |
|:---:|---|---|
| **Agora ConvoAI** | Real-time voice AI interview | Sub-300ms latency, natural conversation |
| **OpenAI GPT-5.4** | LLM + TTS + classification | One API for conversation, voice, and profiling |
| **Thymia** | Cognitive signal analysis | Detects engagement, confidence, cognitive load |
| **Next.js 16** | App Router + Turbopack | Fast, modern React with server components |
| **Vercel** | Edge deployment | Zero-config, instant deploys |

---

## Multilingual

The site auto-detects your browser language:

| Language | UI | Voice agent |
|:---:|:---:|:---:|
| Portuguese (pt-BR) | Portuguese | Speaks Portuguese |
| Spanish (es) | Spanish | Speaks Spanish |
| Others | English | Speaks English |

---

## Quick start

```bash
git clone https://github.com/mrncstt/preply-hackathon.git
cd preply-hackathon/prototype
cp .env.example .env.local
npm install
npm run dev
```

Three env vars:

```env
AGORA_ID=              # Agora Console
AGORA_APP_CERTIFICATE= # Agora Console
OPEN_AI_API_KEY=       # OpenAI
```

---

## Team

| | Name | Role |
|:---:|---|---|
| **MC** | Mariana Costa | Data |
| **TL** | Timur Losev | DevOps / AI |

---

<p align="center">
  <img src="prototype/public/botas-logo.svg" alt="botas" width="48" /><br>
  Built with caffeine, hard work, and AI<br>
  <strong>Preply x Agora Hackathon</strong> / Barcelona 2026
</p>
