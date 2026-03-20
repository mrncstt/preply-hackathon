# Setup Guide: Passion-Led Learning Agent

Step-by-step to set up all platforms before the hackathon coding session.

---

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Credit card for API signups (most have free tiers)

---

## Step 1: Vercel (Frontend + API Routes)

### 1.1 Create Vercel account
1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended -- enables auto-deploy)
3. Verify email

### 1.2 Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

### 1.3 Create Next.js project
```bash
npx create-next-app@latest passion-led-agent --typescript --tailwind --app --src-dir
cd passion-led-agent
```

### 1.4 Deploy to Vercel
```bash
vercel
# Follow prompts, select your team, confirm settings
# You'll get a URL like: https://passion-led-agent.vercel.app
```

### 1.5 Set up environment variables
```bash
# You'll add these as you get API keys from each platform:
vercel env add AGORA_APP_ID
vercel env add AGORA_APP_CERTIFICATE
vercel env add OPENAI_API_KEY
vercel env add THYMIA_API_KEY
```

Or add them in the Vercel dashboard: Project Settings -> Environment Variables.

---

## Step 2: Agora (Real-Time Voice + ConvoAI)

### 2.1 Create Agora account
1. Go to https://console.agora.io/
2. Sign up (free tier: 10,000 minutes/month)
3. Verify email

### 2.2 Create an Agora project
1. In Agora Console, click "Create Project"
2. Name: `passion-led-agent`
3. Authentication: **App ID + Token** (secured mode)
4. Copy your **App ID** and **App Certificate**

### 2.3 Set up ConvoAI (for the bonus point)
1. In Agora Console, go to **Conversational AI** section
2. Create a new pipeline or use inline config
3. For Pipeline Mode (fastest):
   - Create pipeline in Agent Builder
   - Copy your **Pipeline ID**
   - You only need 3 env vars: `APP_ID`, `APP_CERTIFICATE`, `PIPELINE_ID`
4. For Inline Config (more control):
   - You'll configure LLM, TTS, and STT providers manually
   - Needs: `APP_ID`, `APP_CERTIFICATE`, `LLM_API_KEY`, `TTS_VENDOR`, `TTS_KEY`

### 2.4 Clone starter code
```bash
# Option A: Full agent-samples (recommended)
git clone https://github.com/AgoraIO-Conversational-AI/agent-samples.git
cd agent-samples

# Option B: Vercel v0 starter (lighter)
git clone https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0.git
```

### 2.5 Install Agora SDK in your project
```bash
cd passion-led-agent
npm install agora-rtc-sdk-ng
```

### 2.6 Test ConvoAI
- Try the live demo first: https://convoai-demo.agora.io/
- This confirms your App ID works before writing code

### 2.7 Add Agora skill for Claude Code (optional)
```bash
npx skills add github:AgoraIO-Conversational-AI/agora-skills
```

---

## Step 3: OpenAI (LLM for Interview + Classification)

