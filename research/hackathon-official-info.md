# Official Hackathon Information (from the official repo)

Source: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply

---

## Agenda

### Friday 03/20

| Time | Activity |
|------|----------|
| 17:00-17:30 | Registration (lobby) |
| 17:30-18:30 | Keynote (Max/OpenAI, Ben/Agora, Preply) |
| 18:30-20:00 | Project pitches, team formation, mentorship |
| 20:00-20:30 | Day closing |

**Mentorship rooms (Friday only):**

| Room | Mentor |
|------|--------|
| Power People's Progress A | Agora (Ben Weekes) |
| Power People's Progress B | OpenAI (Max Hudlberger) |
| Portuguese | Thymia (Borys Pratsiuk) |
| French | Anam (Borys Pratsiuk) |
| Catalan | AWS (Borys Pratsiuk) |
| Spanish & Ukrainian | Preply (Borys Pratsiuk) |

### Saturday 03/21

| Time | Activity |
|------|----------|
| 09:00-10:00 | Breakfast |
| 10:00 | Day agenda |
| 10:00-13:00 | Coding (3h) |
| 13:00-14:00 | Lunch |
| 14:00-16:00 | Coding + submissions (2h) |
| 16:00-17:00 | Presentations |
| 17:00 | Awards |
| 17:00-18:00 | Networking and closing |

**WARNING: There are only ~5-6 hours of effective coding on Saturday!**

---

## Evaluation Criteria (each category 1-5, equal weight 20%)

| Category | 1 (low) | 5 (high) |
|----------|---------|----------|
| **Technology Use** | A single technology/provider | Multiple technologies combined (STT, TTS, LLMs, Avatars) |
| **Relevancy** | Not relevant to Preply or learning | Could be added to the product tomorrow |
| **Product Scope** | Solves a niche problem | Solves a global problem affecting millions |
| **Presentation & Demo** | Submitted and presented but no live demo | Live demo, YCombinator-ready pitch |
| **Quality** | Poorly functioning, bad UX | Well-thought-out UX, no bugs, good quality. Includes AI Craftsmanship (HOW_WE_BUILT.md) |

**Bonus: Agora ConvoAI Integration** - up to +1 extra point

**Maximum score: 6** (5 base + 1 Agora bonus)

### Judges
- **Petro Loboda** - Preply (Sr Director of Engineering)
- **Ben Weekes** - Agora (Sr Architect)
- **Max Hudlberger** - OpenAI (Applied AI / Solutions Architect)

---

## Submission

1. Fork the official repo
2. Create a folder at `submissions/team-name/`
3. Include: README.md, HOW_WE_BUILT.md, demo.mp4, src/, docs/
4. PR to the original repo

### HOW_WE_BUILT.md (important for Quality score)

Document:
- How you used AI to plan architecture
- Which dev models/tools (Claude Code, Codex CLI, etc)
- Prompting strategies that worked
- How you tested AI-generated code
- Challenges and pivots

---

## Official Stack and Bonus Points

### Available Agora Products

