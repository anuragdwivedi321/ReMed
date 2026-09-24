"use client";

import { useState, useEffect, ReactNode } from "react";
import { Lock, ShieldCheck, KeyRound, AlertCircle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface TeamAccessGateProps {
  children: ReactNode;
}

// 2 Months Expiry Date: November 25, 2026 (60 days from deployment)
const EXPIRY_TIMESTAMP = new Date("2026-11-25T23:59:59").getTime();

// Valid Passcodes for Team
const VALID_PASSCODES = ["2026", "remed2026", "remed@2026"];

const STORAGE_KEY = "remed_team_auth_access";

export default function TeamAccessGate({ children }: TeamAccessGateProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [daysRemaining, setDaysRemaining] = useState<number>(60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const now = Date.now();
    const diffTime = EXPIRY_TIMESTAMP - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      setIsExpired(true);
      return;
    }

    setDaysRemaining(diffDays);

    // Check if already authenticated on this device
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth === "granted_active") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleaned = passcode.trim().toLowerCase();
    if (!cleaned) {
      setErrorMsg("Please enter the team access code");
      return;
    }

    if (VALID_PASSCODES.includes(cleaned)) {
      localStorage.setItem(STORAGE_KEY, "granted_active");
      setIsAuthenticated(true);
    } else {
      setErrorMsg("Invalid team code. Default PIN is: 2026");
    }
  };



  // 1. If 2-Month Pilot is Expired
  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-4 select-none">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center border border-slate-200">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <Clock size={32} />
          </div>
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 mb-3">
            Trial Period Concluded
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            2-Month Team Access Expired
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            The 60-day internal preview access period for ReMeD has ended (Nov 25, 2026).
            Please contact the administrator to renew or extend team access.
          </p>
          <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200 text-xs text-slate-700 font-medium">
            Contact Admin: <span className="font-bold text-[#0072d2]">anuraggzb321@gmail.com</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. If Authenticated and within 2-Month Window -> Show Full App
  if (isAuthenticated) {
    return (
      <>
        {/* Subtle top indicator for team remaining validity */}
        <div className="w-full bg-slate-900 text-slate-200 text-[10px] sm:text-[11px] py-1 px-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Team Access Mode:</span>
            <span className="text-sky-300 font-medium">{daysRemaining} Days Remaining (Valid till 25 Nov 2026)</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              setIsAuthenticated(false);
            }}
            className="hidden sm:inline-flex text-[10px] text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            Lock Device
          </button>
        </div>
        {children}
      </>
    );
  }

  // 3. Team Passcode Lock Screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#003466] p-4 select-none">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-sky-100 relative overflow-hidden">
        {/* Background glow accent */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-sky-200/50 blur-2xl" />

        <div className="relative text-center">
          {/* Logo / Lock Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#005bb5] to-[#0072d2] text-white shadow-lg shadow-sky-500/30">
            <Lock size={26} />
          </div>

          {/* Access validity badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[11px] font-bold text-[#0072d2] mb-3">
            <Clock size={12} className="text-[#0072d2]" />
            <span>2-Month Team Preview ({daysRemaining} Days Left)</span>
          </div>

          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            Team Access Required
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
            This deployment is restricted to internal team members. Enter your team passcode to access ReMeD.
          </p>

          {/* Passcode Form */}
          <form onSubmit={handleUnlock} className="mt-6 text-left space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Enter Team Passcode / PIN
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <KeyRound size={16} />
                </div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="e.g. 2026"
                  autoFocus
                  className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 text-sm font-semibold tracking-wider text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:border-[#0072d2] focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all"
                />
              </div>

              {errorMsg && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072d2] to-[#005bb5] py-3 text-sm font-bold text-white shadow-md shadow-sky-600/25 hover:from-[#0060b2] hover:to-[#004d99] transition-all cursor-pointer active:scale-[0.99]"
            >
              <span>Unlock App</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Helpful Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <ShieldCheck size={13} className="text-emerald-600" />
              Auto-remember device
            </span>
            <span className="font-mono text-slate-400">PIN: 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
