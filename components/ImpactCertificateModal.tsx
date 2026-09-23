"use client";

import { useState } from "react";
import {
  Award,
  X,
  Share2,
  Download,
  Leaf,
  Droplets,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface ImpactCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  medicinesCount?: number;
}

export default function ImpactCertificateModal({
  isOpen,
  onClose,
  userName = "Rahul Sharma",
  medicinesCount = 6,
}: ImpactCertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const [certificateId] = useState(
    () => "REMED-ECO-2026-" + Math.floor(1000 + Math.random() * 9000)
  );

  if (!isOpen) return null;
  const carbonSavedKg = (medicinesCount * 0.85).toFixed(1);
  const waterProtectedLiters = medicinesCount * 180;
  const dosesRepurposed = medicinesCount * 10;

  function handleShareWhatsApp() {
    const text = `🌿 I just contributed ${dosesRepurposed} unexpired medicine doses and saved ${carbonSavedKg}kg carbon waste with ReMeD! Check your unused medicine cashback or donate at http://localhost:3000`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(
      `Check out my ReMeD Eco-Warrior Certificate (#${certificateId}) at http://localhost:3000`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Eco-Health Impact Certificate"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-white p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        {/* Soft background green ornament */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
        >
          <X size={18} />
        </button>

        {/* Certificate Border Container */}
        <div className="rounded-2xl border-2 border-emerald-600/30 bg-gradient-to-b from-emerald-50/40 via-white to-sky-50/20 p-6 sm:p-8 text-center relative">
          {/* Certificate Header Emblem */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
            <Award size={28} />
          </div>

          <div className="mt-3 inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
            OFFICIAL RECOGNITION • CERTIFIED GREEN IMPACT
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Eco-Health Warrior Certificate
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            This certificate is proudly awarded to
          </p>

          <h3 className="mt-1 font-display text-xl sm:text-2xl font-black text-[#0072d2] tracking-wide">
            {userName}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            For responsibly recycling and redistributing unexpired medicines,
            preventing biomedical groundwater contamination, and supporting healthcare accessibility.
          </p>

          {/* 3 Impact Stats Metrics */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-emerald-200/60 py-4 text-left">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-emerald-100">
              <Leaf size={18} className="text-emerald-600 mb-1" />
              <span className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                {carbonSavedKg} kg
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Carbon Prevented
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-sky-100">
              <Droplets size={18} className="text-[#0072d2] mb-1" />
              <span className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                {waterProtectedLiters} L
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Water Shielded
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 border border-teal-100">
              <ShieldCheck size={18} className="text-teal-600 mb-1" />
              <span className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                {dosesRepurposed}+
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Doses Recycled
              </span>
            </div>
          </div>

          {/* Footer of certificate with verification id */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>Certificate ID: <strong className="text-slate-700 font-mono">{certificateId}</strong></span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 size={13} /> ReMeD Healthcare Foundation
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all text-center"
          >
            <Download size={15} /> {copied ? "Certificate Link Copied! ✓" : "Copy Certificate Link"}
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-500 active:scale-95 transition-all text-center"
          >
            <Share2 size={15} /> Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
