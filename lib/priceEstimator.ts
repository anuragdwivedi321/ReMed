import { Condition, MedicineCategory, QuantityUnit } from "./types";

/**
 * ------------------------------------------------------------------
 *  estimatePrice()
 * ------------------------------------------------------------------
 *  PLACEHOLDER PRICING LOGIC.
 *
 *  This is a simple, transparent, rule-based formula so the "Sell
 *  Medicine" flow is testable end-to-end without a real pricing
 *  engine. Swap the body of this function with a call to a real
 *  pricing/ML service later — keep the same signature so every
 *  caller (MedicineForm, admin review, etc.) keeps working.
 *
 *  Formula:
 *    price = quantityInBaseUnits
 *          x categoryBaseRate
 *          x monthsToExpiryMultiplier
 *          x conditionMultiplier
 *
 *  monthsToExpiryMultiplier rewards medicines with more shelf life
 *  left, since those are easier for us to redistribute responsibly.
 * ------------------------------------------------------------------
 */

export interface EstimatePriceInput {
  category: MedicineCategory;
  quantityValue: number;
  quantityUnit: QuantityUnit;
  expiryDate: string; // ISO date string
  condition: Condition;
}

export interface EstimatePriceResult {
  price: number;
  currency: "INR";
  monthsToExpiry: number;
  breakdown: {
    baseRate: number;
    quantityInBaseUnits: number;
    expiryMultiplier: number;
    conditionMultiplier: number;
  };
}

// ₹ base rate per single unit (per tablet, per 10ml, per bottle, etc.)
const CATEGORY_BASE_RATE: Record<MedicineCategory, number> = {
  tablet: 2.5,
  capsule: 2.5,
  syrup: 15,
  injection: 40,
  ointment: 20,
  drops: 18,
  other: 5,
};

// Normalizes odd units so the formula has a consistent "base unit" count.
function quantityInBaseUnits(value: number, unit: QuantityUnit): number {
  switch (unit) {
    case "tablets":
      return value;
    case "strip":
      return value * 10; // assume ~10 tablets per strip
    case "bottle":
      return value * 3; // a bottle is weighted like 3 "units" of syrup/drops
    case "ml":
      return value / 10; // price per 10ml
    case "units":
    default:
      return value;
  }
}

export function daysUntil(expiryDateIso: string): number {
  if (!expiryDateIso) return 0;
  const expiry = new Date(expiryDateIso);
  if (isNaN(expiry.getTime())) return 0;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isValidExpiryDate(expiryDateIso: string): boolean {
  if (!expiryDateIso) return false;
  const expiry = new Date(expiryDateIso);
  if (isNaN(expiry.getTime())) return false;
  const currentYear = new Date().getFullYear();
  const year = expiry.getFullYear();
  return year >= currentYear - 2 && year <= currentYear + 6;
}

export function monthsUntil(expiryDateIso: string): number {
  if (!expiryDateIso) return 0;
  const expiry = new Date(expiryDateIso);
  if (isNaN(expiry.getTime())) return 0;
  const now = new Date();
  const months =
    (expiry.getFullYear() - now.getFullYear()) * 12 +
    (expiry.getMonth() - now.getMonth());
  return Math.min(Math.max(-24, months), 60);
}

export function isExpired(expiryDateIso: string): boolean {
  return daysUntil(expiryDateIso) < 0;
}

/**
 * Checks if medicine is eligible to be sold.
 * Requires at least 1 month (30 days) of remaining shelf-life from current date.
 */
export function isEligibleToSell(expiryDateIso: string): boolean {
  if (!expiryDateIso) return false;
  return daysUntil(expiryDateIso) >= 30;
}

export function isExpiringWithinOneMonth(expiryDateIso: string): boolean {
  if (!expiryDateIso) return false;
  const days = daysUntil(expiryDateIso);
  return days >= 0 && days < 30;
}

export function isNearExpiry(expiryDateIso: string): boolean {
  const months = monthsUntil(expiryDateIso);
  return isEligibleToSell(expiryDateIso) && months <= 3;
}

function expiryMultiplierFromMonths(months: number): number {
  if (months <= 0) return 0;
  if (months <= 3) return 0.4;
  if (months <= 6) return 0.7;
  if (months <= 12) return 1;
  return 1.2;
}

export function estimatePrice(input: EstimatePriceInput): EstimatePriceResult {
  const { category, quantityValue, quantityUnit, expiryDate, condition } = input;

  const monthsToExpiry = monthsUntil(expiryDate);
  const eligible = isEligibleToSell(expiryDate);
  const baseRate = CATEGORY_BASE_RATE[category] ?? CATEGORY_BASE_RATE.other;
  const units = Math.max(0, quantityInBaseUnits(quantityValue, quantityUnit));
  const expiryMultiplier = expiryMultiplierFromMonths(monthsToExpiry);
  const conditionMultiplier = condition === "sealed" ? 1 : 0.6;

  const rawPrice = units * baseRate * expiryMultiplier * conditionMultiplier;
  const price = !eligible ? 0 : Math.max(0, Math.round(rawPrice));

  return {
    price,
    currency: "INR",
    monthsToExpiry,
    breakdown: {
      baseRate,
      quantityInBaseUnits: units,
      expiryMultiplier,
      conditionMultiplier,
    },
  };
}
