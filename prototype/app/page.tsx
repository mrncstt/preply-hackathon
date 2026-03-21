"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/landing/Hero";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { LearningBridge } from "@/components/bridge/LearningBridge";
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

type Screen = "landing" | "interview" | "classifying" | "profile" | "bridge";

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
        .filter((m) => m.final && m.text.trim())
        .map((m) => ({ role: m.role, text: m.text }));

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
      setScreen("profile");
      setProfile({
        learner_name: null,
        target_language: "Unknown",
        current_level: "beginner",
        required_skill: "General communication",
        real_interest: "Not determined",
        learning_bridge: "We could not generate your bridge. Please try again.",
        barriers: [],
        preferred_style: "mixed",
        available_time: "Not specified",
        motivation_type: "mixed",
        recommendation: "Please try the interview again for a personalized recommendation.",
        weekly_plan: [
          { week: 1, theme: "Getting Started", activity: "Basic introductions", passion_link: "Explore your interests" },
          { week: 2, theme: "Building Blocks", activity: "Core grammar", passion_link: "Apply to daily life" },
          { week: 3, theme: "Conversations", activity: "Daily situations", passion_link: "Real-world practice" },
          { week: 4, theme: "Real World", activity: "Practice sessions", passion_link: "Build confidence" },
        ],
      });
    }
  }, []);

  const handleViewPlan = useCallback(() => {
    setScreen("bridge");
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

      {classifyError && screen === "profile" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {classifyError}
        </div>
      )}
    </>
  );
}
