"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { MEDICINE_CATALOG } from "@/lib/medicineCatalog";

// Common running / high-demand medicines in India
const RUNNING_MEDICINES = [
  "Dolo 650mg",
  "Augmentin 625 Duo",
  "Pan 40mg",
  "Azithral 500mg",
  "Telma 40",
  "Shelcal 500",
  "Montair LC",
  "Glycomet 500",
];

const POPULAR_MEDICINES = [
  "Dolo 650mg",
  "Augmentin 625",
  "Pan 40mg",
  "Azithral 500",
  "Telma 40",
];

export default function QuickSellHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Smoothly cycle running medicine names in the search placeholder
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % RUNNING_MEDICINES.length);
        setIsFading(false);
      }, 250);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalQuery = query.trim() || RUNNING_MEDICINES[activeIdx];
    router.push(`/sell?name=${encodeURIComponent(finalQuery)}`);
  };

  return (
    <div className="mt-4 sm:mt-5 w-full max-w-xl min-w-0">
      {/* Integrated Single-Row Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full max-w-full min-w-0 rounded-2xl bg-white border-2 border-slate-200/90 p-1 sm:p-1.5 shadow-md shadow-sky-500/5 focus-within:border-[#0072d2] focus-within:ring-4 focus-within:ring-sky-100 transition-all"
      >
        <Search
          size={18}
          className="ml-2 sm:ml-2.5 text-slate-300 shrink-0 pointer-events-none"
        />

        {/* Low-visibility running medicine hint overlay (visible only when input is empty) */}
        {!query && (
          <div className="pointer-events-none absolute left-8 sm:left-9.5 right-20 sm:right-24 flex items-center overflow-hidden h-full select-none">
            <span
              className={`text-xs sm:text-sm text-slate-300 font-normal truncate transition-opacity duration-300 ease-in-out ${
                isFading ? "opacity-0" : "opacity-90"
              }`}
            >
              Search &lsquo;{RUNNING_MEDICINES[activeIdx]}&rsquo;...
            </span>
          </div>
        )}

        <input
          type="text"
          list="quick-medicine-suggestions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder=""
          aria-label="Search medicine name"
          className="flex-1 min-w-0 w-full bg-transparent px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-base text-slate-900 focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0"
        />

        <datalist id="quick-medicine-suggestions">
          {MEDICINE_CATALOG.slice(0, 20).map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>

        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all shrink-0 z-10"
        >
          <span>Sell</span>
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Low-visibility subtle running chips */}
      <div className="mt-2.5 flex items-center gap-1.5 w-full max-w-full min-w-0 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="shrink-0 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Popular:
        </span>
        {POPULAR_MEDICINES.map((med) => (
          <button
            key={med}
            type="button"
            onClick={() => router.push(`/sell?name=${encodeURIComponent(med)}`)}
            className="shrink-0 rounded-lg bg-slate-50/70 border border-slate-200/60 hover:border-sky-300 hover:bg-sky-50/60 hover:text-[#0072d2] px-2 py-0.5 text-[10.5px] font-normal text-slate-400 hover:text-slate-600 transition-all active:scale-95"
          >
            {med}
          </button>
        ))}
      </div>
    </div>
  );
}
