# Preply x Agora Hackathon: Passion-Led Learning Agent

**Date:** March 20-21, 2026
**Location:** Carrer de Badajoz, 97 - Barcelona

## What it does

An AI Discovery Coach interviews learners via voice to find what they **need** to learn vs what they **love**, then generates a personalized "learning bridge" -- a plan that connects passion to skill.

**Flow:** Landing page -> 5-min voice interview (Agora ConvoAI) -> AI classification (OpenAI) -> Learner profile -> 4-week personalized plan

## Running locally

```bash
cd prototype
npm install --legacy-peer-deps
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

### Required environment variables

See `prototype/.env.example` for the full list. Core keys:

- `APP_ID` / `APP_CERTIFICATE` -- Agora Console
- `LLM_API_KEY` -- OpenAI key (for the voice agent)
- `TTS_KEY` -- TTS provider key
- `OPENAI_API_KEY` -- OpenAI key (for the classifier, can reuse LLM_API_KEY)

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **Agora ConvoAI** (RTC + RTM) -- real-time voice AI interview
- **OpenAI gpt-4o-mini** -- structured learner classification
- **Tailwind CSS 4** -- Preply-branded UI
- **Vercel** -- deployment

## Project structure

```
prototype/           # Next.js app (Vercel root directory)
  app/
    page.tsx         # SPA state machine (landing|interview|classifying|profile|bridge)
    api/             # start-agent, hangup-agent, classify, check-env
  components/
    landing/         # Hero page
    interview/       # Modal, chat, orb, controls, progress
    profile/         # Learner profile card
    bridge/          # 4-week learning plan
    thymia/          # Cognitive signals sidebar (mock)
    voice-agent/     # Agora hook + types
  lib/               # Prompts + utils
research/            # Market research, benchmarks, tech partner notes
challenges/          # Original hackathon challenge proposals
```

## Deploy

Vercel project settings:
- **Framework:** Next.js
- **Root Directory:** `prototype`
- **Environment Variables:** add all keys from `.env.example`
