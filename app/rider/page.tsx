"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Navigation,
  DollarSign,
  PackageCheck,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Listing, PickupDetails } from "@/lib/types";
import { generateNpciUtr } from "@/lib/payoutGateway";

export default function RiderPortalPage() {
  const { listings, updateListing } = useStore();
  const [activeRider, setActiveRider] = useState("Amit Kumar");
  const [filterTab, setFilterTab] = useState<"pending" | "completed">("pending");
  const [otpInputs, setOtpInputs] = useState<Record<string, string>>({});
  const [checklists, setChecklists] = useState<Record<string, { seal: boolean; exp: boolean; batch: boolean }>>({});
  const [completedMessage, setCompletedMessage] = useState<string | null>(null);

  // Filter listings assigned or ready for pickup
  const pendingOrders = listings.filter(
    (l) => l.status === "scheduled_pickup" || l.status === "pending_review" || l.status === "price_confirmed"
  );
  const completedOrders = listings.filter((l) => l.status === "completed" || l.status === "paid");

  const currentList = filterTab === "pending" ? pendingOrders : completedOrders;

  const handleChecklistChange = (id: string, key: "seal" | "exp" | "batch") => {
    setChecklists((prev) => {
      const current = prev[id] || { seal: false, exp: false, batch: false };
      return {
        ...prev,
        [id]: { ...current, [key]: !current[key] },
      };
    });
  };

  const handleOtpSubmit = (listing: Listing) => {
    const entered = (otpInputs[listing.id] || "").trim();
    const expected = listing.pickup?.otp || "4821";

    // Allow expected OTP or master delivery bypass code for testing
    if (entered !== expected && entered !== "4821" && entered !== "5829" && entered !== "7419" && entered !== "2026") {
      alert(`Invalid OTP! Please ask the customer to show the 4-digit Handover OTP from their ReMeD Dashboard.`);
      return;
    }

    const price = listing.finalPrice || listing.estimatedPrice || 60;
    const utr = listing.payoutUtr || generateNpciUtr();

    updateListing(listing.id, {
      status: "paid",
      payoutStatus: "credited",
      payoutUtr: utr,
      payoutTimestamp: new Date().toISOString(),
    });

    setCompletedMessage(`✓ Pickup & Payout of ₹${price} Completed! Bank UTR: ${utr}`);
    setTimeout(() => setCompletedMessage(null), 5000);
  };

  return (
    <div className="w-full max-w-4xl min-w-0 mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      {/* RIDER IDENTITY HEADER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-7 text-white shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
              <Truck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-lg text-white">ReMeD Rider Partner</span>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  ⚡ Eco EV Agent
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Doorstep Medicine Verification &amp; Instant Cash Handover</p>
            </div>
          </div>

          {/* Rider Selector & Rating */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Rider</span>
              <select
                value={activeRider}
                onChange={(e) => setActiveRider(e.target.value)}
                className="rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Amit Kumar">Amit Kumar (Gomti Nagar)</option>
                <option value="Vikram Singh">Vikram Singh (Hazratganj)</option>
                <option value="Rahul Sharma">Rahul Sharma (Mahanagar)</option>
              </select>
            </div>
            <div className="rounded-xl bg-slate-800 p-2 text-center border border-slate-700 text-xs font-bold text-amber-300">
              ⭐ 4.9
            </div>
          </div>
        </div>

        {/* Mini Stats Ribbon */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800 text-center">
          <div>
            <span className="text-slate-400 text-[11px] block">Assigned Pickups</span>
            <strong className="text-lg font-bold text-white">{pendingOrders.length}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Completed Today</span>
            <strong className="text-lg font-bold text-emerald-400">{completedOrders.length}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Doorstep Mode</span>
            <strong className="text-xs font-bold text-sky-400">100% Free</strong>
          </div>
        </div>
      </div>

      {/* SUCCESS BANNER ALERT */}
      {completedMessage && (
        <div className="mb-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 p-4 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-lg animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{completedMessage}</span>
        </div>
      )}

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setFilterTab("pending")}
          className={`flex-1 rounded-2xl py-3 text-xs sm:text-sm font-bold transition-all ${
            filterTab === "pending"
              ? "bg-[#0072d2] text-white shadow-md shadow-sky-500/25"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          📦 Pickups To Collect ({pendingOrders.length})
        </button>
        <button
          onClick={() => setFilterTab("completed")}
          className={`flex-1 rounded-2xl py-3 text-xs sm:text-sm font-bold transition-all ${
            filterTab === "completed"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          ✓ Completed &amp; Paid ({completedOrders.length})
        </button>
      </div>

      {/* ORDERS LIST */}
      {currentList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
          <PackageCheck size={36} className="mx-auto text-slate-400 mb-3" />
          <p className="text-base font-bold text-slate-800">No pickups in this tab</p>
          <p className="text-xs text-slate-500 mt-1">Check back soon or switch tabs above.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {currentList.map((item) => {
            const pickup: Partial<PickupDetails> = item.pickup || {};
            const fullAddress = `${pickup.addressLine || ""}, ${pickup.city || "Lucknow"}, PIN: ${pickup.pincode || ""}`.trim();
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress || "Lucknow")}`;
            const phoneClean = (item.userPhone || pickup.riderPhone || "").replace(/[^0-9]/g, "");
            const waUrl = `https://wa.me/${phoneClean || "917705898379"}?text=${encodeURIComponent(
              `Hello ${item.userName || "Customer"}, I am your ReMeD delivery executive arriving for pickup #${item.id.slice(0, 8)} (${item.medicineName}).`
            )}`;
            const check = checklists[item.id] || { seal: false, exp: false, batch: false };
            const isAllChecked = check.seal && check.exp && check.batch;
            const isPaid = item.status === "paid";
            const price = item.finalPrice || item.estimatedPrice || 60;

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
              >
                {/* TOP HEADER */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0072d2] bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                      #{item.id.slice(0, 8)}
                    </span>
                    <span className="text-xs text-slate-500">
                      Slot: <strong>{pickup.slot || "Today 10 AM - 12 PM"}</strong>
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    isPaid ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-[#0072d2]"
                  }`}>
                    {isPaid ? "✓ Payout Credited" : "Out for Doorstep Pickup"}
                  </span>
                </div>

                {/* MEDICINE & CLIENT DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  {/* Left: Medicine */}
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Medicine to Collect</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{item.medicineName}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {item.quantityValue} {item.quantityUnit} &bull; Batch: <strong>{item.batchNumber || "DL650"}</strong> &bull; Exp: <strong>{item.expiryDate || "2027"}</strong>
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs text-[#ff6b2b] font-bold">
                      <DollarSign size={14} /> Buyback Payout: ₹{price} (UPI Instant)
                    </div>
                  </div>

                  {/* Right: Client & Actions */}
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Customer Contact</span>
                    <p className="text-sm font-bold text-slate-900 mt-1">{item.userName || "Verified Customer"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={`tel:${item.userPhone || "+917705898379"}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 border border-sky-200 px-3 py-1.5 text-xs font-bold text-[#0072d2] hover:bg-sky-100"
                      >
                        <Phone size={13} /> Call
                      </a>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* ADDRESS & GOOGLE MAPS NAVIGATION */}
                <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">
                      📍 Customer Pickup Address
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {pickup.addressLine || "Flat 304, Green Heights, Gomti Nagar Extension, Lucknow"}
                    </p>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#0072d2] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-sky-500/25 hover:bg-[#005bb5]"
                  >
                    <Navigation size={14} /> Open in Google Maps
                  </a>
                </div>

                {/* PHYSICAL INSPECTION CHECKLIST & OTP (If not yet paid) */}
                {!isPaid && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        Physical Blister Inspection Checklist (Check at Doorstep):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <label className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 p-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={check.seal}
                            onChange={() => handleChecklistChange(item.id, "seal")}
                            className="rounded text-[#0072d2]"
                          />
                          <span className="text-slate-700 font-medium">Foil Seal Intact</span>
                        </label>
                        <label className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 p-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={check.exp}
                            onChange={() => handleChecklistChange(item.id, "exp")}
                            className="rounded text-[#0072d2]"
                          />
                          <span className="text-slate-700 font-medium">Expiry &gt; 30 Days</span>
                        </label>
                        <label className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 p-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={check.batch}
                            onChange={() => handleChecklistChange(item.id, "batch")}
                            className="rounded text-[#0072d2]"
                          />
                          <span className="text-slate-700 font-medium">Batch No. Clear</span>
                        </label>
                      </div>
                    </div>

                    {/* Customer Handover OTP input */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-sky-50/60 border border-sky-200 p-3.5 rounded-2xl">
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">
                          Ask Customer for 4-Digit Handover OTP
                        </span>
                        <p className="text-xs text-slate-600">Displayed on customer&apos;s ReMeD screen</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="e.g. 5829"
                          value={otpInputs[item.id] || ""}
                          onChange={(e) => setOtpInputs({ ...otpInputs, [item.id]: e.target.value })}
                          className="w-28 text-center font-mono font-bold bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:border-[#0072d2] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleOtpSubmit(item)}
                          disabled={!isAllChecked}
                          className={`rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all ${
                            isAllChecked
                              ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 active:scale-95 shadow-emerald-500/25"
                              : "bg-slate-300 cursor-not-allowed"
                          }`}
                        >
                          Verify &amp; Payout
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAID STATUS BADGE */}
                {isPaid && (
                  <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">✓ Verified &amp; Paid via UPI Instant</span>
                      <span className="text-[11px] text-emerald-600 font-mono">UTR: {item.payoutUtr || "626819034182"}</span>
                    </div>
                    <span className="font-bold text-sm text-emerald-900">₹{price}</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* BOTTOM NAVIGATION HELPER */}
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-xs font-semibold text-slate-500 hover:text-[#0072d2] underline">
          &larr; Switch back to Customer Portal
        </Link>
      </div>

    </div>
  );
}
