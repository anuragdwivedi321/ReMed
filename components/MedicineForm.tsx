"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Loader2,
  ScanText,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import CameraCapture from "@/components/CameraCapture";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Condition, Listing, MedicineCategory, PhotoAsset, QuantityUnit } from "@/lib/types";
import {
  daysUntil,
  estimatePrice,
  isEligibleToSell,
  isExpired,
  isExpiringWithinOneMonth,
  isNearExpiry,
  isValidExpiryDate,
} from "@/lib/priceEstimator";
import { findMedicines, MEDICINE_CATALOG } from "@/lib/medicineCatalog";
import { extractExpiryDate } from "@/lib/expiryOcr";

const CATEGORIES: { value: MedicineCategory; label: string }[] = [
  { value: "tablet", label: "Tablet" },
  { value: "capsule", label: "Capsule" },
  { value: "syrup", label: "Syrup" },
  { value: "injection", label: "Injection" },
  { value: "ointment", label: "Ointment / Cream" },
  { value: "drops", label: "Drops" },
  { value: "other", label: "Other" },
];

const UNITS: { value: QuantityUnit; label: string }[] = [
  { value: "tablets", label: "Tablets" },
  { value: "strip", label: "Strip(s)" },
  { value: "bottle", label: "Bottle(s)" },
  { value: "ml", label: "ml" },
  { value: "units", label: "Unit(s)" },
];

const MONTH_OPTIONS = [
  { value: "01", label: "01 - January" },
  { value: "02", label: "02 - February" },
  { value: "03", label: "03 - March" },
  { value: "04", label: "04 - April" },
  { value: "05", label: "05 - May" },
  { value: "06", label: "06 - June" },
  { value: "07", label: "07 - July" },
  { value: "08", label: "08 - August" },
  { value: "09", label: "09 - September" },
  { value: "10", label: "10 - October" },
  { value: "11", label: "11 - November" },
  { value: "12", label: "12 - December" },
];

