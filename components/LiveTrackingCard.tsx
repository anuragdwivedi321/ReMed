"use client";

import { useState } from "react";
import {
  Truck,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  QrCode,
  ArrowRight,
} from "lucide-react";

interface LiveTrackingCardProps {
  listingId: string;
  status: string;
  pickupDate?: string;
  pickupSlot?: string;
  pickupAddress?: string;
  payoutAmount: number;
  onCompletePickup?: () => void;
}

export default function LiveTrackingCard({
  listingId,
  status,
  pickupDate,
  pickupSlot,
  pickupAddress,
  payoutAmount,
  onCompletePickup,
}: LiveTrackingCardProps) {
  const etaMinutes = 14;
  const [simulatedComplete, setSimulatedComplete] = useState(
    status === "completed" || status === "verified"
  );
  const [showCallModal, setShowCallModal] = useState(false);

  const isCompleted = simulatedComplete || status === "completed";
  const pickupPin = "48" + (Math.abs(listingId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 89 + 10);

  function handleSimulateHandover() {
    setSimulatedComplete(true);
    if (onCompletePickup) {
      onCompletePickup();
    }
  }

  return (
    <div className="rounded-3xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 p-5 sm:p-7 shadow-lg shadow-blue-500/5">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0072d2] text-white shadow-xs">
            <Truck size={18} className={isCompleted ? "" : "animate-pulse"} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {isCompleted ? "Pickup & Payout Completed" : "Live Doorstep Pickup Tracking"}
            </h3>
            <p className="text-[11px] text-slate-500">
              {isCompleted
                ? "Medicines verified and payment transferred"
                : pickupDate && pickupSlot
                ? `${pickupDate} · ${pickupSlot}`
                : "ReMeD certified executive is scheduled"}
            </p>
          </div>
        </div>

        {!isCompleted ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 animate-pulse">
              <Clock size={13} /> Arriving in ~{etaMinutes} mins
            </span>
          </div>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
            <CheckCircle2 size={14} /> Payout Dispatched
          </span>
        )}
      </div>

      {/* Simulated Live Route Map Graphic */}
      <div className="relative mt-5 h-44 sm:h-52 w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
        {/* Soft grid lines to mimic road map */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Curved animated road SVG */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 40 160 C 150 160, 200 60, 360 80 S 520 160, 680 90"
            fill="none"
            stroke="#0072d2"
            strokeWidth="5"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          {/* Destination pulse beacon */}
          <circle cx="680" cy="90" r="16" fill="#10b981" opacity="0.3" className="animate-ping" />
          <circle cx="680" cy="90" r="8" fill="#10b981" />
        </svg>

        {/* Start Point: ReMeD Hub */}
        <div className="absolute left-6 bottom-4 sm:bottom-6 z-10 flex items-center gap-2 rounded-xl bg-slate-950/80 backdrop-blur-md px-3 py-1.5 border border-slate-700 text-xs text-slate-300">
          <div className="h-2.5 w-2.5 rounded-full bg-[#0072d2]" />
          <span>ReMeD Logistics Hub</span>
        </div>

        {/* Moving Delivery Agent Scooter along road */}
        {!isCompleted ? (
          <div className="absolute z-20 flex flex-col items-center animate-bounce">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6b2b] text-white shadow-lg shadow-orange-500/40 border border-white">
              <Truck size={20} />
            </div>
            <span className="mt-1 rounded-md bg-slate-950/90 border border-slate-700 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Vikram Kumar (Agent)
            </span>
          </div>
        ) : (
          <div className="absolute z-20 flex items-center gap-2 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 px-4 py-2 text-white shadow-2xl backdrop-blur-md">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <div>
              <span className="text-xs font-bold block text-emerald-300">
                Doorstep Handover Successful!
              </span>
              <span className="text-[10px] text-slate-300">
                Medicines inspected &amp; sealed
              </span>
            </div>
          </div>
        )}

        {/* End Point: User's House */}
        <div className="absolute right-4 sm:right-6 top-3 sm:top-5 z-10 flex flex-col items-end gap-0.5 rounded-xl bg-slate-950/80 backdrop-blur-md px-3 py-1.5 border border-slate-700 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Your Doorstep</span>
          </div>
          {pickupAddress && (
            <span className="text-[10px] text-slate-400 max-w-[120px] sm:max-w-[160px] truncate">
              {pickupAddress}
            </span>
          )}
        </div>
      </div>

      {/* Agent Profile & Security PIN Strip */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Agent Card */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#0072d2] to-sky-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
              VK
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Vikram Kumar
              </h4>
              <p className="text-[11px] text-slate-500">
                ID: REMED-EX-412 • 4.9 ★ (420+ pickups)
              </p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                <ShieldCheck size={11} /> Vaccinated &amp; Tamper Kit Ready
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCallModal(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-[#0072d2] border border-sky-200 hover:bg-sky-100 active:scale-95 transition-all"
            aria-label="Call pickup agent"
            title="Call Agent"
          >
            <Phone size={16} />
          </button>
        </div>

        {/* Secure Pickup PIN */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Pickup Security OTP
            </span>
            <span className="font-mono text-2xl font-black tracking-widest text-[#0072d2]">
              {pickupPin}
            </span>
            <span className="text-[10px] text-slate-500 block">
              Share only after physical inspection
            </span>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-600">
            <QrCode size={24} />
          </div>
        </div>
      </div>

      {/* UPI Transfer Notification or Test Handover Button */}
      {isCompleted ? (
        <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900">
                UPI Payout of ₹{payoutAmount} Successfully Transferred!
              </h4>
              <p className="text-[11px] text-emerald-700">
                Transferred to your linked Bank Account • Ref: UPI/REMED/{pickupPin}
              </p>
            </div>
          </div>
          <span className="rounded-xl bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
            Completed ✓
          </span>
        </div>
      ) : (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-sky-100">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Have the medicines sealed in a clean bag ready for the executive.
          </span>
          <button
            type="button"
            onClick={handleSimulateHandover}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0072d2] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#005bb5] active:scale-95 transition-all text-center"
          >
            <span>Simulate Doorstep Handover &amp; Payout</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Call Agent Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#0072d2]">
              <Phone size={22} />
            </div>
            <h4 className="mt-3 text-base font-bold text-slate-900">
              Call Agent Vikram Kumar
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Assigned ReMeD Executive for your pickup
            </p>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 font-mono font-bold text-lg text-slate-800">
              +91 98765 43210
            </div>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setShowCallModal(false)}
                className="w-full rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <a
                href="tel:+919876543210"
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#0072d2] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#005bb5]"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
