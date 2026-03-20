# Desafio 1: Visualizing Learning Progress

## Contexto

Preply tem Lesson Insights (resumo pos-aula). Duolingo tem streaks/XP (raso).
Ninguem resolve: progresso invisivel no nivel intermediario, confianca ao falar, skill decay, narrativa de aprendizado.

---

## Proposta: "LinguaMap" - Mapa Vivo de Competencia Linguistica

### Conceito
Um dashboard interativo que transforma cada interacao (aula, exercicio, conversa AI) em um mapa visual de competencia multi-dimensional. Nao so "quanto vocabulario voce sabe", mas "quao confiante voce esta para pedir um cafe em Madrid".

### Diferenciais vs. mercado
1. **Confianca como metrica**: Usando Thymia para medir stress/confianca pela voz ao longo do tempo
2. **Mapa de competencia situacional**: Nao "nivel B1" generico, mas "B2 para pedir comida, A2 para discutir politica"
3. **Progresso invisivel tornado visivel**: Micro-melhorias (velocidade de resposta, menos hesitacao, pronuncia) capturadas e visualizadas
4. **Narrativa temporal**: "Sua jornada" - timeline visual conectando aulas, praticas e momentos de breakthrough

### Arquitetura Tecnica

```
[Agora Real-Time Audio] --> [OpenAI Transcription + Analysis]
                                    |
                        [AWS Lambda Processing Pipeline]
                        /           |            \
              [Speech Metrics]  [Grammar]   [Thymia Emotion API]
                        \           |            /
                    [Competence Score Engine]
                              |
                    [React Dashboard + D3.js Visualizations]
```

### Tech Stack Utilizado
- **Agora**: Captura audio real-time das sessoes
- **OpenAI**: Transcricao, analise de gramatica/vocabulario, geracao de insights narrativos
- **Thymia Helios API**: Biomarcadores vocais para confianca, stress, engajamento
- **AWS**: Lambda para pipeline, DynamoDB para time-series, S3 para assets
- **Frontend**: React + D3.js para visualizacoes interativas

### Features Core (MVP para o hackathon)

1. **Confidence Heatmap**
   - Grid visual: eixo X = situacoes (restaurante, trabalho, viagem, social), eixo Y = skills (speaking, listening, vocabulary, grammar)
   - Cores baseadas em dados reais de Thymia (confianca) + OpenAI (acuracia)
   - Atualiza apos cada sessao

2. **Progress Pulse**
   - Visualizacao tipo "GitHub contributions" mas para aprendizado
   - Cada celula = uma sessao/pratica, cor = intensidade de melhoria
   - Mostra consistencia e momentum

3. **Skill Radar**
   - Grafico radar mostrando pronuncia, fluencia, vocabulario, gramatica, confianca, velocidade
   - Overlay do mes anterior para comparacao
   - Baseado em metricas extraidas por OpenAI + Thymia

4. **AI Narrative Summary**
   - OpenAI gera resumo semanal em linguagem natural
   - "Esta semana voce melhorou significativamente sua fluencia ao falar sobre hobbies. Sua hesitacao caiu 30% e a Thymia detectou menos stress. Proximo foco sugerido: vocabulario de trabalho."

### Demo Flow (para apresentacao)

1. Simular 3 sessoes de pratica com Agora audio
2. Pipeline processa e gera metricas
3. Dashboard mostra evolucao visual em tempo real
4. AI gera insight narrativo

### Estimativa de Esforco (24h hackathon)

| Task | Horas | Quem |
|------|-------|------|
| Setup pipeline Agora -> OpenAI -> AWS | 4h | Backend |
| Integracao Thymia API | 3h | Backend |
| Score engine e data model | 3h | Backend |
| Dashboard React + D3.js | 6h | Frontend |
| AI narrative generation | 2h | Full-stack |
| Polish e demo prep | 4h | Todos |
| **Total** | **22h** | **3-4 pessoas** |

### Por que Ganha

- Alinhado com a estrategia Preply: "human-led, AI-enhanced" - ferramentas para tutor E aluno
- Usa todas as 5 tecnologias dos partners
- Resolve o problema #1 que learners enfrentam: "nao sei se estou progredindo"
- Visualmente impactante para demo
- Thymia como diferencial unico (ninguem mais mede confianca pela voz)
