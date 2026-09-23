"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ClipboardList,
  PlusCircle,
  Menu,
  X,
  Calculator,
  Sparkles,
  Info,
  PhoneCall,
  MessageCircle,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/languageContext";
import { useAuth } from "@/lib/auth";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [showMore, setShowMore] = useState(false);

  // Close sheet on route change without cascading renders
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setShowMore(false);
  }

  // Lock body scroll when "More" sheet is open
  useEffect(() => {
    if (showMore) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMore]);

  const isHome = pathname === "/";
  const isSell = pathname === "/sell";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {/* Fixed Bottom Navigation Bar - Visible on Mobile & Tablet (< lg) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-bottom transition-all w-full max-w-full overflow-visible"
      >
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5 sm:py-2 w-full min-w-0">
          {/* 1. Home Tab */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95 ${
              isHome
                ? "text-[#0072d2] font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div className="relative">
              <Home size={22} strokeWidth={isHome ? 2.5 : 2} />
              {isHome && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#0072d2]" />
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">
              {t("Home", "होम")}
            </span>
          </Link>

          {/* 2. My Listings / Track Orders Tab */}
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95 ${
              isDashboard
                ? "text-[#0072d2] font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div className="relative">
              <ClipboardList size={22} strokeWidth={isDashboard ? 2.5 : 2} />
              {isDashboard && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#0072d2]" />
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">
              {t("My Pickups", "पिकअप्स")}
            </span>
          </Link>

          {/* 3. CENTER HIGHLIGHTED CTA: Sell Medicine / Book Pickup */}
          <Link
            href="/sell"
            className="flex flex-col items-center justify-center -mt-6 group active:scale-95 transition-transform relative z-10"
          >
            <div
              className={`flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff6b2b] to-[#f97316] text-white shadow-xl shadow-orange-500/35 border-2 border-white ring-4 ring-white transition-all ${
                isSell ? "ring-[#ff6b2b]/30 scale-105" : ""
              }`}
            >
              <PlusCircle size={28} strokeWidth={2.4} />
            </div>
            <span className="text-[11px] font-extrabold text-[#ff6b2b] mt-0.5">
              {t("Sell", "दवाई बेचें")}
            </span>
          </Link>

          {/* 4. Price Calculator Tab */}
          <Link
            href="/#calculator"
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 font-medium transition-all active:scale-95"
          >
            <Calculator size={22} strokeWidth={2} />
            <span className="text-[11px] mt-0.5 tracking-tight">
              {t("Price Check", "कीमत")}
            </span>
          </Link>

          {/* 5. "More" Sheet Trigger */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            aria-label="Open more menu options"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95 ${
              showMore
                ? "text-[#0072d2] font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <Menu size={22} strokeWidth={showMore ? 2.5 : 2} />
            <span className="text-[11px] mt-0.5 tracking-tight">
              {t("More", "और")}
            </span>
          </button>
        </div>
      </nav>

      {/* "More" Slide-up Bottom Sheet Modal */}
      {showMore && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setShowMore(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Sheet Container */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Sheet Handle */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-extrabold text-slate-900">
                  ReMeD <span className="text-xs font-semibold text-slate-400">Menu</span>
                </span>
              </div>

              {/* Language Switcher Pill */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      language === "en"
                        ? "bg-white text-[#0072d2] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("hi")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      language === "hi"
                        ? "bg-white text-[#0072d2] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMore(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Cards Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link
                href="/sell"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/70 p-3 shadow-xs active:scale-98 transition-all"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b2b] text-white">
                  <PlusCircle size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {t("Sell Medicine", "दवाई बेचें")}
                  </p>
                  <p className="text-[10px] text-orange-700 font-medium">
                    {t("Instant Quote", "तुरंत कीमत")}
                  </p>
                </div>
              </Link>

              <Link
                href="/#calculator"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/70 p-3 shadow-xs active:scale-98 transition-all"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0072d2] text-white">
                  <Calculator size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {t("Calculator", "कैलकुलेटर")}
                  </p>
                  <p className="text-[10px] text-[#0072d2] font-medium">
                    {t("Check Value", "रेट देखें")}
                  </p>
                </div>
              </Link>
            </div>

            {/* Menu List */}
            <div className="mt-4 space-y-1.5">
              <Link
                href="/#features"
                onClick={() => setShowMore(false)}
                className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[#0072d2]" />
                  {t("Features & Safety", "फीचर्स और सुरक्षा")}
                </span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>

              <Link
                href="/about"
                onClick={() => setShowMore(false)}
                className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Info size={18} className="text-[#0072d2]" />
                  {t("About ReMeD Mission", "हमारे मिशन के बारे में")}
                </span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>

              <Link
                href="/contact"
                onClick={() => setShowMore(false)}
                className="flex items-center justify-between rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <PhoneCall size={18} className="text-[#0072d2]" />
                  {t("Contact & Support", "कॉल और ईमेल संपर्क")}
                </span>
                <ArrowRight size={16} className="text-slate-400" />
              </Link>

              {/* WhatsApp direct chat */}
              <a
                href="https://wa.me/917705898379"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100/70 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-emerald-600" />
                  <span>WhatsApp Chat Support</span>
                </span>
                <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                  Live
                </span>
              </a>

              {user?.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setShowMore(false)}
                  className="flex items-center justify-between rounded-xl bg-purple-50 border border-purple-200 p-3 text-sm font-bold text-purple-900"
                >
                  <span className="flex items-center gap-3">
                    <Shield size={18} className="text-purple-600" />
                    Admin Panel
                  </span>
                  <ArrowRight size={16} className="text-purple-400" />
                </Link>
              )}
            </div>

            {/* Bottom Support Info */}
            <div className="mt-5 border-t border-slate-100 pt-4 text-center">
              <p className="text-xs font-bold text-slate-900">
                Helpline: <a href="tel:+917705898379" className="text-[#0072d2] underline">+91 77058 98379</a>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Mon - Sun: 9:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
