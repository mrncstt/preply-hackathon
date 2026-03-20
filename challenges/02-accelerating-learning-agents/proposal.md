# Desafio 2: Accelerating Learning with Agents

## Contexto

Praktika lidera com multi-agent (GPT-5.2). Speak faz speech-first. ELSA faz pronuncia.
Ninguem resolve: coordenacao tutor humano <-> AI, agentes proativos, pratica contextualizada no mundo real, correcao sem interromper fluxo.

---

## Proposta: "TutorBridge" - Sistema Multi-Agent que Liga Tutor Humano e Pratica AI

### Conceito
Um orquestrador de agentes que funciona como ponte entre o tutor humano e a pratica autonoma do aluno. O tutor define objetivos e areas de foco. Os agentes criam, executam e avaliam sessoes de pratica personalizadas entre as aulas. O tutor recebe relatorios de progresso antes da proxima sessao.

### Diferenciais vs. mercado
1. **Tutor-in-the-loop**: Diferente de Praktika/Speak (100% AI), o tutor humano define a estrategia
2. **Agentes proativos**: O sistema inicia pratica no momento certo ("Voce tem viagem pra Espanha em 2 semanas, vamos praticar?")
3. **Avatar embodied**: Anam avatar como parceiro de conversa visual (nao so texto/voz)
4. **Adaptacao emocional em tempo real**: Thymia detecta frustracao -> agente muda dificuldade/abordagem

### Arquitetura Multi-Agent

```
[TUTOR DASHBOARD]
      |
      v
[Planner Agent] -- Define plano de pratica baseado em goals do tutor
      |
      v
[Orchestrator Agent] -- Seleciona e agenda sessoes
      |
      +---> [Conversation Agent] -- Pratica conversacional via Agora + Anam avatar
      |         |
      |         +---> [Feedback Agent] -- Avalia em tempo real, corrige sem interromper
      |         |
      |         +---> [Emotion Agent] -- Monitora Thymia, ajusta dificuldade
      |
      +---> [Exercise Agent] -- Gera exercicios targeted (vocabulario, gramatica)
      |
      +---> [Report Agent] -- Compila progresso e envia pro tutor
```

### Tech Stack Utilizado
- **Agora Conversational AI Engine**: Audio real-time para sessoes de pratica
- **OpenAI GPT-5.2 / Realtime API**: Cerebro dos agentes, conversacao speech-to-speech
- **Anam CARA-3**: Avatar fotorrealista como parceiro de conversa
- **Thymia Helios**: Monitoramento emocional em tempo real
- **AWS Bedrock**: Orquestracao de agentes, guardrails

### Features Core (MVP para o hackathon)

1. **Tutor Goal Setting**
   - Interface simples onde tutor define: "Aluno precisa praticar vocabulario de negocio e se preparar para uma apresentacao em ingles"
   - Planner Agent decompoe em sessoes de pratica

2. **Scenario Practice com Avatar**
   - Anam avatar assume role (colega de trabalho, cliente, chefe)
   - Agora streaming real-time
   - OpenAI Realtime para conversacao natural
   - Cenarios alinhados com goals do tutor

3. **Adaptive Difficulty**
   - Thymia detecta: stress alto -> agente simplifica vocabulario, fala mais devagar
   - Thymia detecta: aluno confortavel -> agente aumenta complexidade, usa girias
   - Tudo sem interromper a conversa

4. **Inline Correction (nao-intrusiva)**
   - Em vez de parar a conversa para corrigir, o Feedback Agent:
     - Repete a frase correta naturalmente na resposta (recasting)
     - Salva erros para review pos-sessao
     - Gera exercicio targeted no erro mais frequente

5. **Tutor Report**
   - Apos a sessao: "Aluno praticou 15min de vocabulario de negocio. Fluencia: +12%. Erros recorrentes: 'make a meeting' em vez de 'have a meeting'. Confianca (Thymia): melhorou de 3.2 para 4.1/5. Sugestao para proxima aula: foco em phrasal verbs de negocio."

### Demo Flow (para apresentacao)

1. Tutor define goal na interface
2. Planner cria sessao de pratica
3. Aluno conversa com avatar Anam via Agora (cenario: reuniao de trabalho)
4. Thymia monitora e agente adapta em tempo real
5. Pos-sessao: report gerado automaticamente para tutor

### Estimativa de Esforco (24h hackathon)

| Task | Horas | Quem |
|------|-------|------|
| Tutor interface (goal setting) | 3h | Frontend |
| Planner + Orchestrator agents | 4h | Backend |
| Conversation Agent (Agora + OpenAI) | 5h | Backend |
| Anam avatar integration | 3h | Full-stack |
| Thymia emotion monitoring | 3h | Backend |
| Report generation | 2h | Backend |
| Polish e demo prep | 4h | Todos |
| **Total** | **24h** | **4-5 pessoas** |

### Por que Ganha

- **Perfeitamente alinhado com Preply**: Fortalece (nao substitui) o tutor humano
- Usa TODAS as 5 tecnologias de forma integrada e justificada
- Resolve o gap #1 do mercado: ninguem conecta tutor humano <-> pratica AI
- Avatar + voz + emocao = demo visualmente impressionante
- O "tutor report" e diretamente vendavel como feature Preply premium
- Endereça o problema do plato intermediario com pratica targeted entre aulas