| Technology | Description | Docs |
|------------|-------------|------|
| **Agora Conversational AI** | Voice AI agents with STT -> LLM -> TTS pipeline | [Docs](https://docs.agora.io/en/conversational-ai/overview/product-overview) |
| **Agora RTC SDK** | Real-time audio/video calling | [Docs](https://docs.agora.io/en/video-calling/overview/product-overview) |
| **Agora RTM (Signaling)** | Real-time messaging, presence, data channels | [Docs](https://docs.agora.io/en/signaling/overview/product-overview) |
| **Agora App Builder** | No-code video calling | [App Builder](https://appbuilder.agora.io/) |
| **Agora Cloud Recording** | Cloud call recording | [Docs](https://docs.agora.io/en/cloud-recording/overview/product-overview) |

### Tech Partners

| Partner | What it does | Bonus? |
|---------|-------------|--------|
| **Agora ConvoAI** | Complete voice pipeline: STT -> LLM -> TTS | **YES (+1 point)** |
| **OpenAI** | LLM (GPT), TTS | Not separate |
| **AWS** | Bedrock, Transcribe, Translate, Polly | Not separate |
| **Anam** | Photorealistic video avatars (180ms latency) | Not separate, but strengthens score |
| **Thymia** | Voice biomarkers: stress, burnout, fatigue, emotions | Not separate, but strengthens score |
| **Shen.AI** | Camera-based vitals: heart rate, HRV, stress, breathing, blood pressure | Not separate, but strengthens score |

**IMPORTANT: Shen.AI is a new tech partner not mentioned before!**

---

## Official Starter Code Repos

| Repo | Description |
|------|-------------|
| [agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples) | Full-stack voice/video AI agent with Python backend and React frontends |
| [vibe-coding-lovable](https://github.com/AgoraIO-Conversational-AI/vibe-coding-lovable) | Starter for Lovable (browser, zero local setup) |
| [vibe-coding-v0](https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0) | Starter for v0 (Vercel) |
| [server-custom-llm](https://github.com/AgoraIO-Conversational-AI/server-custom-llm) | Custom LLM Middleware for RAG, tool calling, Thymia, memory |

### Agora Skill for Claude Code

```bash
npx skills add github:AgoraIO-Conversational-AI/agora-skills
```

### Live Demo to Test

https://convoai-demo.agora.io/

---

## Official Thought Starters

1. **Language Anxiety Wellness Coach** - Anam Avatar + Thymia biomarkers, detects stress and adapts pace
2. **Pronunciation Practice with Voice Biomarkers** - Thymia to go beyond speech recognition
3. **AI Avatar Language Tutor** - Anam Avatar face-to-face, facial expressions, multiple languages
4. **Mock Interview Prep in Any Language** - Thymia for stress/confidence in interviews
5. **Immersive Cultural Conversation Partner** - Real-world scenarios (restaurant, directions, market)
6. **Learning Progress Dashboard with AI Analytics** - Transcripts + Thymia data over time
7. **Group Language Exchange Facilitator** - Agora RTC multi-party, AI moderation

---

## Base Architecture (Agora ConvoAI)

```
Browser (React client)
    | audio/video via Agora SD-RTN
AI Agent Instance (cloud, managed by Agora)
    | STT -> LLM -> TTS pipeline
Backend (Python, local)
    -> calls Agora REST API to start/stop agents
```

### Pipeline Mode (fastest path, 3 variables)

```bash
APP_ID=your_agora_app_id
APP_CERTIFICATE=your_agora_app_certificate
PIPELINE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If a pipeline is configured in Agora Agent Builder, no OpenAI key or TTS config is needed.

### Inline Config (full control)

```bash
APP_ID=your_agora_app_id
APP_CERTIFICATE=your_agora_app_certificate
LLM_API_KEY=your_openai_api_key
TTS_VENDOR=rime
TTS_KEY=your_tts_api_key
TTS_VOICE_ID=astra
```

### Thymia Integration (via Custom LLM Server)

```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
                                                                  |-- go-audio-subscriber (captures RTC audio)
                                                                  |-- Thymia module -> Thymia Sentinel API
                                                                  |-- RTM -> Client (live scores)
```

Biomarkers appear after 30-60s of speech. The agent can reference the data in conversation.

### Shen.AI Integration (client-side, WASM)

```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
        |                                                          |-- Shen module (RTM listener -> LLM prompt)
        |
        |-- Shen.AI WASM SDK (browser-side)
              |-- Camera capture + face detection
              |-- RTM publish (vitals) -> server
```

Runs in the browser. Vitals published via RTM every 2 seconds.

---

## Implications for Our Proposals

### What changes with 6h of coding (not 24h)

1. **Scope needs to be DRASTICALLY smaller** - all previous estimates of 22-26h are impossible
2. **Agora ConvoAI is mandatory** - only bonus point available
3. **HOW_WE_BUILT.md is a differentiator** - document the process with Claude Code
4. **Live demo > everything** - 20% of the score is presentation/demo
5. **Relevancy to Preply** - 20% of the score, needs to be something Preply would add to the product
6. **Use starter code** - don't reinvent the wheel, start from agent-samples

### Viable proposal for 6h

Use agent-samples as a base. Customize the LLM prompt for language learning. Add Anam avatar. Add Thymia. Focus on the demo and the pitch. The Custom LLM server already has built-in Thymia and Shen.AI support.

### Integration priority

1. Agora ConvoAI (bonus point, project base)
2. OpenAI (LLM, already integrated in ConvoAI)
3. Anam (avatar, starter code already available)
4. Thymia (biomarkers, ready-made recipe)
5. Shen.AI (camera-based vitals, ready-made recipe)
6. AWS (if time allows)
