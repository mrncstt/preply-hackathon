# Tech Partners - Hackathon

Fonte oficial: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply

## Agora - Real-Time Audio/Video + Conversational AI (BONUS POINT)

**Integrar Agora ConvoAI da ate +1 ponto bonus. Unico bonus disponivel.**

- **Conversational AI Engine**: Pipeline completo STT -> LLM -> TTS gerenciado na cloud
  - Integra com qualquer LLM + qualquer TTS/ASR
  - Ultra-low latency para voice AI
  - Interrupcao natural (modelo pausa quando usuario interrompe)
  - AI echo cancellation + noise suppression
  - Pipeline Mode: so 3 variaveis de ambiente (APP_ID, APP_CERTIFICATE, PIPELINE_ID)
- **Agora RTC SDK**: Audio/video calling em tempo real
- **Agora RTM (Signaling)**: Messaging em tempo real, presence, data channels
- **Agora App Builder**: No-code video calling
- **Agora Cloud Recording**: Gravacao de calls na cloud
- **Agora + OpenAI**: Integracao direta com OpenAI Realtime API
- **Agora Skill para Claude Code**: `npx skills add github:AgoraIO-Conversational-AI/agora-skills`
- **Demo ao vivo**: https://convoai-demo.agora.io/
- **Starter repos**:
  - agent-samples: https://github.com/AgoraIO-Conversational-AI/agent-samples
  - vibe-coding-lovable: https://github.com/AgoraIO-Conversational-AI/vibe-coding-lovable
  - vibe-coding-v0: https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0
  - server-custom-llm: https://github.com/AgoraIO-Conversational-AI/server-custom-llm

## OpenAI - LLM + TTS

- **gpt-realtime** (GA Aug 2025):
  - Streaming audio in/out
  - Interruption handling com voice activity detection
  - Background function calling enquanto modelo fala
  - Instruction following: 82.8%
  - Pricing: $32/1M audio input tokens, $64/1M output tokens
- **Realtime API**: WebSocket, multimodal (audio + text + function calling)
- **Transcription API**: Funciona com fala fragmentada, sotaque, non-native
- **Ja integrado no Agora ConvoAI** como LLM provider padrao

## AWS - Servicos AI/ML

- **Amazon Bedrock**: Acesso gerenciado a foundation models com RAG, agents, guardrails
- **Amazon Transcribe**: Speech-to-text em tempo real, multi-idioma
- **Amazon Translate**: Traducao em tempo real
- **Amazon Polly**: TTS com vozes generativas
- **Pipeline combinado**: Transcribe -> Translate -> Polly = near-real-time speech-to-speech
- **Prioridade menor**: Agora ConvoAI ja cobre STT/TTS. AWS e complementar

## Anam - Video Avatars Fotorrealistas

- **CARA-3**: Geracao fotorrealista de avatars
  - Espectro completo de emocoes via expressoes faciais
  - Lip-sync perfeito
  - Movimentos contextuais de olhos e corpo
  - **180ms de latencia**
  - #1 em todas as metricas no Avatar Benchmark 2025
- 70+ idiomas, vozes nativas, streaming WebRTC
- **Integracao**: Ja suportado no agent-samples (react-video-client-avatar)
- **Config**: VIDEO_AVATAR_VENDOR=anam, VIDEO_AVATAR_API_KEY, VIDEO_AVATAR_ID

## Thymia - Voice Biomarkers

- **Core**: Analise de biomarkers vocais em tempo real via Sentinel API
- Detecta sinais de saude a partir de **15 segundos de fala**
- Avalia **30+ estados clinicos e wellness** com 85%+ precisao
- Scores: stress, burnout, fadiga, emocoes
- **Helios API**: Vocal biomarker analysis para wellness
- **Apollo API**: Clinical biomarker analysis
- **Integracao no hackathon**: Via Custom LLM Server (server-custom-llm)
  - go-audio-subscriber captura audio RTC
  - Modulo Thymia processa via Sentinel API
  - Scores publicados via RTM para o client
  - Scores injetados no system prompt do LLM
- **Recipe pronta**: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/thymia.md
- **ATENCAO**: Thymia foi construido para saude mental, nao para confianca linguistica. Usar com cuidado

## Shen.AI - Camera Vitals (NOVO)

**Tech partner nao listado na pesquisa original!**

- **Core**: Medicao fisiologica em tempo real via camera do laptop/celular
- **Metricas**: Frequencia cardiaca, HRV, indice de stress, frequencia respiratoria, pressao arterial
- **Funciona sem hardware adicional** - so a webcam
- **SDK WASM**: Roda no browser (~35MB)
- **Fluxo**: Camera capture -> face detection -> vitais publicados via RTM a cada 2s -> servidor -> LLM prompt
- **Integracao**: NEXT_PUBLIC_ENABLE_SHEN=true + NEXT_PUBLIC_SHEN_API_KEY no client
- **Recipe pronta**: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/shen.md
- **Combina com Thymia**: Voz mede estado emocional/psicologico, camera mede estado fisiologico

## Comparacao Rapida

| Partner | Tipo | Integracao | Tempo estimado | Bonus? |
|---------|------|------------|----------------|--------|
| Agora ConvoAI | Infra de voz | Starter code pronto | 30min-1h | SIM (+1) |
| OpenAI | LLM | Ja no ConvoAI | 0 (incluido) | Nao |
| Anam | Avatar | Starter code pronto | 1-2h | Nao (fortalece score) |
| Thymia | Voice biomarkers | Recipe pronta | 2-3h | Nao (fortalece score) |
| Shen.AI | Camera vitals | Recipe pronta | 1-2h | Nao (fortalece score) |
| AWS | Cloud services | Manual | 2-4h | Nao |
