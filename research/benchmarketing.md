# Benchmarketing: Persona Real x Necessidade Real de Aprendizado

## Objetivo
Criar uma simulação de agente (Vercel + Agora + OpenAI + Thymia) que descubra:
1. o que a pessoa **realmente gosta**,
2. o que ela **precisa aprender**,
3. e o que é **mais útil agora** para o objetivo profissional.

Exemplo central: uma pessoa advogada precisa de inglês para negócios, mas o interesse autêntico é culinária.

---

## Perguntas obrigatórias antes de começar (discovery)

> Use este bloco no início da demo para evitar construir no escuro.

1. Qual é o objetivo profissional de curto prazo? (ex.: reunião com cliente internacional em 30 dias)
2. Em quais situações reais essa pessoa trava no idioma? (ex.: negociação, e-mail, small talk)
3. Qual é o nível atual de inglês? (A1-C2)
4. Quais temas geram energia e prazer de conversar? (ex.: cozinhar, futebol, viagem)
5. Qual formato é mais confortável? (voz, vídeo, chat)
6. Quantos minutos por dia ela consegue praticar de forma sustentável?
7. Existe linguagem técnica obrigatória da profissão? (ex.: termos jurídicos)
8. Qual é o critério de sucesso da simulação? (ex.: fazer um pitch de 2 min sem travar)

---

## Arquitetura recomendada (hackathon-ready)

### 1) Vercel (orquestração e UI)
- Frontend (Next.js): onboarding + sessão ao vivo + relatório final.
- API Routes / Serverless Functions: criação de sessão, roteamento para LLM, persistência de resumo.
- Edge Middleware (opcional): feature flags da demo e escolha de idioma.

### 2) Agora (áudio/vídeo em tempo real)
- Canal por sessão de estudante.
- Captura de fala para transcrição em streaming.
- Webhook de eventos de sessão (join/leave/duração).

### 3) OpenAI (cérebro do agente)
- Extração de sinais da conversa:
  - `LIKES`: temas de alto engajamento espontâneo.
  - `NEEDS`: competências linguísticas necessárias para meta profissional.
  - `USEFUL_NOW`: intersecção prática entre `LIKES` e `NEEDS`.
- Geração de role-play adaptado (ex.: "negociar contrato usando analogias de receitas").
- Resumo final com plano de estudo em 7 dias.

### 4) Thymia (estado emocional e engajamento)
- Sinais agregados por janela de tempo (confiança, tensão, energia).
- Regras simples de adaptação:
  - tensão alta + erro recorrente -> reduzir complexidade e velocidade.
  - energia alta + acerto consistente -> aumentar desafio.
- Persistir somente scores agregados no MVP (privacidade).

---

## Fluxo da simulação (15 min)

1. **Min 0-2: Discovery guiado**
   - Coletar respostas das 8 perguntas obrigatórias.
2. **Min 2-5: Conversa livre curta**
   - Agente provoca tópicos para detectar interesse real.
3. **Min 5-10: Cenário profissional**
   - Role-play de trabalho com vocabulário crítico.
4. **Min 10-13: Ponte motivacional**
   - Agente conecta interesse pessoal ao contexto profissional.
5. **Min 13-15: Diagnóstico final**
   - Entrega `LIKES`, `NEEDS`, `USEFUL_NOW` + próximos passos.

---

## Prompt base do classificador (OpenAI)

"Você é um analisador pedagógico. Classifique a sessão em três blocos:
(1) LIKES: temas que geram engajamento espontâneo do aluno;
(2) NEEDS: competências linguísticas necessárias para objetivo profissional declarado;
(3) USEFUL_NOW: atividades práticas que conectam LIKES + NEEDS para gerar progresso imediato.
Responda em JSON com evidências curtas por item."

---

## Exemplo esperado de saída (caso advogado + culinária)

```json
{
  "likes": [
    {"topic": "cozinhar", "evidence": "fala longa e animada sobre receitas"},
    {"topic": "restaurantes", "evidence": "uso espontâneo de exemplos"}
  ],
  "needs": [
    {"skill": "negociação em inglês", "evidence": "meta profissional declarada"},
    {"skill": "vocabulário jurídico de contratos", "evidence": "contexto de trabalho"}
  ],
  "useful_now": [
    {
      "activity": "simular negociação de contrato usando metáforas de cozinha",
      "why": "aumenta retenção por conectar prazer pessoal + objetivo profissional"
    }
  ]
}
```

---

## KPIs da demo (simples e vendáveis)

- Tempo até identificar o interesse dominante (`TTFI`, em minutos).
- % de frases do cenário profissional completadas sem ajuda.
- Variação de confiança (Thymia agregado) entre início e fim.
- Taxa de aceitação do plano de 7 dias pelo usuário.

---

## Ajustes incrementais (como evoluir após o MVP)

1. Rodar com 5 perfis profissionais (advogado, dev, vendedor, médico, founder).
2. Comparar sessão "genérica" vs. sessão "interesse-pessoal-integrado".
3. Medir retenção em D+3 e D+7.
4. Criar biblioteca de "pontes" por profissão x interesse (ex.: law x cooking, sales x football).
