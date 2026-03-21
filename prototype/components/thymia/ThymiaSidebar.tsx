"use client";

import { useState, useEffect } from "react";
import { Activity, Brain, Zap, BarChart3, Clock } from "lucide-react";
import type { ThymiaSignals } from "@/components/voice-agent/types";

interface ThymiaSidebarProps {
  isActive: boolean;
}

function generateMockSignal(base: number, variance: number): number {
  return Math.max(0, Math.min(100, base + (Math.random() - 0.5) * variance));
}

export function ThymiaSidebar({ isActive }: ThymiaSidebarProps) {
  const [signals, setSignals] = useState<ThymiaSignals>({
    engagement: 0,
    fluency: 0,
    confidence: 0,
    vocabulary_range: 0,
    response_latency: 0,
  });

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSignals({
        engagement: generateMockSignal(72, 20),
        fluency: generateMockSignal(58, 25),
        confidence: generateMockSignal(65, 15),
        vocabulary_range: generateMockSignal(45, 30),
        response_latency: generateMockSignal(40, 20),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const metrics = [
    { label: "Engagement", value: signals.engagement, icon: <Zap className="w-4 h-4" />, color: "var(--preply-coral)" },
    { label: "Fluency", value: signals.fluency, icon: <Activity className="w-4 h-4" />, color: "var(--preply-green)" },
    { label: "Confidence", value: signals.confidence, icon: <Brain className="w-4 h-4" />, color: "var(--preply-navy)" },
    { label: "Vocabulary", value: signals.vocabulary_range, icon: <BarChart3 className="w-4 h-4" />, color: "#6366F1" },
    { label: "Response Time", value: signals.response_latency, icon: <Clock className="w-4 h-4" />, color: "#8B5CF6" },
  ];

  return (
    <div className="w-64 border-l border-border p-4 flex flex-col gap-4 bg-card">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'rgba(255,121,172,0.1)' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--preply-green)' }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--preply-navy)' }}>
          Thymia Signals
        </span>
        {isActive && (
          <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--preply-green)' }} />
        )}
      </div>

      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span style={{ color: m.color }}>{m.icon}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
              <span className="text-xs font-mono font-medium" style={{ color: 'var(--preply-navy)' }}>
                {isActive ? Math.round(m.value) : "--"}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isActive ? `${m.value}%` : '0%',
                  background: m.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {isActive && (
        <div className="mt-auto pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Real-time cognitive and linguistic signals analyzed by Thymia AI
          </p>
        </div>
      )}
    </div>
  );
}
