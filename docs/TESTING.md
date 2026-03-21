# How to check what you cooked

> Guide for inspecting and testing the API responses collected during voice interviews

## Where does the data go?

```
Mic audio
  -> Agora ConvoAI (cloud) -> ASR -> text transcription
                                        |
                                        v
                            Browser memory (messages[] state)
                                        |
                              Interview ends (auto or manual)
                                        |
                                        v
                              POST /api/classify
                              sends full transcript to OpenAI
                                        |
                                        v
                              OpenAI returns structured JSON profile
                                        |
                                        v
                              Logged to server console
                              Returned to browser
                              Shown in ProfileCard
                                        |
                                        X (lost on page refresh, no database)
```

**Right now: nothing is saved to a database.** Everything lives in browser memory during the session.

---

## How to inspect the API responses

### Method 1: Browser DevTools (Network tab)

1. Open `http://localhost:3000`
2. Press `F12` to open DevTools > **Network** tab
3. Click "Find your tutor" and do the interview
4. When interview ends, look for the `classify` request in the Network tab
5. Click on it > **Response** tab

You will see:

```json
{
  "profile": {
    "learner_name": "Mariana",
    "target_language": "Ukrainian",
    "current_level": "beginner",
    "confidence": 0.85,
    "required_skill": "Conversational Ukrainian for making friends",
    "real_interest": "AI and technology",
    "learning_bridge": "Learn Ukrainian vocabulary through AI research papers and tech community discussions",
    "barriers": ["alphabet difference", "zero prior knowledge"],
    "preferred_style": "mixed",
    "available_time": "Not specified",
    "motivation_type": "intrinsic",
    "recommendation": "Since you're passionate about AI, let's use tech meetups and AI communities in Ukraine as your learning playground...",
    "weekly_plan": [...]
  },
  "transcript": [
    { "role": "agent", "text": "Hey! I'm your Discovery Coach..." },
    { "role": "user", "text": "I want to learn Ukrainian" },
    ...
  ],
  "timestamp": "2026-03-21T14:30:00.000Z"
}
```

### Method 2: Server console logs

If running locally:

```bash
cd prototype
npm run dev
```

After each interview, check the terminal. You will see:

```
=== LEARNER PROFILE CREATED ===
{
  "event": "learner_profile_created",
  "timestamp": "2026-03-21T14:30:00.000Z",
  "profile": { ... },
  "transcript_length": 14,
  "full_transcript": [ ... ],
  "raw_classifier_output": "{ ... }"
}
=== END PROFILE ===
```

### Method 3: Vercel function logs

For the deployed version at botas.vercel.app:

1. Go to [Vercel Dashboard](https://vercel.com) > preply-hackathon project
2. Click **Logs** tab (or **Functions** > classify)
3. Filter by "LEARNER PROFILE CREATED"
4. Each interview produces one log entry with full transcript + profile

---

## What the classifier API collects

### Input (sent to /api/classify)

| Field | Type | Description |
|-------|------|-------------|
| `transcript` | array | All messages from the interview |
| `transcript[].role` | string | `"agent"` or `"user"` |
| `transcript[].text` | string | Transcribed speech |

### Output (returned from /api/classify)

| Field | Type | Description |
|-------|------|-------------|
| `profile.learner_name` | string/null | Name if mentioned |
| `profile.target_language` | string | Language they want to learn |
| `profile.current_level` | string | beginner/elementary/intermediate/upper-intermediate/advanced |
| `profile.confidence` | number | 0.0-1.0, classifier confidence |
| `profile.required_skill` | string | Primary skill they need |
| `profile.real_interest` | string | Their passion outside language |
| `profile.learning_bridge` | string | Creative connection passion <> skill |
| `profile.barriers` | string[] | Fears or obstacles |
| `profile.preferred_style` | string | visual/auditory/kinesthetic/mixed |
| `profile.available_time` | string | Schedule availability |
| `profile.motivation_type` | string | intrinsic/extrinsic/mixed |
| `profile.recommendation` | string | Personalized recommendation |
| `profile.weekly_plan` | array | 4-week personalized plan |
| `transcript` | array | Full conversation transcript |
| `timestamp` | string | ISO 8601 timestamp |

---

## Testing the classifier with curl

You can test the classifier directly without doing a voice interview:

```bash
curl -X POST http://localhost:3000/api/classify \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": [
      {"role": "agent", "text": "Hey! What language do you want to learn?"},
      {"role": "user", "text": "I want to learn Spanish"},
      {"role": "agent", "text": "Nice! What level are you at?"},
      {"role": "user", "text": "Complete beginner"},
      {"role": "agent", "text": "What is pushing you to learn Spanish?"},
      {"role": "user", "text": "I am moving to Barcelona for work"},
      {"role": "agent", "text": "What are you passionate about outside of work?"},
      {"role": "user", "text": "I love cooking Italian food and watching football"},
      {"role": "agent", "text": "What scares you most about learning?"},
      {"role": "user", "text": "I am afraid I will never sound natural"},
      {"role": "agent", "text": "What does success look like for you?"},
      {"role": "user", "text": "Being able to order food and chat with neighbors"}
    ]
  }'
```

Expected: A JSON response with a creative learning bridge like "Master Spanish vocabulary through cooking recipe videos and football match commentary."

---

## Common issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Profile shows "General communication" / "Not determined" | Classifier API failed (fallback data) | Check VOICE_LLM_API_KEY and VOICE_LLM_URL env vars |
| "Classification failed" error banner | OpenAI returned an error | Check API key is valid, check Vercel logs |
| Empty transcript | Interview ended before any speech was captured | Make sure you speak and wait for transcription |
| "Missing VOICE_LLM_API_KEY or VOICE_LLM_URL" | Env vars not set | Set in .env.local or Vercel dashboard |
| Generic learning bridge | Conversation was too short or vague | Have a longer conversation, mention specific hobbies |

---

## Environment variables needed

```env
# For the voice interview (Agora)
AGORA_ID=              # Agora Console > Project > App ID
AGORA_APP_CERTIFICATE= # Agora Console > Project > App Certificate

# For the classifier (OpenAI)
VOICE_LLM_API_KEY=     # OpenAI API key
VOICE_LLM_URL=         # https://api.openai.com/v1/chat/completions
VOICE_LLM_MODEL=       # gpt-4o-mini (default)

# For TTS (voice output)
OPEN_AI_API_KEY=       # Same OpenAI key (used by start-agent)
```
