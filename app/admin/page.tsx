"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldAlert, XCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { NEXT_STATUS, useStore } from "@/lib/store";
import { LISTING_STATUS_LABEL, Listing } from "@/lib/types";
import { isExpired, isExpiringWithinOneMonth } from "@/lib/priceEstimator";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { listings, updateListing } = useStore();

  if (authLoading) return null;

  if (!user?.isAdmin) {
    return (
      <div className="w-full max-w-md min-w-0 overflow-x-hidden mx-auto px-5 py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-4 border border-red-200">
          <ShieldAlert size={28} />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900">Admins Only</h1>
        <p className="mt-2 text-sm text-slate-600">
          Log in with an authorized admin account to review medicine submissions.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0072d2] px-6 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:bg-[#005bb5]"
        >
          Go to Login <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl min-w-0 overflow-x-hidden mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
            Admin Console
          </span>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Medicine Review Queue
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Verify photos, inspect OCR expiry dates, set final payout prices, and advance stages.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-400 lg:hidden flex items-center gap-1.5">
        <span>↔</span> Swipe horizontally to view full review table and actions
      </p>

      <div className="mt-3 overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm custom-scrollbar">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Medicine</th>
              <th className="px-5 py-4">Photos</th>
              <th className="px-5 py-4">Estimate</th>
              <th className="px-5 py-4">Final Price (₹)</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.map((listing) => (
              <AdminRow key={listing.id} listing={listing} onUpdate={updateListing} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminRow({
  listing,
  onUpdate,
}: {
  listing: Listing;
  onUpdate: (id: string, patch: Partial<Listing>) => void;
}) {
  const [price, setPrice] = useState(listing.finalPrice ?? listing.estimatedPrice);
  const nextStatus = NEXT_STATUS[listing.status];

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-5 py-4">
        <p className="font-bold text-slate-900">{listing.medicineName}</p>
        <p className="text-xs text-slate-500">
          {listing.quantityValue} {listing.quantityUnit} · Exp:{" "}
          {new Date(listing.expiryDate).toLocaleDateString("en-IN", {
            month: "short",
            year: "2-digit",
          })}
          {isExpired(listing.expiryDate) ? (
            <span className="ml-1.5 font-bold text-red-600">(Expired)</span>
          ) : isExpiringWithinOneMonth(listing.expiryDate) ? (
            <span className="ml-1.5 font-bold text-amber-600">(&lt; 1 mo)</span>
          ) : null}
        </p>
      </td>
      <td className="px-5 py-4">
        <div className="flex gap-2">
          {listing.photos.length === 0 && (
            <span className="text-xs text-slate-400">None</span>
          )}
          {listing.photos.slice(0, 3).map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.dataUrl}
              alt="Submission"
              className="h-10 w-10 rounded-xl border border-sky-100 object-cover shadow-xs"
            />
          ))}
        </div>
      </td>
      <td className="px-5 py-4 font-mono-brand font-bold text-slate-500">
        ₹{listing.estimatedPrice}
      </td>
      <td className="px-5 py-4">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-24 rounded-xl border border-slate-300 px-3 py-1.5 font-mono-brand font-bold text-sm text-[#0072d2] focus:border-[#0072d2] focus:outline-none"
        />
      </td>
      <td className="px-5 py-4">
        <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-[#0072d2]">
          {LISTING_STATUS_LABEL[listing.status]}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {listing.status === "pending_review" && (
            <button
              onClick={() => onUpdate(listing.id, { finalPrice: price, status: "price_confirmed" })}
              className="flex items-center gap-1.5 rounded-xl bg-[#0072d2] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#005bb5] transition-all"
            >
              <CheckCircle2 size={13} /> Confirm Price
            </button>
          )}
          {nextStatus && listing.status !== "pending_review" && (
            <button
              onClick={() => onUpdate(listing.id, { status: nextStatus, finalPrice: price })}
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-[#0072d2] hover:text-[#0072d2] transition-colors"
            >
              Mark {LISTING_STATUS_LABEL[nextStatus].toLowerCase()}
            </button>
          )}
          {listing.status !== "rejected" && listing.status !== "paid" && (
            <button
              onClick={() =>
                onUpdate(listing.id, {
                  status: "rejected",
                  adminNote: "Doesn't meet our verified safety criteria for reuse.",
                })
              }
              className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
            >
              <XCircle size={13} /> Reject
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