export default function MedicineForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialName = searchParams?.get("name") || "";
  const initialQty = searchParams?.get("quantity") ? Number(searchParams.get("quantity")) : 1;

  const { createListing } = useStore();
  const { user } = useAuth();

  const [medicineName, setMedicineName] = useState(initialName);
  const [category, setCategory] = useState<MedicineCategory>("tablet");
  const [quantityValue, setQuantityValue] = useState(initialQty > 0 ? initialQty : 1);
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>("strip");
  const [expiryDate, setExpiryDate] = useState("");
  const [dayVal, setDayVal] = useState("");
  const [monthVal, setMonthVal] = useState("");
  const [yearVal, setYearVal] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [condition, setCondition] = useState<Condition>("sealed");
  const [packagePhotos, setPackagePhotos] = useState<PhotoAsset[]>([]);
  const [expiryPhotos, setExpiryPhotos] = useState<PhotoAsset[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scanningExpiry, setScanningExpiry] = useState(false);
  const [ocrMessage, setOcrMessage] = useState<string | null>(null);
  const scannedPhotoIds = useRef(new Set<string>());

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const maxYear = currentYear + 6;
  const YEAR_OPTIONS = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => currentYear + i);
  }, [currentYear]);

  const updateDateParts = (d: string, m: string, y: string) => {
    setDayVal(d);
    setMonthVal(m);
    setYearVal(y);

    if (m && y && y.length === 4) {
      const monthNum = parseInt(m, 10);
      const yearNum = parseInt(y, 10);
      const dayNum = d ? parseInt(d, 10) : 1;
      if (monthNum >= 1 && monthNum <= 12) {
        const maxDays = new Date(yearNum, monthNum, 0).getDate();
        const validDay = d ? Math.min(Math.max(1, dayNum), maxDays) : maxDays;
        const iso = `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(validDay).padStart(2, "0")}`;
        setExpiryDate(iso);
        return;
      }
    }
    setExpiryDate("");
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val.length > 0) {
      const num = parseInt(val, 10);
      if (num > 31) val = "31";
    }
    updateDateParts(val, monthVal, yearVal);
    if (val.length === 2 && monthInputRef.current) {
      monthInputRef.current.focus();
      monthInputRef.current.select();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val.length > 0) {
      const num = parseInt(val, 10);
      if (num > 12) val = "12";
    }
    updateDateParts(dayVal, val, yearVal);
    if (val.length === 2 && yearInputRef.current) {
      yearInputRef.current.focus();
      yearInputRef.current.select();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly limited to digits only, maximum 4 digits (never allows 6 digits or overflow)
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    updateDateParts(dayVal, monthVal, val);
  };

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowRight") {
      if (monthInputRef.current) monthInputRef.current.focus();
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !monthVal && dayInputRef.current) {
      dayInputRef.current.focus();
    } else if (e.key === "ArrowLeft" && dayInputRef.current) {
      dayInputRef.current.focus();
    } else if (e.key === "ArrowRight" && yearInputRef.current) {
      yearInputRef.current.focus();
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !yearVal && monthInputRef.current) {
      monthInputRef.current.focus();
    } else if (e.key === "ArrowLeft" && monthInputRef.current) {
      monthInputRef.current.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    const match = pasted.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (match) {
      updateDateParts(match[1].padStart(2, "0"), match[2].padStart(2, "0"), match[3]);
      return;
    }
    const isoMatch = pasted.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (isoMatch) {
      updateDateParts(isoMatch[3].padStart(2, "0"), isoMatch[2].padStart(2, "0"), isoMatch[1]);
      return;
    }
    const myMatch = pasted.match(/^(\d{1,2})[-/.](\d{4})$/);
    if (myMatch) {
      const m = myMatch[1].padStart(2, "0");
      const y = myMatch[2];
      const maxDays = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
      updateDateParts(String(maxDays).padStart(2, "0"), m, y);
    }
  };

  const isInvalidFutureDate = useMemo(() => {
    if (!expiryDate) return false;
    if (!isValidExpiryDate(expiryDate)) return true;
    const parts = expiryDate.split("-");
    const yr = parseInt(parts[0], 10);
    return isNaN(yr) || yr > maxYear || parts[0].length > 4;
  }, [expiryDate, maxYear]);

  const remainingDays = expiryDate ? daysUntil(expiryDate) : 0;
  const expired = expiryDate ? isExpired(expiryDate) : false;
  const expiringWithinOneMonth = expiryDate ? isExpiringWithinOneMonth(expiryDate) : false;
  const eligibleToSell = expiryDate ? isEligibleToSell(expiryDate) : false;
  const nearExpiry = expiryDate ? isNearExpiry(expiryDate) : false;

  const estimate = useMemo(() => {
    if (!expiryDate || isInvalidFutureDate || !eligibleToSell) return null;
    return estimatePrice({ category, quantityValue, quantityUnit, expiryDate, condition });
  }, [category, quantityValue, quantityUnit, expiryDate, condition, isInvalidFutureDate, eligibleToSell]);

  const medicineSuggestions = useMemo(
    () => findMedicines(medicineName),
    [medicineName]
  );

  useEffect(() => {
    const photo = expiryPhotos.at(-1);
    if (!photo || scannedPhotoIds.current.has(photo.id)) return;
    scannedPhotoIds.current.add(photo.id);

    let cancelled = false;
    async function scanExpiry() {
      setScanningExpiry(true);
      setOcrMessage("Reading the expiry label from your photo…");
      try {
        const { recognize } = await import("tesseract.js");
        const result = await recognize(photo!.dataUrl, "eng");
        if (cancelled) return;
        const detected = extractExpiryDate(result.data.text);
        if (detected) {
          setExpiryDate(detected);
          const parts = detected.split("-");
          if (parts[0]) setYearVal(parts[0]);
          if (parts[1]) setMonthVal(parts[1].padStart(2, "0"));
          if (parts[2]) setDayVal(parts[2].padStart(2, "0"));
          setOcrMessage(
            `Expiry detected: ${new Date(`${detected}T00:00:00`).toLocaleDateString("en-IN")}. Please confirm it.`
          );
        } else {
          setOcrMessage("Expiry was not clear. Try a closer, well-lit photo or enter it manually.");
        }
      } catch {
        if (!cancelled) setOcrMessage("Could not scan this photo. Please enter the expiry manually.");
      } finally {
        if (!cancelled) setScanningExpiry(false);
      }
    }
    scanExpiry();
    return () => {
      cancelled = true;
    };
  }, [expiryPhotos]);

  const canSubmit =
    medicineName.trim().length > 1 &&
    quantityValue > 0 &&
    Boolean(expiryDate) &&
    eligibleToSell &&
    !isInvalidFutureDate &&
    packagePhotos.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!medicineName.trim()) return setFormError("Add the medicine name.");
    if (!expiryDate) return setFormError("Add the expiry date.");
    if (expired)
      return setFormError("This medicine has expired — expired medicines cannot be accepted for resale.");
    if (expiringWithinOneMonth)
      return setFormError(
        `Medicine expires in ${remainingDays} day(s). At least 1 month (30 days) of remaining shelf-life is required to sell.`
      );
    if (!eligibleToSell)
      return setFormError(
        "Medicine must have at least 1 month (30 days) shelf-life remaining to be eligible for sale."
      );
    if (isInvalidFutureDate)
      return setFormError(
        `Invalid expiry date — standard medicine shelf-life cannot exceed 5 years (${maxYear}).`
      );
    if (packagePhotos.length === 0)
      return setFormError("Add at least one photo of the strip or box.");

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network round-trip

    const listing: Listing = {
      id: crypto.randomUUID(),
      userId: user?.id ?? "demo-user",
      medicineName: medicineName.trim(),
      category,
      quantityValue,
      quantityUnit,
      expiryDate,
      condition,
      photos: [...packagePhotos, ...expiryPhotos],
      estimatedPrice: estimate?.price ?? 0,
      status: "pending_review",
      createdAt: new Date().toISOString(),
    };

    createListing(listing);
    setSubmitting(false);
    setSubmitted(listing.id);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-sky-100 bg-white p-7 sm:p-9 text-center shadow-xl shadow-sky-500/10 min-w-0">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-200">
          <CheckCircle2 size={34} />
        </div>
        <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          Step 1 Complete: Medicine Verified &amp; Accepted ✓
        </span>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready for Doorstep Pickup!
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          Your unexpired medicine is accepted for buyback. Now schedule your preferred date, 2-hour time slot, and enter your UPI ID for instant payout.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/dashboard/${submitted}`)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Doorstep Pickup &amp; UPI</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Go to My Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1.3fr_1fr] pb-32 lg:pb-0">
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <label className="block text-sm font-bold text-slate-900" htmlFor="medicineName">
            Medicine Name
          </label>
          <div className="relative">
            <input
              id="medicineName"
              list="medicine-suggestions"
              value={medicineName}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onChange={(e) => {
                setMedicineName(e.target.value);
                setShowSuggestions(true);
              }}
              autoComplete="off"
              placeholder="e.g. Azithromycin 500mg"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
            />
            {showSuggestions && medicineSuggestions.length > 0 && (
              <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-2xl border border-sky-100 bg-white p-1.5 shadow-xl">
                {medicineSuggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onMouseDown={() => {
                      setMedicineName(name);
                      setShowSuggestions(false);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0072d2] transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <datalist id="medicine-suggestions">
            {MEDICINE_CATALOG.map((m) => (
              <option value={m} key={m} />
            ))}
          </datalist>

          {/* Category Touch Chips */}
          <div className="mt-5">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {CATEGORIES.map((c) => {
                const isSelected = category === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold transition-all active:scale-95 ${
                      isSelected
                        ? "bg-[#0072d2] text-white shadow-sm shadow-blue-500/25 scale-[1.02]"
                        : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Condition Pills */}
          <div className="mt-4">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Packaging Condition
            </label>
            <div className="grid grid-cols-2 gap-2.5 max-w-sm">
              <button
                type="button"
                onClick={() => setCondition("sealed")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-bold border transition-all active:scale-95 ${
                  condition === "sealed"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs ring-1 ring-emerald-500"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>🛡️</span>
                <span>Sealed / Unopened</span>
              </button>
              <button
                type="button"
                onClick={() => setCondition("opened")}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-bold border transition-all active:scale-95 ${
                  condition === "opened"
                    ? "bg-amber-50 border-amber-500 text-amber-800 shadow-xs ring-1 ring-amber-500"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>📦</span>
                <span>Opened Pack</span>
              </button>
            </div>
          </div>

          {/* Quantity Touch Stepper & Unit */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1.5" htmlFor="quantityValue">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantityValue((q) => Math.max(1, q - 1))}
                  disabled={quantityValue <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg transition-all"
                >
                  −
                </button>
                <input
                  id="quantityValue"
                  type="number"
                  min={1}
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(Math.max(1, Number(e.target.value)))}
                  className="h-11 w-full text-center font-mono font-extrabold text-base text-slate-900 rounded-xl border border-slate-300 bg-white focus:border-[#0072d2] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setQuantityValue((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-300 bg-sky-50 text-[#0072d2] hover:bg-sky-100 active:scale-95 font-bold text-lg transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1.5" htmlFor="quantityUnit">
                Unit
              </label>
              <select
                id="quantityUnit"
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value as QuantityUnit)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 text-base sm:text-sm text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
              >
                {UNITS.map((u) => (
                  <option value={u.value} key={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 relative" ref={pickerRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-bold text-slate-900" htmlFor="dayInput">
                Expiry Date <span className="text-xs font-normal text-slate-500">(DD / MM / YYYY)</span>
              </label>
              <span className="text-[11px] font-semibold text-[#0072d2] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Valid: {currentYear} – {maxYear}
              </span>
            </div>

            {/* Professional Unified Date Box with Day / Month / Year */}
            <div
              onPaste={handlePaste}
              className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 transition-all focus-within:border-[#0072d2] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
            >
              <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                <Calendar size={18} className="text-[#0072d2] shrink-0 mr-1.5" />

                {/* Day Input */}
                <input
                  ref={dayInputRef}
                  id="dayInput"
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="DD"
                  value={dayVal}
                  onChange={handleDayChange}
                  onKeyDown={handleDayKeyDown}
                  className="w-8 text-center font-mono text-sm font-bold text-slate-900 bg-transparent placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:bg-blue-50/80 rounded"
                />

                <span className="text-slate-400 font-bold select-none">/</span>

                {/* Month Input */}
                <input
                  ref={monthInputRef}
                  id="monthInput"
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="MM"
                  value={monthVal}
                  onChange={handleMonthChange}
                  onKeyDown={handleMonthKeyDown}
                  className="w-8 text-center font-mono text-sm font-bold text-slate-900 bg-transparent placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:bg-blue-50/80 rounded"
                />

                <span className="text-slate-400 font-bold select-none">/</span>

                {/* Year Input - STRICTLY 4 DIGITS */}
                <input
                  ref={yearInputRef}
                  id="yearInput"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="YYYY"
                  value={yearVal}
                  onChange={handleYearChange}
                  onKeyDown={handleYearKeyDown}
                  className="w-14 text-center font-mono text-sm font-bold text-slate-900 bg-transparent placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:bg-blue-50/80 rounded tracking-wider"
                />
              </div>

              {/* Calendar Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#0072d2] bg-blue-50 hover:bg-blue-100 rounded-lg transition-all active:scale-95"
              >
                <span>{isPickerOpen ? "Close" : "Pick Date"}</span>
                <Calendar size={14} />
              </button>
            </div>


            {/* Interactive Popover Picker */}
            {isPickerOpen && (
              <div className="mt-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-blue-900/10 z-20 transition-all">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">Select Expiry Month &amp; Year</span>
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(false)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Months Grid */}
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Month</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mb-3.5">
                  {MONTH_OPTIONS.map((m) => {
                    const isSel = monthVal === m.value;
                    return (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => {
                          const d = dayVal || "31";
                          const y = yearVal || String(currentYear + 1);
                          updateDateParts(d, m.value, y);
                        }}
                        className={`py-1.5 px-1 text-xs font-semibold rounded-lg border text-center transition-all ${
                          isSel
                            ? "bg-[#0072d2] text-white border-[#0072d2] font-bold"
                            : "bg-slate-50 hover:bg-blue-50/60 text-slate-700 border-slate-200"
                        }`}
                      >
                        {m.label.split(" - ")[1].slice(0, 3)}
                      </button>
                    );
                  })}
                </div>

                {/* Years Grid */}
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Year (Valid 5 Yrs)</p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {YEAR_OPTIONS.map((y) => {
                    const isSel = yearVal === String(y);
                    const isPast = y < currentYear;
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => {
                          const d = dayVal || "31";
                          const m = monthVal || "12";
                          updateDateParts(d, m, String(y));
                          setIsPickerOpen(false);
                        }}
                        className={`py-1.5 px-1 text-xs font-semibold rounded-lg border text-center transition-all ${
                          isSel
                            ? "bg-[#0072d2] text-white border-[#0072d2] font-bold"
                            : isPast
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-slate-50 hover:bg-blue-50/60 text-slate-700 border-slate-200"
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Status Feedback alerts */}
            {expired && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                <ShieldAlert size={16} className="shrink-0 text-red-600" />
                <span>
                  This medicine has already expired ({remainingDays < 0 ? `${Math.abs(remainingDays)} days ago` : "expired"}) — expired medicines cannot be accepted for resale.
                </span>
              </p>
            )}
            {!expired && expiringWithinOneMonth && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                <AlertTriangle size={16} className="shrink-0 text-red-600" />
                <span>
                  Expiring in {remainingDays} day{remainingDays === 1 ? "" : "s"} — medicines must have at least 1 month (30 days) shelf-life remaining to be eligible for sale.
                </span>
              </p>
            )}
            {isInvalidFutureDate && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Invalid expiry date — standard medicine shelf-life cannot exceed 5 years ({maxYear}).</span>
              </p>
            )}
            {eligibleToSell && !isInvalidFutureDate && nearExpiry && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <AlertTriangle size={16} className="shrink-0" />
                <span>
                  Expiring in {remainingDays} days (~{Math.max(1, Math.ceil(remainingDays / 30))} months) — eligible to sell, but price is discounted.
                </span>
              </p>
            )}
            {expiryDate && eligibleToSell && !isInvalidFutureDate && !nearExpiry && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>
                  ✓ Eligible to Sell:{" "}
                  {new Date(expiryDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  ({Math.floor(remainingDays / 30)} month(s) remaining)
                </span>
              </p>
            )}
          </div>
        </div>

        <CameraCapture
          label="package"
          title="Photo of Strip or Box"
          helperText="Show the medicine name and dosage clearly."
          photos={packagePhotos}
          onChange={setPackagePhotos}
        />

        <CameraCapture
          label="expiry"
          title="Close-up of Expiry Date"
          helperText="Our AI scanner will read the date automatically."
          photos={expiryPhotos}
          onChange={setExpiryPhotos}
          maxPhotos={2}
        />

        {ocrMessage && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-slate-700 shadow-sm"
          >
            {scanningExpiry ? (
              <Loader2 size={18} className="mt-0.5 shrink-0 animate-spin text-[#0072d2]" />
            ) : expiryDate ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
            ) : (
              <ScanText size={18} className="mt-0.5 shrink-0 text-amber-600" />
            )}
            <span className="font-medium">{ocrMessage}</span>
          </div>
        )}
      </div>

      {/* Right Column: Price Estimator Panel */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-blue-500/5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Estimated Price</h3>
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-[#0072d2]">
              Instant Quote
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            A transparent starting quote — confirmed by our team before pickup.
          </p>

          <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#eaf4ff] to-[#f0f7ff] border border-sky-100 p-6 text-center">
            {expiryDate && expired ? (
              <div className="py-4 text-center">
                <ShieldAlert size={32} className="mx-auto text-red-500 mb-2" />
                <p className="text-base font-bold text-red-700">
                  Expired Medicine
                </p>
                <p className="mt-1 text-xs text-red-600">
                  Expired medicines cannot be purchased or scheduled for pickup.
                </p>
              </div>
            ) : expiryDate && expiringWithinOneMonth ? (
              <div className="py-4 text-center">
                <AlertTriangle size={32} className="mx-auto text-amber-600 mb-2" />
                <p className="text-base font-bold text-amber-800">
                  Expiring Within 1 Month
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  Only {remainingDays} day{remainingDays === 1 ? "" : "s"} left. Minimum 30 days remaining shelf-life required to be eligible for sale.
                </p>
              </div>
            ) : isInvalidFutureDate ? (
              <div className="py-4 text-center">
                <AlertTriangle size={28} className="mx-auto text-amber-500 mb-2" />
                <p className="text-sm font-bold text-amber-800">
                  Invalid Expiry Date
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Shelf-life cannot exceed 5 years (up to {maxYear}).
                </p>
              </div>
            ) : estimate && eligibleToSell ? (
              <>
                <p className="font-mono-brand text-4xl sm:text-5xl font-extrabold text-[#0072d2]">
                  ₹{estimate.price}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  {estimate.monthsToExpiry > 0
                    ? `${estimate.monthsToExpiry} month(s) remaining shelf-life`
                    : "Eligible for pickup"}
                </p>
              </>
            ) : (
              <div className="py-4">
                <ClipboardList size={28} className="mx-auto text-sky-400 mb-2" />
                <p className="text-sm font-medium text-slate-600">
                  Add medicine name, valid expiry date &amp; quantity to see your quote.
                </p>
              </div>
            )}
          </div>

          {formError && (
            <p className="mt-4 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-semibold text-red-600">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Submitting Listing..." : "Submit for Pickup"}
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Verified compliance &amp; doorstep pickup guaranteed</span>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Floating Booking Bar (Fixed above MobileBottomNav on < lg screens) */}
      <div className="fixed bottom-14 left-0 right-0 z-30 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Payout Quote
            </span>
            {expired ? (
              <span className="text-xs font-bold text-red-600">Expired</span>
            ) : expiringWithinOneMonth ? (
              <span className="text-xs font-bold text-amber-700">&lt; 30d shelf-life</span>
            ) : estimate && eligibleToSell ? (
              <div className="flex items-baseline gap-1">
                <span className="font-mono-brand text-2xl font-extrabold text-[#0072d2] leading-none">
                  ₹{estimate.price}
                </span>
                <span className="text-[10px] font-bold text-slate-500">quote</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-500">Enter details</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 active:scale-95 disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none transition-all text-center"
          >
            {submitting && <Loader2 size={14} className="animate-spin shrink-0" />}
            <span>{submitting ? "Submitting..." : "Submit for Pickup"}</span>
            <ArrowRight size={14} className="shrink-0" />
          </button>
        </div>
      </div>
    </form>
  );
}
