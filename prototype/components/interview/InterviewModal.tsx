"use client";

import { useEffect, useRef, useState } from "react";
import { useAgoraAgent } from "@/components/voice-agent/useAgoraAgent";
import { INTERVIEWER_SYSTEM_PROMPT, INTERVIEWER_GREETING } from "@/lib/prompts";
import { InterviewOrb } from "./InterviewOrb";
import { InterviewChat } from "./InterviewChat";
import { InterviewControls } from "./InterviewControls";
import { ProgressIndicator } from "./ProgressIndicator";
import { ThymiaSidebar } from "@/components/thymia/ThymiaSidebar";
import type { Message } from "@/components/voice-agent/types";

interface InterviewModalProps {
  onInterviewEnd: (messages: Message[]) => void;
}

export function InterviewModal({ onInterviewEnd }: InterviewModalProps) {
  const {
    agentState,
    isConnected,
    isMuted,
    messages,
    error,
    elapsed,
    handleConnect,
    handleDisconnect,
    handleToggleMute,
  } = useAgoraAgent();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      handleConnect(INTERVIEWER_SYSTEM_PROMPT, INTERVIEWER_GREETING);
    }
  }, [handleConnect]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEndInterview = () => {
    if (isEnding) return;
    setIsEnding(true);
    const captured = [...messages];
    handleDisconnect();
    onInterviewEnd(captured);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col animate-fade-in" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--preply-green)' }}>
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm" style={{ color: 'var(--preply-navy)' }}>
              Discovery Coach
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              {isConnected && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--preply-green)' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--preply-green)' }} />
                </span>
              )}
              {isConnected ? formatTime(elapsed) : "Connecting..."}
            </p>
          </div>
        </div>
        <ProgressIndicator messages={messages} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Orb */}
        <div className="flex items-center justify-center p-8 lg:w-1/3">
          <InterviewOrb state={agentState} />
        </div>

        {/* Center: Chat */}
        <div className="flex-1 flex flex-col border-l border-border">
          <InterviewChat messages={messages} messagesEndRef={messagesEndRef} />
        </div>

        {/* Right: Thymia */}
        <div className="hidden lg:block">
          <ThymiaSidebar isActive={isConnected} />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="px-6 py-2 text-sm text-red-600 bg-red-50 border-t border-red-200">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="border-t border-border">
        <InterviewControls
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onEndInterview={handleEndInterview}
        />
      </div>
    </div>
  );
}
