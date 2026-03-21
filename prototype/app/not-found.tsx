"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#FFF5F9" }}>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes lick-paw {
          0%, 60%, 100% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(-8deg) translateY(-4px); }
          45% { transform: rotate(3deg) translateY(-2px); }
        }
        .cat-wobble { animation: wobble 2s ease-in-out infinite; }
        .cat-lick { animation: lick-paw 3s ease-in-out infinite; }
      `}</style>

      {/* Use the real botas tuxedo cat logo */}
      <div className="mb-6 cat-lick">
        <img
          src="/botas-logo.svg"
          alt="botas the cat"
          style={{ width: 180, height: 180 }}
        />
      </div>

      <div className="text-7xl font-black mb-4 cat-wobble" style={{ color: "#FF7AAC" }}>404</div>

      <h1 className="text-2xl font-bold mb-2" style={{ color: "#121117" }}>
        This page ran away!
      </h1>

      <p className="text-center mb-8 max-w-md" style={{ color: "#6B7280" }}>
        Botas is too busy grooming his boots to help you find it.
        Maybe try going back home?
      </p>

      <Link
        href="/"
        className="px-8 py-3.5 rounded-xl font-semibold text-white no-underline hover:brightness-110 transition-all"
        style={{ background: "#FF7AAC" }}
      >
        Take me home
      </Link>

      <p className="mt-6 text-xs" style={{ color: "#D1D5DB" }}>
        botas says meow.
      </p>
    </div>
  );
}
