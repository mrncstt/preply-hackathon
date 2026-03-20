import { NextResponse } from "next/server";

export async function GET() {
  const required = ["APP_ID", "APP_CERTIFICATE", "LLM_API_KEY", "TTS_VENDOR", "TTS_KEY", "TTS_VOICE_ID"];
  const optional = ["LLM_URL", "LLM_MODEL", "OPENAI_API_KEY"];

  const configured: Record<string, boolean> = {};
  for (const key of [...required, ...optional]) {
    configured[key] = !!(process.env[key] && process.env[key]!.trim());
  }

  const missing = required.filter((key) => !configured[key]);
  return NextResponse.json({ configured, ready: missing.length === 0, missing });
}
