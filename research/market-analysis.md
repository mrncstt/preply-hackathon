# Pesquisa de Mercado - AI Language Learning

## Preply - Estado Atual

- Marketplace two-sided conectando learners com tutores humanos (1-on-1 video)
- Fundada na Ucrania (2012), HQ nos EUA, escritorio em Barcelona
- **Valuation: $1.2B** (Series D $150M, Jan 2026, liderada por WestCap). EBITDA-positivo
- Posicionamento: **"anti-Duolingo"** - tutores humanos sao o core, AI suplementa

### AI Features (lancadas Ago 2025)
- **Lesson Insights**: Resumo pos-aula com feedback de gramatica, vocabulario, metricas de fala
- **Daily Exercises**: Exercicios entre sessoes conectados ao conteudo da aula
- **Scenario Practice**: Simulacoes de conversas do dia-a-dia (pedir cafe, pedir direcoes)

### Tech Stack
- Backend: Python/Django
- Frontend: React (legacy Backbone.js, jQuery)
- Infra: Amazon CloudFront, NGINX, Webpack
- Video: Anteriormente Zoom (provavelmente migrando para Agora)
- Monitoring: New Relic
- Tech Radar publico: tech-radar.preply.com

### Desafios de Engineering Conhecidos
- Complexidade de marketplace two-sided (matching, scheduling, pagamentos)
- Video real-time em escala (200+ paises)
- Integracao AI em arquitetura Django monolith/servicos
- Personalizacao em escala
- Pipeline de dados: converter conversas nao-estruturadas em analytics

---

## Concorrentes

### Duolingo (lider em self-study, publico)
- Parceria profunda com OpenAI. GPT-4 alimenta Duolingo Max
- **Video Call with Lily**: Conversas por voz com personagens AI
- **Roleplay**: Pratica conversacional com personagens AI
- **Explain My Answer**: Feedback contextual GPT-4
- 148 novos cursos com AI (levou 12 anos para os primeiros 100)
- **Funciona**: Gamificacao + AI = engagement massivo. 73% gross margins
- **Nao funciona**: Ainda primariamente texto/multipla escolha. Sem interacao humana real. Pronunciation basico. Learners avancados estagnam

### Speak ($1B valuation, Series C $78M)
- Construido do zero sobre OpenAI. Speech-first
- **Speak Tutor**: Tutor AI 24/7 para pratica conversacional
- Speech recognition customizado para sotaques nao-nativos
- 25M+ aulas personalizadas, 1B+ sentencas faladas
- **Funciona**: Melhor speech recognition para learners
- **Nao funciona**: Sem tutor humano. Limitado a 6 idiomas. Falta contexto cultural

### Praktika (rising competitor, heavy OpenAI user)
- Arquitetura multi-agent com GPT-5.2
  - GPT-5.2 para conversacao principal
  - GPT-5.2 Pro para supervisao
  - GPT-5 mini para tracking de progresso
- **Persistent memory layer** (historico, erros, preferencias)
- **Multimodal**: Upload de fotos, audio, videos, documentos
- 1000+ aulas incluindo IELTS/TOEFL
- **Funciona**: Arquitetura multi-agent mais avancada. Personalizacao com memoria
- **Nao funciona**: Sem tutores humanos. Base de usuarios pequena

### ELSA Speak
- AI de pronuncia a nivel de fonema
- Tutor AI bilingue (comeca em lingua nativa, transiciona para ingles)
- 7 variantes de sotaque, 8000+ aulas
- **Funciona**: Melhor feedback de pronuncia do mercado
- **Nao funciona**: So ingles. Foco em pronuncia limita profundidade

### Babbel
- **Babbel Speak**: Speaking trainer guiado por AI
- AI Conversation Partner (espanhol, frances, alemao, italiano)
- Spaced repetition

### Busuu
- Teste de nivelamento AI, aulas adaptativas
- **Busuu Conversations**: Conversas AI em tempo real
- Feedback de falantes nativos da comunidade (hibrido unico)

---

## Problemas Nao Resolvidos no Mercado

1. **Speaking confidence gap**: Learners passam em testes mas congelam em conversas reais
2. **Competencia cultural/pragmatica**: AI ensina gramatica mas nao nuance cultural, registros de polidez, humor, girias regionais
3. **Plato intermediario (B1-C1)**: Maioria dos apps otimiza para iniciantes. A transicao B1->B2 e B2->C1 e mal servida
4. **Motivacao de longo prazo**: Gamificacao funciona a curto prazo mas drop-off permanece massivo
5. **Correcao de erro durante conversa ao vivo**: Dar feedback sem interromper fluxo natural e tecnicamente e pedagogicamente dificil
6. **Medir competencia comunicativa real**: Learner funciona de verdade no ambiente da lingua-alvo? Nenhuma medida automatizada boa existe
7. **Adaptacao afetiva/emocional**: Detectar e responder a frustracao, tedio ou ansiedade do learner em tempo real
8. **Alucinacao no ensino de linguas**: LLMs ensinando regras gramaticais incorretas com confianca

## O que Learners Realmente Enfrentam

- Medo de falar (especialmente com nativos)
- Traduzir conhecimento passivo (leitura/escuta) para producao ativa (fala/escrita)
- Manter consistencia entre sessoes com tutor
- Nao saber o que praticar ou quais sao suas fraquezas
- Sensacao de nao estar progredindo (o "plato")
- Aplicar aprendizado do app/aula a situacoes reais
