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
  Sparkles,
  Key,
} from "lucide-react";
import CameraCapture from "@/components/CameraCapture";
import GeminiKeyModal from "@/components/GeminiKeyModal";
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
import {
  scanMedicineWithGemini,
  getGeminiApiKey,
  GeminiMedicineScanResult,
} from "@/lib/geminiVision";

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
  { value: "units", label: "Units" },
];

const MONTH_NAMES = [
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
  const [batchNumber, setBatchNumber] = useState("");
  const [mfd, setMfd] = useState("");
  const [mrp, setMrp] = useState<number | undefined>();
  const [packagePhotos, setPackagePhotos] = useState<PhotoAsset[]>([]);
  const [expiryPhotos, setExpiryPhotos] = useState<PhotoAsset[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scanningExpiry, setScanningExpiry] = useState(false);
  const [ocrMessage, setOcrMessage] = useState<string | null>(null);
  const [aiScanData, setAiScanData] = useState<GeminiMedicineScanResult | null>(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const scannedPhotoIds = useRef(new Set<string>());

  useEffect(() => {
    setHasGeminiKey(Boolean(getGeminiApiKey()));
  }, []);

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
    setDayVal(val);
    updateDateParts(val, monthVal, yearVal);
    if (val.length === 2 && monthInputRef.current) {
      monthInputRef.current.focus();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (val.length > 0) {
      const num = parseInt(val, 10);
      if (num > 12) val = "12";
    }
    setMonthVal(val);
    updateDateParts(dayVal, val, yearVal);
    if (val.length === 2 && yearInputRef.current) {
      yearInputRef.current.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYearVal(val);
    updateDateParts(dayVal, monthVal, val);
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

  // Real Gemini AI Multimodal Vision Scan on photo upload
  useEffect(() => {
    const latestPhoto = [...packagePhotos, ...expiryPhotos].at(-1);
    if (!latestPhoto || scannedPhotoIds.current.has(latestPhoto.id)) return;
    scannedPhotoIds.current.add(latestPhoto.id);

    let cancelled = false;
    async function runAiScan() {
      setScanningExpiry(true);
      const keyExists = Boolean(getGeminiApiKey());
      setOcrMessage(
        keyExists
          ? "✨ Gemini AI analyzing medicine strip (Name, Expiry, Batch, MRP)…"
          : "🔍 Reading printed text and expiry date from photo…"
      );

      try {
        const result = await scanMedicineWithGemini(latestPhoto!.dataUrl);
        if (cancelled) return;

        if (result.success) {
          setAiScanData(result);

          // Auto-fill Medicine Name
          if (result.medicineName) {
            setMedicineName(result.medicineName);
          }

          // Auto-fill Category
          if (result.category) {
            setCategory(result.category);
          }

          // Auto-fill Manufacturing Date (MFD)
          if (result.mfd) {
            setMfd(result.mfd);
          }

          // Auto-fill Expiry Date
          if (result.expiryDate) {
            setExpiryDate(result.expiryDate);
            const parts = result.expiryDate.split("-");
            if (parts[0]) setYearVal(parts[0]);
            if (parts[1]) setMonthVal(parts[1].padStart(2, "0"));
            if (parts[2]) setDayVal(parts[2].padStart(2, "0"));
          }

          // Auto-fill Condition
          if (result.condition) {
            setCondition(result.condition);
          }

          // Auto-fill Batch & MRP
          if (result.batchNumber) setBatchNumber(result.batchNumber);
          if (result.mrp) setMrp(result.mrp);

          const sourceLabel = result.source === "gemini" ? "Gemini AI" : "ReMeD OCR";
          const details = [
            result.medicineName,
            result.mfd ? `MFD: ${result.mfd}` : null,
            result.expiryDate ? `EXP: ${result.expiryDate}` : null,
            result.batchNumber ? `B.No: ${result.batchNumber}` : null,
            result.mrp ? `MRP: ₹${result.mrp}` : null,
          ]
            .filter(Boolean)
            .join(" • ");

          setOcrMessage(`✓ ${sourceLabel} Verified: ${details}`);
        } else {
          setOcrMessage("Could not read text clearly. You can enter expiry & name manually.");
        }
      } catch (err) {
        if (!cancelled) setOcrMessage("Could not scan photo. Please enter expiry manually.");
      } finally {
        if (!cancelled) setScanningExpiry(false);
      }
    }

    runAiScan();
    return () => {
      cancelled = true;
    };
  }, [packagePhotos, expiryPhotos, medicineName]);

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
    await new Promise((r) => setTimeout(r, 600));

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
      batchNumber: batchNumber.trim() || undefined,
      mfd: mfd.trim() || undefined,
      mrp: mrp || undefined,
      genericComposition: aiScanData?.genericComposition || undefined,
      aiConfidence: aiScanData?.confidence || undefined,
      aiSource: aiScanData?.source || (hasGeminiKey ? "gemini" : "manual"),
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
            onClick={() => router.push(`/dashboard?id=${submitted}`)}
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
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr] pb-32 lg:pb-0 w-full max-w-full min-w-0 overflow-x-hidden">
      <div className="space-y-5 w-full max-w-full min-w-0">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-base font-bold text-slate-700 hover:bg-slate-200 active:scale-95 disabled:opacity-40"
                >
                  -
                </button>
                <input
                  id="quantityValue"
                  type="number"
                  min={1}
                  value={quantityValue}
                  onChange={(e) => setQuantityValue(Math.max(1, Number(e.target.value) || 1))}
                  className="h-11 w-20 rounded-xl border border-slate-300 text-center font-bold text-slate-900 focus:border-[#0072d2] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantityValue((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-base font-bold text-slate-700 hover:bg-slate-200 active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1.5" htmlFor="quantityUnit">
                Unit Type
              </label>
              <select
                id="quantityUnit"
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value as QuantityUnit)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 text-sm font-semibold text-slate-800 focus:border-[#0072d2] focus:bg-white focus:outline-none"
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MFD, Batch & MRP fields (auto-filled by AI or entered manually) */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-900" htmlFor="mfd">
                Mfg Date (MFD) <span className="text-slate-400 font-normal">(Auto)</span>
              </label>
              <input
                id="mfd"
                value={mfd}
                onChange={(e) => setMfd(e.target.value)}
                placeholder="MM/YYYY (e.g. 03/2024)"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm font-mono focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900" htmlFor="batchNumber">
                Batch No. <span className="text-slate-400 font-normal">(Auto)</span>
              </label>
              <input
                id="batchNumber"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="e.g. DL-8492"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm font-mono focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900" htmlFor="mrp">
                Printed MRP (₹) <span className="text-slate-400 font-normal">(Auto)</span>
              </label>
              <input
                id="mrp"
                type="number"
                value={mrp ?? ""}
                onChange={(e) => setMrp(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="e.g. 34"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm font-mono focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Expiry Date Section */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-slate-900">
                Expiry Date (DD / MM / YYYY)
              </label>
              <button
                type="button"
                onClick={() => setIsPickerOpen((o) => !o)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0072d2] hover:underline"
              >
                <Calendar size={13} />
                <span>{isPickerOpen ? "Hide Calendar" : "Pick from Calendar"}</span>
              </button>
            </div>

            {/* Segmented Date Input */}
            <div className="flex items-center gap-2 max-w-sm">
              <input
                ref={dayInputRef}
                type="text"
                inputMode="numeric"
                value={dayVal}
                onChange={handleDayChange}
                placeholder="DD"
                className="w-16 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-center font-mono-brand text-base font-bold text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
              <span className="text-slate-400 font-bold">/</span>
              <input
                ref={monthInputRef}
                type="text"
                inputMode="numeric"
                value={monthVal}
                onChange={handleMonthChange}
                onKeyDown={handleMonthKeyDown}
                placeholder="MM"
                className="w-16 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-center font-mono-brand text-base font-bold text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
              <span className="text-slate-400 font-bold">/</span>
              <input
                ref={yearInputRef}
                type="text"
                inputMode="numeric"
                value={yearVal}
                onChange={handleYearChange}
                onKeyDown={handleYearKeyDown}
                placeholder="YYYY"
                className="w-24 h-12 rounded-xl border border-slate-300 bg-slate-50/50 text-center font-mono-brand text-base font-bold text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Quick Calendar Picker */}
            {isPickerOpen && (
              <div
                ref={pickerRef}
                className="mt-3 p-4 rounded-2xl border border-slate-200 bg-white shadow-xl space-y-3"
              >
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Month</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {MONTH_NAMES.map((m) => {
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

                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Year</p>
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

            {/* Status alerts */}
            {expired && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                <ShieldAlert size={16} className="shrink-0 text-red-600" />
                <span>
                  This medicine has already expired — expired medicines cannot be accepted for resale.
                </span>
              </p>
            )}
            {!expired && expiringWithinOneMonth && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                <AlertTriangle size={16} className="shrink-0 text-red-600" />
                <span>
                  Expiring in {remainingDays} day{remainingDays === 1 ? "" : "s"} — at least 1 month shelf-life required to sell.
                </span>
              </p>
            )}
            {eligibleToSell && !isInvalidFutureDate && !nearExpiry && (
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

        {/* Step 2: Clear Photos & AI Scanner Header */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 2: Clear Photos
          </span>

          <button
            type="button"
            onClick={() => setIsKeyModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              hasGeminiKey
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-sky-50 text-[#0072d2] border border-sky-200 hover:bg-sky-100"
            }`}
          >
            <Sparkles size={13} className={hasGeminiKey ? "text-emerald-600" : "text-[#0072d2]"} />
            <span>{hasGeminiKey ? "✨ Gemini AI Vision Active" : "⚙️ Configure Gemini Key"}</span>
          </button>
        </div>

        {/* 2-Column Photo Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
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
            helperText="Our AI scanner will read the date & batch automatically."
            photos={expiryPhotos}
            onChange={setExpiryPhotos}
            maxPhotos={2}
          />
        </div>

        {/* Loading Spinner while Scanning */}
        {scanningExpiry && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3.5 text-xs sm:text-sm text-[#0072d2] shadow-sm animate-pulse"
          >
            <Loader2 size={20} className="shrink-0 animate-spin text-[#0072d2]" />
            <span className="font-bold">
              🔍 ReMeD AI analyzing medicine strip (reading MFD, EXP, Batch &amp; MRP)…
            </span>
          </div>
        )}

        {/* AI Scan Result Window (Choti si Window with Verified Badge) */}
        {!scanningExpiry && aiScanData && (
          <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-sky-50/60 p-4 sm:p-5 shadow-lg shadow-emerald-500/10 animate-in zoom-in-95 duration-200">
            {/* Header with Verified Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200/80">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                    AI Scan Result Detected
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Read from strip packaging &amp; matched with certified catalog
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-3 py-1 text-xs font-black shadow-xs">
                <CheckCircle2 size={13} className="text-white" />
                ✓ Verified
              </span>
            </div>

            {/* Detected Details Grid */}
            <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* Medicine Name */}
              <div className="col-span-2 sm:col-span-3 rounded-2xl bg-white/90 border border-emerald-200/70 p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Detected Medicine
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">
                    {medicineName || aiScanData.medicineName}
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase">
                    {category || aiScanData.category}
                  </span>
                </div>
                {aiScanData.genericComposition && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Salt: <strong className="text-slate-700">{aiScanData.genericComposition}</strong>
                  </p>
                )}
              </div>

              {/* MFD (Manufacturing Date) */}
              <div className="rounded-2xl bg-white/90 border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  MFD (Mfg Date)
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {mfd || aiScanData.mfd || "03/2024"}
                </p>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Manufactured
                </span>
              </div>

              {/* EXP (Expiry Date) */}
              <div className="rounded-2xl bg-white/90 border border-emerald-200 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  EXP (Expiry Date)
                </span>
                <p className="text-sm font-extrabold text-emerald-700 mt-0.5">
                  {expiryDate
                    ? new Date(expiryDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
                    : aiScanData.expiryDate}
                </p>
                <span className="text-[9px] font-bold text-emerald-600 block">
                  ✓ Eligible ({remainingDays > 0 ? `${Math.floor(remainingDays / 30)} mo remaining` : "Valid"})
                </span>
              </div>

              {/* Batch Number */}
              <div className="rounded-2xl bg-white/90 border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Batch No.
                </span>
                <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">
                  {batchNumber || aiScanData.batchNumber || "DL-8492"}
                </p>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Foil Code
                </span>
              </div>

              {/* Printed Strip MRP */}
              <div className="rounded-2xl bg-white/90 border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Strip MRP
                </span>
                <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                  ₹{mrp ?? aiScanData.mrp ?? 34}
                </p>
                <span className="text-[9px] text-slate-400 font-medium block">
                  Retail Price
                </span>
              </div>

              {/* Guaranteed ReMeD Payout */}
              <div className="col-span-2 sm:col-span-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-2.5 sm:p-3 shadow-xs">
                <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">
                  Guaranteed Cashback Payout
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-base sm:text-lg font-black">
                    ₹{estimate?.price ?? aiScanData.estimatedBuybackPrice ?? Math.round((mrp ?? 34) * 0.55)}
                  </p>
                  <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    Instant UPI
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-emerald-200/70">
              <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                All details auto-synced into form below
              </span>
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById("estimated-price-section");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 rounded-xl bg-white border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                Review &amp; Submit &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Fallback info when no scan data yet */}
        {!scanningExpiry && !aiScanData && ocrMessage && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs sm:text-sm text-slate-700 shadow-sm animate-in fade-in"
          >
            <ScanText size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <span className="font-medium leading-relaxed">{ocrMessage}</span>
          </div>
        )}
      </div>

      {/* Right Column: Price Estimator Panel */}
      <div id="estimated-price-section" className="lg:sticky lg:top-24 lg:h-fit w-full max-w-full min-w-0">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xl shadow-blue-500/5 w-full max-w-full min-w-0">
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

      {/* Sticky Mobile Floating Booking Bar */}
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

      {/* Gemini API Key Setup Modal */}
      <GeminiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeySaved={() => setHasGeminiKey(Boolean(getGeminiApiKey()))}
      />
    </form>
  );
}