### 3.1 Create OpenAI account
1. Go to https://platform.openai.com/signup
2. Sign up, add payment method
3. Go to API Keys: https://platform.openai.com/api-keys
4. Create new key, name it `passion-led-hackathon`
5. Copy the key (you won't see it again)

### 3.2 Set environment variable
```bash
# In your project
echo "OPENAI_API_KEY=sk-..." >> .env.local
```

### 3.3 Install SDK
```bash
npm install openai
```

### 3.4 Test with a simple call
```typescript
// test-openai.ts
import OpenAI from 'openai';
const client = new OpenAI();
const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Say hello in 3 languages' }],
});
console.log(response.choices[0].message.content);
```

### 3.5 Note on ConvoAI integration
If using Agora ConvoAI Pipeline Mode, OpenAI is already configured inside the pipeline. You don't need a separate OpenAI key for the conversation part -- only for the post-interview classifier.

---

## Step 4: Thymia (Voice Biomarkers)

### 4.1 Get API access
1. Thymia is a hackathon partner -- API access will be provided at the event
2. Check the ready-made recipe: https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/thymia.md
3. API endpoint: Thymia Sentinel API (Helios for wellness signals)

### 4.2 Integration architecture
Thymia integrates via the Custom LLM Server:
```
Agora ConvoAI -> server-custom-llm
                    |-- go-audio-subscriber (captures RTC audio)
                    |-- Thymia module -> Thymia Sentinel API
                    |-- Scores published via RTM to client
                    |-- Scores injected into LLM system prompt
```

### 4.3 What Thymia returns
- Engagement/arousal score
- Stress level
- Hesitation detection
- Energy level
- Scores arrive after 30-60 seconds of speech

### 4.4 Fallback plan
If Thymia API is unavailable or slow:
- Mock with plausible scores based on transcript sentiment analysis
- The demo still works -- Thymia is enrichment, not core
- Use OpenAI to estimate engagement from linguistic cues (elaboration length, vocabulary specificity, response latency)

---

## Step 5: Environment Variables Summary

Create a `.env.local` file in your project root:

```bash
# Agora
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
AGORA_PIPELINE_ID=your_pipeline_id          # if using Pipeline Mode

# OpenAI
OPENAI_API_KEY=sk-your_openai_key

# Thymia (get at the hackathon)
THYMIA_API_KEY=your_thymia_key
THYMIA_API_URL=https://api.thymia.ai/v1     # confirm at event

# Optional
NEXT_PUBLIC_ENABLE_SHEN=false                # Shen.AI camera vitals
ANAM_API_KEY=your_anam_key                   # if using avatar
```

**IMPORTANT:** Never commit `.env.local` to git. Add it to `.gitignore`.

---

## Step 6: Project Structure

```
passion-led-agent/
  src/
    app/
      page.tsx                  # Screen 1: Video call + interview
      profile/page.tsx          # Screen 2: Learning profile card
      bridge/page.tsx           # Screen 3: Learning bridge plan
      api/
        classify/route.ts       # POST: transcript -> JSON profile
        thymia/route.ts         # POST: audio -> biomarker scores
    components/
      VideoCall.tsx             # Agora SDK integration
      ThymiaSidebar.tsx         # Real-time enthusiasm/stress bars
      ProfileCard.tsx           # Structured profile display
      LearningBridge.tsx        # Personalized plan display
    lib/
      agora.ts                  # Agora client setup
      openai.ts                 # OpenAI client + prompts
      thymia.ts                 # Thymia API client
  .env.local
  vercel.json
  package.json
```

---

## Step 7: Pre-Hackathon Checklist

### Accounts (do BEFORE the event)
- [ ] Vercel account created and CLI installed
- [ ] Agora account created, project created, App ID copied
- [ ] OpenAI account created, API key generated
- [ ] Next.js project scaffolded and deployed to Vercel
- [ ] Agora SDK installed in project
- [ ] OpenAI SDK installed in project
- [ ] Tested Agora ConvoAI live demo (https://convoai-demo.agora.io/)
- [ ] Cloned agent-samples repo for reference

### At the event (Friday evening)
- [ ] Get Thymia API key from their mentor (Borys Pratsiuk, Portuguese room)
- [ ] Get Shen.AI API key if interested
- [ ] Talk to Ben Weekes (Agora) about ConvoAI best practices
- [ ] Talk to Max Hudlberger (OpenAI) about prompt strategies
- [ ] Recruit team members (target: 1 frontend, 1 backend/AI)
- [ ] Rehearse the concept pitch: "Passion-Led Learning Agent"

### Saturday coding (5-6h)
- [ ] Hour 0-1: Agora ConvoAI running with discovery interview prompt
- [ ] Hour 1-2: OpenAI classifier producing structured JSON
- [ ] Hour 2-3: Frontend Screen 1 (video call + Thymia sidebar)
- [ ] Hour 3-4: Frontend Screens 2-3 (profile card + learning bridge)
- [ ] Hour 4-5: Thymia integration (or mock if API issues)
- [ ] Hour 5-6: Polish, rehearse demo, record backup video, write HOW_WE_BUILT.md
- [ ] Submit PR to official repo: `submissions/team-name/`

---

## Quick Commands Reference

```bash
# Start development
cd passion-led-agent
npm run dev                    # localhost:3000

# Deploy to Vercel
vercel                         # preview deploy
vercel --prod                  # production deploy

# Test Agora ConvoAI
# Visit: https://convoai-demo.agora.io/

# Test OpenAI
npx ts-node test-openai.ts

# Git workflow
git add -A
git commit -m "description"
git push
```

---

## Useful Links

| Resource | URL |
|---|---|
| Agora Console | https://console.agora.io/ |
| Agora ConvoAI Docs | https://docs.agora.io/en/conversational-ai/overview/product-overview |
| Agora ConvoAI Demo | https://convoai-demo.agora.io/ |
| Agora Agent Samples | https://github.com/AgoraIO-Conversational-AI/agent-samples |
| Agora v0 Starter | https://github.com/AgoraIO-Conversational-AI/vibe-coding-v0 |
| Agora Custom LLM | https://github.com/AgoraIO-Conversational-AI/server-custom-llm |
| Thymia Recipe | https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/thymia.md |
| Shen.AI Recipe | https://github.com/AgoraIO-Conversational-AI/agent-samples/blob/main/recipes/shen.md |
| OpenAI Platform | https://platform.openai.com/ |
| Vercel Dashboard | https://vercel.com/dashboard |
| Hackathon Official Repo | https://github.com/AgoraIO-Conversational-AI/hackathon-2026-03-20-agora-preply |
