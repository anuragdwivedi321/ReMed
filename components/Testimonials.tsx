"use client";

import { Star, ShieldCheck, Heart, Award, Building2, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  savedAmount: string;
  badge: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    name: "Rohit Malhotra",
    role: "Software Engineer",
    location: "New Delhi",
    rating: 5,
    text: "My father had changed his BP prescription and we had 4 unopened strips left. ReMeD's pickup agent arrived next morning, inspected the foil seal, and ₹680 was credited directly to my Google Pay account on the spot!",
    savedAmount: "₹680 Earned",
    badge: "Verified Seller",
  },
  {
    id: 2,
    name: "Dr. Ananya Sen",
    role: "General Physician & Mother",
    location: "Bengaluru",
    rating: 5,
    text: "As a doctor, seeing unexpired medicines get thrown into garbage bins broke my heart. ReMeD's verified pharmacy inspection protocol ensures safe repurposing. I recommended it to all my family and friends.",
    savedAmount: "12 Strips Donated",
    badge: "Healthcare Professional",
  },
  {
    id: 3,
    name: "Amitabh Srivastava",
    role: "Retired Banker",
    location: "Lucknow",
    rating: 5,
    text: "The AI camera scanner is brilliantly easy even for seniors. Just snapped a picture of the strip, it identified the batch and 2026 expiry date automatically. No complicated forms at all!",
    savedAmount: "₹1,240 Earned",
    badge: "Repeat Customer",
  },
];

const TRUST_METRICS = [
  {
    icon: ShieldCheck,
    title: "CDSCO Standard Protocols",
    desc: "Rigorous unexpired & tamper-seal verification standards",
  },
  {
    icon: Building2,
    title: "Licensed Pharmacy Network",
    desc: "Every strip inspected by certified pharmacy professionals",
  },
  {
    icon: Award,
    title: "100% Safe Handling",
    desc: "Certified medical logistics with tamper-evident packaging",
  },
  {
    icon: Heart,
    title: "Zero-Landfill Commitment",
    desc: "Over 50,000+ doses diverted from polluting groundwater",
  },
];

export default function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3">
          <Star size={13} className="fill-emerald-600 text-emerald-600" /> Rated 4.9/5 by 10,000+ Users
        </div>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Trusted by Families &amp; Doctors Across India
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          See how ReMeD is helping thousands turn unused medicines into instant cashback and life-saving donations.
        </p>
      </div>

      {/* Review Cards (Swipeable Carousel on mobile, 3-column grid on desktop) */}
      <div className="mt-6 sm:mt-10 flex overflow-x-auto gap-3.5 pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 no-scrollbar w-full max-w-full min-w-0">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="shrink-0 w-[80vw] max-w-sm snap-center md:w-auto flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-lg shadow-blue-500/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 min-w-0"
          >
            <div>
              {/* Rating stars & badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold text-[#0072d2] border border-sky-100">
                  {review.savedAmount}
                </span>
              </div>

              {/* Review Text */}
              <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Author profile */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0072d2] to-sky-600 text-xs font-bold text-white shadow-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {review.location} • {review.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <CheckCircle2 size={12} /> {review.badge}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Compliance Strip */}
      <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-8 text-white shadow-xl min-w-0 w-full overflow-hidden">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
          {TRUST_METRICS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 break-words">
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
