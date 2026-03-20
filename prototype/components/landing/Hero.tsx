"use client";

import { Sparkles, MessageCircle, Target } from "lucide-react";

interface HeroProps {
  onStartInterview: () => void;
}

export function Hero({ onStartInterview }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--preply-coral)' }}>
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-xl" style={{ color: 'var(--preply-navy)' }}>Preply</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Find tutors</span>
          <span className="hidden sm:inline">How it works</span>
          <button className="px-4 py-2 rounded-lg text-white font-medium" style={{ background: 'var(--preply-navy)' }}>
            Log in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: 'rgba(255,107,44,0.1)', color: 'var(--preply-coral)' }}>
          <Sparkles className="w-4 h-4" />
          Powered by AI Discovery
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight max-w-3xl mb-6"
          style={{ color: 'var(--preply-navy)' }}>
          Learn a language through
          <span className="block" style={{ color: 'var(--preply-coral)' }}>what you love</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Our AI Discovery Coach learns what you are passionate about, then builds a
          personalized learning bridge between your interests and your language goals.
        </p>

        <button
          onClick={onStartInterview}
          className="group px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{ background: 'var(--preply-coral)' }}
        >
          Find your tutor
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </button>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mt-20">
          <FeatureCard
            icon={<MessageCircle className="w-6 h-6" />}
            title="5-min AI Interview"
            description="Tell us about your passions and goals in a natural conversation"
            color="var(--preply-coral)"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Smart Profile"
            description="We map your interests to create a unique learning bridge"
            color="var(--preply-green)"
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Perfect Match"
            description="Get paired with a tutor who shares your passions"
            color="var(--preply-navy)"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card text-left hover:shadow-md transition-shadow">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--preply-navy)' }}>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
