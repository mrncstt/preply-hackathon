# Hackathon Context

> Sources: hackathon-official-info.md, thought-starters.md, tech-partners.md, references.md

---

## Event Details

- **Event:** Preply x Agora Hackathon, Barcelona
- **Dates:** Friday 2026-03-20 (evening) + Saturday 2026-03-21 (full day)
- **Repo:** https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply
- **Discord:** https://discord.gg/JbSwPKCE

### Agenda

**Friday 03/20:**
| Time | Activity |
|------|----------|
| 17:00-17:30 | Registration (lobby) |
| 17:30-18:30 | Keynote (Max/OpenAI, Ben/Agora, Preply) |
| 18:30-20:00 | Project pitches, team formation, mentorship |
| 20:00-20:30 | Day closing |

**Mentorship rooms (Friday only):** Agora (Ben Weekes), OpenAI (Max Hudlberger), Thymia, Anam, AWS, Preply

**Saturday 03/21:**
| Time | Activity |
|------|----------|
| 09:00-10:00 | Breakfast |
| 10:00-13:00 | Coding (3h) |
| 13:00-14:00 | Lunch |
| 14:00-16:00 | Coding + submissions (2h) |
| 16:00-17:00 | Presentations |
| 17:00-18:00 | Awards + Networking |

**WARNING: Only ~5-6 hours of effective coding on Saturday.**

---

## Evaluation Criteria (each 1-5, equal weight 20%)

| Category | 1 (low) | 5 (high) |
|----------|---------|----------|
| **Technology Use** | A single technology/provider | Multiple technologies combined (STT, TTS, LLMs, Avatars) |
| **Relevancy** | Not relevant to Preply or learning | Could be added to the product tomorrow |
| **Product Scope** | Solves a niche problem | Solves a global problem affecting millions |
| **Presentation & Demo** | Submitted but no live demo | Live demo, YCombinator-ready pitch |
| **Quality** | Poorly functioning, bad UX | Well-thought-out UX, no bugs. Includes AI Craftsmanship (HOW_WE_BUILT.md) |

**Bonus: Agora ConvoAI Integration -- up to +1 extra point. Maximum score: 6.**

### Judges
- **Petro Loboda** -- Preply (Sr Director of Engineering)
- **Ben Weekes** -- Agora (Sr Architect)
- **Max Hudlberger** -- OpenAI (Applied AI / Solutions Architect)

---

## Submission Requirements

1. Fork the official repo
2. Create a folder at `submissions/team-name/`
3. Include: README.md, HOW_WE_BUILT.md, demo.mp4, src/, docs/
4. PR to the original repo

### HOW_WE_BUILT.md (important for Quality score)
Document: how you used AI to plan architecture, which dev models/tools (Claude Code, Codex CLI, etc), prompting strategies, how you tested AI-generated code, challenges and pivots.

---

## Tech Partners

### Agora -- Real-Time Audio/Video + Conversational AI (BONUS POINT)

**Integrating Agora ConvoAI gives up to +1 bonus point. Only available bonus.**

- **Conversational AI Engine**: Complete STT -> LLM -> TTS pipeline managed in the cloud
  - Integrates with any LLM + any TTS/ASR
  - Ultra-low latency, natural interruption, AI echo cancellation + noise suppression
  - Pipeline Mode: only 3 env vars (APP_ID, APP_CERTIFICATE, PIPELINE_ID)
- **Agora RTC SDK**: Real-time audio/video calling
- **Agora RTM (Signaling)**: Real-time messaging, presence, data channels
- **Agora App Builder**: No-code video calling
- **Agora Cloud Recording**: Cloud call recording
- **Agora + OpenAI**: Direct integration with OpenAI Realtime API
- **Claude Code skill**: `npx skills add github:AgoraIO-Conversational-AI/agora-skills`
- **Live demo**: https://convoai-demo.agora.io/

