# ReMed

**Don't dump it, ReMed it.**

A platform where people list unused, unexpired medicines for pickup instead
of throwing them away. This build implements the full Sell Medicine flow
end-to-end on mock data, per the brief's priority: *"Prioritize getting the
Sell Medicine flow end-to-end working before polishing other pages."*

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-variable theme, see `app/globals.css`)
- lucide-react icons
- No external DB/auth wired yet — see **Mock data layer** below

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, how it works, impact stats, trust strip, CTA |
| `/sell` | Core Sell Medicine flow (form + camera capture + live price estimate) |
| `/dashboard` | My Listings — status of everything you've submitted |
| `/dashboard/[id]` | Listing detail — status tracker + pickup address/slot scheduling |
| `/admin` | Admin review queue — adjust price, approve/reject, advance status |
| `/about` | Why ReMed — environmental impact + safety/compliance disclaimer |
| `/login` | Mock phone/email OTP login |
| `/contact` | Support form |

## Key components

- `components/CameraCapture.tsx` — reusable live camera capture (`getUserMedia`)
  with retake, plus drag-and-drop / file-picker fallback. Used twice in
  `MedicineForm` (package photo + expiry close-up).
- `components/MedicineForm.tsx` — medicine name (autosuggest via `<datalist>`),
  category, quantity + unit, expiry date (blocks expired, flags near-expiry
  in amber), condition, and a live price estimate panel.
- `lib/medicineCatalog.ts` — searchable catalogue of common Indian generic and
  brand medicine names. Extend this list or replace it with a verified pharmacy API.
- `lib/expiryOcr.ts` — extracts labelled EXP/EXPIRY/USE BY dates from OCR text.
  Expiry close-up photos are scanned in the browser with Tesseract.js and the
  detected date is always shown for user confirmation.
- `components/StatusTracker.tsx` — delivery-tracker style progress UI shared
  by the dashboard list and listing detail page.
- `lib/priceEstimator.ts` — **placeholder pricing logic**, clearly commented.
  `estimatePrice()` has a stable signature so it can be swapped for a real
  pricing/ML service later without touching callers.

## Mock data layer (replace before launch)

Two files simulate the backend so the UI is fully testable without infra:

- `lib/store.tsx` — listings, backed by `localStorage`. Mirrors the shape of
  future `/api/listings` routes (`createListing` → `POST`, `updateListing`
  → `PATCH`, etc.) so swapping in real API routes + PostgreSQL is mechanical.
- `lib/auth.tsx` — mock OTP session, backed by `localStorage`. Swap for a
  NextAuth `SessionProvider` + credentials/OTP provider; keep the same
  `useAuth()` shape (`user`, `verifyOtp`, `signOut`).

**Demo login:** any identifier + any 4+ digit code logs you in. Use an
identifier containing "admin" (e.g. `admin@remed.app`) to reach `/admin`.

## Fonts

Fraunces (display), Inter (body), and IBM Plex Mono (prices/data) are loaded
via a `<link>` tag in `app/layout.tsx` rather than `next/font/google`, so the
project builds in network-restricted environments. With normal internet
access at build time, you can switch to `next/font/google` for self-hosted,
zero-layout-shift fonts — keep the same CSS variable names used in
`app/globals.css` (`--font-fraunces`, `--font-inter`, `--font-plex-mono`).

## Before this goes live

- **Regulatory check**: many jurisdictions restrict resale of returned
  medicines to consumers. `/about` already states a review + certified
  disposal/compliant-redistribution model rather than direct resale —
  confirm this matches your local pharma regulations, and line up a
  licensed pharmacy or disposal partner.
- Replace `lib/store.tsx` / `lib/auth.tsx` with real API routes, a Postgres
  database, and NextAuth email/phone OTP.
- Replace `estimatePrice()` with real pricing logic.
- Wire image uploads to Cloudinary/S3 instead of inline base64.
- Replace the demo medicine catalogue with a licensed, regularly updated drug
  database before launch; suggestions are a convenience, not medical advice.
