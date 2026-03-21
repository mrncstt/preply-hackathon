"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { HeroPreply as Hero } from "@/components/landing/HeroPreply";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { LearningBridge } from "@/components/bridge/LearningBridge";
import { TutorLoading } from "@/components/matching/TutorLoading";
import { TutorResults } from "@/components/matching/TutorResults";
import type { Message, InterviewProfile } from "@/components/voice-agent/types";
import { Loader2 } from "lucide-react";

const InterviewModal = dynamic(
  () => import("@/components/interview/InterviewModal").then((m) => m.InterviewModal),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

type Screen = "landing" | "interview" | "classifying" | "profile" | "bridge" | "finding" | "tutors" | "retry";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [profile, setProfile] = useState<InterviewProfile | null>(null);
  const [classifyError, setClassifyError] = useState<string | null>(null);

  const handleStartInterview = useCallback(() => {
    setScreen("interview");
  }, []);

  const handleInterviewEnd = useCallback(async (messages: Message[]) => {
    setScreen("classifying");
    setClassifyError(null);

    try {
      const transcript = messages
        .filter((m) => m.text.trim())
        .map((m) => ({ role: m.role, text: m.text }));

      if (transcript.length === 0) {
        throw new Error("empty");
      }

      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Classification failed");
      }

      const data = await res.json();
      setProfile(data.profile);
      setScreen("profile");
    } catch (err: any) {
      setClassifyError(err.message);
      setScreen("retry");
    }
  }, []);

  const handleViewPlan = useCallback(() => {
    setScreen("finding");
  }, []);

  const handleFindingComplete = useCallback(() => {
    setScreen("tutors");
  }, []);

  const handleStartOver = useCallback(() => {
    setScreen("landing");
    setProfile(null);
    setClassifyError(null);
  }, []);

  return (
    <>
      {screen === "landing" && (
        <div className="animate-fade-in">
          <Hero onStartInterview={handleStartInterview} />
        </div>
      )}

      {screen === "interview" && <InterviewModal onInterviewEnd={handleInterviewEnd} />}

      {screen === "classifying" && (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 animate-fade-in">
          <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--preply-coral)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--preply-navy)' }}>
            Analyzing your interview...
          </p>
          <p className="text-sm text-muted-foreground">Building your personalized learning profile</p>
          <p className="text-xs mt-4" style={{ color: '#D1D5DB', fontStyle: 'italic' }}>
            What is love? Baby don't hurt me... don't hurt me... no more
          </p>
        </div>
      )}

      {screen === "profile" && profile && (
        <div className="animate-slide-up">
          <ProfileCard profile={profile} onViewPlan={handleViewPlan} onStartOver={handleStartOver} />
        </div>
      )}

      {screen === "bridge" && profile && (
        <div className="animate-slide-up">
          <LearningBridge profile={profile} onStartOver={handleStartOver} />
        </div>
      )}

      {screen === "finding" && (
        <TutorLoading onComplete={handleFindingComplete} />
      )}

      {screen === "tutors" && profile && (
        <div className="animate-fade-in">
          <TutorResults profile={profile} onStartOver={handleStartOver} />
        </div>
      )}

      {screen === "retry" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in" style={{ background: '#fff' }}>
          <img src="/botas-logo.svg" alt="botas" style={{ width: 120, height: 120, marginBottom: '0.5rem' }} />
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#121117' }}>
            Hey, let's try again!
          </h1>
          <p className="text-center mb-2 max-w-md" style={{ color: '#6B7280', fontSize: '1.1rem' }}>
            We didn't quite catch enough from our conversation to build your profile.
          </p>
          <p className="text-center mb-8 max-w-md" style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
            Tip: tell us what language you want to learn and what you're passionate about. That's all we need!
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleStartInterview}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-white hover:brightness-110 transition-all cursor-pointer"
              style={{ background: '#FF7AAC' }}
            >
              Let's try again
            </button>
            <button
              onClick={handleStartOver}
              className="text-sm hover:underline cursor-pointer"
              style={{ color: '#9CA3AF' }}
            >
              Back to home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
