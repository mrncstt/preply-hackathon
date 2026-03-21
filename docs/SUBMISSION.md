# Our main Idea: Passion-Led Learning Agent

What if Preply knew what you love before lesson 1? We replace the static "pick a tutor" form with a 90-second voice AI interview. It discovers your passions, then connects them to your language goals, so your first lesson is never a blank slate.

## Live Demo

https://botas.vercel.app

## Pitch Decks

- Short pitch (30s): https://botas.vercel.app/short-pitch.html
- Long pitch (3min): https://botas.vercel.app/long-pitch.html

---

## 1 min - What is the problem

73% of language learners quit within 3 months. Not because learning is hard, but because no one really understood what they care about.

Today on Preply, a learner fills out a form, picks a tutor from a list, and the tutor starts from zero with no context about who this person really is. The onboarding captures surface-level preferences (language, level, schedule) but misses the most important thing: what makes this learner tick.

Research shows that personal interest is the strongest predictor of whether a learner sticks around. But no platform asks: "What are you genuinely passionate about?"

## 1 min - What is our solution

We built an AI Discovery Coach that replaces the static questionnaire with a 90-second voice conversation. The agent:

1. Detects your language and responds naturally (multilingual)
2. Discovers your passions, goals, fears, and learning style through natural dialogue
3. Creates a "Learning Bridge" connecting what you love to what you need to learn
4. Shows an animated tutor matching screen ("Finding tutors who will motivate, support, inspire you...")
5. Presents AI-matched tutors ready to book on Preply

The entire experience looks and feels like preply.com, but with voice AI replacing the form.

**Tech stack:** Agora ConvoAI (real-time voice), OpenAI GPT-5.4 (LLM + TTS + classification), Thymia (cognitive signals), Next.js 16, Vercel.

## 3 min - Live demonstration

### Demo flow (what you will see):

1. **Landing page** - Pixel-perfect Preply homepage clone. Click "Find your tutor"
2. **Voice interview** - AI Discovery Coach greets you and asks about your language goals, passions, and fears. Speak naturally in any language
3. **Real-time transcript** - See your conversation transcribed live, with Thymia cognitive signals (engagement, confidence, cognitive load) displayed alongside
4. **Auto-end** - After 7-8 exchanges, the agent wraps up naturally
5. **Profile card** - Structured learner profile with Learning Bridge (creative connection between passion and skill), barriers, recommendation
6. **Tutor matching** - Animated loading ("Finding tutors who will motivate, support, inspire you...") followed by AI-matched tutor cards
7. **Book on Preply** - CTA links directly to preply.com signup with pre-filled parameters

### Example conversation:

> **Coach:** "Hey! I'm your Discovery Coach at Preply. In about 90 seconds, I'll get to know you and build a learning plan that fits your life. So, what language have you been wanting to learn?"
>
> **Learner:** "I want to learn Spanish"
>
> **Coach:** "Nice! What's pushing you toward Spanish right now?"
>
> **Learner:** "I'm moving to Barcelona for work"
>
> **Coach:** "That's exciting! What are you into outside of work?"
>
> **Learner:** "I love cooking Italian food and watching football"
>
> **Coach:** "Love it! I can already picture a great path for you."

### Result:

**Learning Bridge:** "Master Spanish vocabulary through cooking recipe videos and football match commentary in Spanish"

**This bridge gets handed to a real Preply tutor before lesson 1. The first session is never a blank slate, the tutor already knows what motivates you.**

---

## Team

- **Mariana Costa** - Data
- **Timur Losev** - DevOps / AI

Built in 24 hours at the Preply x Agora Hackathon, Barcelona 2026.

---

## Why this wins

- **vs. Duolingo/Babbel:** They ask "why are you learning?" with 5 radio buttons. We have an open-ended voice conversation that surfaces passions no form would capture.
- **vs. ChatGPT voice:** Great for practice, but it does not connect to a real tutor marketplace. We feed insights directly into Preply tutor matching.
- **vs. current Preply:** The tutor gets a structured learner profile before lesson 1. First-session retention is the highest-leverage metric for a tutoring marketplace.
