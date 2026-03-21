"use client";

import { Sparkles, MessageCircle, Target } from "lucide-react";

interface HeroProps {
  onStartInterview: () => void;
}

export function Hero({ onStartInterview }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#121118' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full border-b border-white/10">
        <div className="flex items-center gap-8">
          <span className="font-bold text-2xl tracking-tight text-white">
            preply<span style={{ color: '#FF79AC' }}>.</span>
          </span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-white/70">
            <span className="cursor-pointer hover:text-white transition-colors">Find tutors</span>
            <span className="cursor-pointer hover:text-white transition-colors">Group classes</span>
            <span className="cursor-pointer hover:text-white transition-colors">Become a tutor</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-colors">
            Log in
          </button>
          <button className="px-5 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#FF79AC' }}>
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight max-w-3xl mb-6 text-white">
          Learn a language through
          <span className="block" style={{ color: '#FF79AC' }}>what you love</span>
        </h1>

        <p className="text-base text-white/60 max-w-xl mb-10 leading-relaxed">
          Our AI Discovery Coach learns what you are passionate about, then builds a
          personalized learning bridge between your interests and your language goals.
        </p>

        <button
          onClick={onStartInterview}
          className="group px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 cursor-pointer"
          style={{ background: '#FF79AC' }}
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
            color="#FF79AC"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Smart Profile"
            description="We map your interests to create a unique learning bridge"
            color="#FF79AC"
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Perfect Match"
            description="Get paired with a tutor who shares your passions"
            color="#121118"
            cardBg="rgba(255,255,255,0.05)"
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
  cardBg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  cardBg?: string;
}) {
  return (
    <div className="p-8 rounded-2xl text-left hover:shadow-md transition-shadow border border-white/10"
      style={{ background: cardBg || 'rgba(255,255,255,0.05)' }}>
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2 text-white">
        {title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}
