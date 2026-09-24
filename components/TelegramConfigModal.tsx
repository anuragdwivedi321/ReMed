"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertTriangle, Key, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import {
  getTelegramBotToken,
  getTelegramChatId,
  saveTelegramCredentials,
  sendTelegramTestPing,
  isTelegramConfigured,
} from "@/lib/telegramAuth";

interface TelegramConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved?: () => void;
}

export default function TelegramConfigModal({
  isOpen,
  onClose,
  onConfigSaved,
}: TelegramConfigModalProps) {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBotToken(getTelegramBotToken());
      setChatId(getTelegramChatId());
      setTestResult(null);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleTest() {
    if (!botToken.trim() || !chatId.trim()) {
      setTestResult({
        success: false,
        message: "Please enter both Bot Token and Chat ID to test.",
      });
      return;
    }

    setTesting(true);
    setTestResult(null);
    try {
      await sendTelegramTestPing(botToken.trim(), chatId.trim());
      setTestResult({
        success: true,
        message: "✅ Test message sent successfully to your Telegram!",
      });
    } catch (err: unknown) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : "Failed to connect to Telegram Bot.",
      });
    } finally {
      setTesting(false);
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveTelegramCredentials(botToken.trim(), chatId.trim());
    setSavedSuccess(true);
    if (onConfigSaved) onConfigSaved();
    setTimeout(() => {
      onClose();
    }, 1200);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-250 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/25">
            <Send size={20} className="-translate-x-0.5 translate-y-0.5" />
          </div>
          <div>
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
              Telegram OTP Configuration
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Receive your secure login OTP directly on your Telegram app
            </p>
          </div>
        </div>

        {/* Quick Guide / Help */}
        <div className="mt-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 p-3.5 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-[#0072d2] flex items-center gap-1.5">
            <Key size={14} /> Telegram Bot Setup Guide (Takes 1 Minute):
          </p>
          <ol className="list-decimal pl-4 space-y-1 text-slate-600">
            <li>
              Telegram open karein aur search karein{" "}
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#0072d2] underline inline-flex items-center gap-0.5"
              >
                @BotFather <ExternalLink size={10} />
              </a>
              . Type karein <code>/newbot</code> aur Bot ka naam rakhein. Aapko <strong>HTTP API Bot Token</strong> milega.
            </li>
            <li>
              Apna Chat ID lene ke liye search karein{" "}
              <a
                href="https://t.me/getmyid_bot"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#0072d2] underline inline-flex items-center gap-0.5"
              >
                @getmyid_bot <ExternalLink size={10} />
              </a>{" "}
              ya <code>@userinfobot</code> aur <code>/start</code> dabayein. Aapka <strong>Your user ID</strong> (e.g. <code>123456789</code>) copy karein.
            </li>
            <li>
              Dono fields neeche paste karein aur &quot;Test Ping&quot; dabayein!
            </li>
          </ol>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800" htmlFor="telegramToken">
              Telegram Bot Token
            </label>
            <input
              id="telegramToken"
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="e.g. 7123456789:AAFnkXYZ-abcdef123456789"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800" htmlFor="telegramChatId">
              Your Telegram Chat ID (User ID)
            </label>
            <input
              id="telegramChatId"
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="e.g. 583921048"
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:border-[#0072d2] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div
              className={`rounded-xl p-3 text-xs font-medium border ${
                testResult.success
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {testResult.message}
            </div>
          )}

          {savedSuccess && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800 text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 size={15} /> Credentials Saved Successfully!
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing || !botToken.trim() || !chatId.trim()}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 text-xs font-bold text-[#0072d2] hover:bg-sky-100 disabled:opacity-50 transition-all cursor-pointer"
            >
              {testing ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending Test Ping...
                </>
              ) : (
                <>
                  <Send size={14} /> Test Ping on Telegram
                </>
              )}
            </button>

            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0072d2] to-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <CheckCircle2 size={14} /> Save &amp; Activate
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Aap ye credentials <code>.env.local</code> me <code>NEXT_PUBLIC_TELEGRAM_BOT_TOKEN</code> aur <code>NEXT_PUBLIC_TELEGRAM_CHAT_ID</code> ke roop me bhi set kar sakte hain.
        </p>
      </div>
    </div>
  );
}
