import Link from "next/link";
import WatchVideoButton from "@/components/WatchVideoButton";
import QuickSellHeroSearch from "@/components/QuickSellHeroSearch";
import MedicineCalculator from "@/components/MedicineCalculator";
import Testimonials from "@/components/Testimonials";
import ImpactCertificateButton from "@/components/ImpactCertificateButton";
import HeroAnimatedCard from "@/components/HeroAnimatedCard";
import {
  ArrowRight,
  Pill,
  Users,
  Scan,
  TrendingUp,
  Truck,
  ShieldCheck,
  Heart,
  Camera,
  CheckCircle2,
  Sparkles,
  Wallet,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 md:gap-20 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative pt-4 pb-2 sm:pt-10 md:pt-14 md:pb-6 w-full max-w-full min-w-0 overflow-hidden">
        {/* Soft background ambient glows */}
        <div className="pointer-events-none absolute -top-24 inset-x-0 mx-auto h-[450px] max-w-5xl bg-gradient-to-b from-sky-100/50 via-sky-50/20 to-transparent blur-2xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12 w-full max-w-full min-w-0">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center sm:text-left w-full max-w-full min-w-0">
              {/* Top pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide uppercase text-[#0072d2] mb-3 sm:mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0072d2] animate-pulse" />
                Verified Medicine Buyback
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Don&apos;t dump it,
                <br />
                <span className="text-[#0072d2]">ReMeD</span>{" "}
                <span className="text-[#ff6b2b]">it.</span>
              </h1>

              {/* Concise Subtitle */}
              <p className="mt-2.5 sm:mt-3.5 max-w-lg text-xs sm:text-base text-slate-600 leading-relaxed mx-auto sm:mx-0">
                Turn your unexpired, sealed medicines into instant UPI payout. Zero paperwork, verified pharmacy inspection, and 100% free doorstep collection.
              </p>

              {/* Single-Row Integrated Search Bar */}
              <QuickSellHeroSearch />

              {/* Subtle Video & Safety Links */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <WatchVideoButton variant="pill" label="How it works (1-min video)" />
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0072d2] transition-colors py-1"
                >
                  Our Mission &amp; Safety <ArrowRight size={13} />
                </Link>
              </div>

              {/* 4 App Service Action Tiles */}
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 pt-5 border-t border-slate-200/70 text-left">
                <Link
                  href="/sell"
                  className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2 sm:p-2.5 shadow-2xs hover:border-[#ff6b2b] hover:bg-orange-50/20 transition-all active:scale-95"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#ff6b2b]">
                    <Pill size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">
                      Sell Strips
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium hidden sm:block">Instant Quote</span>
                  </div>
                </Link>

                <Link
                  href="/sell"
                  className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2 sm:p-2.5 shadow-2xs hover:border-purple-300 hover:bg-purple-50/20 transition-all active:scale-95"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                    <Scan size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">
                      AI Cam Scan
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium hidden sm:block">Auto OCR</span>
                  </div>
                </Link>

                <Link
                  href="#calculator"
                  className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2 sm:p-2.5 shadow-2xs hover:border-sky-300 hover:bg-sky-50/20 transition-all active:scale-95"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-[#0072d2]">
                    <TrendingUp size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">
                      Price Check
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium hidden sm:block">Instant Valuer</span>
                  </div>
                </Link>

                <Link
                  href="/track"
                  className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-2 sm:p-2.5 shadow-2xs hover:border-teal-300 hover:bg-teal-50/20 transition-all active:scale-95"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    <Truck size={15} />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block">
                      My Pickups
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium hidden sm:block">Live Status</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Hero Motion Simulation & Visual Experience */}
            <div className="relative lg:col-span-5 flex justify-center mt-6 lg:mt-0 w-full max-w-full">
              <HeroAnimatedCard />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSTANT BUYBACK CALCULATOR                             */}
      {/* ========================================================= */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0 overflow-hidden">
        <MedicineCalculator />
      </section>

      {/* ========================================================= */}
      {/* 3. HOW IT WORKS IN 3 SIMPLE STEPS                         */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0 overflow-hidden">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-[#0072d2]">
              Simple 3-Step Process
            </span>
            <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              How ReMeD Works
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
              Zero hassle, zero paperwork. From your home to doorstep UPI payout.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-sky-100 bg-[#f8fbff] p-5 sm:p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0072d2] text-white shadow-sm shadow-sky-500/25">
                  <Camera size={20} />
                </div>
                <span className="text-3xl font-black text-sky-200">01</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                1. Search or AI Scan
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Type your medicine brand or snap a quick photo. Our AI OCR instantly verifies the expiry date and gives you a guaranteed price quote.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-orange-100 bg-[#fffaf5] p-5 sm:p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6b2b] text-white shadow-sm shadow-orange-500/25">
                  <Truck size={20} />
                </div>
                <span className="text-3xl font-black text-orange-200">02</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                2. Free Doorstep Pickup
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose a pickup date and time slot that suits you. Our verified delivery partner comes directly to your doorstep with zero pickup fee.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-emerald-100 bg-[#f6fcf8] p-5 sm:p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-500/25">
                  <Wallet size={20} />
                </div>
                <span className="text-3xl font-black text-emerald-200">03</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                3. Instant UPI Cash
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Once the executive verifies the tamper-evident packaging, money is instantly transferred to your Google Pay, PhonePe, Paytm, or Bank.
              </p>
            </div>
          </div>

          {/* Learn more link */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 min-w-0">
            <span className="flex items-center gap-2 flex-wrap min-w-0 break-words text-center sm:text-left">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span>100% CDSCO Compliant &bull; Licensed Pharmacy Network &bull; Zero Landfill Guarantee</span>
            </span>
            <Link
              href="/about"
              className="font-bold text-[#0072d2] hover:underline flex items-center gap-1 shrink-0"
            >
              Read full safety &amp; compliance standards <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. VERIFIED STATS COUNTER STRIP                           */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0 overflow-hidden">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-8 shadow-xs">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
            {/* Stat 1 */}
            <div className="flex items-center gap-3 sm:gap-4 lg:px-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#0072d2]">
                <Users size={20} className="sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  10,000+
                </p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500">Happy Users</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 sm:gap-4 lg:px-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff6b2b]">
                <Pill size={20} className="sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  ₹25 Lakh+
                </p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500">Paid Out</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 sm:gap-4 lg:px-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={20} className="sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  100%
                </p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500">
                  Safe &amp; Verified
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col justify-center gap-2 lg:px-4 min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Sparkles size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm sm:text-base font-extrabold text-slate-900 truncate">
                    Eco Impact
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">
                    Zero Landfill
                  </p>
                </div>
              </div>
              <div className="pt-0.5">
                <ImpactCertificateButton label="View Impact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CUSTOMER TESTIMONIALS & TRUST                          */}
      {/* ========================================================= */}
      <Testimonials />
    </div>
  );
}
