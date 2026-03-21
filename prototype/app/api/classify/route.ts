import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CLASSIFIER_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const apiKey = process.env.VOICE_LLM_API_KEY || process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  const llmUrl = process.env.VOICE_LLM_URL || process.env.LLM_URL || "https://api.openai.com/v1/chat/completions";
  const llmModel = process.env.VOICE_LLM_MODEL || process.env.LLM_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    return NextResponse.json({ error: "Missing LLM API key (set VOICE_LLM_API_KEY or OPEN_AI_API_KEY)" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { transcript } = body;

  if (!transcript || !Array.isArray(transcript) || transcript.length === 0) {
    return NextResponse.json({ error: "Missing or empty transcript" }, { status: 400 });
  }

  const conversationText = transcript
    .map((m: { role: string; text: string }) =>
      `${m.role === "agent" ? "Discovery Coach" : "Learner"}: ${m.text}`
    )
    .join("\n");

  const baseUrl = llmUrl.replace(/\/chat\/completions\/?$/, "");
  const openai = new OpenAI({ apiKey, baseURL: baseUrl });

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: llmModel,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: CLASSIFIER_PROMPT },
        { role: "user", content: `Here is the interview transcript:\n\n${conversationText}` },
      ],
      temperature: 0.3,
    });
  } catch (err: any) {
    return NextResponse.json({ error: `Classifier API error: ${err.message}` }, { status: 502 });
  }

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    return NextResponse.json({ error: "Empty response from classifier" }, { status: 500 });
  }

  let profile;
  try {
    profile = JSON.parse(content);
  } catch {
    return NextResponse.json({ error: "Invalid JSON from classifier" }, { status: 502 });
  }

  const result = {
    event: "learner_profile_created",
    timestamp: new Date().toISOString(),
    profile,
    transcript_length: transcript.length,
    full_transcript: transcript,
    raw_classifier_output: content,
  };

  console.log("=== LEARNER PROFILE CREATED ===");
  console.log(JSON.stringify(result, null, 2));
  console.log("=== END PROFILE ===");

  return NextResponse.json({ profile, transcript, timestamp: result.timestamp });
}
