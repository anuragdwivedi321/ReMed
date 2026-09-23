"use client";

import Link from "next/link";
import { useState } from "react";
import { ReMedLogo } from "./Navbar";
import { CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:py-16">
        {/* Mobile Compact Footer */}
        <div className="md:hidden text-center py-2 space-y-3">
          <Link href="/" aria-label="ReMeD home" className="inline-block">
            <ReMedLogo />
          </Link>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            A simple step towards safer medication. Doorstep verification &amp; certified collection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 pt-1">
            <Link href="/about" className="hover:text-[#0072d2]">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#0072d2]">Contact</Link>
            <span>•</span>
            <a href="https://wa.me/917705898379" className="text-emerald-600 font-bold">WhatsApp Live</a>
          </div>
        </div>

        {/* Desktop Full Columns */}
        <div className="hidden md:grid gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="ReMeD home" className="inline-block">
              <ReMedLogo />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-500 leading-relaxed">
              A simple step towards safer medication and a healthier world.
              Don&apos;t dump it, ReMed it. We collect unused, unexpired medicines
              so fewer end up in landfills or drains.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-slate-900">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/sell">
                  Sell Medicine
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/#features">
                  Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/#how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#0072d2] transition-colors" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us with clean inline SVGs */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-slate-900">Follow Us</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Twitter X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-slate-900">Subscribe to our Newsletter</h3>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Thanks for subscribing! We&apos;ll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0072d2] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 rounded-xl bg-[#0072d2] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#005bb5] transition-colors text-center"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Get health tips, medicine reminders, and updates.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 text-center sm:text-left sm:flex-row">
          <div>
            © 2026 ReMeD. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5 font-medium">
            <Link href="/about" className="hover:text-[#0072d2] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#0072d2] transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              Made with <span className="text-red-500">❤️</span> for a Healthier Tomorrow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
