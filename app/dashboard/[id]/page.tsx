"use client";

import { use, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarClock, MapPin, CheckCircle2, ShieldAlert, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";
import { LISTING_STATUS_LABEL } from "@/lib/types";
import { daysUntil, isEligibleToSell, isExpired, isExpiringWithinOneMonth } from "@/lib/priceEstimator";
import StatusTracker from "@/components/StatusTracker";
import LiveTrackingCard from "@/components/LiveTrackingCard";

const emptySubscribe = () => () => {};

const SLOTS = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
];

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getListing, updateListing } = useStore();
  const listing = getListing(id);

  const [addressLine, setAddressLine] = useState(listing?.pickup?.addressLine ?? "");
  const [city, setCity] = useState(listing?.pickup?.city ?? "");
  const [pincode, setPincode] = useState(listing?.pickup?.pincode ?? "");
  const [date, setDate] = useState(listing?.pickup?.date ?? "");
  const [slot, setSlot] = useState(listing?.pickup?.slot ?? SLOTS[0]);
  const [saved, setSaved] = useState(false);

  const todayStr = useSyncExternalStore(
    emptySubscribe,
    () => new Date().toISOString().slice(0, 10),
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
        <p className="text-base font-semibold text-slate-600">We couldn&apos;t find that listing.</p>
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

  const canSchedule =
    listing &&
    (listing.status === "price_confirmed" || listing.status === "pending_review") &&
    eligible;

  function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!eligible) return;
    if (!addressLine || !city || !pincode || !date) return;
    updateListing(listing!.id, {
      pickup: { addressLine, city, pincode, date, slot },
      status: "scheduled_pickup",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#0072d2] transition-colors"
      >
        <ArrowLeft size={16} /> Back to My Listings
      </Link>

      <div className="mt-4 rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-[#0072d2]">
              {listing.category.toUpperCase()}
            </span>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              {listing.medicineName}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-slate-500 font-medium">
              <span>{listing.quantityValue} {listing.quantityUnit}</span>
              <span>·</span>
              <span>
                Condition:{" "}
                <span className="font-semibold text-slate-700 capitalize">
                  {listing.condition}
                </span>
              </span>
              <span>·</span>
              <span>
                Exp:{" "}
                {new Date(listing.expiryDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              {expired ? (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                  Expired
                </span>
              ) : expiringWithinOneMonth ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  {daysLeft} days left (&lt; 1 mo)
                </span>
              ) : (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  Eligible ({Math.floor(daysLeft / 30)} mo left)
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400">Total Payout</p>
            <span className="font-mono-brand text-3xl font-extrabold text-[#0072d2]">
              ₹{listing.finalPrice ?? listing.estimatedPrice}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <StatusTracker status={listing.status} />
        </div>

        {listing.status === "rejected" && listing.adminNote && (
          <div className="mt-5 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-700">
            {listing.adminNote}
          </div>
        )}

        {listing.photos.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold text-slate-500 mb-2">Uploaded Photos</p>
            <div className="flex flex-wrap gap-2.5">
              {listing.photos.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  src={p.dataUrl}
                  alt="Medicine"
                  className="h-20 w-20 rounded-2xl border border-sky-100 object-cover shadow-xs"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {!eligible ? (
        <div className="mt-6 rounded-3xl border border-red-200 bg-red-50/70 p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert size={26} className="shrink-0 text-red-600 mt-0.5" />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-red-900">
                {expired
                  ? "Expired Medicine — Pickup Disabled"
                  : "Expiring Within 1 Month — Pickup Disabled"}
              </h2>
              <p className="mt-2 text-sm text-red-700 leading-relaxed">
                {expired
                  ? `This medicine expired on ${new Date(listing.expiryDate).toLocaleDateString("en-IN")}. Remed compliance strictly prohibits buying, scheduling pickup, or redistributing expired medicines.`
                  : `This medicine has only ${daysLeft} day(s) shelf-life remaining (${new Date(listing.expiryDate).toLocaleDateString("en-IN")}). A minimum of 1 month (30 days) remaining shelf-life is required to schedule pickup and complete sale.`}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-100 border border-red-200 px-3.5 py-1.5 text-xs font-bold text-red-800">
                <AlertTriangle size={14} />
                Pickup &amp; Purchase Process Disabled
              </div>
            </div>
          </div>
        </div>
      ) : listing.status !== "rejected" && (
        <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
            <MapPin size={20} className="text-[#0072d2]" /> Doorstep Pickup Details
          </h2>

          {!canSchedule && listing.pickup ? (
            <div className="mt-5 space-y-5">
              <LiveTrackingCard
                listingId={listing.id}
                status={listing.status}
                pickupDate={listing.pickup.date}
                pickupSlot={listing.pickup.slot}
                pickupAddress={`${listing.pickup.addressLine}, ${listing.pickup.city}`}
                payoutAmount={listing.finalPrice ?? listing.estimatedPrice}
                onCompletePickup={() => {
                  updateListing(listing.id, { status: "completed" });
                }}
              />

              <div className="rounded-2xl bg-sky-50/60 border border-sky-100 p-5 text-sm text-slate-700">
                <p className="font-bold text-slate-900 text-base">
                  {listing.pickup.addressLine}, {listing.pickup.city} - {listing.pickup.pincode}
                </p>
                <p className="mt-2 flex items-center gap-2 font-semibold text-[#0072d2]">
                  <CalendarClock size={16} />
                  {new Date(listing.pickup.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {listing.pickup.slot}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSchedule} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-900" htmlFor="addressLine">
                  Pickup Address
                </label>
                <input
                  id="addressLine"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="House / Flat No., Street, Landmark, Area"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900" htmlFor="date">
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={todayStr}
                    max={maxPickupDate}
                    value={date}
                    onChange={(e) => {
                      const val = e.target.value;
                      const parts = val.split("-");
                      if (parts[0] && parts[0].length > 4) return;
                      setDate(val);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SLOTS.map((s) => {
                      const isSelected = slot === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSlot(s)}
                          className={`rounded-xl px-2.5 py-3 text-xs font-bold transition-all border text-center active:scale-95 ${
                            isSelected
                              ? "bg-[#0072d2] text-white border-[#0072d2] shadow-xs scale-[1.02]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-98 transition-all text-center"
              >
                {saved ? (
                  <>
                    <CheckCircle2 size={18} /> Pickup Scheduled Successfully!
                  </>
                ) : (
                  "Confirm & Schedule Doorstep Pickup"
                )}
              </button>
            </form>
          )}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-slate-500 font-medium">
        Current listing state:{" "}
        <span className="font-bold text-slate-800">
          {LISTING_STATUS_LABEL[listing.status]}
        </span>
      </p>
    </div>
  );
}
