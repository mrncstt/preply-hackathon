"use client";

import { Target, Heart, Lightbulb, AlertTriangle, Clock, Brain, Globe } from "lucide-react";
import type { InterviewProfile } from "@/components/voice-agent/types";

interface ProfileCardProps {
  profile: InterviewProfile;
  onViewPlan: () => void;
  onStartOver?: () => void;
}

export function ProfileCard({ profile, onViewPlan, onStartOver }: ProfileCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}</style>
      <div className="max-w-2xl w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fade-in-up"
            style={{ background: 'linear-gradient(135deg, rgba(255,121,172,0.15), rgba(255,121,172,0.05))', color: 'var(--preply-green)', border: '1px solid rgba(255,121,172,0.2)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--preply-green)' }} />
            Profile Complete
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--preply-navy)' }}>
            {profile.learner_name ? `${profile.learner_name}'s` : "Your"} Learning Profile
          </h1>
          <p className="text-muted-foreground">Based on your discovery interview</p>
          {profile.target_language && profile.target_language !== "Unknown" && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mt-2"
              style={{ background: 'rgba(27,20,100,0.08)', color: 'var(--preply-navy)' }}>
              <Globe className="w-4 h-4" />
              {profile.target_language} - {profile.current_level}
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {/* Main insight - Learning Bridge */}
          <div className="p-6 rounded-2xl border-2 animate-fade-in-up delay-1"
            style={{ borderColor: 'var(--preply-coral)', background: 'rgba(255,107,44,0.03)', boxShadow: '0 4px 24px rgba(255,107,44,0.1)' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--preply-coral), #ff8a65)' }}>
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide mb-1"
                  style={{ color: 'var(--preply-coral)' }}>
                  Your Learning Bridge
                </h3>
                <p className="text-lg font-medium" style={{ color: 'var(--preply-navy)' }}>
                  {profile.learning_bridge}
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up delay-2">
            <ProfileSection
              icon={<Target className="w-5 h-5 text-white" />}
              color="var(--preply-navy)"
              label="What You Need"
              value={profile.required_skill}
            />
            <ProfileSection
              icon={<Heart className="w-5 h-5 text-white" />}
              color="var(--preply-green)"
              label="What You Love"
              value={profile.real_interest}
            />
            <ProfileSection
              icon={<Brain className="w-5 h-5 text-white" />}
              color="#6366F1"
              label="Level & Style"
              value={`${profile.current_level} | ${profile.preferred_style}`}
            />
            <ProfileSection
              icon={<Clock className="w-5 h-5 text-white" />}
              color="#8B5CF6"
              label="Available Time"
              value={profile.available_time}
            />
          </div>

          {/* Barriers */}
          {profile.barriers.length > 0 && (
            <div className="p-4 rounded-2xl border border-border bg-card animate-fade-in-up delay-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium" style={{ color: 'var(--preply-navy)' }}>
                  Barriers to Address
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.barriers.map((b, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          <div className="p-5 rounded-2xl border border-border bg-card animate-fade-in-up delay-4 relative overflow-hidden">
            <div className="absolute top-2 left-4 text-5xl font-serif leading-none opacity-10" style={{ color: 'var(--preply-navy)' }}>&ldquo;</div>
            <p className="text-sm leading-relaxed text-muted-foreground italic pl-6">
              {profile.recommendation}
            </p>
          </div>
        </div>

        <div className="text-center mt-8 flex flex-col items-center gap-3 animate-fade-in-up delay-5">
          <button
            onClick={onViewPlan}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, var(--preply-coral), #ff8a65)' }}
          >
            See your learning plan &rarr;
          </button>
          {onStartOver && (
            <button
              onClick={onStartOver}
              className="text-sm text-muted-foreground hover:underline cursor-pointer"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileSection({
  icon,
  color,
  label,
  value,
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200" style={{ background: color }}>
          {icon}
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
          <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--preply-navy)' }}>{value}</p>
        </div>
      </div>
    </div>
  );
}
