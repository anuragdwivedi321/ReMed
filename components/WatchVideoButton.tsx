"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import DemoVideoModal from "@/components/DemoVideoModal";

interface WatchVideoButtonProps {
  className?: string;
  variant?: "hero" | "compact" | "pill";
  label?: string;
}

export default function WatchVideoButton({
  className,
  variant = "hero",
  label = "Watch Video",
}: WatchVideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  let defaultClasses =
    "flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-[#0072d2] shadow-sm hover:border-[#0072d2] hover:bg-sky-50/50 active:scale-95 transition-all text-center cursor-pointer";

  if (variant === "compact") {
    defaultClasses =
      "inline-flex items-center gap-2 rounded-lg bg-sky-50 border border-sky-200 px-3.5 py-1.5 text-xs font-bold text-[#0072d2] hover:bg-sky-100 transition-all cursor-pointer";
  } else if (variant === "pill") {
    defaultClasses =
      "inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-4 py-2 text-xs font-bold text-[#0072d2] shadow-xs hover:bg-sky-50 transition-all cursor-pointer";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className || defaultClasses}
        aria-label="Watch ReMeD walkthrough video demo"
      >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0072d2] text-white">
          <Play size={12} className="fill-white ml-0.5" />
        </div>
        <span>{label}</span>
      </button>

      {isOpen && (
        <DemoVideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
