"use client";

import { CheckCircle, BookOpen, ExternalLink } from "lucide-react";
import type { InterviewProfile } from "@/components/voice-agent/types";

interface LearningBridgeProps {
  profile: InterviewProfile;
  onStartOver?: () => void;
}

export function LearningBridge({ profile, onStartOver }: LearningBridgeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12" style={{ background: 'linear-gradient(180deg, rgba(255,107,44,0.03) 0%, transparent 40%)' }}>
      <style>{`
        @keyframes bridgeCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bridgeLineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
      `}</style>
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--preply-navy)' }}>
            Your 4-Week Learning Bridge
          </h1>
          <p className="text-muted-foreground">
            {profile.target_language} through {profile.real_interest}
          </p>
        </div>

        {/* Learning Bridge visual */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-8 bottom-8 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, var(--preply-coral), var(--preply-green))',
              transformOrigin: 'top',
              animation: 'bridgeLineGrow 0.8s ease-out both',
            }}
          />

          <div className="space-y-6">
            {profile.weekly_plan.map((week, i) => (
              <div
                key={i}
                className="relative pl-14"
                style={{
                  animation: 'bridgeCardIn 0.5s ease-out both',
                  animationDelay: `${i * 150}ms`,
                }}
              >
                {/* Week circle */}
                <div
                  className="absolute left-3 top-4 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
                  style={{
                    background: i === 0 ? 'var(--preply-coral)' : i === profile.weekly_plan.length - 1 ? 'var(--preply-green)' : 'var(--preply-navy)',
                  }}
                >
                  {week.week}
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--preply-navy)' }}>
                        {week.theme}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{week.activity}</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                        style={{ background: 'rgba(255,107,44,0.1)', color: 'var(--preply-coral)' }}>
                        <BookOpen className="w-3 h-3" />
                        {week.passion_link}
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 shrink-0 text-border" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl text-center text-white"
          style={{ background: 'linear-gradient(135deg, var(--preply-navy), #2D1F9E)' }}>
          <h2 className="text-2xl font-bold mb-2">Ready to start?</h2>
          <p className="text-white/80 mb-6 text-sm">
            Connect with a Preply tutor who specializes in {profile.target_language}
            and shares your passion for {profile.real_interest}.
          </p>
          <a
            href="https://preply.com/en/online/english-tutors"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer inline-flex items-center gap-2"
            style={{ background: 'var(--preply-coral)', color: 'white' }}
          >
            Connect with a tutor
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {onStartOver && (
          <div className="text-center mt-6">
            <button
              onClick={onStartOver}
              className="text-sm text-muted-foreground hover:underline cursor-pointer"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
