"use client";

import { Globe, ChevronDown } from "lucide-react";

interface HeroPreplyProps {
  onStartInterview: () => void;
}

export function HeroPreply({ onStartInterview }: HeroPreplyProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top banner - Proven Progress */}
      <div style={{ background: '#121117', color: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2 text-sm">
          <span style={{ color: '#FF7AAC', fontWeight: 700 }}>Proven progress</span>
          <span style={{ opacity: 0.7 }}>with 1-on-1 tutoring. See how it works</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto w-full" style={{ borderBottom: '1px solid #E8E8E8' }}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="preply-logo.svg" alt="Preply" style={{ width: 28, height: 28 }} />
            <span className="font-bold text-xl tracking-tight" style={{ color: '#121117' }}>Preply</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium" style={{ color: '#384047' }}>
            <span className="cursor-pointer hover:opacity-70 flex items-center gap-1">
              Find tutors <ChevronDown className="w-3.5 h-3.5" />
            </span>
            <span className="cursor-pointer hover:opacity-70 flex items-center gap-1">
              How Preply works <ChevronDown className="w-3.5 h-3.5" />
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
          <button className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold hover:brightness-110 transition-all" style={{ background: '#018058' }}>
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero section - two columns */}
      <main className="flex-1 flex items-center" style={{ background: '#FF7AAC' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - text */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6" style={{ color: '#121117', fontFamily: 'Figtree, sans-serif' }}>
              Learn faster<br className="hidden lg:block" />
              {' '}with your best<br className="hidden lg:block" />
              {' '}language tutor.
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Take 1-on-1 lessons with our AI Discovery Coach, who learns what you love and builds personalized learning plans around your passions.
            </p>

            <button
              onClick={onStartInterview}
              className="group px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110 cursor-pointer"
              style={{ background: '#121117', color: '#fff' }}
            >
              Find your tutor
            </button>

            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              90-second voice interview. Personalized results.
            </p>
          </div>

          {/* Right - stacked hero images */}
          <div className="hidden lg:flex justify-center">
            <div style={{ position: 'relative', width: 496, height: 324 }}>
              <img
                src="hero-preply.jpg"
                alt=""
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(100px) scale(0.64)',
                  transformOrigin: 'center center', opacity: 0.5,
                }}
              />
              <img
                src="hero-preply.jpg"
                alt=""
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(56px) scale(0.8)',
                  transformOrigin: 'center center', opacity: 0.75,
                }}
              />
              <img
                src="hero-preply.jpg"
                alt="Students learning with Preply"
                style={{
                  position: 'absolute', width: 496, height: 324, objectFit: 'cover',
                  borderRadius: 16, transform: 'translateX(0) scale(1)',
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* How it works section */}
      <div style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#121117' }}>How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Tell us about you"
              description="Our AI Discovery Coach asks about your passions, goals, and learning style in a natural 90-second voice conversation."
              color="#FF7AAC"
            />
            <StepCard
              number="2"
              title="Get your learning profile"
              description="We map your interests to create a unique learning bridge connecting what you love to what you need to learn."
              color="#3BB3BD"
            />
            <StepCard
              number="3"
              title="Start learning"
              description="Get paired with a tutor who shares your passions and a personalized plan built around your interests."
              color="#018058"
            />
          </div>
        </div>
      </div>

      {/* Trust section */}
      <div style={{ background: '#F7F7F8', borderTop: '1px solid #EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>32,000+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Expert tutors</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>300,000+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>5-star reviews</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>120+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Subjects taught</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#DDD' }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: '#121117' }}>200+</div>
              <div className="text-sm mt-1" style={{ color: '#6B7280' }}>Tutor nationalities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#121117', color: '#9CA3AF' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="preply-logo.svg" alt="Preply" style={{ width: 24, height: 24, filter: 'brightness(2)' }} />
              <span className="font-bold text-lg text-white">Preply</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="cursor-pointer hover:text-white transition-colors">About us</span>
              <span className="cursor-pointer hover:text-white transition-colors">For business</span>
              <span className="cursor-pointer hover:text-white transition-colors">Become a tutor</span>
              <span className="cursor-pointer hover:text-white transition-colors">Blog</span>
              <span className="cursor-pointer hover:text-white transition-colors">Help center</span>
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

function StepCard({
  number,
  title,
  description,
  color,
}: {
  number: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
        style={{ background: color }}
      >
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2" style={{ color: '#121117' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{description}</p>
    </div>
  );
}
