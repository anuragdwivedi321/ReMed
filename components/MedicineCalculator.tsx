"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Banknote,
  Plus,
  Minus,
  X,
  Pill,
} from "lucide-react";
import {
  COMPREHENSIVE_MEDICINES,
  searchMedicineDetails,
  MedicineItem,
} from "@/lib/medicineCatalog";

const DYNAMIC_PLACEHOLDERS = [
  "Augmentin 625 Duo...",
  "Dolo 650mg Tablet...",
  "Pan-D Capsule...",
  "Azithral 500mg...",
  "Shelcal 500 Tablet...",
  "Telma 40 Tablet...",
  "Montair-LC Tablet...",
  "Zerodol-P Tablet...",
  "Glycomet-GP 2...",
  "Cilacar 10 Tablet...",
];

export default function MedicineCalculator() {
  const router = useRouter();

  // State: Starts clean without pre-filling ghost calculations
  const [selectedMed, setSelectedMed] = useState<MedicineItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [customMrp, setCustomMrp] = useState<number | "">("");
  const [stripsCount, setStripsCount] = useState<number>(2);
  const [expiryBracket, setExpiryBracket] = useState<">12" | "6-12" | "3-6" | "<3">(">12");
  const [actionType, setActionType] = useState<"cash" | "donate">("cash");

  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic Typewriter Placeholder Effect
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isFocused || searchQuery.length > 0) return;

    const currentWord = DYNAMIC_PLACEHOLDERS[placeholderIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (placeholderText.length < currentWord.length) {
          setPlaceholderText(currentWord.slice(0, placeholderText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (placeholderText.length > 0) {
          setPlaceholderText(currentWord.slice(0, placeholderText.length - 1));
        } else {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % DYNAMIC_PLACEHOLDERS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, placeholderIndex, isFocused, searchQuery]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Multiplier calculation based on expiry bracket
  let rateMultiplier = 0.7; // >12 months: 70% of MRP
  if (expiryBracket === "6-12") rateMultiplier = 0.5;
  else if (expiryBracket === "3-6") rateMultiplier = 0.35;
  else if (expiryBracket === "<3") rateMultiplier = 0.15; // token amount or eco recycling

  // Strict sequential validation:
  const hasMedicine = searchQuery.trim().length > 0;
  const effectiveMrp = hasMedicine && typeof customMrp === "number" && customMrp > 0 ? customMrp : 0;
  const isReady = hasMedicine && effectiveMrp > 0;
  const totalMrp = isReady ? effectiveMrp * stripsCount : 0;
  const estimatedCashback = isReady ? Math.round(totalMrp * rateMultiplier) : 0;
  const estimatedImpactPeople = isReady ? Math.max(1, Math.round(stripsCount * 1.5)) : 0;

  // Search Results Filter with comprehensive list (active only while typing)
  const filteredOptions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return [];
    }
    return searchMedicineDetails(q, 150);
  }, [searchQuery]);

  function handleSelectMedicine(med: MedicineItem) {
    setSelectedMed(med);
    setSearchQuery(med.name);
    setCustomMrp(med.mrp); // Visibly auto-fills the price input so the user sees it
    setShowDropdown(false);
  }

  function handleSelectCustomMedicine(name: string) {
    const customItem: MedicineItem = {
      name,
      category: "Custom Medicine",
      mrp: typeof customMrp === "number" && customMrp > 0 ? customMrp : 0,
      composition: "User-Specified Medicine",
    };
    setSelectedMed(customItem);
    setSearchQuery(name);
    setShowDropdown(false);
  }

  function handleProceedToSell() {
    if (!isReady) return;
    const params = new URLSearchParams({
      name: searchQuery || (selectedMed ? selectedMed.name : "Medicine"),
      mrp: effectiveMrp.toString(),
      quantity: stripsCount.toString(),
      action: actionType,
    });
    router.push(`/sell?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-full min-w-0 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 p-4 sm:p-8 lg:p-10 shadow-xl shadow-blue-500/5">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200/80 min-w-0">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-sky-100 px-3 py-1 text-xs font-bold text-[#0072d2] mb-2">
            <Calculator size={14} /> Instant Buyback Calculator
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Check Your Medicine’s Cashback Value
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            See how much you can earn before scheduling a free doorstep pickup.
          </p>
        </div>

        {/* Cash / Donate Mode Toggle */}
        <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActionType("cash")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              actionType === "cash"
                ? "bg-white text-[#0072d2] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Banknote size={15} /> Cash Back
          </button>
          <button
            type="button"
            onClick={() => setActionType("donate")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              actionType === "donate"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <HeartHandshake size={15} /> Donate to Clinic
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Quick Select Popular Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Quick Pick Popular Medicines
              </label>
              <span className="text-[11px] font-semibold text-[#0072d2]">
                Instant 1-Click Select
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {COMPREHENSIVE_MEDICINES.filter((m) => m.popular)
                .slice(0, 7)
                .map((med) => {
                  const isSelected = selectedMed?.name === med.name && searchQuery === med.name;
                  return (
                    <button
                      key={med.name}
                      type="button"
                      onClick={() => handleSelectMedicine(med)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0072d2] text-white shadow-xs font-bold"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-sky-50/70 hover:border-sky-300"
                      }`}
                    >
                      {med.name.split(" ")[0]} ({med.category})
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Search Box with Clean Single Border & Live Custom Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Medicine Name or Salt
              </label>
              <span className="text-[11px] font-medium text-slate-500">
                1,000+ verified medicines in catalog
              </span>
            </div>

            {/* Input with crisp 1px single border (no double line or outer ring) */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  setIsFocused(true);
                  if (searchQuery.trim().length > 0) {
                    setShowDropdown(true);
                  }
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setShowDropdown(val.trim().length > 0);
                  // Check if matches exact med
                  const matched = COMPREHENSIVE_MEDICINES.find(
                    (m) => m.name.toLowerCase() === val.toLowerCase()
                  );
                  if (matched) {
                    setSelectedMed(matched);
                    setCustomMrp(matched.mrp);
                  }
                }}
                placeholder={
                  isFocused
                    ? "Type medicine name (e.g. Dolo, Augmentin, Pan-D, Calpol)..."
                    : `Search ${placeholderText}`
                }
                style={{ outline: "none" }}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 pr-10 text-sm font-semibold text-slate-900 shadow-xs outline-none focus:outline-none focus:border-[#0072d2] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-[0_4px_16px_rgba(0,114,210,0.12)] transition-all placeholder:text-slate-400 placeholder:font-normal"
              />

              <Search
                size={18}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                  isFocused ? "text-[#0072d2]" : "text-slate-400"
                }`}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedMed(null);
                    setCustomMrp("");
                    setShowDropdown(false);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Custom Interactive Dropdown Menu ONLY shown while typing */}
            {showDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-30 max-h-88 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-500/15 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Header showing matching count while typing */}
                <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-100 shrink-0 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#0072d2]" />
                    Matching Suggestions ({filteredOptions.length})
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Click to auto-calculate
                  </span>
                </div>

                {/* Scrollable list */}
                <div className="overflow-y-auto max-h-72 p-1.5 divide-y divide-slate-50">
                  {/* Custom option if user typed something unique */}
                  {searchQuery && (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectCustomMedicine(searchQuery);
                      }}
                      className="w-full flex items-center justify-between rounded-xl p-2.5 mb-1 text-left bg-sky-50/80 hover:bg-sky-100 border border-sky-200/80 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0072d2] text-white shrink-0">
                          <Plus size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0072d2]">
                            Use &quot;{searchQuery}&quot;
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Calculate buyback value for this specific medicine
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#0072d2] bg-white px-2 py-0.5 rounded-md border border-sky-200">
                        Select Custom
                      </span>
                    </button>
                  )}

                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((med) => (
                      <button
                        key={med.name}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectMedicine(med);
                        }}
                        className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-sky-50/80 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-[#0072d2] group-hover:bg-[#0072d2] group-hover:text-white transition-colors shrink-0">
                            <Pill size={15} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-[#0072d2] transition-colors">
                              {med.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {med.composition}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 block mb-0.5">
                            {med.category}
                          </span>
                          <span className="text-[11px] font-bold text-[#0072d2]">
                            MRP ₹{med.mrp}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      <p className="font-semibold text-slate-700">No exact medicine found</p>
                      <p className="text-[11px] mt-1 text-slate-500">
                        Click &quot;Use {searchQuery}&quot; above and enter printed strip MRP below.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2-Column: MRP & Number of Strips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Printed Strip MRP (₹)
                </label>
                {isReady && (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    ✓ Price Active
                  </span>
                )}
              </div>
              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 transition-all ${
                  !hasMedicine
                    ? "border-slate-200 bg-slate-50/80 cursor-not-allowed opacity-75"
                    : "border-slate-300 bg-white shadow-xs focus-within:border-[#0072d2] focus-within:ring-0 focus-within:shadow-[0_4px_16px_rgba(0,114,210,0.12)]"
                }`}
              >
                <span className="text-slate-400 font-bold mr-1.5 text-base">₹</span>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  disabled={!hasMedicine}
                  value={hasMedicine ? customMrp : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomMrp(val === "" ? "" : Number(val));
                  }}
                  placeholder={!hasMedicine ? "First enter/select medicine above" : "Enter strip MRP"}
                  style={{ outline: "none" }}
                  className={`w-full text-base font-bold outline-none ring-0 focus:outline-none focus:ring-0 ${
                    !hasMedicine ? "text-slate-400 cursor-not-allowed bg-transparent" : "text-slate-900 bg-white"
                  }`}
                />
              </div>
              <span className="text-[10px] mt-1 block">
                {!hasMedicine ? (
                  <span className="text-amber-600 font-medium">
                    ⚠️ Please select or type medicine name first
                  </span>
                ) : (
                  <span className="text-slate-400">Printed price on blister or box</span>
                )}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Number of Strips / Boxes
              </label>
              <div
                className={`flex items-center justify-between rounded-2xl border px-3 py-2 transition-all ${
                  !hasMedicine
                    ? "border-slate-200 bg-slate-50/80 opacity-75 cursor-not-allowed"
                    : "border-slate-300 bg-white shadow-xs"
                }`}
              >
                <button
                  type="button"
                  disabled={!hasMedicine}
                  onClick={() => setStripsCount((c) => Math.max(1, c - 1))}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                    !hasMedicine
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 cursor-pointer"
                  }`}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className={`font-display text-base font-extrabold ${!hasMedicine ? "text-slate-400" : "text-slate-900"}`}>
                  {stripsCount} {stripsCount === 1 ? "Strip" : "Strips"}
                </span>
                <button
                  type="button"
                  disabled={!hasMedicine}
                  onClick={() => setStripsCount((c) => Math.min(50, c + 1))}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                    !hasMedicine
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 cursor-pointer"
                  }`}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
              <span className="text-[10px] mt-1 block">
                {!hasMedicine ? (
                  <span className="text-amber-600 font-medium">
                    ⚠️ Select medicine above to change quantity
                  </span>
                ) : (
                  <span className="text-slate-400">Total units you want to sell/donate</span>
                )}
              </span>
            </div>
          </div>

          {/* Expiry Timeline Bracket */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Months Left Before Expiry
            </label>
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 transition-all ${!hasMedicine ? "opacity-75" : ""}`}>
              {[
                { id: ">12", label: "> 12 Months", badge: "Max Value (70%)" },
                { id: "6-12", label: "6 - 12 Months", badge: "Good (50%)" },
                { id: "3-6", label: "3 - 6 Months", badge: "Standard (35%)" },
                { id: "<3", label: "< 3 Months", badge: "Eco Recycle" },
              ].map((bracket) => {
                const isActive = expiryBracket === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    type="button"
                    disabled={!hasMedicine}
                    onClick={() => setExpiryBracket(bracket.id as typeof expiryBracket)}
                    className={`flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3 text-center border transition-all ${
                      !hasMedicine
                        ? "border-slate-200 bg-slate-50/80 text-slate-400 cursor-not-allowed"
                        : isActive
                        ? "border-[#0072d2] bg-sky-50 shadow-xs font-bold cursor-pointer"
                        : "border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
                    }`}
                  >
                    <span className={`text-xs font-bold ${!hasMedicine ? "text-slate-400" : isActive ? "text-[#0072d2]" : "text-slate-800"}`}>
                      {bracket.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {bracket.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Card with Instant Reactive Counter */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-blue-500/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${effectiveMrp > 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  Live Valuation
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={13} /> Verified Rates
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-600 min-w-0">
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="shrink-0">Selected Medicine:</span>
                  <span className={`font-bold truncate max-w-[140px] sm:max-w-[190px] text-right ${hasMedicine ? "text-slate-900" : "text-slate-400"}`}>
                    {hasMedicine ? searchQuery : "None (Select first)"}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="shrink-0">Formula Breakdown:</span>
                  {!hasMedicine ? (
                    <span className="text-amber-600/90 font-medium text-[11px] truncate text-right">
                      Select medicine name first
                    </span>
                  ) : effectiveMrp > 0 ? (
                    <span className="font-mono font-semibold text-slate-600 text-right">
                      {stripsCount} × ₹{effectiveMrp} × {Math.round(rateMultiplier * 100)}%
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium text-[11px] truncate text-right">
                      Enter strip MRP to calculate
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="shrink-0">Total Retail Value (MRP):</span>
                  <span className="font-mono font-bold text-slate-900">
                    {isReady ? `₹${totalMrp}` : "₹0"}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="shrink-0">Doorstep Pickup Fee:</span>
                  <span className="font-bold text-emerald-600">FREE (₹0)</span>
                </div>
              </div>

              {/* Big Result Box with Instant Reaction Animation */}
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50/40 p-5 border border-sky-100 text-center">
                <span className="text-xs font-bold text-[#0072d2] uppercase tracking-wider block">
                  {actionType === "cash"
                    ? "Guaranteed Cash Back On Pickup"
                    : "Estimated Free Clinic Benefit"}
                </span>

                {/* Animated value trigger */}
                <div
                  key={`${estimatedCashback}-${actionType}-${effectiveMrp}-${hasMedicine}`}
                  className="mt-2 flex items-baseline justify-center gap-1 animate-in zoom-in-95 duration-150"
                >
                  <span className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${isReady ? "text-[#0072d2]" : "text-slate-300"}`}>
                    ₹{estimatedCashback}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {!hasMedicine ? (
                    "Select or type your medicine name on the left to begin."
                  ) : effectiveMrp <= 0 ? (
                    "Enter printed strip MRP on the left to see live guaranteed payout."
                  ) : actionType === "cash" ? (
                    "Direct transfer into your UPI / Bank right at your door."
                  ) : (
                    `Helps ${estimatedImpactPeople} needy patients get free verified medicines.`
                  )}
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="mt-6">
              <button
                type="button"
                disabled={!isReady}
                onClick={handleProceedToSell}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-sm font-bold transition-all ${
                  isReady
                    ? "bg-gradient-to-r from-[#ff6b2b] to-[#f97316] text-white shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-95 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {!hasMedicine ? (
                  "Select Medicine Name First"
                ) : !effectiveMrp ? (
                  "Enter Strip MRP to Calculate"
                ) : actionType === "cash" ? (
                  `Sell for ₹${estimatedCashback}`
                ) : (
                  "Donate These Strips"
                )}{" "}
                <ArrowRight size={16} />
              </button>
              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-500" /> Free Doorstep Pickup
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={13} className="text-[#0072d2]" /> Zero Commission
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
