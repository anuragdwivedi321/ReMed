import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { LISTING_STATUS_LABEL, LISTING_STATUS_ORDER, ListingStatus } from "@/lib/types";

export default function StatusTracker({ status }: { status: ListingStatus }) {
  if (status === "rejected") {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-xs sm:text-sm font-semibold text-red-600">
        <XCircle size={18} className="shrink-0" />
        <span>This listing was rejected — see the note from our review team below.</span>
      </div>
    );
  }

  const currentIndex = LISTING_STATUS_ORDER.indexOf(status);
  const progressPct =
    currentIndex <= 0 ? 0 : (currentIndex / (LISTING_STATUS_ORDER.length - 1)) * 100;

  return (
    <div className="w-full">
      <div
        className="vine-line h-1.5 sm:h-2 w-full rounded-full bg-slate-200"
        style={{ ["--vine-progress" as string]: `${progressPct}%` }}
      />
      <ol className="mt-2.5 sm:mt-3 grid grid-cols-5 gap-0.5 sm:gap-1 text-center">
        {LISTING_STATUS_ORDER.map((step, i) => {
          const done = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <li key={step} className="flex flex-col items-center gap-1 sm:gap-1.5 px-0.5 min-w-0">
              {done ? (
                <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#0072d2] text-white shrink-0">
                  <CheckCircle2 size={13} className="sm:h-4 sm:w-4" />
                </div>
              ) : (
                <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-slate-200 text-slate-400 shrink-0">
                  <Circle size={11} className="sm:h-3.5 sm:w-3.5" />
                </div>
              )}
              <span
                className={`text-[9px] min-[400px]:text-[10px] sm:text-[11px] leading-tight transition-colors line-clamp-2 sm:line-clamp-none break-words w-full text-center ${
                  isCurrent
                    ? "font-extrabold text-[#0072d2]"
                    : done
                    ? "font-bold text-slate-800"
                    : "font-medium text-slate-400"
                }`}
              >
                {LISTING_STATUS_LABEL[step]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
