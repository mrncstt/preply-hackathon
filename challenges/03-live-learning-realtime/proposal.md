# Desafio 3: Live Learning & Real-Time Context

## Contexto

Preply faz tutoria video 1-on-1. Agora tem Conversational AI Engine. OpenAI tem Realtime API.
Ninguem resolve: AI copilot durante aula ao vivo, vocabulario contextual em tempo real, scaffolding adaptativo, debrief imediato pos-conversa.

---

## Proposta: "LiveLens" - AI Copilot para Aulas ao Vivo

### Conceito
Um assistente AI que opera como "terceiro participante invisivel" durante aulas ao vivo entre tutor e aluno. Ele escuta em tempo real, fornece suporte contextual para ambos (tutor e aluno), e gera um debrief imediato pos-sessao.

### Diferenciais vs. mercado
1. **Copilot bilateral**: Ajuda tanto o tutor quanto o aluno, em tempo real
2. **Context-aware**: Usa o topico da conversa para surfar vocabulario e sugestoes relevantes
3. **Nao-intrusivo**: Informacoes aparecem em sidebar, nao interrompem a conversa
4. **Debrief instantaneo**: Analise completa disponivel segundos apos a aula terminar

### Arquitetura

```
[Agora Video Call - Tutor + Aluno]
            |
    [Real-Time Audio Stream]
            |
    [OpenAI Realtime API - Transcription + Analysis]
            |
    +-------+-------+
    |               |
[Aluno View]   [Tutor View]
    |               |
    |           [Sugestoes de exercicio]
    |           [Notas sobre erros do aluno]
    |           [Vocabulario avancado para introduzir]
    |
    [Traducao contextual L1]
    [Definicao de palavras dificeis]
    [Exemplos de uso]
    [Indicador de confianca Thymia]
            |
    [Anam Avatar Debrief]
    "Aqui esta o resumo da sua aula..."
```

### Tech Stack Utilizado
- **Agora**: Video call real-time + audio stream para processamento
- **OpenAI Realtime API**: Transcricao streaming, analise de contexto, geracao de sugestoes
- **Thymia Helios**: Monitoramento de confianca/stress do aluno em tempo real
- **Anam CARA-3**: Avatar que entrega o debrief pos-aula de forma pessoal
- **AWS**: Lambda para processamento, DynamoDB para session data

### Features Core (MVP para o hackathon)

1. **Real-Time Vocabulary Assist (Aluno View)**
   - Sidebar mostra definicao + traducao quando aluno hesita ou usa palavra errada
   - OpenAI detecta topico da conversa e pre-carrega vocabulario relevante
   - Exemplo: conversa sobre viagens -> "boarding pass", "layover", "customs" prontos
   - Click para ouvir pronuncia correta

2. **Tutor Intelligence Panel (Tutor View)**
   - Alerta quando aluno comete erro recorrente (sem que aluno veja)
   - Sugere exercicio rapido para o tutor aplicar no momento
   - Mostra nivel de confianca do aluno (Thymia) em tempo real
   - "Aluno esta ficando ansioso - considere mudar de topico ou simplificar"

3. **Confidence Indicator**
   - Barra lateral sutil mostrando nivel de confianca do aluno (Thymia)
   - Verde = confortavel, Amarelo = hesitante, Vermelho = ansioso
   - Historico da sessao: "Confianca caiu quando topico mudou para gramatica formal"

4. **Instant Debrief (pos-aula)**
   - Anam avatar aparece e entrega resumo personalizado em 60 segundos:
     - "Voce praticou vocabulario de viagens por 25 minutos"
     - "3 novos phrasal verbs usados corretamente: check in, take off, get through"
     - "Erro recorrente: 'I have been to travel' - correto: 'I have traveled'"
     - "Sua confianca melhorou 40% quando falou sobre experiencias pessoais"
     - "Exercicio sugerido antes da proxima aula: [link]"
   - Debrief tambem enviado para o tutor com notas para proxima aula

5. **Contextual Flashcards**
   - Automaticamente gerados a partir de vocabulario novo da sessao
   - Incluem a frase exata do contexto onde apareceu
   - Spaced repetition ativado automaticamente

### Demo Flow (para apresentacao)

1. Abrir video call Agora entre "tutor" e "aluno"
2. Conversa sobre topico (ex: viagem de negocios)
3. Mostrar sidebar do aluno com vocabulario contextual em tempo real
4. Mostrar painel do tutor com alertas e sugestoes
5. Indicador Thymia muda de cor quando aluno fica ansioso
6. Encerrar aula -> Avatar Anam entrega debrief em 30 segundos
7. Mostrar flashcards gerados automaticamente

### Estimativa de Esforco (24h hackathon)

| Task | Horas | Quem |
|------|-------|------|
| Agora video call setup + audio stream | 3h | Backend |
| OpenAI Realtime transcription + analysis | 4h | Backend |
| Aluno sidebar UI (vocabulary assist) | 4h | Frontend |
| Tutor panel UI (intelligence dashboard) | 4h | Frontend |
| Thymia confidence indicator | 2h | Full-stack |
| Anam avatar debrief | 3h | Full-stack |
| Flashcard generation | 2h | Backend |
| Polish e demo prep | 4h | Todos |
| **Total** | **26h** | **4-5 pessoas** |

### Por que Ganha

- **Aprimora o produto core da Preply**: Melhora a aula ao vivo que ja existe
- Nao substitui o tutor - da superpoderes para ele
- Demo extremamente visual e tangivel (video call com overlays em tempo real)
- Usa todas as 5 tecnologias de forma natural e justificada
- O debrief com avatar Anam e um "wow moment" para a apresentacao
- Flashcards contextuais resolvem o problema de "o que praticar entre aulas"
- Thymia como diferencial que nenhum concorrente tem
