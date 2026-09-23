import { Suspense } from "react";
import MedicineForm from "@/components/MedicineForm";
import { Sparkles, Loader2 } from "lucide-react";

export default function SellPage() {
  return (
    <div className="w-full max-w-6xl min-w-0 overflow-x-hidden mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#0072d2] mb-3">
          <Sparkles size={14} /> Instant Estimate &amp; Doorstep Pickup
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          List Your Medicine
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Add the details below and snap a photo of the strip or box. We&apos;ll give you an instant estimate and confirm the final price before pickup.
        </p>
      </div>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="flex justify-center p-12 text-slate-400">
              <Loader2 size={32} className="animate-spin text-[#0072d2]" />
            </div>
          }
        >
          <MedicineForm />
        </Suspense>
      </div>
    </div>
  );
}
