"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, Phone, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"identifier" | "otp">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) return;
    setBusy(true);
    setError(null);
    await requestOtp(identifier.trim());
    setBusy(false);
    setStep("otp");
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await verifyOtp(identifier.trim(), otp.trim());
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md min-w-0 overflow-x-hidden mx-auto flex flex-col items-center px-4 sm:px-6 py-10 sm:py-24">
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-blue-500/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0072d2] border border-sky-100 shadow-xs">
          {step === "identifier" ? (
            <Phone size={22} className="text-[#0072d2]" />
          ) : (
            <KeyRound size={22} className="text-[#0072d2]" />
          )}
        </div>

        <h1 className="mt-5 text-center font-display text-2xl font-extrabold text-slate-900">
          {step === "identifier" ? "Log in or Sign Up" : "Enter Verification Code"}
        </h1>
        <p className="mt-1.5 text-center text-sm text-slate-500">
          {step === "identifier"
            ? "We'll send you a fast 6-digit one-time passcode."
            : `Sent to ${identifier}`}
        </p>

        {step === "identifier" ? (
          <form onSubmit={handleRequestOtp} className="mt-6 space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-bold text-slate-900">
                Phone Number or Email
              </label>
              <input
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or +91 9XXXXXXXXX"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                required
              />
              <p className="mt-2 text-[11px] font-medium text-slate-400">
                Demo tip: Use an address containing &quot;admin&quot; (e.g. admin@remed.app) to access the admin portal.
              </p>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 disabled:opacity-70 transition-all"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Send Verification Code <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-bold text-slate-900">
                6-Digit Code
              </label>
              <input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="111111"
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-center font-mono-brand text-2xl tracking-[0.3em] font-extrabold text-[#0072d2] focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
            {error && (
              <p className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 disabled:opacity-70 transition-all"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Verify &amp; Continue <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => setStep("identifier")}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-[#0072d2] transition-colors"
            >
              Use a different phone or email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
