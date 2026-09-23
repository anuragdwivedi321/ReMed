"use client";

import Link from "next/link";
import { ClipboardList, PlusCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { LISTING_STATUS_LABEL } from "@/lib/types";
import { isExpired, isExpiringWithinOneMonth } from "@/lib/priceEstimator";
import StatusTracker from "@/components/StatusTracker";

const STATUS_BADGE: Record<string, string> = {
  pending_review: "bg-amber-50 text-amber-800 border border-amber-200",
  price_confirmed: "bg-sky-50 text-[#0072d2] border border-sky-200",
  scheduled_pickup: "bg-blue-50 text-blue-800 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  paid: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-xs",
  rejected: "bg-red-50 text-red-700 border border-red-200",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { listings, loading, listingsForUser } = useStore();
  const userId = user?.id ?? "demo-user";
  const mine = listingsForUser(userId);
  const showSeedNote = !loading && listings.length > 0 && !user;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Listings
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Track every medicine you&apos;ve submitted, from verification to doorstep payout.
          </p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all"
        >
          <PlusCircle size={16} /> Sell Another
        </Link>
      </div>

      {showSeedNote && (
        <div className="mt-5 rounded-2xl bg-sky-50 border border-sky-200 p-4 text-xs font-medium text-slate-700 flex items-center justify-between gap-4">
          <p>
            You are viewing sample demo listings.{" "}
            <Link href="/login" className="font-bold text-[#0072d2] underline">
              Log in with your phone or email
            </Link>{" "}
            to create and track your permanent listings.
          </p>
        </div>
      )}

      {loading ? (
        <div className="mt-12 text-center text-sm font-semibold text-slate-500">
          Loading your listings…
        </div>
      ) : mine.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0072d2] mb-3">
            <ClipboardList size={28} />
          </div>
          <p className="text-base font-bold text-slate-900">No listings yet</p>
          <p className="mt-1 max-w-xs text-sm text-slate-500 leading-relaxed">
            Submit your first medicine to get an instant quote and schedule pickup.
          </p>
          <Link
            href="/sell"
            className="mt-6 flex items-center gap-2 rounded-xl bg-[#0072d2] px-6 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:bg-[#005bb5] transition-all"
          >
            Sell a Medicine <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {mine.map((listing) => (
            <Link
              key={listing.id}
              href={`/dashboard/${listing.id}`}
              className="group block rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm transition-all duration-200 hover:border-sky-300 hover:shadow-md hover:shadow-blue-500/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold text-slate-900 group-hover:text-[#0072d2] transition-colors">
                    {listing.medicineName}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {listing.quantityValue} {listing.quantityUnit} · Expires{" "}
                    {new Date(listing.expiryDate).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                    {isExpired(listing.expiryDate) ? (
                      <span className="ml-2 font-bold text-red-600">(Expired)</span>
                    ) : isExpiringWithinOneMonth(listing.expiryDate) ? (
                      <span className="ml-2 font-bold text-amber-600">(&lt; 1 mo left)</span>
                    ) : null}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono-brand text-xl font-extrabold text-[#0072d2]">
                    ₹{listing.finalPrice ?? listing.estimatedPrice}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      STATUS_BADGE[listing.status]
                    }`}
                  >
                    {LISTING_STATUS_LABEL[listing.status]}
                  </span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <StatusTracker status={listing.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
