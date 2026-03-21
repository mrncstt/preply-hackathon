import { NextResponse } from "next/server";

export async function GET() {
  const openAiKey = process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  const agoraId = process.env.AGORA_ID || process.env.APP_ID;
  const agoraCert = process.env.AGORA_APP_CERTIFICATE || process.env.APP_CERTIFICATE;

  const missing = [];
  if (!agoraId) missing.push("AGORA_ID");
  if (!agoraCert) missing.push("AGORA_APP_CERTIFICATE");
  if (!openAiKey) missing.push("OPEN_AI_API_KEY");

  return NextResponse.json({ ready: missing.length === 0, missing });
}
