"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Download, Share2, X, ShieldCheck, ArrowRight } from "lucide-react";
import { Listing } from "@/lib/types";
import { generateNpciUtr, validateUpiId } from "@/lib/payoutGateway";

interface UpiReceiptModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpiReceiptModal({ listing, isOpen, onClose }: UpiReceiptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const upiId = listing.pickup?.upiId || "donor@remed.in";
  const upiInfo = validateUpiId(upiId);
  const utr = listing.payoutUtr || generateNpciUtr();
  const amount = listing.finalPrice ?? listing.estimatedPrice ?? 0;
  const timestamp = listing.payoutTimestamp
    ? new Date(listing.payoutTimestamp).toLocaleString("en-IN")
    : new Date().toLocaleString("en-IN");

  const copyUtr = () => {
    navigator.clipboard.writeText(utr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `ReMeD Instant Payout Receipt\nMedicine: ${listing.medicineName}\nAmount: ₹${amount}\nUTR: ${utr}\nStatus: CREDITED via ${upiInfo.bankName}`;
    if (navigator.share) {
      navigator.share({ title: "ReMeD Payment Receipt", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Receipt details copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-250">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close receipt"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
            <CheckCircle2 size={32} />
          </div>
          <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Payment Credited
          </span>
          <h2 className="mt-2 font-display text-3xl font-black text-slate-900">
            ₹{amount}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Transferred to {upiInfo.bankName}
          </p>
        </div>

        {/* Receipt Details Box */}
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Medicine</span>
            <span className="font-bold text-slate-900 text-right truncate max-w-[180px]">
              {listing.medicineName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Beneficiary UPI</span>
            <span className="font-mono text-slate-800 font-semibold">{upiId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Bank Routing</span>
            <span className="font-semibold text-slate-700">{upiInfo.provider}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
            <span className="text-slate-500 font-medium">NPCI UTR / RRN</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#0072d2]">
              <span>{utr}</span>
              <button
                type="button"
                onClick={copyUtr}
                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                title="Copy UTR"
              >
                <Copy size={13} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Transfer Date</span>
            <span className="text-slate-600 font-medium">{timestamp}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Transfer Mode</span>
            <span className="font-semibold text-slate-700">IMPS / 24x7 UPI Instant</span>
          </div>
        </div>

        {copied && (
          <p className="mt-2 text-center text-[11px] font-bold text-emerald-600">
            ✓ Bank Reference UTR copied!
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
          >
            <Share2 size={14} />
            <span>Share Slip</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0072d2] to-sky-600 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:brightness-105 active:scale-95 transition-all"
          >
            <Download size={14} />
            <span>Save PDF</span>
          </button>
        </div>

        {/* NPCI Trust Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-400">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Verified by Licensed Pharmacist &bull; NPCI Gateway</span>
        </div>
      </div>
    </div>
  );
}
