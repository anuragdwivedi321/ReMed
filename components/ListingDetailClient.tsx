"use client";

import { use, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Navigation,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  Package,
  KeyRound,
  Banknote,
  HeartHandshake,
  Clock,
  RotateCcw,
  HelpCircle,
  Truck,
  Building,
  Home,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { LISTING_STATUS_LABEL } from "@/lib/types";
import {
  daysUntil,
  isEligibleToSell,
  isExpired,
  isExpiringWithinOneMonth,
} from "@/lib/priceEstimator";
import StatusTracker from "@/components/StatusTracker";
import LiveTrackingCard from "@/components/LiveTrackingCard";
import UpiReceiptModal from "@/components/UpiReceiptModal";
import { generateNpciUtr } from "@/lib/payoutGateway";

const emptySubscribe = () => () => {};

const SLOTS = [
  { id: "slot-1", time: "9:00 AM - 11:00 AM", label: "Morning Slot", icon: "🌅" },
  { id: "slot-2", time: "11:00 AM - 1:00 PM", label: "Midday Slot", icon: "☀️" },
  { id: "slot-3", time: "2:00 PM - 4:00 PM", label: "Afternoon Slot", icon: "🌤️" },
  { id: "slot-4", time: "4:00 PM - 6:00 PM", label: "Evening Slot", icon: "🌆" },
];

export default function ListingDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getListing, updateListing } = useStore();
  const listing = getListing(id);

  // Address & Location states
  const [addressLine, setAddressLine] = useState(listing?.pickup?.addressLine ?? "");
  const [city, setCity] = useState(listing?.pickup?.city ?? "Lucknow");
  const [pincode, setPincode] = useState(listing?.pickup?.pincode ?? "226010");
  const [addressType, setAddressType] = useState<"home" | "work" | "other">(
    listing?.pickup?.addressType ?? "home"
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  // Date & Slot states
  const [dateMode, setDateMode] = useState<"today" | "tomorrow" | "custom">("today");
  const [date, setDate] = useState(
    listing?.pickup?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [slot, setSlot] = useState(listing?.pickup?.slot ?? SLOTS[0].time);

  // Payout states
  const [payoutMode, setPayoutMode] = useState<"upi" | "bank" | "donate">(
    listing?.pickup?.payoutMode ?? "upi"
  );
  const [upiId, setUpiId] = useState(listing?.pickup?.upiId ?? "7705898379@upi");
  const [isUpiVerified, setIsUpiVerified] = useState(true);

  // Communication & Safety
  const [whatsappAlerts, setWhatsappAlerts] = useState(
    listing?.pickup?.whatsappAlerts ?? true
  );
  const [saved, setSaved] = useState(false);
  const [isEditingPickup, setIsEditingPickup] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const todayStr = useSyncExternalStore(
    emptySubscribe,
    () => new Date().toISOString().slice(0, 10),
    () => ""
  );

  const tomorrowStr = useSyncExternalStore(
    emptySubscribe,
    () => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    () => ""
  );

  const maxPickupDate = useSyncExternalStore(
    emptySubscribe,
    () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    () => ""
  );

  if (!listing) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p className="text-base font-semibold text-slate-600">
          We couldn&apos;t find that listing.
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0072d2] px-5 py-2.5 text-sm font-bold text-white shadow-sm"
        >
          <ArrowLeft size={16} /> Back to My Listings
        </Link>
      </div>
    );
  }

  const expired = listing ? isExpired(listing.expiryDate) : false;
  const expiringWithinOneMonth = listing ? isExpiringWithinOneMonth(listing.expiryDate) : false;
  const eligible = listing ? isEligibleToSell(listing.expiryDate) : false;
  const daysLeft = listing ? daysUntil(listing.expiryDate) : 0;

  // Handover OTP generated consistently from listing id
  const pickupPin =
    listing?.pickup?.otp ||
    "48" +
      ((Math.abs(listing.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
        89) +
        10);

  const isScheduled = listing.status === "scheduled_pickup" || listing.status === "completed" || listing.status === "paid";
  const canSchedule =
    eligible && (!isScheduled || isEditingPickup);

  // Auto-detect location handler
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsDetectingLocation(false);
          setLocationSuccess(true);
          // Set accurate mock local address based on coordinates
          setAddressLine("Flat 302, Royal Palms, Gomti Nagar");
          setCity("Lucknow");
          setPincode("226010");
          setTimeout(() => setLocationSuccess(false), 3000);
        },
        (error) => {
          setIsDetectingLocation(false);
          // Fallback location
          setAddressLine("Near City Center, Hazratganj");
          setCity("Lucknow");
          setPincode("226001");
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetectingLocation(false);
      setAddressLine("Near City Center, Hazratganj");
      setCity("Lucknow");
      setPincode("226001");
    }
  };

  const handleDaySelect = (mode: "today" | "tomorrow" | "custom") => {
    setDateMode(mode);
    if (mode === "today") {
      setDate(todayStr);
    } else if (mode === "tomorrow") {
      setDate(tomorrowStr);
    }
  };

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!eligible) return;
    if (!addressLine.trim() || !city.trim() || !pincode.trim() || !date) return;

    updateListing(listing!.id, {
      pickup: {
        addressLine: addressLine.trim(),
        city: city.trim(),
        pincode: pincode.trim(),
        date,
        slot,
        addressType,
        upiId: payoutMode === "upi" ? upiId.trim() : undefined,
        payoutMode,
        whatsappAlerts,
        riderName: "Vikram Rathore",
        riderPhone: "7705898379",
        riderRating: 4.9,
        otp: pickupPin,
      },
      status: "scheduled_pickup",
    });

    setSaved(true);
    setIsEditingPickup(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8 py-5 sm:py-10 w-full max-w-full min-w-0 overflow-x-hidden">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#0072d2] transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to My Listings
      </Link>

      {/* 1. Medicine Summary Header Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-0.5 text-xs font-bold text-[#0072d2] border border-sky-200">
              <Sparkles size={12} /> {listing.category.toUpperCase()} &bull; VERIFIED BATCH
            </div>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {listing.medicineName}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium">
              <span>{listing.quantityValue} {listing.quantityUnit}</span>
              <span>&bull;</span>
              <span>Condition: <strong className="text-slate-700 capitalize">{listing.condition}</strong></span>
              {listing.mfd && (
                <>
                  <span>&bull;</span>
                  <span>MFD: <strong className="text-slate-700">{listing.mfd}</strong></span>
                </>
              )}
              {listing.batchNumber && (
                <>
                  <span>&bull;</span>
                  <span>Batch: <strong className="text-slate-700">{listing.batchNumber}</strong></span>
                </>
              )}
              {listing.mrp && (
                <>
                  <span>&bull;</span>
                  <span>MRP: <strong className="text-slate-700">₹{listing.mrp}</strong></span>
                </>
              )}
              <span>&bull;</span>
              <span>
                Expiry:{" "}
                <strong>
                  {new Date(listing.expiryDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </span>
              {expired ? (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                  Expired
                </span>
              ) : expiringWithinOneMonth ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  {daysLeft}d left (&lt; 1 mo)
                </span>
              ) : (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  Eligible ({Math.floor(daysLeft / 30)} mo remaining)
                </span>
              )}
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/70 p-3 sm:p-4 border border-sky-100 text-right shrink-0">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {payoutMode === "donate" ? "Clinic Value" : "Instant Payout"}
            </p>
            <span className="font-mono-brand text-2xl sm:text-3xl font-extrabold text-[#0072d2] leading-none block mt-0.5">
              ₹{listing.finalPrice ?? listing.estimatedPrice}
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 block mt-0.5">
              ✓ Doorstep Pickup Free
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <StatusTracker status={listing.status} />
        </div>
      </div>

      {/* 2. Ineligible Notice if Expired or < 1 Month Remaining */}
      {!eligible && (
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50/80 p-5 sm:p-7 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert size={24} className="shrink-0 text-red-600 mt-0.5" />
            <div>
              <h2 className="font-display text-lg font-bold text-red-900">
                {expired
                  ? "Expired Medicine — Pickup Disabled"
                  : "Expiring Within 1 Month — Pickup Disabled"}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-red-700 leading-relaxed">
                {expired
                  ? `This medicine expired on ${new Date(listing.expiryDate).toLocaleDateString("en-IN")}. ReMeD strictly rejects expired medicines to safeguard community health.`
                  : `This medicine has only ${daysLeft} day(s) shelf-life remaining. At least 1 month (30 days) remaining shelf-life is required for doorstep buyback.`}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-red-100 border border-red-200 px-3 py-1.5 text-xs font-bold text-red-800">
                <AlertTriangle size={14} /> Pickup &amp; Payout Process Disabled
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Doorstep Pickup Section */}
      {eligible && (
        <div className="mt-6">
          {/* A. If Already Scheduled & Not Editing: Show Tracking & Rider Card */}
          {isScheduled && !isEditingPickup && listing.pickup ? (
            <div className="space-y-6">
              {/* Live Tracking Map Card */}
              <LiveTrackingCard
                listingId={listing.id}
                status={listing.status}
                pickupDate={listing.pickup.date}
                pickupSlot={listing.pickup.slot}
                pickupAddress={`${listing.pickup.addressLine}, ${listing.pickup.city}`}
                payoutAmount={listing.finalPrice ?? listing.estimatedPrice}
                onCompletePickup={() => {
                  const generatedUtr = listing.payoutUtr || generateNpciUtr();
                  updateListing(listing.id, {
                    status: "completed",
                    payoutStatus: "paid",
                    payoutUtr: generatedUtr,
                    payoutTimestamp: new Date().toISOString(),
                  });
                  setShowReceipt(true);
                }}
                onViewReceipt={() => setShowReceipt(true)}
              />

              {/* Handover OTP & Assigned Rider Details */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Truck size={18} className="text-[#0072d2]" /> Assigned Doorstep Executive
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditingPickup(true)}
                    className="flex items-center gap-1 text-xs font-bold text-[#0072d2] hover:underline"
                  >
                    <RotateCcw size={13} /> Reschedule or Edit Details
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rider Profile Card */}
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0072d2] to-sky-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
                          VR
                        </div>
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                          <CheckCircle2 size={10} />
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {listing.pickup.riderName || "Vikram Rathore"}
                        </h4>
                        <p className="text-xs text-slate-500">
                          ID: REMED-412 &bull; 4.9 ★ (340+ Pickups)
                        </p>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 inline-block mt-0.5">
                          Electric Scooter &bull; Eco Rider
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <a
                        href={`tel:${listing.pickup.riderPhone || "7705898379"}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-[#0072d2] hover:bg-[#0072d2] hover:text-white transition-all shadow-2xs active:scale-95"
                        title="Call Rider"
                      >
                        <Phone size={15} />
                      </a>
                      <a
                        href={`https://wa.me/91${listing.pickup.riderPhone || "7705898379"}?text=Hi%20ReMeD%20Rider,%20regarding%20my%20pickup%20${listing.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-2xs active:scale-95"
                        title="WhatsApp Rider"
                      >
                        <MessageCircle size={15} />
                      </a>
                    </div>
                  </div>

                  {/* High Security Pickup OTP */}
                  <div className="flex flex-col justify-between rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                          <KeyRound size={13} /> Security Handover OTP
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          Doorstep Only
                        </span>
                      </div>
                      <div className="my-2 flex items-center gap-2">
                        {pickupPin.split("").map((digit, i) => (
                          <span
                            key={i}
                            className="flex h-11 w-10 items-center justify-center rounded-xl bg-white border border-amber-300 font-mono text-xl font-black text-slate-900 shadow-xs"
                          >
                            {digit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-700 leading-snug">
                      Share this code with the executive <strong>only after</strong> they inspect the medicine strip at your door.
                    </p>
                  </div>
                </div>

                {/* Scheduled Address & Payout Destination Summary */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={13} className="text-[#0072d2]" /> Pickup Address:
                    </span>
                    <p className="font-semibold text-slate-800 text-sm">
                      {listing.pickup.addressLine}, {listing.pickup.city} - {listing.pickup.pincode}
                    </p>
                    <p className="text-slate-500 font-medium">
                      Slot: {new Date(listing.pickup.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })} ({listing.pickup.slot})
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Banknote size={13} className="text-emerald-600" /> Payout Destination:
                    </span>
                    <p className="font-semibold text-slate-800 text-sm">
                      {listing.pickup.payoutMode === "donate"
                        ? "Donation to Free Charitable Clinic"
                        : `Instant UPI: ${listing.pickup.upiId || "7705898379@upi"}`}
                    </p>
                    <p className="text-emerald-600 font-semibold">
                      ₹{listing.finalPrice ?? listing.estimatedPrice} will be transferred directly to this account upon OTP verification.
                    </p>
                    {listing.pickup.payoutMode !== "donate" && (
                      <button
                        type="button"
                        onClick={() => setShowReceipt(true)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <ShieldCheck size={14} className="text-emerald-600" />
                        View Instant UPI Receipt {listing.payoutUtr ? `(UTR: ${listing.payoutUtr.slice(0, 6)}...)` : "(Demo Slip)"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* What to Keep Ready (Checklist) */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm">
                <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Package size={16} className="text-[#0072d2]" />
                  Keep Ready Before the Executive Arrives:
                </h4>
                <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="h-7 w-7 rounded-lg bg-sky-100 text-[#0072d2] flex items-center justify-center font-bold text-xs mb-2">
                      1
                    </div>
                    <p className="text-xs font-bold text-slate-800">Sealed Strip / Pack</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Ensure tablet blisters or bottle caps remain sealed with readable expiry.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="h-7 w-7 rounded-lg bg-orange-100 text-[#ff6b2b] flex items-center justify-center font-bold text-xs mb-2">
                      2
                    </div>
                    <p className="text-xs font-bold text-slate-800">Verify Pickup OTP</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Keep the 4-digit code ready on your phone to authorize the handover.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2">
                      3
                    </div>
                    <p className="text-xs font-bold text-slate-800">Instant UPI Transfer</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Payout is triggered within 60 seconds directly into your PhonePe/GPay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* B. Booking Form: Step-by-Step Doorstep Pickup Scheduler */
            <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-md shadow-blue-500/5 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#ff6b2b]">
                    Step 2 of 2: Schedule Doorstep Pickup &amp; UPI
                  </span>
                  <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                    Book Free Doorstep Pickup
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    A certified ReMeD executive will inspect the medicine and pay you on the spot.
                  </p>
                </div>

                {isEditingPickup && (
                  <button
                    type="button"
                    onClick={() => setIsEditingPickup(false)}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSchedule} className="mt-6 space-y-6">
                {/* Step 1: Address & Location Detection */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <MapPin size={15} className="text-[#0072d2]" /> 1. Pickup Address &amp; Location
                    </label>

                    {/* GPS Auto-detect Button */}
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-sky-300 px-3 py-1 text-xs font-bold text-[#0072d2] hover:bg-sky-50 shadow-2xs active:scale-95 transition-all"
                    >
                      <Navigation size={13} className={isDetectingLocation ? "animate-spin" : ""} />
                      {isDetectingLocation ? "Locating..." : locationSuccess ? "✓ Location Detected" : "Use Current Location (GPS)"}
                    </button>
                  </div>

                  {/* Address Type Chips */}
                  <div className="flex items-center gap-2 mb-3">
                    {(["home", "work", "other"] as const).map((type) => {
                      const isSelected = addressType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setAddressType(type)}
                          className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border ${
                            isSelected
                              ? "bg-[#0072d2] text-white border-[#0072d2] shadow-xs"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {type === "home" && <Home size={13} />}
                          {type === "work" && <Building size={13} />}
                          {type === "other" && <MapPin size={13} />}
                          <span className="capitalize">{type}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Street & Landmark */}
                  <div>
                    <input
                      id="addressLine"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="House / Flat No., Apartment Name, Street, Landmark"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:outline-none transition-all shadow-2xs"
                      required
                    />
                  </div>

                  {/* City & Pincode */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City (e.g. Lucknow)"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:outline-none transition-all shadow-2xs"
                        required
                      />
                    </div>
                    <div>
                      <input
                        id="pincode"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit Pincode"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:outline-none transition-all shadow-2xs font-mono font-bold"
                        required
                      />
                    </div>
                  </div>

                  {/* Pincode Serviceability Indicator */}
                  {pincode.length === 6 && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Free doorstep pickup is active in {city || "your area"} ({pincode})</span>
                    </div>
                  )}
                </div>

                {/* Step 2: Date & Slot Picker */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                    <CalendarClock size={15} className="text-[#0072d2]" /> 2. Preferred Pickup Date &amp; Time
                  </label>

                  {/* Day Picker Chips */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 w-full max-w-full min-w-0">
                    <button
                      type="button"
                      onClick={() => handleDaySelect("today")}
                      className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs font-bold border transition-all active:scale-95 min-w-0 ${
                        dateMode === "today"
                          ? "bg-[#0072d2] text-white border-[#0072d2] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs truncate">⚡ Today</span>
                      <span className="text-[9px] sm:text-[10px] font-medium opacity-80 truncate">Express</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDaySelect("tomorrow")}
                      className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs font-bold border transition-all active:scale-95 min-w-0 ${
                        dateMode === "tomorrow"
                          ? "bg-[#0072d2] text-white border-[#0072d2] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs truncate">📅 Tomorrow</span>
                      <span className="text-[9px] sm:text-[10px] font-medium opacity-80 truncate">Next Day</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDaySelect("custom")}
                      className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs font-bold border transition-all active:scale-95 min-w-0 ${
                        dateMode === "custom"
                          ? "bg-[#0072d2] text-white border-[#0072d2] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs truncate">🗓️ Custom</span>
                      <span className="text-[9px] sm:text-[10px] font-medium opacity-80 truncate">Pick Date</span>
                    </button>
                  </div>

                  {/* Custom Date Input (when custom mode selected) */}
                  {dateMode === "custom" && (
                    <div className="mb-3">
                      <input
                        type="date"
                        min={todayStr}
                        max={maxPickupDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:border-[#0072d2] focus:outline-none"
                        required
                      />
                    </div>
                  )}

                  {/* 4 Time Slots Visual Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {SLOTS.map((s) => {
                      const isSelected = slot === s.time;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSlot(s.time)}
                          className={`flex items-center gap-2 rounded-xl p-2.5 text-left border transition-all active:scale-95 ${
                            isSelected
                              ? "bg-sky-50 border-[#0072d2] text-[#0072d2] ring-1 ring-[#0072d2] shadow-xs"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-lg">{s.icon}</span>
                          <div>
                            <span className="text-[11px] font-bold block leading-tight">
                              {s.time}
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium">
                              {s.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Instant UPI Payout Details */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Banknote size={15} className="text-emerald-600" /> 3. Doorstep Payout Method
                    </label>

                    {/* Mode Toggle: Cash vs Donate */}
                    <div className="flex rounded-xl bg-slate-200/70 p-0.5 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setPayoutMode("upi")}
                        className={`rounded-lg px-2.5 py-1 transition-all ${
                          payoutMode === "upi"
                            ? "bg-white text-[#0072d2] shadow-xs"
                            : "text-slate-600"
                        }`}
                      >
                        UPI Cash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayoutMode("donate")}
                        className={`rounded-lg px-2.5 py-1 transition-all ${
                          payoutMode === "donate"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-600"
                        }`}
                      >
                        Donate
                      </button>
                    </div>
                  </div>

                  {payoutMode === "upi" ? (
                    <div>
                      <div className="relative flex items-center">
                        <input
                          id="upiId"
                          type="text"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            setIsUpiVerified(Boolean(e.target.value.includes("@")));
                          }}
                          placeholder="Enter UPI ID (e.g. 7705898379@paytm or name@oksbi)"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-20 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:outline-none shadow-2xs"
                          required
                        />
                        <span className="absolute right-2.5 flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </div>

                      {/* Quick UPI Handles */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-400">Quick handles:</span>
                        {["@oksbi", "@paytm", "@ybl", "@okhdfcbank", "@apl"].map((handle) => (
                          <button
                            key={handle}
                            type="button"
                            onClick={() => {
                              const prefix = upiId.includes("@") ? upiId.split("@")[0] : upiId || "7705898379";
                              setUpiId(prefix + handle);
                              setIsUpiVerified(true);
                            }}
                            className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 hover:border-sky-300 hover:text-[#0072d2] text-[10px] font-medium"
                          >
                            {handle}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                          <span>
                            <strong>₹{listing.finalPrice ?? listing.estimatedPrice}</strong> will be instantly credited to your UPI upon doorstep handover.
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800">
                      <p className="font-bold flex items-center gap-1.5">
                        <HeartHandshake size={16} /> Free Charitable Clinic Donation
                      </p>
                      <p className="mt-1 text-slate-600">
                        These unexpired medicines will be inspected and provided free of cost to economically vulnerable patients. An e-certificate of appreciation will be issued to your phone number.
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 4: WhatsApp Notification Toggle */}
                <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <input
                    type="checkbox"
                    id="whatsappAlerts"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-[#0072d2] focus:ring-[#0072d2]"
                  />
                  <label htmlFor="whatsappAlerts" className="text-xs text-slate-700 cursor-pointer">
                    <strong className="text-slate-900 block font-bold">
                      Send live tracking updates &amp; payment receipt on WhatsApp
                    </strong>
                    Executive arrival alerts, OTP notifications, and digital receipt will be sent to 7705898379.
                  </label>
                </div>

                {/* Confirm Booking CTA */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-98 transition-all text-center cursor-pointer"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 size={19} /> Pickup Scheduled Successfully!
                    </>
                  ) : (
                    <>
                      Confirm &amp; Schedule Doorstep Pickup (₹{listing.finalPrice ?? listing.estimatedPrice}) &rarr;
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-slate-500 font-medium">
        Current listing status:{" "}
        <strong className="text-slate-800">
          {LISTING_STATUS_LABEL[listing.status]}
        </strong>
      </p>

      {/* Instant UPI Payout Receipt Slip */}
      <UpiReceiptModal
        listing={listing}
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  );
}
