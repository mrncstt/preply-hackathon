"use client";

import { Activity, Brain, Zap, BarChart3, AlertTriangle } from "lucide-react";
import type { ThymiaData } from "@/components/voice-agent/types";

interface ThymiaSidebarProps {
  isActive: boolean;
  data: ThymiaData;
}

const METRIC_CONFIG: { key: string; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "happy", label: "Happy", icon: <Zap className="w-4 h-4" />, color: "var(--preply-green)" },
  { key: "stress", label: "Stress", icon: <AlertTriangle className="w-4 h-4" />, color: "var(--preply-coral)" },
  { key: "neutral", label: "Neutral", icon: <Activity className="w-4 h-4" />, color: "var(--preply-navy)" },
  { key: "sad", label: "Sad", icon: <Brain className="w-4 h-4" />, color: "#6366F1" },
  { key: "fatigue", label: "Fatigue", icon: <BarChart3 className="w-4 h-4" />, color: "#8B5CF6" },
];

export function ThymiaSidebar({ isActive, data }: ThymiaSidebarProps) {
  const hasBiomarkers = Object.values(data.biomarkers).some(
    (v) => typeof v === "number" && Math.abs(v) >= 0.001,
  );

  return (
    <div className="w-64 border-l border-border p-4 flex flex-col gap-4 bg-card">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'rgba(255,121,172,0.1)' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--preply-green)' }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--preply-navy)' }}>
          Thymia Signals
        </span>
        {isActive && hasBiomarkers && (
          <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--preply-green)' }} />
        )}
      </div>

      <div className="space-y-3">
        {METRIC_CONFIG.map((m) => {
          const raw = data.biomarkers[m.key];
          const value = typeof raw === "number" ? Math.round(raw * 100) : 0;
          return (
            <div key={m.key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span style={{ color: m.color }}>{m.icon}</span>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <span className="text-xs font-mono font-medium" style={{ color: 'var(--preply-navy)' }}>
                  {isActive && hasBiomarkers ? `${value}%` : "--"}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isActive && hasBiomarkers ? `${Math.min(value, 100)}%` : '0%',
                    background: m.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {data.alert !== "none" && data.rationale && (
        <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-800">{data.rationale}</p>
        </div>
      )}

      {isActive && !hasBiomarkers && (
        <div className="mt-auto pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Waiting for voice biomarker data...
          </p>
        </div>
      )}
    </div>
  );
}
