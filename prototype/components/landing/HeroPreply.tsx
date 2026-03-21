"use client";

import { Globe, BookOpen, Users, GraduationCap, ChevronDown, Star } from "lucide-react";

interface HeroPreplyProps {
  onStartInterview: () => void;
}

export function HeroPreply({ onStartInterview }: HeroPreplyProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top banner */}
      <div style={{ background: '#F5F5F7', borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-2 text-xs" style={{ color: '#384047' }}>
          <span>Proven progress with 1-on-1 tutoring</span>
          <span style={{ color: '#018058', fontWeight: 600 }}>Learn more</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-8">
          <span className="font-bold text-2xl tracking-tight" style={{ color: '#121118' }}>
            preply<span style={{ color: '#FF79AC' }}>.</span>
          </span>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium" style={{ color: '#384047' }}>
            <span className="cursor-pointer hover:opacity-70 flex items-center gap-1">
              Find tutors <ChevronDown className="w-3.5 h-3.5" />
            </span>
            <span className="cursor-pointer hover:opacity-70 flex items-center gap-1">
              Group classes <ChevronDown className="w-3.5 h-3.5" />
            </span>
            <span className="cursor-pointer hover:opacity-70">For business</span>
            <span className="cursor-pointer hover:opacity-70">Become a tutor</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-sm cursor-pointer hover:opacity-70" style={{ color: '#384047' }}>
            <Globe className="w-4 h-4" />
            <span>EN</span>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-70" style={{ color: '#384047' }}>
            Log in
          </button>
          <button className="px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:brightness-110 transition-all" style={{ background: '#018058' }}>
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero section - two columns */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: '#384047' }}>Trusted by 1M+ learners</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: '#121118' }}>
              Learn faster with your best{' '}
              <span style={{ color: '#018058' }}>language tutor</span>
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#6B7280' }}>
              Our AI Discovery Coach learns what you are passionate about, then matches you
              with a tutor who builds lessons around your interests.
            </p>

            <button
              onClick={onStartInterview}
              className="group px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={{ background: '#018058' }}
            >
              Find your tutor
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </button>

            <div className="flex items-center gap-6 mt-6 text-sm" style={{ color: '#6B7280' }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
                AI-powered matching
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
                90-second interview
              </span>
            </div>
          </div>

          {/* Right - visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="w-96 rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F5F0FF 100%)' }}>
                <div className="p-8 text-center">
                  <img src="botas-logo.svg" alt="botas" className="w-32 h-32 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#121118' }}>AI Discovery Coach</h3>
                  <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Tell me about your passions and I will build your perfect learning plan</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#FF79AC' }} />
                    <span className="text-sm font-medium" style={{ color: '#FF79AC' }}>Ready to listen</span>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,121,172,0.08)' }}>
                      <span className="text-lg">&#127928;</span>
                      <span className="text-sm font-medium" style={{ color: '#384047' }}>Jazz guitar enthusiast</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,121,172,0.08)' }}>
                      <span className="text-lg">&#9917;</span>
                      <span className="text-sm font-medium" style={{ color: '#384047' }}>Football tactics fan</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,121,172,0.08)' }}>
                      <span className="text-lg">&#127891;</span>
                      <span className="text-sm font-medium" style={{ color: '#384047' }}>Learning Spanish B2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full shadow-lg text-sm font-semibold text-white" style={{ background: '#FF79AC' }}>
                Personalized
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature cards */}
      <div style={{ background: '#F9FAFB', borderTop: '1px solid #F0F0F0' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="90s AI interview"
              description="Tell us about your passions and goals in a natural voice conversation"
              color="#FF79AC"
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Smart profile"
              description="We map your interests to create a unique learning bridge"
              color="#FF79AC"
            />
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Perfect match"
              description="Get paired with a tutor who shares your passions"
              color="#121118"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#121118', color: '#9CA3AF' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="font-bold text-lg text-white">
                preply<span style={{ color: '#FF79AC' }}>.</span>
              </span>
              <span className="text-sm">Passion-led language learning</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="cursor-pointer hover:text-white transition-colors">About</span>
              <span className="cursor-pointer hover:text-white transition-colors">For tutors</span>
              <span className="cursor-pointer hover:text-white transition-colors">Blog</span>
              <span className="cursor-pointer hover:text-white transition-colors">Help</span>
            </div>
          </div>
          <div className="mt-6 pt-6 text-xs text-center" style={{ borderTop: '1px solid #2a2a2a' }}>
            Hackathon prototype. Built at Preply x Agora Hackathon, Barcelona 2026.
          </div>
        </div>
      </footer>
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
    <div className="p-8 rounded-2xl bg-white border border-gray-100 text-left hover:shadow-md transition-shadow">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-base mb-2" style={{ color: '#121118' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{description}</p>
    </div>
  );
}
