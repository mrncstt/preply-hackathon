# Frameworks de Benchmark UX/UI/Tecnico para Competitive Analysis

Frameworks pesquisados para montar a analise competitiva do hackathon com foco em UX, UI e capacidades tecnicas de IA.

---

## 1. UX Honeycomb de Peter Morville

Avalia concorrentes em 7 facetas com metricas especificas:

| Faceta | O que mede | Metrica |
|---|---|---|
| Useful | Features resolvem o problema? | Taxa de adocao de feature |
| Usable | Facil de usar? | Tempo na tarefa, taxa de erro, SUS score |
| Desirable | Agradavel? | NPS, satisfacao |
| Findable | Navegacao funciona? | Taxa de falha na busca, bounce rate |
| Accessible | WCAG compliance? | Score de acessibilidade |
| Credible | Confiavel? | Tickets de suporte, trust score |
| Valuable | Gera valor? | Retencao, conversao |

**Tipos de benchmarking:**
- Interno (versao vs. versao)
- Competitivo (vs. concorrentes diretos)
- Normativo (vs. padroes da industria)

**Processo em 7 passos:**
1. Definir escopo e demograficos
2. Selecionar metricas quantitativas e qualitativas
3. Criar cenarios de tarefas consistentes (5-10 tarefas principais)
4. Coletar dados baseline via usability testing
5. Replicar testes entre concorrentes com metodologia identica
6. Analisar tendencias (quanti + quali)
7. Iterar ciclos de teste

**Fonte:** https://www.parallelhq.com/blog/ux-benchmarking

---

## 2. Screen-by-Screen Interface Comparison (LogRocket)

Compara tela a tela os fluxos criticos entre concorrentes:

**Fluxos a comparar (para language learning):**
- **Onboarding**: quantos passos, friccao, tempo ate primeiro valor
- **Core loop**: como o usuario executa a tarefa principal (aula, pratica)
- **Feature discovery**: como features de IA sao apresentadas
- **Feedback loops**: como o app comunica progresso
- **Error correction**: como erros sao tratados na UX

**Entregavel:** Screenshots lado a lado com anotacoes de UX

**4 templates do framework:**
1. Competitive Matrix (spreadsheet)
2. Screen-by-Screen Interface Comparisons
3. Feature/Functionality Checklist
4. SWOT Analysis focado em UX

**Fonte:** https://blog.logrocket.com/ux-design/competitive-analysis-ux/

---

## 3. Heuristic Evaluation Matrix (Nielsen's 10 Heuristics)

Avalia cada concorrente contra as 10 heuristicas de usabilidade com severity rating 0-4:

**Escala de severidade:**
- 0 = Nao e problema de usabilidade
- 1 = Problema cosmetico
- 2 = Problema menor de usabilidade
- 3 = Problema maior de usabilidade
- 4 = Catastrofe de usabilidade (deve corrigir antes de lancar)

**Matriz exemplo para language learning apps:**

| Heuristica | Duolingo | Praktika | ELSA | Speak | Preply |
|---|---|---|---|---|---|
| 1. Visibilidade do status do sistema | ? | ? | ? | ? | ? |
| 2. Correspondencia com o mundo real | ? | ? | ? | ? | ? |
| 3. Controle e liberdade do usuario | ? | ? | ? | ? | ? |
| 4. Consistencia e padroes | ? | ? | ? | ? | ? |
| 5. Prevencao de erros | ? | ? | ? | ? | ? |
| 6. Reconhecimento em vez de memorizacao | ? | ? | ? | ? | ? |
| 7. Flexibilidade e eficiencia de uso | ? | ? | ? | ? | ? |
| 8. Estetica e design minimalista | ? | ? | ? | ? | ? |
| 9. Ajudar usuarios a reconhecer/diagnosticar/recuperar erros | ? | ? | ? | ? | ? |
| 10. Ajuda e documentacao | ? | ? | ? | ? | ? |

**Exemplo real encontrado (Duolingo - Team Shrimp, projeto academico):**
- Problema encontrado: excesso de graficos confusos que violam heuristica 8 (estetica minimalista) - 7 telas diferentes quando usuario tenta sair de uma licao
- Conteudo pago confuso: mostra "$0.00" para trial sem deixar claro que vira assinatura (viola heuristicas 4 e 7)
- Configuracoes escondidas no perfil em vez de navegacao principal (viola heuristicas 1 e 7)

**PDF da avaliacao:** https://nilabanerjee.github.io/NilaB_HeuristicEval.pdf
**Figma template (heuristic evaluation):** link original quebrado

---

## 4. Feature x AI Capability Matrix

Matriz cruzando features do produto com capacidades tecnicas de IA dos concorrentes:

**Exemplo para as 3 tracks do hackathon:**

### Track 1: Visualizing Learning Progress

