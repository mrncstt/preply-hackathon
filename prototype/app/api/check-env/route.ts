import { NextResponse } from "next/server";

export async function GET() {
  const missing = [];
  if (!process.env.VOICE_APP_ID) missing.push("VOICE_APP_ID");
  if (!process.env.VOICE_APP_CERTIFICATE) missing.push("VOICE_APP_CERTIFICATE");
  if (!process.env.VOICE_LLM_API_KEY) missing.push("VOICE_LLM_API_KEY");
  if (!process.env.VOICE_LLM_URL) missing.push("VOICE_LLM_URL");
  if (!process.env.VOICE_TTS_VENDOR) missing.push("VOICE_TTS_VENDOR");
  if (!process.env.VOICE_TTS_KEY) missing.push("VOICE_TTS_KEY");
  if (!process.env.VOICE_TTS_VOICE_ID) missing.push("VOICE_TTS_VOICE_ID");

  return NextResponse.json({ ready: missing.length === 0, missing });
}
