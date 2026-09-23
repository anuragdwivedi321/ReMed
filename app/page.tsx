import Link from "next/link";
import WatchVideoButton from "@/components/WatchVideoButton";
import QuickSellHeroSearch from "@/components/QuickSellHeroSearch";
import MedicineCalculator from "@/components/MedicineCalculator";
import Testimonials from "@/components/Testimonials";
import ImpactCertificateButton from "@/components/ImpactCertificateButton";
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
    <div className="flex flex-col gap-10 sm:gap-14 md:gap-20 overflow-hidden">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative pt-4 pb-2 sm:pt-10 md:pt-14 md:pb-6">
        {/* Soft background ambient glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-full max-w-7xl bg-gradient-to-b from-sky-100/50 via-sky-50/20 to-transparent blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center sm:text-left">
              {/* Top pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide uppercase text-[#0072d2] mb-3 sm:mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0072d2] animate-pulse" />
                Verified Medicine Buyback
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Sell Unused Medicines.
                <br />
                <span className="text-[#0072d2]">Doorstep Pickup</span> &amp;{" "}
                <span className="text-[#ff6b2b]">Cash</span>
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

            {/* Right Hero Graphic / Trust Visual (Desktop only to prevent mobile clutter) */}
            <div className="relative lg:col-span-5 hidden lg:flex justify-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Floating Note 1 */}
                <div className="absolute -top-4 right-1 sm:-top-6 sm:-right-2 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-md border border-sky-100 text-[10px] sm:text-xs font-bold text-[#0072d2]">
                  <span>Your Health Our Priority</span>
                  <Heart size={12} className="text-[#0072d2] fill-[#0072d2]" />
                </div>

                {/* Main Visual Box */}
                <div className="relative overflow-hidden rounded-3xl border border-sky-200/70 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/60 p-5 sm:p-6 shadow-xl shadow-sky-500/10">
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative mb-4 sm:mb-5 flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-gradient-to-b from-sky-400/20 to-blue-600/30 p-2 border-4 border-white shadow-inner">
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-[#005bb5] to-[#0072d2] text-white overflow-hidden">
                        <svg
                          className="h-32 w-32 sm:h-36 sm:w-36 text-white translate-y-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
                        </svg>
                        <div className="absolute bottom-2 flex items-center justify-center rounded-full bg-white px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-[#0072d2] shadow-sm">
                          Verified Pharmacist
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm max-w-xs text-left">
                      <p className="text-xs italic text-slate-700 font-medium leading-snug">
                        &ldquo;Use Medicines Wisely for a Healthier Tomorrow. ReMed verifies and redistributes so zero safe medicine is wasted.&rdquo;
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5 flex w-full items-center justify-between rounded-xl bg-white p-3 border border-sky-100 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                          <ShieldCheck size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-900">Better Health</p>
                          <p className="text-[10px] text-slate-500">Brighter Tomorrows</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-emerald-700">
                        100% Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Note 2 */}
                <div className="absolute -bottom-3 left-1 sm:-bottom-3 sm:-left-3 z-20 flex items-center gap-1.5 rounded-2xl bg-[#0072d2] px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-lg text-[10px] sm:text-xs font-bold text-white">
                  <span>Small Steps, Big Health</span>
                  <Heart size={12} className="text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSTANT BUYBACK CALCULATOR                             */}
      {/* ========================================================= */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MedicineCalculator />
      </section>

      {/* ========================================================= */}
      {/* 3. HOW IT WORKS IN 3 SIMPLE STEPS                         */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              100% CDSCO Compliant &bull; Licensed Pharmacy Network &bull; Zero Landfill Guarantee
            </span>
            <Link
              href="/about"
              className="font-bold text-[#0072d2] hover:underline flex items-center gap-1"
            >
              Read full safety &amp; compliance standards <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. VERIFIED STATS COUNTER STRIP                           */}
      {/* ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center justify-between gap-2 lg:px-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Sparkles size={20} className="sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base font-extrabold text-slate-900">
                    Eco Impact
                  </p>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500">
                    Zero Landfill
                  </p>
                </div>
              </div>
              <ImpactCertificateButton label="View Impact" />
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
