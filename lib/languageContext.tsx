"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (enText: string, hiText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (enText) => enText,
});

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const val = localStorage.getItem("remed_lang");
    return val === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function setLanguage(lang: Language) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("remed_lang", lang);
        window.dispatchEvent(new Event("storage"));
      }
    } catch {
      // Ignore write errors
    }
  }

  function toggleLanguage() {
    setLanguage(language === "en" ? "hi" : "en");
  }

  function t(enText: string, hiText: string): string {
    return language === "hi" ? hiText : enText;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
