# Informacoes Oficiais do Hackathon (do repo oficial)

Fonte: https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply

---

## Agenda

### Sexta 20/03

| Hora | Atividade |
|------|-----------|
| 17:00-17:30 | Registro (lobby) |
| 17:30-18:30 | Keynote (Max/OpenAI, Ben/Agora, Preply) |
| 18:30-20:00 | Pitch de projetos, formacao de times, mentoria |
| 20:00-20:30 | Encerramento do dia |

**Salas de mentoria (so sexta):**

| Sala | Mentor |
|------|--------|
| Power People's Progress A | Agora (Ben Weekes) |
| Power People's Progress B | OpenAI (Max Hudlberger) |
| Portuguese | Thymia (Borys Pratsiuk) |
| French | Anam (Borys Pratsiuk) |
| Catalan | AWS (Borys Pratsiuk) |
| Spanish & Ukrainian | Preply (Borys Pratsiuk) |

### Sabado 21/03

| Hora | Atividade |
|------|-----------|
| 09:00-10:00 | Cafe da manha |
| 10:00 | Agenda do dia |
| 10:00-13:00 | Coding (3h) |
| 13:00-14:00 | Almoco |
| 14:00-16:00 | Coding + submissions (2h) |
| 16:00-17:00 | Apresentacoes |
| 17:00 | Premiacao |
| 17:00-18:00 | Networking e encerramento |

**ATENCAO: Sao apenas ~5-6 horas de coding efetivo no sabado!**

---

## Criterios de Avaliacao (cada categoria 1-5, peso igual 20%)

| Categoria | 1 (baixo) | 5 (alto) |
|-----------|-----------|----------|
| **Technology Use** | Uma unica tecnologia/provedor | Multiplas tecnologias combinadas (STT, TTS, LLMs, Avatars) |
| **Relevancy** | Nao relevante para Preply ou aprendizado | Poderia ser adicionado ao produto amanha |
| **Product Scope** | Resolve problema de nicho | Resolve problema global afetando milhoes |
| **Presentation & Demo** | Submeteu e apresentou mas sem demo ao vivo | Demo ao vivo, pitch pronto para YCombinator |
| **Quality** | Mal funcionando, UX ruim | UX bem pensada, sem bugs, boa qualidade. Inclui AI Craftsmanship (HOW_WE_BUILT.md) |

**Bonus: Agora ConvoAI Integration** - ate +1 ponto extra

**Score maximo: 6** (5 base + 1 bonus Agora)

### Juizes
- **Petro Loboda** - Preply (Sr Director of Engineering)
- **Ben Weekes** - Agora (Sr Architect)
- **Max Hudlberger** - OpenAI (Applied AI / Solutions Architect)

---

## Submissao

1. Fork do repo oficial
2. Criar pasta em `submissions/team-name/`
3. Incluir: README.md, HOW_WE_BUILT.md, demo.mp4, src/, docs/
4. PR para o repo original

### HOW_WE_BUILT.md (importante para score de Quality)

Documentar:
- Como usou IA para planejar arquitetura
- Quais modelos/ferramentas de dev (Claude Code, Codex CLI, etc)
- Estrategias de prompting que funcionaram
- Como testou codigo gerado por IA
- Desafios e pivots

---

## Stack Oficial e Bonus Points

### Produtos Agora disponiveis

