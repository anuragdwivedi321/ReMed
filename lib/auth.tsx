"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppUser } from "./types";
import {
  isFirebaseConfigured,
  signInWithGoogle,
  auth as fbAuth,
} from "./firebase";
import { onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

const STORAGE_KEY = "remed.session.v1";

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  requestOtp: (identifier: string) => Promise<void>;
  verifyOtp: (identifier: string, otp: string) => Promise<AppUser>;
  signInWithGoogleAuth: () => Promise<AppUser>;
  signOut: () => void;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session from storage or Firebase
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn("Could not load local session:", e);
    } finally {
      setLoading(false);
    }

    // If Firebase is configured, listen to real Firebase Auth changes
    if (isFirebaseConfigured && fbAuth) {
      const unsub = onAuthStateChanged(fbAuth, (fbUser) => {
        if (fbUser) {
          const appUser: AppUser = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
            identifier: fbUser.email || fbUser.phoneNumber || "Verified User",
            isAdmin: (fbUser.email || "").toLowerCase().includes("admin"),
            photoURL: fbUser.photoURL || undefined,
            email: fbUser.email || undefined,
            phoneNumber: fbUser.phoneNumber || undefined,
            authProvider: fbUser.phoneNumber ? "phone" : "google",
          };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
          setUser(appUser);
        }
      });
      return () => unsub();
    }
  }, []);

  const requestOtp = async (identifier: string) => {
    // Simulated or Firebase Phone OTP request
    await new Promise((r) => setTimeout(r, 600));
  };

  const verifyOtp = async (identifier: string, otp: string) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!/^\d{4,6}$/.test(otp.trim())) {
      throw new Error("Enter a valid OTP code (e.g. 1234 or 111111).");
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const isAdmin = normalizedIdentifier.includes("admin");
    const newUser: AppUser = {
      id: isAdmin ? "admin-user" : `user-${Date.now().toString(36)}`,
      name: isAdmin
        ? "Admin Pharmacist"
        : normalizedIdentifier.includes("@")
        ? normalizedIdentifier.split("@")[0]
        : `User (${normalizedIdentifier.slice(-4)})`,
      identifier: normalizedIdentifier,
      isAdmin,
      authProvider: "phone",
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signInWithGoogleAuth = async (): Promise<AppUser> => {
    if (!isFirebaseConfigured) {
      // Fallback demo Google Login if Firebase keys are not provided yet
      const demoGoogleUser: AppUser = {
        id: "google-demo-user",
        name: "Google User (Demo)",
        identifier: "demo.user@gmail.com",
        isAdmin: false,
        email: "demo.user@gmail.com",
        authProvider: "google",
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoGoogleUser));
      setUser(demoGoogleUser);
      return demoGoogleUser;
    }

    const appUser = await signInWithGoogle();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
    setUser(appUser);
    return appUser;
  };

  const signOut = async () => {
    try {
      if (isFirebaseConfigured && fbAuth) {
        await fbSignOut(fbAuth);
      }
    } catch (e) {
      console.warn("Firebase signout error:", e);
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      requestOtp,
      verifyOtp,
      signInWithGoogleAuth,
      signOut,
      isFirebaseActive: isFirebaseConfigured,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
