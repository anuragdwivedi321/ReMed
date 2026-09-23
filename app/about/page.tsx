import Link from "next/link";
import {
  Leaf,
  Recycle,
  ShieldCheck,
  Users,
  CheckCircle2,
  Pill,
  Package,
  Heart,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl min-w-0 overflow-x-hidden mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-[#0072d2]">
          Our Mission &amp; Purpose
        </span>
        <h1 className="mt-3 font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Why ReMeD Exists
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Every year, households discard millions of medicines that are still well within their expiry date — because there was never an easy, trustworthy, and compliant way to do anything else with them.
        </p>
      </div>

      {/* 2 Primary Pillars */}
      <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-sky-100 bg-[#eaf4ff] p-5 sm:p-7 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0072d2] shadow-sm mb-4">
            <Leaf size={24} />
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Less Pharmaceutical Waste
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Unused medicines flushed down drains or tossed in domestic trash contaminate ground soil and municipal water bodies. Diverting them responsibly preserves our environment.
          </p>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-[#fff5ea] p-5 sm:p-7 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff6b2b] shadow-sm mb-4">
            <Users size={24} />
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Fair Value, Not Landfill
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            You receive fair financial compensation for unused strips you might have thrown away anyway — and unexpired stock in sealed condition gets redistributed safely.
          </p>
        </div>
      </div>

      {/* Core Platform Features Section */}
      <div id="features" className="mt-14 sm:mt-16">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#ff6b2b]">
            Platform Capabilities
          </span>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Smart Features Built for Families
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Everything you need to keep medicine cabinets safe, organized, and financially sensible.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-3xl border border-sky-200/70 bg-[#eaf4ff] p-5 sm:p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0072d2] shadow-sm mb-4">
              <Pill size={24} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Expiry Reminders
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Get timely alerts before medicines expire so you can sell or donate them in time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-orange-200/70 bg-[#fff5ea] p-5 sm:p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff6b2b] shadow-sm mb-4">
              <Package size={24} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Organize Easily
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Keep all your medicines in one digital dashboard with automated tracking.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-teal-200/70 bg-[#e6f8f6] p-5 sm:p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Family Care
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Manage medicine cabinets for elders and loved ones with doorstep pickup.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl border border-emerald-200/70 bg-[#f0fdf4] p-5 sm:p-6 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm mb-4">
              <Leaf size={24} />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Reduce Waste
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Prevent toxic chemicals from polluting our water tables and rivers.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose ReMeD Checklist + Doctor Quote */}
      <div className="mt-14 sm:mt-16 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <Sparkles size={14} /> Trust &amp; Transparency
            </div>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Families Choose <span className="text-[#0072d2]">ReMeD</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              We operate under strict pharmaceutical protocols to guarantee safety, zero counterfeit circulation, and guaranteed fair cash payouts.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Simple & 100% Free Doorstep Pickup",
                "Instant Payout via UPI (Google Pay, PhonePe, Paytm)",
                "AI-Powered OCR Scanner for Packaging",
                "Certified Pharmacist Inspection of Tamper Seals",
                "Zero-Landfill Eco-Certified Disposal Protocol",
                "Option to Donate Value Directly to Free Clinics",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0072d2] text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/50 to-blue-50/70 p-6 text-center sm:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0072d2] text-white font-bold shadow-md shadow-sky-500/20">
                Dr
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">Verified Pharmacist Review</p>
                <p className="text-xs text-[#0072d2] font-semibold">Quality &amp; Standards Team</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
              &ldquo;Use Medicines Wisely for a Healthier Tomorrow. ReMed verifies and redistributes so zero safe medicine is wasted and unused drugs never end up in domestic landfills.&rdquo;
            </p>

            <div className="mt-6 pt-5 border-t border-sky-200/60 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Heart size={14} className="text-rose-500 fill-rose-500" /> Community First
              </span>
              <Link
                href="/sell"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0072d2] hover:underline"
              >
                Sell Medicines Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Box */}
      <div className="mt-10 rounded-3xl border border-sky-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0072d2]">
            <ShieldCheck size={22} />
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Safety &amp; Compliance Standards
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Medicine safety is our foremost principle. ReMeD does not resell collected medicines directly to individual consumers peer-to-peer.
          </p>
          <p>
            Every submission undergoes pharmacist review before pickup. Expired, broken, or compromised items are rejected immediately.
          </p>
          <p>
            After collection, medicines are routed through licensed pharmacy partners and certified biomedical disposal facilities in compliance with CDSCO regulations.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 size={16} /> Licensed Pharmacy Partners
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 size={16} /> Certified Eco-Disposal
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 size={16} /> 100% Tamper Check
          </span>
        </div>
      </div>

      {/* Donation banner */}
      <div className="mt-8 flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-xs border border-slate-200">
          <Recycle size={20} />
        </div>
        <p className="text-xs sm:text-sm text-slate-700">
          <strong className="font-bold text-slate-900">Prefer to donate instead of sell?</strong> Contact us — we partner with certified charitable healthcare clinics that accept free medicine donations.
        </p>
      </div>
    </div>
  );
}