| Feature | Duolingo | Praktika | ELSA | Speak | Preply | Gap? |
|---|---|---|---|---|---|---|
| Dashboard de progresso | XP/streaks (raso) | Basico | Scores pronuncia | Fluency score | Lesson Insights | Parcial |
| Metricas de confianca | Nao | Nao | Nao | Nao | Nao | SIM |
| Progresso por situacao | Nao | Nao | Nao | Nao | Nao | SIM |
| Deteccao de plateau | Nao | Nao | Nao | Nao | Nao | SIM |
| Narrativa de progresso (AI) | Nao | Nao | Nao | Nao | Nao | SIM |
| Biomarkers de voz | Nao | Nao | Nao | Nao | Nao | SIM |

### Track 2: Accelerating Learning with Agents

| Feature | Duolingo | Praktika | ELSA | Speak | Preply | Gap? |
|---|---|---|---|---|---|---|
| Multi-agent architecture | Nao | Sim (GPT-5.2) | Nao | Parcial | Nao | Parcial |
| Tutor humano + AI juntos | Nao | Nao | Nao | Nao | Parcial | SIM |
| Avatar realista | Lily (2D) | Sim (3D) | Nao | Nao | Nao | Parcial |
| Adaptacao emocional real-time | Nao | Nao | Nao | Nao | Nao | SIM |
| Correcao sem interromper | Nao | Parcial | Nao | Sim | Nao | Parcial |
| Memoria persistente | Nao | Sim | Nao | Nao | Nao | Parcial |

### Track 3: Live Learning & Real-Time Context

| Feature | Duolingo | Praktika | ELSA | Speak | Preply | Gap? |
|---|---|---|---|---|---|---|
| AI copilot durante aula ao vivo | Nao | Nao | Nao | Nao | Nao | SIM |
| Vocabulario contextual real-time | Nao | Nao | Nao | Nao | Nao | SIM |
| Painel para o tutor | N/A | N/A | N/A | N/A | Basico | SIM |
| Debrief pos-aula automatico | Nao | Nao | Nao | Nao | Lesson Insights | Parcial |
| Flashcards contextuais | Nao | Nao | Nao | Nao | Nao | SIM |
| Indicador de confianca em tempo real | Nao | Nao | Nao | Nao | Nao | SIM |

---

## 5. SWOT + Feature Checklist + User Flow (UXtweak)

Framework em 3 camadas:

### Camada 1: Feature Checklist

Lista de features com checkmark por concorrente (como modelo 4 acima).

### Camada 2: User Flow Mapping

Mapeamento dos fluxos criticos para language learning:

```
Signup -> Placement Test -> Primeira Aula/Pratica -> Feedback -> Retencao
```

Para cada fluxo, avaliar:
- Numero de passos
- Friccao (onde o usuario desiste?)
- Tempo ate primeiro valor
- Personalizacao

### Camada 3: SWOT por concorrente

**Duolingo:**
- S: Gamificacao, base massiva, GPT-4 integrado, 73% gross margins
- W: Raso para intermediarios, sem interacao humana, pronuncia basica
- O: Video Call com Lily mostra ambicao conversacional
- T: Plateau de avancados, dependencia de gamificacao

**Praktika:**
- S: Melhor arquitetura multi-agent, memoria persistente, 9 idiomas
- W: Base pequena, sem tutores humanos, $8/mes pode limitar revenue
- O: Multi-modal (fotos, audio, video, documentos)
- T: Dependencia total de OpenAI

**ELSA:**
- S: Melhor feedback de pronuncia do mercado, nivel fonetico
- W: So ingles, foco estreito em pronuncia
- O: Tutor bilingue (comeca na L1, transiciona para L2)
- T: Escopo limitado vs. players mais amplos

**Speak:**
- S: Melhor speech recognition para non-native, 25M+ licoes
- W: 6 idiomas, sem tutor humano, sem contexto cultural
- O: Avaliacao de $1B mostra confianca do mercado
- T: Concorrencia com Duolingo e Praktika em conversacao

**Preply:**
- S: Tutores humanos reais, marketplace global, EBITDA-positivo, $1.2B
- W: AI ainda nascente, dependente de tutores individuais
- O: Combinar humano + AI e unico posicionamento
- T: AI pura pode reduzir demanda por tutores humanos

**Fonte:** https://blog.uxtweak.com/competitive-analysis-in-ux-research/

---

## Comparacao dos Frameworks

| Framework | Complexidade | Tempo | Melhor para | Ferramentas |
|---|---|---|---|---|
| UX Honeycomb | Alta | 2-3 dias | Benchmark completo | Planilha + testes |
| Screen-by-Screen | Media | 4-6h | Visual para pitch | Screenshots + anotacoes |
| Heuristic Evaluation | Media | 3-4h | Encontrar problemas de UX | Planilha com scores |
| Feature x AI Matrix | Baixa | 1-2h | Identificar gaps tecnicos | Planilha simples |
| SWOT + Checklist | Media | 2-3h | Visao estrategica completa | Planilha + quadro |

**Para o hackathon (tempo limitado):** usar Feature x AI Matrix (modelo 4) + SWOT simplificado (modelo 5). Pode ser feito em 2-3h e cabe no pitch.
