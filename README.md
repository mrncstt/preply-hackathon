# Preply x Agora Hackathon: AI Agents for NextGen Language Learning

**Date:** March 20-21, 2025
**Location:** Carrer de Badajoz, 97 - Barcelona
**Prize:** EUR 17,500 total (1st: EUR 10,000 + fast-track Preply interview)

## Structure

```
research/          - Market research, competitors, tech partners, benchmark frameworks
participants/      - Participant profiles
challenges/        - Proposals for each challenge
  01-visualizing-progress/
  02-accelerating-learning-agents/
  03-live-learning-realtime/
prototypes/        - Code during the hackathon
```

## Challenges

1. **Visualizing Learning Progress** - Make progress measurable
2. **Accelerating Learning with Agents** - Personalized practice with intelligent feedback
3. **Live Learning & Real-Time Context** - Systems that learn from live conversations

## Setup

### GitHub Copilot

Run the cross-platform installer from the repository root:

```bash
bash install-copilot.sh
```

> **Note for Windows users:** `winget` is a native Windows executable and is
> not available directly in Git Bash (MINGW64). The script above automatically
> delegates to PowerShell so that `winget install GitHub.Copilot` works
> correctly. If you prefer to run it yourself, open **PowerShell** or
> **Command Prompt** and execute:
>
> ```powershell
> winget install --id GitHub.Copilot -e
> ```

## Available Tech Stack

- **Agora** - Real-time audio/video streaming + Conversational AI Engine
- **OpenAI** - GPT Realtime API, Codex, speech-to-speech
- **AWS** - Bedrock, Transcribe, Translate, Polly
- **Anam** - Photorealistic AI avatars (180ms latency)
- **Thymia** - Voice biomarkers, emotional state
