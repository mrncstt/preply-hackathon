# Tech Partners - Hackathon

Official source: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply

## Agora - Real-Time Audio/Video + Conversational AI (BONUS POINT)

**Integrating Agora ConvoAI gives up to +1 bonus point. Only available bonus.**

- **Conversational AI Engine**: Complete STT -> LLM -> TTS pipeline managed in the cloud
  - Integrates with any LLM + any TTS/ASR
  - Ultra-low latency for voice AI
  - Natural interruption (model pauses when user interrupts)
  - AI echo cancellation + noise suppression
  - Pipeline Mode: only 3 environment variables (APP_ID, APP_CERTIFICATE, PIPELINE_ID)
- **Agora RTC SDK**: Real-time audio/video calling
- **Agora RTM (Signaling)**: Real-time messaging, presence, data channels
- **Agora App Builder**: No-code video calling
- **Agora Cloud Recording**: Cloud call recording
- **Agora + OpenAI**: Direct integration with OpenAI Realtime API
- **Agora Skill for Claude Code**: `npx skills add github:AgoraIO-Conversational-AI/agora-skills`
- **Live demo**: https://convoai-demo.agora.io/
- **Starter repos**:
  - agent-samples: https://github.com/AgoraIO-Conversational-AI/agent-samples
  - vibe-coding-lovable: https://github.com/AgoraIO-Conversational-AI/vibe-coding-lovable
  - vibe-coding-v0: https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0
  - server-custom-llm: https://github.com/AgoraIO-Conversational-AI/server-custom-llm

## OpenAI - LLM + TTS

- **gpt-realtime** (GA Aug 2025):
  - Streaming audio in/out
  - Interruption handling with voice activity detection
  - Background function calling while model speaks
  - Instruction following: 82.8%
  - Pricing: $32/1M audio input tokens, $64/1M output tokens
- **Realtime API**: WebSocket, multimodal (audio + text + function calling)
- **Transcription API**: Works with fragmented speech, accents, non-native speakers
- **Already integrated in Agora ConvoAI** as the default LLM provider

## AWS - AI/ML Services

- **Amazon Bedrock**: Managed access to foundation models with RAG, agents, guardrails
- **Amazon Transcribe**: Real-time speech-to-text, multi-language
- **Amazon Translate**: Real-time translation
- **Amazon Polly**: TTS with generative voices
- **Combined pipeline**: Transcribe -> Translate -> Polly = near-real-time speech-to-speech
- **Lower priority**: Agora ConvoAI already covers STT/TTS. AWS is complementary

## Anam - Photorealistic Video Avatars

- **CARA-3**: Photorealistic avatar generation
  - Full spectrum of emotions via facial expressions
  - Perfect lip-sync
  - Contextual eye and body movements
  - **180ms latency**
  - #1 in all metrics on the Avatar Benchmark 2025
- 70+ languages, native voices, WebRTC streaming
- **Integration**: Already supported in agent-samples (react-video-client-avatar)
- **Config**: VIDEO_AVATAR_VENDOR=anam, VIDEO_AVATAR_API_KEY, VIDEO_AVATAR_ID

## Thymia - Voice Biomarkers

- **Core**: Real-time vocal biomarker analysis via Sentinel API
- Detects health signals from **15 seconds of speech**
- Evaluates **30+ clinical and wellness states** with 85%+ accuracy
- Scores: stress, burnout, fatigue, emotions
- **Helios API**: Vocal biomarker analysis for wellness
- **Apollo API**: Clinical biomarker analysis
- **Hackathon integration**: Via Custom LLM Server (server-custom-llm)
  - go-audio-subscriber captures RTC audio
  - Thymia module processes via Sentinel API
  - Scores published via RTM to the client
  - Scores injected into the LLM system prompt
- **Ready recipe**: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/thymia.md
- **WARNING**: Thymia was built for mental health, not for linguistic confidence. Use with caution

## Shen.AI - Camera Vitals (NEW)

**Tech partner not listed in the original research!**

- **Core**: Real-time physiological measurement via laptop/phone camera
- **Metrics**: Heart rate, HRV, stress index, respiratory rate, blood pressure
- **Works without additional hardware** - just the webcam
- **WASM SDK**: Runs in the browser (~35MB)
- **Flow**: Camera capture -> face detection -> vitals published via RTM every 2s -> server -> LLM prompt
- **Integration**: NEXT_PUBLIC_ENABLE_SHEN=true + NEXT_PUBLIC_SHEN_API_KEY on the client
- **Ready recipe**: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/shen.md
- **Combines with Thymia**: Voice measures emotional/psychological state, camera measures physiological state

## Quick Comparison

| Partner | Type | Integration | Estimated time | Bonus? |
|---------|------|-------------|----------------|--------|
| Agora ConvoAI | Voice infra | Starter code ready | 30min-1h | YES (+1) |
| OpenAI | LLM | Already in ConvoAI | 0 (included) | No |
| Anam | Avatar | Starter code ready | 1-2h | No (strengthens score) |
| Thymia | Voice biomarkers | Ready recipe | 2-3h | No (strengthens score) |
| Shen.AI | Camera vitals | Ready recipe | 1-2h | No (strengthens score) |
| AWS | Cloud services | Manual | 2-4h | No |
