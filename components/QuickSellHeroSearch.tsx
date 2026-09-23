"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { MEDICINE_CATALOG } from "@/lib/medicineCatalog";

const POPULAR_MEDICINES = [
  "Dolo 650mg",
  "Augmentin 625 Duo",
  "Pan 40mg",
  "Azithral 500mg",
  "Telma 40",
];

export default function QuickSellHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      router.push("/sell");
      return;
    }
    router.push(`/sell?name=${encodeURIComponent(query.trim())}`);
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
          className="ml-2 sm:ml-2.5 text-slate-400 shrink-0 pointer-events-none"
        />
        <input
          type="text"
          list="quick-medicine-suggestions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine (e.g. Dolo)..."
          className="flex-1 min-w-0 w-full bg-transparent px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <datalist id="quick-medicine-suggestions">
          {MEDICINE_CATALOG.slice(0, 20).map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>

        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all shrink-0"
        >
          <span>Sell</span>
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Popular quick chips */}
      <div className="mt-2.5 flex items-center gap-1.5 w-full max-w-full min-w-0 overflow-x-auto pb-1 text-xs text-slate-500 no-scrollbar">
        <span className="shrink-0 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Trending:
        </span>
        {POPULAR_MEDICINES.map((med) => (
          <button
            key={med}
            type="button"
            onClick={() => router.push(`/sell?name=${encodeURIComponent(med)}`)}
            className="shrink-0 rounded-lg bg-white border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50 hover:text-[#0072d2] px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs transition-all active:scale-95"
          >
            {med}
          </button>
        ))}
      </div>
    </div>
  );
}