**Docs:**
- ConvoAI: https://docs.agora.io/en/conversational-ai/overview/product-overview
- RTC: https://docs.agora.io/en/video-calling/overview/product-overview
- RTM: https://docs.agora.io/en/signaling/overview/product-overview
- Console: https://console.agora.io/
- App Builder: https://appbuilder.agora.io/

### OpenAI -- LLM + TTS

- **gpt-realtime** (GA Aug 2025): Streaming audio in/out, interruption handling, background function calling. Instruction following: 82.8%. Pricing: $32/1M audio input, $64/1M output
- **Realtime API**: WebSocket, multimodal (audio + text + function calling)
- **Transcription API**: Works with fragmented speech, accents, non-native speakers
- Already integrated in Agora ConvoAI as the default LLM provider
- Docs: https://platform.openai.com/

### Anam -- Photorealistic Video Avatars

- **CARA-3**: Photorealistic avatar generation, full spectrum of emotions, perfect lip-sync, contextual eye/body movements
- **180ms latency**. #1 on Avatar Benchmark 2025
- 70+ languages, native voices, WebRTC streaming
- Integration: Already supported in agent-samples (react-video-client-avatar)
- Config: VIDEO_AVATAR_VENDOR=anam, VIDEO_AVATAR_API_KEY, VIDEO_AVATAR_ID
- Docs: https://www.anam.ai/

### Thymia -- Voice Biomarkers

- Real-time vocal biomarker analysis via Sentinel API
- Detects health signals from **15 seconds of speech**
- Evaluates **30+ clinical and wellness states** with 85%+ accuracy
- Scores: stress, burnout, fatigue, emotions
- **Helios API**: Vocal biomarker analysis for wellness
- **Apollo API**: Clinical biomarker analysis
- Integration via Custom LLM Server (go-audio-subscriber captures RTC audio, Thymia module processes, scores published via RTM)
- Recipe: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/thymia.md
- **WARNING**: Built for mental health, not for linguistic confidence. Use as binary signal (stressed/relaxed), not precise scores
- Docs: https://thymia.ai/

### Shen.AI -- Camera-Based Vitals

- Real-time physiological measurement via laptop/phone camera (no additional hardware)
- **Metrics**: Heart rate, HRV, stress index, respiratory rate, blood pressure
- WASM SDK runs in browser (~35MB)
- Flow: Camera capture -> face detection -> vitals published via RTM every 2s -> server -> LLM prompt
- Config: NEXT_PUBLIC_ENABLE_SHEN=true + NEXT_PUBLIC_SHEN_API_KEY on client
- Recipe: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/shen.md
- Combines with Thymia: voice = emotional/psychological, camera = physiological
- Docs: https://shen.ai/

### AWS -- AI/ML Services (lower priority)

- Amazon Bedrock (foundation models), Transcribe (STT), Translate, Polly (TTS)
- Combined pipeline: Transcribe -> Translate -> Polly = near-real-time speech-to-speech
- Lower priority: Agora ConvoAI already covers STT/TTS

### Integration Priority & Time Estimates

| Partner | Estimated Time | Bonus? |
|---------|----------------|--------|
| Agora ConvoAI | 30min-1h | YES (+1) |
| OpenAI | 0 (included in ConvoAI) | No |
| Anam | 1-2h | No (strengthens score) |
| Thymia | 2-3h | No (strengthens score) |
| Shen.AI | 1-2h | No (strengthens score) |
| AWS | 2-4h | No |

---

## Starter Code Repos

