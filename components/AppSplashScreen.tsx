"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Heart } from "lucide-react";

export default function AppSplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show on first visit in the current session
    try {
      const shown = sessionStorage.getItem("remed_splash_shown");
      if (!shown) {
        setVisible(true);
        // Start fading out after 1.8 seconds
        const timer1 = setTimeout(() => {
          setFading(true);
        }, 1800);

        // Completely unmount after fade transition (2.3s total)
        const timer2 = setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("remed_splash_shown", "true");
        }, 2300);

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
      aria-label="Welcome to ReMeD"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-white via-[#f0f7ff] to-white p-6 transition-all duration-500 ease-out select-none ${
        fading
          ? "opacity-0 pointer-events-none scale-105"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Top subtle badge */}
      <div className="pt-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100/80 border border-sky-200 px-3.5 py-1 text-[11px] font-bold text-[#0072d2] tracking-wide">
          <Sparkles size={12} className="animate-spin text-[#0072d2]" />
          India&apos;s 1st Certified Medicine Buyback
        </span>
      </div>

      {/* Center Hero Logo & Branding */}
      <div className="flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-700">
        {/* Animated Brand Icon with layered glow */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-400/20 via-blue-500/20 to-orange-400/20 blur-xl animate-pulse" />
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

        {/* Brand Name Typography */}
        <div className="flex items-center justify-center">
          <span className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none">
            <span className="text-slate-900">Re</span>
            <span className="text-[#0072d2]">Me</span>
            <span className="text-[#ff6b2b]">D</span>
          </span>
        </div>

        {/* English Tagline */}
        <p className="mt-3 font-display text-sm sm:text-base font-bold text-slate-700 tracking-wide">
          For a Safer, Healthier Tomorrow
        </p>

        {/* Hindi Tagline */}
        <p className="mt-1 text-xs text-slate-500 font-medium">
          सुरक्षित दवाई • स्वस्थ भारत • डोरस्टेप पिकअप
        </p>

        {/* Animated Progress Bar */}
        <div className="mt-8 w-40 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-[#0072d2] via-sky-400 to-[#ff6b2b] rounded-full animate-splash-bar" />
        </div>
      </div>

      {/* Bottom Footer Trust Note */}
      <div className="pb-6 text-center animate-in fade-in slide-in-from-bottom-3 duration-500">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>CDSCO Compliant &bull; 100% Certified Pharmacy Network</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          Don&apos;t dump it, ReMed it.
        </p>
      </div>
    </div>
  );
}
