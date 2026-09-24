export type MedicineCategory =
  | "tablet"
  | "capsule"
  | "syrup"
  | "injection"
  | "ointment"
  | "drops"
  | "other";

export type QuantityUnit = "tablets" | "strip" | "bottle" | "ml" | "units";

export type Condition = "sealed" | "opened";

export type ListingStatus =
  | "pending_review"
  | "price_confirmed"
  | "scheduled_pickup"
  | "completed"
  | "paid"
  | "rejected";

export const LISTING_STATUS_ORDER: ListingStatus[] = [
  "pending_review",
  "price_confirmed",
  "scheduled_pickup",
  "completed",
  "paid",
];

export const LISTING_STATUS_LABEL: Record<ListingStatus, string> = {
  pending_review: "Pending review",
  price_confirmed: "Price confirmed",
  scheduled_pickup: "Pickup scheduled",
  completed: "Pickup completed",
  paid: "Paid",
  rejected: "Rejected",
};

export interface PhotoAsset {
  id: string;
  dataUrl: string;
  label: "package" | "expiry" | "other";
}

export interface PickupDetails {
  addressLine: string;
  city: string;
  pincode: string;
  date: string; // ISO date
  slot: string; // e.g. "10:00 AM - 12:00 PM"
  addressType?: "home" | "work" | "other";
  upiId?: string;
  payoutMode?: "upi" | "bank" | "donate";
  whatsappAlerts?: boolean;
  riderName?: string;
  riderPhone?: string;
  riderRating?: number;
  otp?: string;
}

export interface Listing {
  id: string;
  userId: string;
  medicineName: string;
  category: MedicineCategory;
  quantityValue: number;
  quantityUnit: QuantityUnit;
  expiryDate: string; // ISO date
  condition: Condition;
  photos: PhotoAsset[];
  estimatedPrice: number;
  finalPrice?: number;
  status: ListingStatus;
  pickup?: PickupDetails;
  createdAt: string;
  adminNote?: string;
  batchNumber?: string;
  mrp?: number;
  genericComposition?: string;
  payoutStatus?: "pending" | "processing" | "credited" | "paid" | "failed";
  payoutUtr?: string;
  payoutTimestamp?: string;
  aiConfidence?: number;
  aiSource?: "gemini" | "tesseract" | "tesseract_fallback" | "manual";
}

export interface AppUser {
  id: string;
  name: string;
  identifier: string; // phone or email
  isAdmin: boolean;
  photoURL?: string;
  email?: string;
  phoneNumber?: string;
  authProvider?: "google" | "phone" | "demo";
}
