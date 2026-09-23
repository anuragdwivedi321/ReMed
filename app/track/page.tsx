"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  ArrowRight,
  MapPin,
  Calendar,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/languageContext";
import { LISTING_STATUS_LABEL } from "@/lib/types";
import StatusTracker from "@/components/StatusTracker";
import LiveTrackingCard from "@/components/LiveTrackingCard";

const STATUS_BADGE: Record<string, string> = {
  pending_review: "bg-amber-50 text-amber-800 border border-amber-200",
  price_confirmed: "bg-sky-50 text-[#0072d2] border border-sky-200",
  scheduled_pickup: "bg-blue-50 text-blue-800 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  paid: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-xs",
  rejected: "bg-red-50 text-red-700 border border-red-200",
};

export default function TrackPage() {
  const { listings, listingsForUser } = useStore();
  const { user } = useAuth();
  const { t } = useLanguage();

  const userId = user?.id ?? "demo-user";
  const userListings = listingsForUser(userId);

  const [query, setQuery] = useState("");
  const [searchedId, setSearchedId] = useState<string | null>(null);

  // Find listing if searched
  const activeListing = searchedId
    ? listings.find(
        (l) =>
          l.id.toLowerCase() === searchedId.toLowerCase() ||
          l.id.toLowerCase().includes(searchedId.toLowerCase())
      )
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchedId(query.trim());
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-3.5 py-1 text-xs font-bold text-[#0072d2]">
          <Truck size={14} /> {t("Live Order & Pickup Tracking", "लाइव ऑर्डर व पिकअप ट्रैकिंग")}
        </div>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t("Track Your Medicine Pickup", "अपनी दवाई पिकअप को ट्रैक करें")}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          {t(
            "Enter your Pickup ID or select from your recent submissions below to check verification and live delivery agent status.",
            "अपना पिकअप ID दर्ज करें या नीचे अपनी हालिया सबमिशन चुनकर लाइव वेरिफिकेशन और राइडर स्टेटस देखें।"
          )}
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "Enter Pickup ID (e.g. rem-001, rem-002)...",
              "पिकअप ID डालें (जैसे rem-001, rem-002)..."
            )}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 pl-11 pr-28 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#0072d2] focus:outline-none focus:ring-4 focus:ring-sky-100"
          />
          <Search
            size={18}
            className="absolute left-3.5 text-slate-400 pointer-events-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
          >
            {t("Track", "ट्रैक करें")}
          </button>
        </div>

        {/* Quick Sample Chips */}
        {listings.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>{t("Quick search:", "त्वरित खोज:")}</span>
            {listings.slice(0, 3).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setQuery(l.id);
                  setSearchedId(l.id);
                }}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700 hover:bg-sky-100 hover:text-[#0072d2] transition-colors"
              >
                #{l.id}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Search Result View */}
      {searchedId && (
        <div className="mt-8">
          {activeListing ? (
            <div className="rounded-3xl border border-sky-100 bg-white p-5 sm:p-7 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                      #{activeListing.id}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        STATUS_BADGE[activeListing.status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {LISTING_STATUS_LABEL[activeListing.status]}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900">
                    {activeListing.medicineName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeListing.category} • {activeListing.quantityValue} {activeListing.quantityUnit}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Estimated Payout</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-600">
                    ₹{activeListing.estimatedPrice}
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-6 border-b border-slate-100">
                <StatusTracker status={activeListing.status} />
              </div>

              {/* Live Pickup Rider Card if scheduled */}
              {activeListing.pickup?.date && (
                <div className="mt-6">
                  <LiveTrackingCard
                    listingId={activeListing.id}
                    pickupDate={activeListing.pickup.date}
                    pickupSlot={activeListing.pickup.slot}
                    payoutAmount={activeListing.estimatedPrice}
                    status={activeListing.status}
                  />
                </div>
              )}

              {/* Address & Slot Info */}
              {activeListing.pickup && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-xs text-slate-600 bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#0072d2] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Pickup Address:</p>
                      <p>
                        {activeListing.pickup.addressLine}, {activeListing.pickup.city} -{" "}
                        {activeListing.pickup.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-[#ff6b2b] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Scheduled Time Slot:</p>
                      <p>
                        {activeListing.pickup.date} ({activeListing.pickup.slot})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Link to detail page */}
              <div className="mt-5 flex justify-end">
                <Link
                  href={`/dashboard/${activeListing.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0072d2] hover:underline"
                >
                  View Full Pickup Management <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center text-xs sm:text-sm text-slate-600">
              <p className="font-bold text-slate-800">
                No pickup found matching &ldquo;{searchedId}&rdquo;
              </p>
              <p className="mt-1 text-slate-500">
                Please verify the ID or choose one of your recent listings below.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Your Recent Pickups Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {t("Your Recent Medicine Pickups", "आपकी हालिया दवाई पिकअप्स")}
          </h2>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-[#0072d2] hover:underline flex items-center gap-1"
          >
            {t("View All in Dashboard", "डैशबोर्ड में सभी देखें")} <ArrowRight size={13} />
          </Link>
        </div>

        {userListings.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center">
            <Package size={28} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-800">No active pickups found</p>
            <p className="text-xs text-slate-500 mt-1">
              Submit your unneeded medicines to get instant doorstep pickup and payout.
            </p>
            <Link
              href="/sell"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0072d2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#005bb5] transition-all"
            >
              Sell Medicine Now <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {userListings.map((l) => (
              <div
                key={l.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-sky-300 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">
                      #{l.id}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        STATUS_BADGE[l.status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {LISTING_STATUS_LABEL[l.status]}
                    </span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">{l.medicineName}</h4>
                  <p className="text-[11px] text-slate-500">
                    {l.category} • {l.quantityValue} {l.quantityUnit} • Payout:{" "}
                    <strong className="text-emerald-600 font-bold">₹{l.estimatedPrice}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(l.id);
                      setSearchedId(l.id);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Quick Track
                  </button>
                  <Link
                    href={`/dashboard/${l.id}`}
                    className="rounded-xl bg-[#0072d2] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#005bb5] transition-colors flex items-center gap-1"
                  >
                    Manage <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety & Trust Note */}
      <div className="mt-10 rounded-2xl bg-sky-50/70 border border-sky-100 p-4 flex items-center gap-3">
        <ShieldCheck size={20} className="text-[#0072d2] shrink-0" />
        <p className="text-xs text-slate-700 leading-snug">
          <strong>100% Verified Executives:</strong> All ReMeD collection partners carry digital ID cards, sanitized collection kits, and make instant UPI payouts right at your doorstep upon verification.
        </p>
      </div>
    </div>
  );
}
