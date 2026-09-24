"use client";

import { useState, useEffect } from "react";
import {
  Scan,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
  KeyRound,
  Zap,
} from "lucide-react";

interface SceneStep {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
}

const SCENES: SceneStep[] = [
  {
    id: 1,
    title: "1. AI Strip Scan",
    subtitle: "Real-time Optical Character Recognition",
    badge: "AI Vision Active",
  },
  {
    id: 2,
    title: "2. Free Doorstep Pickup",
    subtitle: "Certified Executive at your Door",
    badge: "Zero Pickup Fee",
  },
  {
    id: 3,
    title: "3. Instant UPI Cash",
    subtitle: "Money directly to Google Pay / PhonePe",
    badge: "Under 60 Seconds",
  },
];

export default function HeroAnimatedCard() {
  const [activeScene, setActiveScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-advance loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 40; // update progress every 40ms
    const totalDuration = 4000; // 4 seconds per scene
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveScene((current) => (current === 3 ? 1 : current + 1));
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeScene]);

  const handleSelectScene = (sceneId: number) => {
    setActiveScene(sceneId);
    setProgress(0);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md select-none">
      {/* Floating Trust Pill Top */}
      <div className="absolute -top-3.5 right-3 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 shadow-md border border-sky-100 text-[10px] sm:text-xs font-bold text-[#0072d2]">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Live Interactive Flow</span>
      </div>

      {/* Main Glassmorphic Animated Container */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-sky-200/80 bg-gradient-to-br from-white via-sky-50/60 to-blue-50/70 p-4 sm:p-6 shadow-2xl shadow-sky-500/15">
        {/* Top Control Bar with Scene Pills & Play/Pause */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-100/80">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SCENES.map((scene) => {
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSelectScene(scene.id)}
                  className={`relative overflow-hidden rounded-xl px-2.5 py-1 text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0072d2] text-white shadow-xs"
                      : "bg-white/80 text-slate-600 hover:bg-white"
                  }`}
                >
                  <span>{scene.title.split(". ")[1]}</span>
                  {isActive && isPlaying && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 border border-slate-200 text-slate-600 hover:text-[#0072d2] shadow-2xs transition-all active:scale-90"
            title={isPlaying ? "Pause animation" : "Play animation"}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="translate-x-0.5" />}
          </button>
        </div>

        {/* Dynamic Animated Stage (Height Fixed to prevent jumping) */}
        <div className="relative my-4 h-[250px] sm:h-[265px] w-full rounded-2xl bg-white/90 border border-slate-200/90 p-4 shadow-inner flex flex-col justify-between overflow-hidden">
          {/* ============================================================== */}
          {/* SCENE 1: AI CAMERA SCAN OF MEDICINE STRIP                      */}
          {/* ============================================================== */}
          {activeScene === 1 && (
            <div className="relative flex flex-col h-full justify-between animate-in fade-in duration-300">
              {/* Scan HUD Top Bar */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 font-bold text-[#0072d2] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  <Scan size={12} className="animate-spin text-[#0072d2]" />
                  AI Vision Target Locked
                </span>
                <span className="font-mono text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  99.4% Match
                </span>
              </div>

              {/* Medicine Strip Visual with Animated Laser Scanner */}
              <div className="relative mx-auto my-2 w-full max-w-[280px] rounded-xl border-2 border-sky-300 bg-gradient-to-r from-slate-100 via-sky-50 to-slate-100 p-3 shadow-md overflow-hidden">
                {/* Animated Horizontal Laser Scan Beam */}
                <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-[bounce_2.2s_infinite]" />

                {/* Strip Branding */}
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">
                      Augmentin 625 Duo
                    </h5>
                    <p className="text-[9px] text-slate-500 font-medium">
                      Amoxicillin &amp; Potassium Clavulanate
                    </p>
                  </div>
                  <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                    10 Tabs
                  </span>
                </div>

                {/* 6 Foil Blister Pockets Graphic */}
                <div className="my-2 grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 rounded-lg bg-gradient-to-b from-white to-slate-200 border border-slate-300/80 shadow-inner flex items-center justify-center"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-300/60" />
                    </div>
                  ))}
                </div>

                {/* Detected Badges Row */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-bold">
                  <div className="flex items-center gap-1 rounded bg-white/95 px-1.5 py-0.5 border border-slate-200 text-slate-700">
                    <span className="text-slate-400 font-normal">MFD:</span> 03/2024
                  </div>
                  <div className="flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 border border-emerald-300 text-emerald-800">
                    <CheckCircle2 size={10} className="text-emerald-600" />
                    <span>EXP: 11/2026</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quote / Tag */}
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-[11px] text-emerald-800">
                <span className="font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  Tamper-evident Foil Verified
                </span>
                <span className="font-extrabold text-emerald-700">
                  Value: ₹112
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SCENE 2: FREE DOORSTEP PICKUP & HANDOVER                       */}
          {/* ============================================================== */}
          {activeScene === 2 && (
            <div className="relative flex flex-col h-full justify-between animate-in fade-in duration-300">
              {/* Header Status */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  <Truck size={12} className="animate-bounce" />
                  Doorstep Rider En Route
                </span>
                <span className="text-slate-500 font-semibold">ETA: 14 mins</span>
              </div>

              {/* Delivery Partner Avatar & Route Visual */}
              <div className="my-auto rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff6b2b] to-orange-400 text-white font-black text-base shadow-sm">
                    VR
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                      <CheckCircle2 size={10} />
                    </span>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      Vikram Rathore
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      ReMeD Certified Executive &bull; 4.9 ★ (340+ Pickups)
                    </p>
                    <span className="inline-block mt-0.5 rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800">
                      ⚡ Electric Scooter &bull; Zero Emissions
                    </span>
                  </div>
                </div>

                {/* Handover OTP Pill Box */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-2 border border-amber-200">
                  <span className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1">
                    <KeyRound size={11} /> Handover OTP:
                  </span>
                  <div className="flex items-center gap-1">
                    {["4", "8", "9", "2"].map((d, i) => (
                      <span
                        key={i}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 border border-amber-300 font-mono text-xs font-black text-slate-900 shadow-2xs"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zero Fee Guarantee Footer */}
              <div className="flex items-center justify-between rounded-xl bg-sky-50 border border-sky-200 px-2.5 py-1.5 text-[11px] text-[#0072d2]">
                <span className="font-semibold">Free Doorstep Collection</span>
                <span className="font-extrabold">₹0 Pickup Charge</span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SCENE 3: INSTANT UPI NOTIFICATION & PAYOUT                     */}
          {/* ============================================================== */}
          {activeScene === 3 && (
            <div className="relative flex flex-col h-full justify-between animate-in fade-in duration-300">
              {/* Top Bank Notification Banner */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <Zap size={12} className="text-emerald-600 fill-emerald-600" />
                  Instant UPI Credit
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Just now</span>
              </div>

              {/* Realistic Mobile Payment Notification Card */}
              <div className="my-auto rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-4 shadow-lg shadow-emerald-500/20">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                      Money Received
                    </span>
                    <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-0.5">
                      ₹112.00
                    </h4>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur text-white shadow-xs">
                    <CheckCircle2 size={20} />
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/20 text-[10px] text-emerald-100 space-y-0.5">
                  <p className="flex justify-between">
                    <span>Beneficiary:</span>
                    <strong className="font-mono text-white">anurag@okhdfcbank</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>NPCI UTR:</span>
                    <strong className="font-mono text-white">426819830219</strong>
                  </p>
                </div>
              </div>

              {/* Instant Assurance Strip */}
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-[11px] text-emerald-800">
                <span className="font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Credited in &lt; 45 Seconds
                </span>
                <span className="font-bold text-emerald-700">100% Guaranteed</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Feature Badges Strip */}
        <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <ShieldCheck size={14} className="text-emerald-600" />
            CDSCO Compliant
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Sparkles size={14} className="text-[#0072d2]" />
            Zero Landfill
          </span>
          <span className="flex items-center gap-1 font-bold text-[#ff6b2b]">
            Sell in 60s <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Floating Trust Pill Bottom */}
      <div className="absolute -bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-2xl bg-[#0072d2] px-3.5 py-1.5 shadow-lg text-[10px] sm:text-xs font-bold text-white">
        <span>10,000+ Strips Verified</span>
        <Sparkles size={12} className="text-amber-300" />
      </div>
    </div>
  );
}