| Repo | Description |
|------|-------------|
| [agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples) | Full-stack voice/video AI agent with Python backend and React frontends |
| [vibe-coding-lovable](https://github.com/AgoraIO-Conversational-AI/vibe-coding-lovable) | Starter for Lovable (browser, zero local setup) |
| [vibe-coding-v0](https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0) | Starter for v0 (Vercel) |
| [server-custom-llm](https://github.com/AgoraIO-Conversational-AI/server-custom-llm) | Custom LLM Middleware for RAG, tool calling, Thymia, memory |

### Base Architecture (Agora ConvoAI)

```
Browser (React client)
    | audio/video via Agora SD-RTN
AI Agent Instance (cloud, managed by Agora)
    | STT -> LLM -> TTS pipeline
Backend (Python, local)
    -> calls Agora REST API to start/stop agents
```

### Pipeline Mode (fastest path -- 3 env vars)
```
APP_ID, APP_CERTIFICATE, PIPELINE_ID
```
If a pipeline is configured in Agora Agent Builder, no OpenAI key or TTS config is needed.

### Thymia Integration Architecture
```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
                                                                  |-- go-audio-subscriber (captures RTC audio)
                                                                  |-- Thymia module -> Thymia Sentinel API
                                                                  |-- RTM -> Client (live scores)
```
Biomarkers appear after 30-60s of speech.

### Shen.AI Integration Architecture
```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
        |                                                          |-- Shen module (RTM listener -> LLM prompt)
        |-- Shen.AI WASM SDK (browser-side)
              |-- Camera capture + face detection
              |-- RTM publish (vitals) -> server
```
Runs in the browser. Vitals published via RTM every 2 seconds.

---

## Official Thought Starters

1. **Language Anxiety Wellness Coach** -- Anam Avatar + Thymia biomarkers, detects stress and adapts pace. Tech: Agora + Anam + Thymia
2. **Pronunciation Practice with Voice Biomarkers** -- Thymia voice analysis beyond speech recognition, track vocal confidence. Tech: Agora + Thymia
3. **AI Avatar Language Tutor** -- Face-to-face with Anam avatars, facial expressions, multiple languages. Tech: Agora + Anam + OpenAI
4. **Mock Interview Prep in Any Language** -- Thymia for stress/confidence in interviews. Tech: Agora + Thymia + OpenAI
5. **Immersive Cultural Conversation Partner** -- Real-world scenarios, cultural context. Tech: Agora + OpenAI
6. **Learning Progress Dashboard with AI Analytics** -- Transcripts + Thymia data over time. Tech: Agora + Thymia + OpenAI
7. **Group Language Exchange Facilitator** -- Multi-party voice/video, AI moderation. Tech: Agora RTC + RTM + OpenAI

---

## Implications for Our Project

### What changes with 6h of coding (not 24h)
1. Scope needs to be DRASTICALLY smaller
2. Agora ConvoAI is mandatory (only bonus point available)
3. HOW_WE_BUILT.md is a differentiator
4. Live demo > everything (20% of the score)
5. Relevancy to Preply (20% of the score)
6. Use starter code -- don't reinvent the wheel

### Viable approach
Use agent-samples as a base. Customize the LLM prompt. Add Anam avatar. Add Thymia if time allows. Focus on the demo and the pitch.

---

## Key Links

### Official
- Main repo: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply
- Coding guide: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply/blob/main/docs/guide.md
- Thought Starters: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply/blob/main/Thought_Starters.md
- Evaluation rubric: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply/blob/main/hackathon-rating-rubric.md

### Personal References
- Google Slides: https://docs.google.com/presentation/d/1CL-YAXrnb8YXC4wl8qroKTflnDMq07IB8U5NjFAN4oE/edit?slide=id.p#slide=id.p
- Google Sheets: https://docs.google.com/spreadsheets/d/1mTszfJKoGvEWR27-NZdnqofUPy3H2tdOdsXB14sdUUg/edit?usp=sharing
- Figma Benchmarking Toolkit: https://www.figma.com/community/file/1483390062693148011/competitive-analysis-benchmarking-toolkit-for-ux-ui-designers

### TTS Providers
- Rime: https://rime.ai/
- ElevenLabs: https://elevenlabs.io/
- Cartesia: https://cartesia.ai/
