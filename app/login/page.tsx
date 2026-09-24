"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Loader2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Send,
  ExternalLink,
  Settings,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { isTelegramConfigured, SendTelegramOtpResult } from "@/lib/telegramAuth";
import TelegramConfigModal from "@/components/TelegramConfigModal";

export default function LoginPage() {
  const router = useRouter();
  const { requestOtp, verifyOtp, signInWithGoogleAuth, isFirebaseActive } = useAuth();
  const [step, setStep] = useState<"identifier" | "otp">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telegramReady, setTelegramReady] = useState(false);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [otpResult, setOtpResult] = useState<SendTelegramOtpResult | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    setTelegramReady(isTelegramConfigured());
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  async function handleGoogleSignIn() {
    setGoogleBusy(true);
    setError(null);
    try {
      await signInWithGoogleAuth();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed.");
    } finally {
      setGoogleBusy(false);
    }
  }

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) return;

    // Check if phone or email
    const cleanId = identifier.trim();
    setBusy(true);
    setError(null);

    try {
      const result = await requestOtp(cleanId);
      setOtpResult(result);
      setStep("otp");
      setResendCountdown(30);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send Telegram OTP.");
    } finally {
      setBusy(false);
    }
  }

  async function handleResendOtp() {
    if (resendCountdown > 0 || !identifier.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const result = await requestOtp(identifier.trim());
      setOtpResult(result);
      setResendCountdown(30);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend Telegram OTP.");
    } finally {
      setBusy(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!otp.trim()) return;

    setBusy(true);
    setError(null);

    try {
      // Strict verification: only the exact OTP sent to Telegram is accepted!
      await verifyOtp(identifier.trim(), otp.trim());
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid OTP! Please enter the exact code sent to your Telegram."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md min-w-0 overflow-x-hidden mx-auto flex flex-col items-center px-4 sm:px-6 py-8 sm:py-20">
      <div className="w-full rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-blue-500/5">
        {/* Top Header & Telegram Config Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsTelegramModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              telegramReady
                ? "bg-sky-50 text-[#0072d2] border border-sky-200 hover:bg-sky-100"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <Send size={13} className={telegramReady ? "text-[#0072d2]" : "text-amber-700"} />
            <span>{telegramReady ? "Telegram Active ✓" : "⚙️ Setup Telegram Bot"}</span>
          </button>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold ${
              isFirebaseActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isFirebaseActive ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
              }`}
            />
            {isFirebaseActive ? "Cloud Sync" : "Fast Demo"}
          </span>
        </div>

        {/* Center Icon */}
        <div className="mt-4 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-[#0072d2] text-white shadow-md shadow-sky-500/25">
          {step === "identifier" ? (
            <Send size={24} className="-translate-x-0.5 translate-y-0.5" />
          ) : (
            <KeyRound size={24} />
          )}
        </div>

        <h1 className="mt-4 text-center font-display text-2xl font-extrabold text-slate-900">
          {step === "identifier" ? "Telegram OTP Login" : "Enter Telegram Code"}
        </h1>
        <p className="mt-1 text-center text-xs sm:text-sm text-slate-500">
          {step === "identifier"
            ? "Enter your mobile number. A 6-digit secure OTP will be sent directly to your Telegram account."
            : `Verification code was sent for ${identifier}`}
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700 text-center animate-in fade-in">
            {error}
          </div>
        )}

        {step === "identifier" ? (
          <div className="mt-6 space-y-4">
            {/* Mobile Form with Telegram Delivery */}
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-xs font-bold text-slate-800">
                  Mobile Number
                </label>
                <div className="relative mt-1.5 flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-slate-400 select-none">
                    +91
                  </span>
                  <input
                    id="identifier"
                    type="tel"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="9876543210"
                    maxLength={14}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-11 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Send size={11} className="text-[#0072d2]" /> OTP will be delivered on Telegram
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsTelegramModalOpen(true)}
                    className="text-[#0072d2] hover:underline font-semibold"
                  >
                    Change Bot / Chat ID
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072d2] to-sky-600 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/25 hover:brightness-105 active:scale-95 disabled:opacity-70 transition-all cursor-pointer"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending to Telegram...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send OTP on Telegram <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-full border-t border-slate-200" />
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or with Google
              </span>
              <div className="w-full border-t border-slate-200" />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleBusy}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition-all disabled:opacity-70"
            >
              {googleBusy ? (
                <Loader2 size={16} className="animate-spin text-slate-500" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>
        ) : (
          /* Step 2: Verification Code Input */
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            {/* Telegram Sent Banner */}
            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3.5 text-xs text-sky-950 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold text-[#0072d2]">
                <Send size={15} />
                <span>
                  {otpResult?.isDeliveredViaTelegram
                    ? "✓ OTP Sent to your Telegram App!"
                    : "Generated Secure OTP"}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {otpResult?.isDeliveredViaTelegram
                  ? "Please check your Telegram messages for the 6-digit verification code."
                  : "Telegram Bot is not connected yet. You can click 'Setup Telegram Bot' or use the active session OTP below to test:"}
              </p>

              {/* If Bot was not configured, show debug OTP hint so user isn't stuck */}
              {otpResult?.debugOtpHint && (
                <div className="rounded-xl bg-white border border-sky-200 p-2 text-center font-mono font-bold text-sm text-[#0072d2]">
                  Session OTP: {otpResult.debugOtpHint}
                </div>
              )}

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[#0072d2] hover:underline pt-1"
              >
                <span>Open Telegram Web / App</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div>
              <label htmlFor="otp" className="block text-xs font-bold text-slate-800">
                Enter 6-Digit Telegram OTP
              </label>
              <input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
                maxLength={6}
                inputMode="numeric"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-center font-mono text-2xl tracking-[0.35em] font-extrabold text-[#0072d2] focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
                required
                autoFocus
              />
              <p className="mt-2 text-center text-xs text-slate-500">
                Enter the exact 6-digit code received on your Telegram.
              </p>
            </div>

            <button
              type="submit"
              disabled={busy || otp.length < 4}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 disabled:opacity-60 transition-all cursor-pointer"
            >
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying OTP...
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Verify &amp; Login
                </>
              )}
            </button>

            {/* Resend and Change Number Actions */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={() => setStep("identifier")}
                className="font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                &larr; Change Number
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCountdown > 0 || busy}
                className="font-bold text-[#0072d2] hover:underline disabled:opacity-50 disabled:no-underline"
              >
                {resendCountdown > 0
                  ? `Resend in ${resendCountdown}s`
                  : "Resend OTP on Telegram"}
              </button>
            </div>
          </form>
        )}

        {/* Security Trust Note */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
          <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
          <span>Telegram End-to-End Encrypted OTP &bull; ReMeD Verified</span>
        </div>
      </div>

      {/* Telegram Configuration Modal */}
      <TelegramConfigModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        onConfigSaved={() => setTelegramReady(isTelegramConfigured())}
      />
    </div>
  );
}