| Tecnologia | Descricao | Docs |
|------------|-----------|------|
| **Agora Conversational AI** | Voice AI agents com pipeline STT -> LLM -> TTS | [Docs](https://docs.agora.io/en/conversational-ai/overview/product-overview) |
| **Agora RTC SDK** | Audio/video calling em tempo real | [Docs](https://docs.agora.io/en/video-calling/overview/product-overview) |
| **Agora RTM (Signaling)** | Messaging em tempo real, presence, data channels | [Docs](https://docs.agora.io/en/signaling/overview/product-overview) |
| **Agora App Builder** | No-code video calling | [App Builder](https://appbuilder.agora.io/) |
| **Agora Cloud Recording** | Gravacao de calls na cloud | [Docs](https://docs.agora.io/en/cloud-recording/overview/product-overview) |

### Tech Partners

| Partner | O que faz | Bonus? |
|---------|-----------|--------|
| **Agora ConvoAI** | Pipeline completo de voz: STT -> LLM -> TTS | **SIM (+1 ponto)** |
| **OpenAI** | LLM (GPT), TTS | Nao separado |
| **AWS** | Bedrock, Transcribe, Translate, Polly | Nao separado |
| **Anam** | Video avatars fotorrealistas (180ms latencia) | Nao separado, mas fortalece score |
| **Thymia** | Voice biomarkers: stress, burnout, fadiga, emocoes | Nao separado, mas fortalece score |
| **Shen.AI** | Vitais via camera: frequencia cardiaca, HRV, stress, respiracao, pressao | Nao separado, mas fortalece score |

**IMPORTANTE: Shen.AI e um novo tech partner nao mencionado antes!**

---

## Repos Oficiais de Starter Code

| Repo | Descricao |
|------|-----------|
| [agent-samples](https://github.com/AgoraIO-Conversational-AI/agent-samples) | Full-stack voice/video AI agent com Python backend e React frontends |
| [vibe-coding-lovable](https://github.com/AgoraIO-Conversational-AI/vibe-coding-lovable) | Starter para Lovable (browser, zero local setup) |
| [vibe-coding-v0](https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0) | Starter para v0 (Vercel) |
| [server-custom-llm](https://github.com/AgoraIO-Conversational-AI/server-custom-llm) | Middleware Custom LLM para RAG, tool calling, Thymia, memoria |

### Agora Skill para Claude Code

```bash
npx skills add github:AgoraIO-Conversational-AI/agora-skills
```

### Demo ao vivo para testar

https://convoai-demo.agora.io/

---

## Thought Starters Oficiais

1. **Language Anxiety Wellness Coach** - Avatar Anam + Thymia biomarkers, detecta stress e adapta pace
2. **Pronunciation Practice with Voice Biomarkers** - Thymia para ir alem de speech recognition
3. **AI Avatar Language Tutor** - Avatar Anam face-to-face, expressoes faciais, multiplos idiomas
4. **Mock Interview Prep in Any Language** - Thymia para stress/confianca em entrevistas
5. **Immersive Cultural Conversation Partner** - Cenarios reais (restaurante, direcoes, mercado)
6. **Learning Progress Dashboard with AI Analytics** - Transcripts + Thymia data ao longo do tempo
7. **Group Language Exchange Facilitator** - Agora RTC multi-party, moderacao por IA

---

## Arquitetura Base (Agora ConvoAI)

```
Browser (React client)
    | audio/video via Agora SD-RTN
AI Agent Instance (cloud, gerenciado pelo Agora)
    | STT -> LLM -> TTS pipeline
Backend (Python, local)
    -> chama Agora REST API para start/stop agents
```

### Pipeline Mode (caminho mais rapido, 3 variaveis)

```bash
APP_ID=your_agora_app_id
APP_CERTIFICATE=your_agora_app_certificate
PIPELINE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Se tiver pipeline configurado no Agora Agent Builder, nao precisa de chave OpenAI nem config de TTS.

### Inline Config (controle total)

```bash
APP_ID=your_agora_app_id
APP_CERTIFICATE=your_agora_app_certificate
LLM_API_KEY=your_openai_api_key
TTS_VENDOR=rime
TTS_KEY=your_tts_api_key
TTS_VOICE_ID=astra
```

### Integracao Thymia (via Custom LLM Server)

```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
                                                                  |-- go-audio-subscriber (captura audio RTC)
                                                                  |-- Thymia module -> Thymia Sentinel API
                                                                  |-- RTM -> Client (scores ao vivo)
```

Biomarkers aparecem em 30-60s de fala. O agente pode referenciar os dados na conversa.

### Integracao Shen.AI (client-side, WASM)

```
react-video-client-avatar -> simple-backend -> Agora ConvoAI -> server-custom-llm
        |                                                          |-- Shen module (RTM listener -> LLM prompt)
        |
        |-- Shen.AI WASM SDK (browser-side)
              |-- Camera capture + face detection
              |-- RTM publish (vitals) -> server
```

Roda no browser. Vitais publicados via RTM a cada 2 segundos.

---

## Implicacoes para Nossas Propostas

### O que muda com 6h de coding (nao 24h)

1. **Escopo precisa ser DRASTICAMENTE menor** - todas as estimativas anteriores de 22-26h sao impossiveis
2. **Agora ConvoAI e obrigatorio** - unico bonus point disponivel
3. **HOW_WE_BUILT.md e diferencial** - documentar processo com Claude Code
4. **Demo ao vivo > tudo** - 20% do score e apresentacao/demo
5. **Relevancy para Preply** - 20% do score, precisa ser algo que Preply adicionaria ao produto
6. **Usar starter code** - nao reinventar a roda, comecar do agent-samples

### Proposta viavel para 6h

Usar o agent-samples como base. Customizar o prompt do LLM para language learning. Adicionar Anam avatar. Adicionar Thymia. Focar na demo e no pitch. O Custom LLM server ja tem suporte a Thymia e Shen.AI built-in.

### Prioridade de integracao

1. Agora ConvoAI (bonus point, base do projeto)
2. OpenAI (LLM, ja integrado no ConvoAI)
3. Anam (avatar, ja tem starter code)
4. Thymia (biomarkers, ja tem recipe pronta)
5. Shen.AI (vitais por camera, recipe pronta)
6. AWS (se sobrar tempo)
