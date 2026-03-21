# Competitor Intelligence Report -- LIVE
**Preply x Agora Hackathon, Barcelona, March 20-21 2026**
**Last updated: 2026-03-21 (Day 2 -- Build Day)**

---

## Executive Summary

Out of ~75 registered participants, only **ONE competitor** has visible hackathon activity on GitHub: **Gleb Sokolovski** (sokol-gleb2). His repo reveals a sophisticated backend architecture for AI-powered lesson planning and student progress tracking -- but **zero frontend** (still Vue.js boilerplate). No other participant has pushed hackathon-related code to public GitHub repos. No team submissions exist yet in the official repo. The hackathon submission folder is empty.

**Our position: STRONG.** We have a working deployed app (botas.vercel.app), a polished demo script, and deep Agora ConvoAI integration. Our main risk is being outscoped by Gleb's backend depth if he delivers a frontend in time.

---

## Participant Activity Status Table

| Participant | GitHub | March 20-21 Activity | Threat Level | Notes |
|---|---|---|---|---|
| **Gleb Sokolovski** | sokol-gleb2 | **YES** -- "preply" repo, updated Mar 20 | **HIGH** | Full backend: LLM, STT, Diarisation, Scorer, LessonPlanGenerator. Vue.js frontend = boilerplate. See deep dive below |
| **Junfan Zhu** | junfanz1 | No (last: Mar 11) | MEDIUM | Strong ML/LLM skills (ACL 2026), MCP/LangGraph expertise. 271 repos but nothing hackathon-specific. Likely building privately or on team |
| **James Conlon** | conlonj25 | No (last: Mar 10) | LOW-MEDIUM | TypeScript/Go dev. "the-italian-job" repo in Go is interesting name but old. No hackathon activity |
| **Moha0x1** | Moha0x1 | **PARTIAL** -- kite fork updated Mar 20 | LOW | Kubernetes dashboard fork, unrelated. Flutter/Dart dev, could be building mobile |
| **Agusti Bau** | agsti | No (last: Mar 14) | LOW | Android/Node.js. nanoclaw project is container security, unrelated |
| **Constantinos Tsaousis** | Tsaousis | No (last: Feb 17) | LOW | Has openai-realtime-console fork (Feb 2025) -- may indicate prior Realtime API experience |
| **Aryan Verma** | aryanv175 | No (last: May 2025) | LOW | Has coursera-extension (AI teaching assistant) -- relevant domain experience but no hackathon push |
| **Berend Gort** | berendgort | No (last: Nov 2025) | MEDIUM | Deep RL, AAAI published, "agentic-identity" project. Strong AI fundamentals. Likely building privately |
| **Vladyslav Holovko** | devshorse | No (last: Feb 23) | LOW | 20+ years web dev. "everything-claude-code" repo suggests Claude Code experience |
| **Vladyslav Yefremov** | slava-yefremov | No (last: May 2025) | LOW | Telegram bot framework contributor (grammY). Conversational interface experience |
| **Vitalii Bulyzhyn** | vitalii-bulyzhyn | No (last: Jul 2025) | LOW | Full-stack, multilingual. No hackathon repos |
| **Jessie Newman** | Jessie-Newman | No (last: Oct 2025) | LOW | Data science, Pandas. Past hackathon experience (HackDuke) |
| **Yurii Moroz** | mryurii | No (last: Nov 2025) | LOW | Full-stack JS/Ruby. No hackathon activity |

### Participants WITHOUT GitHub (watch list based on skills)

