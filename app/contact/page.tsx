"use client";

import { useState } from "react";
import { Loader2, Mail, MessageCircle, Phone, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    setBusy(false);
    setSent(true);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:grid-cols-2 items-center">
      <div>
        <span className="rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-[#0072d2]">
          Support &amp; Inquiries
        </span>
        <h1 className="mt-3 font-display text-2xl sm:text-4xl font-extrabold text-slate-900">
          Contact &amp; Support
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Questions about a pickup, price estimate, bulk medicine donation, or compliance? Reach out — our pharmacist team typically responds within a business day.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3.5 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-xs">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0072d2]">
              <Phone size={18} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Call us</p>
              <a
                href="tel:+917705898379"
                className="text-sm font-bold text-slate-900 hover:text-[#0072d2] transition-colors"
              >
                +91 77058 98379
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-xs">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail size={18} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Email support</p>
              <a
                href="mailto:anuragdwivedi132021@gmail.com"
                className="text-sm font-bold text-slate-900 hover:text-[#0072d2] transition-colors break-all"
              >
                anuragdwivedi132021@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-xs">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageCircle size={18} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Live chat</p>
              <a
                href="https://wa.me/917705898379"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                Available 9am – 7pm IST (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
        {sent ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-3 border border-emerald-100">
              <CheckCircle2 size={28} />
            </div>
            <p className="font-display text-xl font-bold text-slate-900">Message Received!</p>
            <p className="mt-1 text-sm text-slate-500 max-w-xs">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900">
                Full Name
              </label>
              <input
                id="name"
                required
                placeholder="Dr. / Mr. / Ms."
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900">
                Email or Mobile Number
              </label>
              <input
                id="email"
                required
                placeholder="name@example.com or +91 9XXXXXXXXX"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-900">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="How can we help you with medicine reuse, pickup, or pricing?"
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 disabled:opacity-70 transition-all"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
