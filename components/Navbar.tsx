"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/languageContext";

export function ReMedLogo() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
      {/* Medical Cross & Leaf SVG Icon from Reference Design */}
      <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 p-1.5 sm:p-2 shadow-md shadow-sky-500/25 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
        >
          {/* Medical Cross */}
          <path
            d="M9 3H15V8H20V14H15V21H9V14H4V8H9V3Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Leaf accent curl */}
          <path
            d="M14 9C17 9 19.5 6.5 19.5 3.5C16.5 3.5 14 6 14 9Z"
            fill="#34d399"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
          <span className="text-slate-900">Re</span>
          <span className="text-[#0072d2]">Me</span>
          <span className="text-[#ff6b2b]">D</span>
        </span>
        <span className="hidden min-[380px]:inline-block text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-500 leading-tight">
          {t("For a Safer, Healthier Tomorrow", "सुरक्षित और स्वस्थ कल के लिए")}
        </span>
      </div>
    </div>
  );
}

const LINKS = [
  { href: "/", labelEn: "Home", labelHi: "होम" },
  { href: "/sell", labelEn: "Sell Medicine", labelHi: "दवाई बेचें" },
  { href: "/#calculator", labelEn: "Price Calculator", labelHi: "कैलकुलेटर" },
  { href: "/#features", labelEn: "Features", labelHi: "फीचर्स" },
  { href: "/dashboard", labelEn: "My Listings", labelHi: "मेरी लिस्टिंग्स" },
  { href: "/about", labelEn: "About", labelHi: "हमारे बारे में" },
  { href: "/contact", labelEn: "Contact", labelHi: "संपर्क" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  // Close mobile drawer on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" aria-label="ReMeD home" className="outline-none focus-visible:ring-2 focus-visible:ring-[#0072d2] rounded-xl">
          <ReMedLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors hover:text-[#0072d2] ${
                  isActive ? "text-[#0072d2]" : "text-slate-600"
                }`}
              >
                {language === "hi" ? link.labelHi : link.labelEn}
                {isActive && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 rounded-full bg-[#0072d2]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dual Language Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs font-bold mr-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                language === "en"
                  ? "bg-white text-[#0072d2] shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                language === "hi"
                  ? "bg-[#0072d2] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              हिंदी
            </button>
          </div>

          {user?.isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200"
            >
              <Shield size={13} /> Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={signOut}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              {t("Sign out", "लॉग आउट")}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border border-[#0072d2]/40 px-4 py-2 text-sm font-semibold text-[#0072d2] transition-all hover:bg-sky-50"
            >
              {t("Login", "लॉगिन")}
            </Link>
          )}

          <Link
            href="/sell"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-5 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:shadow-lg hover:shadow-orange-500/35 hover:brightness-105 active:scale-95"
          >
            {t("Sell Medicines", "दवाई बेचें")} <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Button & Language Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile compact language toggle */}
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-md px-2 py-1 ${
                language === "en" ? "bg-white text-[#0072d2] shadow-xs" : "text-slate-500"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-md px-2 py-1 ${
                language === "hi" ? "bg-[#0072d2] text-white shadow-xs" : "text-slate-500"
              }`}
            >
              हिं
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (with backdrop blur & touch scrolling) */}
      {open && (
        <div className="fixed inset-x-0 top-[60px] sm:top-[65px] bottom-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden animate-in fade-in duration-150">
          <div className="max-h-[calc(100vh-65px)] overflow-y-auto border-b border-slate-200 bg-white px-5 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                      isActive
                        ? "bg-sky-50 text-[#0072d2]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{language === "hi" ? link.labelHi : link.labelEn}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-[#0072d2]" />}
                  </Link>
                );
              })}

              {user?.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-purple-700 hover:bg-purple-50"
                >
                  <Shield size={16} /> Admin Review Queue
                </Link>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                {user ? (
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="w-full rounded-xl border border-slate-300 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {t("Sign out", "लॉग आउट")}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl border border-[#0072d2]/40 py-3 text-center text-sm font-bold text-[#0072d2] hover:bg-sky-50"
                  >
                    {t("Login", "लॉगिन")}
                  </Link>
                )}

                <Link
                  href="/sell"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-3.5 text-center text-sm font-bold text-white shadow-md shadow-orange-500/25 active:scale-95"
                >
                  {t("Sell Medicines", "दवाई बेचें")} <ArrowRight size={16} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
