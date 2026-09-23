"use client";

/**
 * ------------------------------------------------------------------
 * Mock data layer.
 * ------------------------------------------------------------------
 * Per the build brief: wire the Sell Medicine flow end-to-end first
 * with local/mock data, then swap this file for real API routes
 * backed by PostgreSQL. Every function here mirrors what a future
 * `/app/api/listings/*` route would do, so the swap is mechanical:
 *   - listListings(userId?)   -> GET /api/listings
 *   - createListing(input)    -> POST /api/listings
 *   - updateListing(id, patch)-> PATCH /api/listings/:id
 * ------------------------------------------------------------------
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Listing, ListingStatus } from "./types";

const STORAGE_KEY = "remed.listings.v1";

function loadFromStorage(): Listing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedListings();
    return JSON.parse(raw) as Listing[];
  } catch {
    return seedListings();
  }
}

function persist(listings: Listing[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

function seedListings(): Listing[] {
  const now = Date.now();
  const seeded: Listing[] = [
    {
      id: "seed-1",
      userId: "demo-user",
      medicineName: "Azithromycin 500mg",
      category: "tablet",
      quantityValue: 1,
      quantityUnit: "strip",
      expiryDate: new Date(now + 1000 * 60 * 60 * 24 * 300).toISOString().slice(0, 10),
      condition: "sealed",
      photos: [],
      estimatedPrice: 30,
      finalPrice: 28,
      status: "scheduled_pickup",
      pickup: {
        addressLine: "12 Lotus Enclave, Civil Lines",
        city: "Prayagraj",
        pincode: "211001",
        date: new Date(now + 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 10),
        slot: "10:00 AM - 12:00 PM",
      },
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 4).toISOString(),
    },
    {
      id: "seed-2",
      userId: "demo-user",
      medicineName: "Cetirizine Syrup",
      category: "syrup",
      quantityValue: 1,
      quantityUnit: "bottle",
      expiryDate: new Date(now + 1000 * 60 * 60 * 24 * 500).toISOString().slice(0, 10),
      condition: "opened",
      photos: [],
      estimatedPrice: 27,
      status: "pending_review",
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
    {
      id: "seed-3",
      userId: "demo-user",
      medicineName: "Vitamin D3 60k IU",
      category: "capsule",
      quantityValue: 4,
      quantityUnit: "strip",
      expiryDate: new Date(now + 1000 * 60 * 60 * 24 * 60).toISOString().slice(0, 10),
      condition: "sealed",
      photos: [],
      estimatedPrice: 40,
      finalPrice: 40,
      status: "paid",
      pickup: {
        addressLine: "12 Lotus Enclave, Civil Lines",
        city: "Prayagraj",
        pincode: "211001",
        date: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString().slice(0, 10),
        slot: "2:00 PM - 4:00 PM",
      },
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 14).toISOString(),
    },
  ];
  persist(seeded);
  return seeded;
}

interface StoreContextValue {
  listings: Listing[];
  loading: boolean;
  createListing: (listing: Listing) => void;
  updateListing: (id: string, patch: Partial<Listing>) => void;
  getListing: (id: string) => Listing | undefined;
  listingsForUser: (userId: string) => Listing[];
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrating from localStorage after mount (SSR has no `window`), so a
    // one-time setState here is intentional rather than a derived-state bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setListings(loadFromStorage());
    setLoading(false);
  }, []);

  const createListing = useCallback((listing: Listing) => {
    setListings((prev) => {
      const next = [listing, ...prev];
      persist(next);
      return next;
    });
  }, []);

  const updateListing = useCallback((id: string, patch: Partial<Listing>) => {
    setListings((prev) => {
      const next = prev.map((l) => (l.id === id ? { ...l, ...patch } : l));
      persist(next);
      return next;
    });
  }, []);

  const getListing = useCallback(
    (id: string) => listings.find((l) => l.id === id),
    [listings]
  );

  const listingsForUser = useCallback(
    (userId: string) => listings.filter((l) => l.userId === userId),
    [listings]
  );

  const value = useMemo(
    () => ({ listings, loading, createListing, updateListing, getListing, listingsForUser }),
    [listings, loading, createListing, updateListing, getListing, listingsForUser]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const NEXT_STATUS: Partial<Record<ListingStatus, ListingStatus>> = {
  pending_review: "price_confirmed",
  price_confirmed: "scheduled_pickup",
  scheduled_pickup: "completed",
  completed: "paid",
};