| Participant | Skills | Threat Level | Why |
|---|---|---|---|
| **Stanislav Zayarsky** | CEO Trembit, **WebRTC specialist**, telehealth | **HIGH** | Deep WebRTC/video conferencing expertise directly maps to Agora. Could build real-time features rapidly |
| **Amir Narimani** | PhD Learning Analytics @ UOC | **MEDIUM-HIGH** | Academic expertise in learning analytics. Could build data-driven learning progress tracking |
| **Anne Valvezan** | ML Engineer, Computer Vision, Transformers | MEDIUM | Strong ML, could build pronunciation analysis with audio models |
| **Xiao Yuan Kong** | Staff SWE, 15+ years, polyglot dev | MEDIUM | Raw engineering talent, fast execution |
| **Janne Rotter** | MSc AI (EMAI Erasmus Mundus) | MEDIUM | AI + education tech intersection |
| **Summer Devlin** | AI Research @ Barcelona Supercomputing Center | MEDIUM | Research depth in AI |
| **Alessandro Vecchi** | CPO @ Sorcerer (YC) | MEDIUM | Product/pitch expertise. YC alumni know how to present |
| **Glib Gorchannikov** | Sr PM @ Skills.md, AI automation | MEDIUM | Product thinking, system design |
| **PHAN / ChronosWorlds** | Game dev, won Supercell AI Game Hack | MEDIUM | Prior AI hackathon winner |

---

## Deep Dive: Gleb Sokolovski (sokol-gleb2/preply) -- PRIMARY THREAT

### Profile
- Co-Founder & CEO @ Uni-Chat (AI community building platform)
- MSc AI, University of Edinburgh (2024-2026)
- Full stack: Python, Java, JavaScript
- Has experience building AI products (Uni-Chat, Caskly.ai)

### Repo: github.com/sokol-gleb2/preply
- Created: March 19, 2026 (day before hackathon!)
- Last commit: March 20, 2026 12:12 UTC ("generation and regeneration logic")
- 2 commits total
- Languages: JavaScript 96.2%, TypeScript 2.2%

### Architecture (Reverse Engineered)

```
preply/
  server/                      # Express.js + OpenAI backend
    systems/
      LLM.js                   # OpenAI GPT-5 wrapper (Responses API)
      STT.js                   # Agora Speech-to-Text (full integration)
      TTS.js                   # Text-to-Speech (empty file)
      Diarisation.js           # AssemblyAI speaker diarisation
      Identifier.js            # LLM-based tutor/student role identification
      Scorer.js                # Metrics calculator (skeleton)
    generators/
      LessonPlanGenerator.js   # Orchestrates M1 + M2 models
    generator_models/
      M.js                     # Base class (LLM + student data)
      M1.js                    # Topic Plan Generator (high-level curriculum)
      M2.js                    # Lesson Plan Generator (per-topic breakdown)
    Services/
      lessonPlanGeneratorService.js  # Entry point for plan generation
      retrainingService.js     # Post-lesson analysis pipeline
    models/
      schema.sql               # Database schema (empty)
    repositories/
      db.js                    # Database connection (stub: "// DB access")
  public/                      # Vue.js 3 + Vite + TypeScript frontend
    src/App.vue                # BOILERPLATE ("You did it!" default page)
  states/
    Student.js                 # Student entity (id, answers, stats, topics)
    StudentAnswers.js          # Onboarding questionnaire (language, goal, level, etc.)
    StudentStats.js            # 8 skill dimensions (comprehension, vocabulary, fluency, etc.)
```

### What They're Building

**An AI tutor assistant that processes real lessons and generates adaptive curriculum:**

1. **Onboarding**: Student questionnaire captures learning goals, level, preferences, weekly availability
2. **Curriculum Generation (M1)**: GPT-5 generates high-level topic plans with deadlines, importance levels, and lesson counts. Evaluates goal achievability ("easy_achievable" / "difficult_achievable" / "unachievable")
3. **Lesson Planning (M2)**: Breaks each topic into structured lessons with checklists, outlines, and independent study tasks
4. **Live Lesson Processing**: Agora STT captures lesson audio, AssemblyAI provides speaker diarisation
5. **Role Identification**: LLM analyzes transcript chunks to identify who is the tutor vs student
6. **Scoring**: Post-lesson metrics (skeleton only)
7. **Retraining**: Full pipeline from audio URL to diarised, role-identified, scored transcript

