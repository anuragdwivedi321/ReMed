"use client";

import { useEffect, useState } from "react";

export default function AppSplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show on first visit in the current session
    try {
      const shown = sessionStorage.getItem("remed_splash_shown");
      if (!shown) {
        setVisible(true);
        // Start fading out after 1.2 seconds for a fast native app launch feel
        const timer1 = setTimeout(() => {
          setFading(true);
        }, 1200);

        // Completely unmount after fade transition (1.6s total)
        const timer2 = setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("remed_splash_shown", "true");
        }, 1600);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } catch {
      // In case sessionStorage is restricted (incognito/cookies disabled)
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="ReMeD"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-400 ease-out select-none ${
        fading
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Pure, Centered Brand Logo & Name (Clean, clutter-free native splash) */}
      <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-90 fade-in duration-500">
        {/* Animated Brand Icon with subtle glow */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/25 via-blue-500/20 to-emerald-400/20 blur-xl animate-pulse" />
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0072d2] via-[#005bb5] to-[#004a94] p-5 shadow-2xl shadow-blue-500/30 border-4 border-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full text-white drop-shadow-md"
            >
              {/* Medical Cross */}
              <path
                d="M9 3H15V8H20V14H15V21H9V14H4V8H9V3Z"
                fill="currentColor"
                fillOpacity="0.95"
              />
              {/* Leaf Accent Curl */}
              <path
                d="M14 9C17 9 19.5 6.5 19.5 3.5C16.5 3.5 14 6 14 9Z"
                fill="#34d399"
              />
            </svg>
          </div>
        </div>

        {/* Clean ReMeD Wordmark */}
        <div className="mt-5 flex items-center justify-center">
          <span className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-none">
            <span className="text-slate-900">Re</span>
            <span className="text-[#0072d2]">Me</span>
            <span className="text-[#ff6b2b]">D</span>
          </span>
        </div>
      </div>
    </div>
  );
}
