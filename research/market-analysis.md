# Market Research - AI Language Learning

## Preply - Current State

- Two-sided marketplace connecting learners with human tutors (1-on-1 video)
- Founded in Ukraine (2012), HQ in the US, office in Barcelona
- **Valuation: $1.2B** (Series D $150M, Jan 2026, led by WestCap). EBITDA-positive
- Positioning: **"anti-Duolingo"** - human tutors are the core, AI supplements

### AI Features (launched Aug 2025)
- **Lesson Insights**: Post-lesson summary with grammar feedback, vocabulary, speech metrics
- **Daily Exercises**: Between-session exercises connected to lesson content
- **Scenario Practice**: Daily conversation simulations (ordering coffee, asking for directions)

### Tech Stack
- Backend: Python/Django
- Frontend: React (legacy Backbone.js, jQuery)
- Infra: Amazon CloudFront, NGINX, Webpack
- Video: Previously Zoom (likely migrating to Agora)
- Monitoring: New Relic
- Public Tech Radar: tech-radar.preply.com

### Known Engineering Challenges
- Two-sided marketplace complexity (matching, scheduling, payments)
- Real-time video at scale (200+ countries)
- AI integration in Django monolith/services architecture
- Personalization at scale
- Data pipeline: converting unstructured conversations into analytics

---

## Competitors

### Duolingo (self-study leader, public)
- Deep partnership with OpenAI. GPT-4 powers Duolingo Max
- **Video Call with Lily**: Voice conversations with AI characters
- **Roleplay**: Conversational practice with AI characters
- **Explain My Answer**: GPT-4 contextual feedback
- 148 new courses with AI (took 12 years for the first 100)
- **What works**: Gamification + AI = massive engagement. 73% gross margins
- **What doesn't work**: Still primarily text/multiple choice. No real human interaction. Basic pronunciation. Advanced learners plateau

### Speak ($1B valuation, Series C $78M)
- Built from scratch on OpenAI. Speech-first
- **Speak Tutor**: 24/7 AI tutor for conversational practice
- Custom speech recognition for non-native accents
- 25M+ personalized lessons, 1B+ spoken sentences
- **What works**: Best speech recognition for learners
- **What doesn't work**: No human tutor. Limited to 6 languages. Lacks cultural context

### Praktika (rising competitor, heavy OpenAI user)
- Multi-agent architecture with GPT-5.2
  - GPT-5.2 for main conversation
  - GPT-5.2 Pro for supervision
  - GPT-5 mini for progress tracking
- **Persistent memory layer** (history, errors, preferences)
- **Multimodal**: Upload photos, audio, videos, documents
- 1000+ lessons including IELTS/TOEFL
- **What works**: Most advanced multi-agent architecture. Personalization with memory
- **What doesn't work**: No human tutors. Small user base

### ELSA Speak
- Phoneme-level pronunciation AI
- Bilingual AI tutor (starts in native language, transitions to English)
- 7 accent variants, 8000+ lessons
- **What works**: Best pronunciation feedback on the market
- **What doesn't work**: English only. Pronunciation focus limits depth

### Babbel
- **Babbel Speak**: AI-guided speaking trainer
- AI Conversation Partner (Spanish, French, German, Italian)
- Spaced repetition

### Busuu
- AI placement test, adaptive lessons
- **Busuu Conversations**: Real-time AI conversations
- Native speaker community feedback (unique hybrid)

---

## Unsolved Problems in the Market

1. **Speaking confidence gap**: Learners pass tests but freeze in real conversations
2. **Cultural/pragmatic competence**: AI teaches grammar but not cultural nuance, politeness registers, humor, regional slang
3. **Intermediate plateau (B1-C1)**: Most apps optimize for beginners. The B1->B2 and B2->C1 transition is poorly served
4. **Long-term motivation**: Gamification works short-term but massive drop-off persists
5. **Error correction during live conversation**: Giving feedback without interrupting natural flow is technically and pedagogically difficult
6. **Measuring real communicative competence**: Does the learner actually function in the target language environment? No good automated measure exists
7. **Affective/emotional adaptation**: Detecting and responding to learner frustration, boredom, or anxiety in real time
8. **Hallucination in language teaching**: LLMs teaching incorrect grammar rules with confidence

## What Learners Actually Face

- Fear of speaking (especially with native speakers)
- Translating passive knowledge (reading/listening) into active production (speaking/writing)
- Maintaining consistency between tutor sessions
- Not knowing what to practice or what their weaknesses are
- Feeling of not progressing (the "plateau")
- Applying app/lesson learning to real-world situations
