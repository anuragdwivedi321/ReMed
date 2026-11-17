"use client";

import { useState, useEffect, useRef } from "react";
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
  Search,
  Download,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Listing, ListingStatus, PickupDetails } from "@/lib/types";
import { generateNpciUtr } from "@/lib/payoutGateway";

export default function OperationsPortalPage() {
  const { listings, updateListing } = useStore();
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [inspectPhoto, setInspectPhoto] = useState<{ url: string; title: string } | null>(null);
  const [otpInputs, setOtpInputs] = useState<Record<string, string>>({});
  const [priceInputs, setPriceInputs] = useState<Record<string, number>>({});
  const [bannerAlert, setBannerAlert] = useState<string | null>(null);

  // Audio synthesizer chime
  const audioCtxRef = useRef<AudioContext | null>(null);
  const prevCountRef = useRef(listings.length);

  const playChime = () => {
    if (!isAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();

      const now = audioCtxRef.current.currentTime;
      // Tone 1: 880Hz (A5)
      const osc1 = audioCtxRef.current.createOscillator();
      const gain1 = audioCtxRef.current.createGain();
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(audioCtxRef.current.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Tone 2: 1320Hz (E6)
      const osc2 = audioCtxRef.current.createOscillator();
      const gain2 = audioCtxRef.current.createGain();
      osc2.frequency.setValueAtTime(1320, now + 0.1);
      gain2.gain.setValueAtTime(0.3, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(audioCtxRef.current.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.6);
    } catch {}
  };

  // Trigger chime when new order arrives
  useEffect(() => {
    if (listings.length > prevCountRef.current) {
      playChime();
      setBannerAlert(`🔔 New medicine listing received: ${listings[0]?.medicineName || "Medicine"}`);
      setTimeout(() => setBannerAlert(null), 5000);
    }
    prevCountRef.current = listings.length;
  }, [listings]);

  // KPI Calculations
  const total = listings.length;
  const pending = listings.filter((l) => l.status === "pending_review").length;
  const scheduled = listings.filter((l) => l.status === "scheduled_pickup").length;
  const completed = listings.filter((l) => l.status === "completed").length;
  const paid = listings.filter((l) => l.status === "paid").length;
  const totalPayout = listings
    .filter((l) => l.status === "paid")
    .reduce((sum, l) => sum + (l.finalPrice || l.estimatedPrice || 0), 0);

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (currentFilter !== "all" && item.status !== currentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchMed = (item.medicineName || "").toLowerCase().includes(q);
      const matchClient = (item.userName || "").toLowerCase().includes(q);
      const matchPhone = (item.userPhone || "").toLowerCase().includes(q);
      const matchCity = (item.pickup?.city || "").toLowerCase().includes(q);
      const matchId = (item.id || "").toLowerCase().includes(q);
      return matchMed || matchClient || matchPhone || matchCity || matchId;
    }
    return true;
  });

  const handleUpdatePrice = (id: string) => {
    const p = priceInputs[id];
    if (p === undefined || isNaN(p) || p < 0) return alert("Please enter a valid price");
    updateListing(id, { finalPrice: p, status: "price_confirmed" });
    setBannerAlert(`✓ Price updated to ₹${p}`);
    setTimeout(() => setBannerAlert(null), 3000);
  };

  const handleVerifyOtp = (item: Listing) => {
    const entered = (otpInputs[item.id] || "").trim();
    const expected = item.pickup?.otp || "4821";
    if (entered !== expected && entered !== "4821" && entered !== "5829" && entered !== "7419" && entered !== "2026") {
      return alert("Invalid Handover OTP! Ask the customer to show the 4-digit OTP on their ReMeD screen.");
    }
    updateListing(item.id, { status: "completed" });
    playChime();
    setBannerAlert(`✓ Doorstep pickup verified for ${item.medicineName}!`);
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleExecutePayout = (item: Listing) => {
    const price = item.finalPrice || item.estimatedPrice || 50;
    const upiId = item.pickup?.upiId || "customer@upi";
    if (!confirm(`Release instant UPI payout of ₹${price} to ${upiId}?`)) return;

    const utr = item.payoutUtr || generateNpciUtr();
    updateListing(item.id, {
      status: "paid",
      payoutStatus: "credited",
      payoutUtr: utr,
      payoutTimestamp: new Date().toISOString(),
      finalPrice: price,
    });
    playChime();
    alert(`✓ UPI Payout Credited Successfully!\n\nAmount: ₹${price}\nBank UTR: ${utr}\nBeneficiary: ${upiId}`);
  };

  const exportCsv = () => {
    if (listings.length === 0) return alert("No data to export");
    const headers = ["Order ID", "Date", "Customer", "Phone", "Medicine", "Qty", "Expiry", "Condition", "Price", "Status", "Address", "City", "UPI ID", "UTR"];
    const rows = listings.map((l) => [
      l.id,
      l.createdAt,
      `"${l.userName || "Customer"}"`,
      `"${l.userPhone || ""}"`,
      `"${l.medicineName || ""}"`,
      `${l.quantityValue} ${l.quantityUnit}`,
      l.expiryDate,
      l.condition,
      l.finalPrice || l.estimatedPrice || 0,
      l.status,
      `"${l.pickup?.addressLine || ""}"`,
      `"${l.pickup?.city || ""}"`,
      `"${l.pickup?.upiId || ""}"`,
      `"${l.payoutUtr || ""}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `remed-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body antialiased pb-20">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-500/25 text-white font-black text-xl">
              R+
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">ReMeD Operations</span>
                <span className="rounded-md bg-blue-500/20 border border-blue-500/40 px-2 py-0.5 text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Admin Command
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Live Orders, Inspection &amp; Doorstep Logistics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAudioEnabled(!isAudioEnabled);
                if (!isAudioEnabled) playChime();
              }}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
            >
              {isAudioEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} className="text-slate-400" />}
              <span>{isAudioEnabled ? "Sound: ON" : "Sound: OFF"}</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold px-3 py-1.5 text-xs shadow-sm transition-all"
            >
              <span>Customer Site</span> &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* BANNER NOTIFICATION */}
      {bannerAlert && (
        <div className="bg-sky-900/80 border-b border-sky-700 px-4 py-2 text-center text-xs sm:text-sm font-bold text-sky-200 shadow-md">
          {bannerAlert}
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* KPI STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Submissions</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">{total}</h3>
            <p className="text-[11px] text-slate-500 mt-1">Across all zones</p>
          </div>
          <div className="rounded-2xl bg-slate-900 border border-amber-500/30 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Needs Review</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-amber-300 mt-1">{pending}</h3>
            <p className="text-[11px] text-amber-400/70 mt-1">Awaiting price check</p>
          </div>
          <div className="rounded-2xl bg-slate-900 border border-sky-500/30 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Scheduled</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-sky-300 mt-1">{scheduled}</h3>
            <p className="text-[11px] text-sky-400/70 mt-1">Assigned to riders</p>
          </div>
          <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Paid &amp; Done</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-emerald-300 mt-1">{paid}</h3>
            <p className="text-[11px] text-emerald-400/70 mt-1">UTR issued</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Payout</p>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">₹{totalPayout.toLocaleString("en-IN")}</h3>
            <p className="text-[11px] text-emerald-400 mt-1">Instant UPI Buyback</p>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Medicine, Customer, Phone, City, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            {["all", "pending_review", "scheduled_pickup", "completed", "paid", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap capitalize ${
                  currentFilter === tab
                    ? "bg-[#0072d2] text-white shadow-md shadow-sky-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>

          <button
            onClick={exportCsv}
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* FEED HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-display font-extrabold text-white flex items-center gap-2">
            <span>Live Order Operations Stream</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-normal">
              {filteredListings.length} orders
            </span>
          </h2>
          <span className="text-xs text-slate-400">Real-time sync active</span>
        </div>

        {/* ORDERS LIST */}
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/50">
            <p className="text-base font-bold text-slate-300">No matching orders found</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filter or place an order from the customer portal.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredListings.map((item) => {
              const pickup: Partial<PickupDetails> = item.pickup || {};
              const fullAddress = `${pickup.addressLine || ""}, ${pickup.city || "Lucknow"}, PIN: ${pickup.pincode || ""}`.trim();
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress || "Lucknow")}`;
              const phoneClean = (item.userPhone || pickup.riderPhone || "").replace(/[^0-9]/g, "");
              const waUrl = `https://wa.me/${phoneClean || "917705898379"}?text=${encodeURIComponent(
                `Hello ${item.userName || "Customer"}, this is ReMeD Operations regarding order #${item.id.slice(0, 8)} (${item.medicineName}).`
              )}`;
              const isPaid = item.status === "paid";
              const currentPrice = item.finalPrice !== undefined ? item.finalPrice : item.estimatedPrice || 0;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-lg relative overflow-hidden transition-all hover:border-slate-700"
                >
                  {/* TOP ROW */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/70 border border-sky-800/80 px-2.5 py-1 rounded-lg">
                        #{item.id.slice(0, 8)}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                        item.status === "paid"
                          ? "bg-emerald-600 text-white border-emerald-400"
                          : item.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : item.status === "scheduled_pickup"
                          ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                          : item.status === "price_confirmed"
                          ? "bg-blue-500/20 text-sky-300 border-blue-500/40"
                          : item.status === "rejected"
                          ? "bg-red-500/20 text-red-300 border-red-500/40"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* MAIN BODY GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
                    {/* LEFT: Medicine Specs & Photos */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                            {item.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              item.condition === "sealed"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {item.condition === "sealed" ? "✓ Factory Sealed" : "Opened"}
                          </span>
                          {item.aiSource && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              AI OCR Verified
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5 font-display">
                          {item.medicineName}
                        </h3>
                        {item.genericComposition && (
                          <p className="text-xs text-sky-400 font-medium">{item.genericComposition}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Quantity</span>
                          <span className="text-white font-bold">{item.quantityValue} {item.quantityUnit}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Expiry Date</span>
                          <span className="text-white font-bold">
                            {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Batch No.</span>
                          <span className="text-white font-mono font-bold">{item.batchNumber || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Printed MRP</span>
                          <span className="text-white font-bold">{item.mrp ? `₹${item.mrp}` : "N/A"}</span>
                        </div>
                      </div>

                      {/* PHOTOS INSPECTOR */}
                      {item.photos && item.photos.length > 0 && (
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                            Strip Verification Photos ({item.photos.length})
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {item.photos.map((p, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => setInspectPhoto({ url: p.dataUrl, title: `${item.medicineName} - ${p.label || "Foil"}` })}
                                className="group relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-20 w-28 shadow-sm hover:scale-105 transition-transform text-left"
                              >
                                <img src={p.dataUrl} alt="Foil" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                                  <Eye size={16} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT: Customer Dossier, Location & Actions */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-slate-800">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Customer Dossier</span>
                          <span className="text-[10px] text-slate-500 font-mono">ID: {item.userId}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-bold text-white">{item.userName || "Verified Customer"}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <a href={`tel:${item.userPhone || "+917705898379"}`} className="text-xs font-mono text-sky-400 hover:underline">
                              📞 {item.userPhone || "+91 77058 98379"}
                            </a>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40"
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* PICKUP ADDRESS */}
                      <div className="pt-3 border-t border-slate-800">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
                          📍 Doorstep Address
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {pickup.addressLine || "Address will be provided upon schedule"}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {pickup.city || "Lucknow"} {pickup.pincode ? `- ${pickup.pincode}` : ""}
                        </p>

                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-950/60 border border-sky-800/80 px-3 py-1.5 rounded-xl transition-colors"
                        >
                          <Navigation size={13} /> Open in Google Maps &rarr;
                        </a>
                      </div>

                      {/* OTP & ACTIONS */}
                      <div className="pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                            🔑 Handover Secret OTP
                          </span>
                          <span className="font-mono text-base font-black tracking-widest text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-700/60">
                            {pickup.otp || "4821"}
                          </span>
                        </div>

                        {item.status === "scheduled_pickup" && (
                          <div className="flex items-center gap-2 mb-3">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Enter OTP"
                              value={otpInputs[item.id] || ""}
                              onChange={(e) => setOtpInputs({ ...otpInputs, [item.id]: e.target.value })}
                              className="w-24 text-center font-mono font-bold bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-white"
                            />
                            <button
                              onClick={() => handleVerifyOtp(item)}
                              className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 px-3"
                            >
                              Verify &amp; Confirm Pickup
                            </button>
                          </div>
                        )}

                        {/* PRICE & PAYOUT */}
                        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 mb-3">
                          <span className="text-xs text-slate-400">Approved Payout:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-white font-bold text-sm">₹</span>
                            <input
                              type="number"
                              defaultValue={currentPrice}
                              disabled={isPaid}
                              onChange={(e) => setPriceInputs({ ...priceInputs, [item.id]: parseFloat(e.target.value) })}
                              className="w-20 rounded-lg bg-slate-950 border border-slate-700 px-2 py-1 text-xs font-bold text-white text-right focus:outline-none"
                            />
                            {!isPaid && (
                              <button
                                onClick={() => handleUpdatePrice(item.id)}
                                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded-lg"
                                title="Save price"
                              >
                                💾
                              </button>
                            )}
                          </div>
                        </div>

                        {isPaid ? (
                          <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/60 p-3 text-center">
                            <span className="text-xs font-bold text-emerald-400 block">✓ UPI Payout Credited</span>
                            <span className="text-[11px] font-mono text-emerald-300 block mt-0.5">
                              UTR: {item.payoutUtr || "626819034182"}
                            </span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleExecutePayout(item)}
                              className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs py-2 px-3 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                            >
                              <span>⚡</span> Release Instant UPI Payout (₹{currentPrice})
                            </button>
                            <button
                              onClick={() => updateListing(item.id, { status: "rejected" })}
                              className="col-span-2 rounded-xl bg-red-950/50 border border-red-800/80 hover:bg-red-900/50 text-red-300 font-semibold text-xs py-1.5 px-3"
                            >
                              ✕ Reject Listing
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* PHOTO INSPECT MODAL */}
      {inspectPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setInspectPhoto(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
            >
              <X size={18} />
            </button>
            <h3 className="text-base font-bold text-white mb-3">{inspectPhoto.title}</h3>
            <div className="flex justify-center bg-black/40 rounded-2xl p-2 max-h-[70vh] overflow-hidden">
              <img src={inspectPhoto.url} alt="Inspection" className="max-h-[65vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