### Their Strengths
- Deep backend architecture with clear separation of concerns
- Using GPT-5 (latest model)
- Full Agora STT integration (not just ConvoAI)
- AssemblyAI for speaker diarisation (differentiator)
- Retraining pipeline concept (analyzes actual lessons to improve future plans)
- Models M1-M5 concept (M3-M5 planned for post-lesson analysis)

### Their Weaknesses
- **NO FRONTEND** -- Vue.js is still at default boilerplate "You did it!" page
- **TTS.js is empty** -- no text-to-speech yet
- **Scorer.js is skeletal** -- returns placeholder metrics
- **schema.sql is empty** -- no database schema defined
- **db.js is a stub** -- no actual database connection
- **Only 2 commits** -- indicates early stage, much work still needed
- **No Agora ConvoAI** -- uses Agora STT directly, missing the +1 bonus point
- **No demo deployed** -- no Vercel or other deployment found
- **No Anam avatars or Thymia biomarkers** -- missing differentiators

### Risk Assessment
If Gleb can ship a working frontend by demo time, his backend depth could impress judges on the Technology Use and Quality categories. However, the Presentation & Demo category (20%) heavily rewards live demos, and he currently has none. His approach is more "tool for tutors" than "tool for learners," which may score lower on Product Scope (affecting millions of learners).

---

## Official Hackathon Repo Status

**Repository:** AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply
**Forked by:** Hackathon-Preply organization (1 fork, updated Mar 20 18:54 UTC)

### Submissions: EMPTY
The `submissions/` directory contains only `.DS_Store` and `.gitkeep`. **No team has submitted yet.** This is expected -- submissions happen at the end of Day 2.

### No Pull Requests
Zero PRs on either the upstream or forked repo.

### Judging Rubric (key takeaways for our strategy)

| Category | Weight | What wins a 5 |
|---|---|---|
| Technology Use | 20% | Multiple technologies combined effectively (STT, TTS, LLMs, Avatars) |
| Relevancy | 20% | "Could be added to the Preply product tomorrow" |
| Product Scope | 20% | "Aims to solve a global problem affecting millions of language learners" |
| Presentation & Demo | 20% | "Live demo, great pitch ready for YCombinator" |
| Quality | 20% | "Well thought-out UX, no bugs during live demo" + HOW_WE_BUILT.md |
| **Bonus: Agora ConvoAI** | **+1** | Deep integration as core part of project |

**Maximum score: 6 (5 base + 1 bonus)**

### Judges
1. **Petro Loboda** (Preply) -- cares about Relevancy to language learning
2. **Ben Weekes** (Agora) -- cares about Agora ConvoAI integration (25+ years WebRTC)
3. **Max Hudlberger** (OpenAI) -- cares about AI/ML innovation

---

## Our Project vs Main Threat

| Dimension | Us (Passion-Led Learning) | Gleb (Lesson Plan Generator) |
|---|---|---|
| **Working Demo** | YES (botas.vercel.app) | NO |
| **Frontend** | Next.js 16, polished UI | Vue.js boilerplate |
| **Agora ConvoAI** | YES (core of product) | NO (uses STT only) |
| **ConvoAI Bonus** | Up to +1 | +0 |
| **LLM** | GPT-4o | GPT-5 |
| **Thymia** | Pipeline built (pluggable) | Not present |
| **Anam Avatars** | Not integrated | Not integrated |
| **Backend Depth** | Lightweight (API routes) | Deep (6 system modules, 3 generator models, services layer) |
| **Unique Angle** | Voice-first passion discovery | Post-lesson analysis + adaptive curriculum |
| **Target User** | Learner (onboarding) | Tutor (lesson planning) |
| **Relevancy** | Enhances Preply onboarding funnel | Enhances tutor lesson prep |
| **Product Scope** | Every new Preply user | Active tutors with students |
| **Live Demo Risk** | Low (deployed, tested) | High (no frontend) |
| **Tech Stack Breadth** | Agora ConvoAI + RTC + RTM + OpenAI + Thymia | Agora STT + OpenAI + AssemblyAI |

