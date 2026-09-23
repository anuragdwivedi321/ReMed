"use client";

/**
 * ------------------------------------------------------------------
 * Mock auth layer.
 * ------------------------------------------------------------------
 * Stands in for NextAuth.js email/phone OTP login so the core Sell
 * Medicine flow is testable without real credentials. Swap this
 * provider for a NextAuth SessionProvider later; keep the same
 * useAuth() hook shape (`user`, `signIn`, `signOut`) so consuming
 * components don't need to change.
 *
 * DEMO OTP: any 6-digit code is accepted; typing "111111" is a
 * shortcut used by the demo. Sign in with an identifier containing
 * "admin" (e.g. admin@remed.app) to reach the admin panel.
 * ------------------------------------------------------------------
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppUser } from "./types";

const STORAGE_KEY = "remed.session.v1";

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  requestOtp: (identifier: string) => Promise<void>;
  verifyOtp: (identifier: string, otp: string) => Promise<AppUser>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } finally {
      setLoading(false);
    }
  }, []);

  const requestOtp = async () => {
    // In production: POST /api/auth/otp/request { identifier }
    await new Promise((r) => setTimeout(r, 500));
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    // In production: POST /api/auth/otp/verify { identifier, otp } via NextAuth credentials provider
    await new Promise((r) => setTimeout(r, 500));
    if (!/^\d{6}$/.test(otp.trim())) {
      throw new Error("Enter the 6-digit code sent to you.");
    }
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const isAdmin = normalizedIdentifier.includes("admin");
    const newUser: AppUser = {
      id: isAdmin ? "admin-user" : "demo-user",
      name: isAdmin ? "Admin" : normalizedIdentifier.split(/[@\d]/)[0] || "Neighbor",
      identifier: normalizedIdentifier,
      isAdmin,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signOut = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, requestOtp, verifyOtp, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
