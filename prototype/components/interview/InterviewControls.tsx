"use client";

import { Mic, MicOff, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onEndInterview: () => void;
}

export function InterviewControls({ isMuted, onToggleMute, onEndInterview }: InterviewControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={onToggleMute}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer",
          isMuted
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-secondary text-secondary-foreground hover:bg-border"
        )}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
      <button
        onClick={onEndInterview}
        className="px-6 py-3 rounded-full bg-red-500 text-white font-medium text-sm hover:bg-red-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
      >
        <PhoneOff className="w-4 h-4" />
        End Interview
      </button>
    </div>
  );
}
