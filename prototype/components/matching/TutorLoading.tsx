"use client";

import { useEffect, useState } from "react";

interface TutorLoadingProps {
  onComplete: () => void;
}

const WORDS = ["motivate", "support", "inspire", "challenge", "guide"];

export function TutorLoading({ onComplete }: TutorLoadingProps) {
  const [activeWord, setActiveWord] = useState(0);
  const [showReady, setShowReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => {
        if (prev >= WORDS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowReady(true), 400);
          setTimeout(() => onComplete(), 2800);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#fff" }}>
      <style>{`
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes readyFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .word-active {
          animation: wordFadeIn 0.4s ease-out both;
        }
        .check-in {
          animation: checkIn 0.3s ease-out both;
        }
        .ready-fade {
          animation: readyFade 0.5s ease-out both;
        }
      `}</style>

      {/* Preply logo */}
      <div className="mb-12 opacity-40">
        <svg width="80" viewBox="0 0 775 210" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g fill="#121117"><g fillRule="evenodd" clipRule="evenodd"><path d="M100.042 56.317c-4.18-6.861-9.903-12.24-17.194-16.134C75.568 36.288 67.21 34.33 57.83 34.33H0v138.654h32.378V125.44h25.44c9.403 0 17.739-1.981 25.019-5.944 7.28-3.952 13.015-9.398 17.194-16.338 4.168-6.941 6.246-14.765 6.246-23.471 0-8.707-2.09-16.508-6.246-23.37zm-28.12 31.091c-1.328 2.254-3.213 3.997-5.655 5.254-2.442 1.245-5.27 1.88-8.438 1.88H32.4V65.023h25.428c3.18 0 5.997.634 8.438 1.88 2.453 1.256 4.338 3.011 5.656 5.253 1.328 2.253 1.987 4.756 1.987 7.53s-.67 5.277-1.987 7.722z"/></g></g>
        </svg>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "#121117" }}>
        Finding tutors who will
      </h2>

      <div className="flex flex-col items-center gap-3 mb-10">
        {WORDS.map((word, i) => (
          <div
            key={word}
            className="flex items-center gap-3"
            style={{ opacity: i <= activeWord ? 1 : 0.15 }}
          >
            {i <= activeWord && (
              <div className="check-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#FF7AAC" />
                  <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <span
              className={`text-xl sm:text-2xl font-semibold ${i <= activeWord ? "word-active" : ""}`}
              style={{
                color: i <= activeWord ? "#121117" : "#D1D5DB",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-8" style={{ opacity: showReady ? 0 : 1, transition: "opacity 0.3s" }}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: "#FF7AAC",
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <span className="text-sm" style={{ color: "#9CA3AF" }}>
          Matching your profile...
        </span>
      </div>

      {showReady && (
        <div className="ready-fade text-center">
          <div className="text-lg font-semibold mb-1" style={{ color: "#121117" }}>
            All set! Ready to meet them?
          </div>
          <div className="text-sm" style={{ color: "#9CA3AF" }}>
            We found tutors who match your passions
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
