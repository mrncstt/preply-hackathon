import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CLASSIFIER_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OPEN_AI_API_KEY" }, { status: 500 });
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

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: CLASSIFIER_PROMPT },
      { role: "user", content: `Here is the interview transcript:\n\n${conversationText}` },
    ],
    temperature: 0.3,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    return NextResponse.json({ error: "Empty response from classifier" }, { status: 500 });
  }

  const profile = JSON.parse(content);
  return NextResponse.json({ profile });
}
