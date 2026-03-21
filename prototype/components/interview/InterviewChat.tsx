"use client";

import { cn } from "@/lib/utils";
import type { Message } from "@/components/voice-agent/types";

function ChatBubble({ message }: { message: Message }) {
  const isAgent = message.role === "agent";
  return (
    <div className={cn("flex flex-col gap-1", isAgent ? "items-start" : "items-end")}>
      <span className="text-xs text-muted-foreground px-1">
        {isAgent ? "Discovery Coach" : "You"}
      </span>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isAgent ? "rounded-tl-sm" : "rounded-tr-sm",
          !message.final && "opacity-60"
        )}
        style={{
          backgroundColor: isAgent ? "var(--secondary)" : "var(--preply-navy)",
          color: isAgent ? "var(--secondary-foreground)" : "#ffffff",
        }}
      >
        {message.text}
        {!message.final && (
          <span className="inline-flex gap-0.5 ml-1.5 align-middle">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full animate-bounce"
                style={{ background: "var(--preply-coral)", animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export function InterviewChat({
  messages,
  messagesEndRef,
}: {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: 'var(--chat-bg)' }}>
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--preply-green)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--preply-green)' }} />
            </span>
            <p className="text-xs text-muted-foreground">The coach is about to start...</p>
          </div>
        </div>
      )}
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
