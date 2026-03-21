"use client";

import type { Message } from "@/components/voice-agent/types";

export function ProgressIndicator({ messages }: { messages: Message[] }) {
  const agentQuestions = messages.filter(
    (m) => m.role === "agent" && m.final && m.text.includes("?")
  ).length;
  const total = 8;
  const current = Math.min(agentQuestions, total);

  return (
    <div className="flex items-center gap-3 px-4">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-6 rounded-full transition-all duration-500"
            style={{
              background: i < current ? 'var(--preply-green)' : 'var(--border)',
              height: i < current ? '6px' : '4px',
              boxShadow: i === current - 1 ? '0 0 8px var(--preply-green)' : 'none',
            }}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        Question {current} of {total}
      </span>
    </div>
  );
}
