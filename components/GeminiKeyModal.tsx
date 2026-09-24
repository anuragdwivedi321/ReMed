"use client";

import { useState, useEffect } from "react";
import { Sparkles, Key, Check, X, ExternalLink, ShieldCheck } from "lucide-react";
import { getGeminiApiKey, setGeminiApiKey } from "@/lib/geminiVision";

interface GeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export default function GeminiKeyModal({ isOpen, onClose, onKeySaved }: GeminiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getGeminiApiKey() || "");
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKey.trim());
    setSaved(true);
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-250">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0072d2]">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Gemini AI Vision Setup
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Free medicine strip &amp; expiry scanner
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800">
              Google Gemini API Key
            </label>
            <div className="relative mt-1.5 flex items-center">
              <Key size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-mono focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Your key is stored securely in your browser and used directly for strip OCR.
            </p>
          </div>

          <div className="rounded-xl bg-sky-50 border border-sky-100 p-3 text-xs text-sky-900 flex items-start gap-2">
            <ShieldCheck size={16} className="text-[#0072d2] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Need a free Gemini key?</p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#0072d2] hover:underline mt-0.5"
              >
                <span>Get free key at Google AI Studio</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0072d2] to-sky-600 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:brightness-105 active:scale-95 transition-all"
            >
              {saved ? (
                <>
                  <Check size={16} /> Saved Successfully!
                </>
              ) : (
                "Save & Activate AI Vision"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