---

## Vercel Deployment Scan

No competitor Vercel deployments found matching common patterns:
- sokol-gleb2-preply.vercel.app -- not found
- preply-gleb.vercel.app -- not found
- uni-chat-preply.vercel.app -- not found

**Our deployment (botas.vercel.app) appears to be the only live hackathon demo.**

---

## Recommended Pitch Adjustments

### Based on findings, optimize for these scoring dimensions:

**1. Agora ConvoAI Bonus (+1 point) -- Our biggest advantage**
- Emphasize deep ConvoAI integration during pitch
- Show the STT-to-LLM-to-TTS pipeline working live
- Ben Weekes (Agora judge) will specifically look for this
- Gleb uses raw Agora STT, not ConvoAI -- he gets +0 here

**2. Presentation & Demo (20%) -- We win this if demo works**
- Practice the 90-second demo flow until flawless
- Have the pre-recorded backup ready
- The rubric says 5 = "Live demo, great pitch ready for YCombinator"
- Our demo script already targets this perfectly

**3. Product Scope (20%) -- Frame as solving a global problem**
- "73% of language learners quit" -- this is our hook
- Frame as: every Preply user goes through onboarding, this transforms that moment
- Gleb's approach targets tutors (smaller audience) vs our approach targets all learners

**4. Relevancy (20%) -- "Could be added to Preply product tomorrow"**
- Show exactly where this slots into Preply's current onboarding flow
- Mention: "Better matching -> higher retention -> lower churn"
- This is Petro Loboda's (Preply judge) key criterion

**5. Quality (20%) -- Document the AI development process**
- Make sure HOW_WE_BUILT.md is ready with prompts, model choices, and iterations
- The rubric explicitly rewards this documentation

### Tactical additions if time permits:
- **Mention Gleb's approach exists** (without naming him): "Some teams built tools for tutors -- we built for learners, because learners are who quit"
- **Anam avatars**: If there's time, even a static avatar on the landing page adds a Technology Use point
- **Cost slide**: "$0.08-0.12 per session" already in demo script -- keep it, judges love unit economics

---

## Risk Matrix

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Gleb ships frontend last minute | MEDIUM | HIGH | Our live demo advantage + ConvoAI bonus still gives us edge |
| Unknown team with private repo surprises | MEDIUM | MEDIUM | Focus on our strengths, especially live demo quality |
| Stanislav Zayarsky (WebRTC expert) builds real-time feature | LOW-MEDIUM | MEDIUM | His expertise is infra, not AI/product. We have the full stack |
| WiFi issues during demo | MEDIUM | HIGH | Pre-recorded video backup ready per demo script |
| Junfan Zhu (ML expert) builds something novel | MEDIUM | MEDIUM | His strength is research depth, not hackathon speed. No visible prep |
| Multiple teams target same "onboarding" angle | LOW | MEDIUM | Our passion-based approach is unique -- research-backed differentiator |

---

## Blind Spots

Things we cannot see:
- **Private GitHub repos** -- many teams are likely building in private repos or local-only
- **Lovable/v0 projects** -- the hackathon explicitly supports these no-code tools; some teams may be building without GitHub entirely
- **Team compositions** -- we don't know who formed teams with whom. A Junfan + Stanislav + Alessandro team would be formidable
- **Anam/Thymia integrations** -- teams who deeply integrate these partners could score higher on Technology Use

---

## Bottom Line

We are in a strong position. The only visible competitor (Gleb) has deep backend architecture but no frontend, no deployment, and no ConvoAI integration. Our key advantages are:

1. **Working live demo** (only confirmed deployment)
2. **Agora ConvoAI bonus** (+1 point that Gleb cannot get with current architecture)
3. **Learner-focused** product scope (millions of users vs tutors)
4. **Polished pitch** with YC-ready demo script

Focus the remaining build time on: demo reliability, HOW_WE_BUILT.md documentation, and pitch practice. Do not over-engineer. Ship beats perfect.
