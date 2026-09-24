/**
 * Firebase Client SDK Initialization & Cloud Services for ReMeD.
 * - Cloud Firestore Database (Persistent Cloud Storage for Listings & Orders)
 * - Firebase Auth (Google Sign-In & Phone OTP)
 * - Safe Dual-Mode: Operates seamlessly in local mode if keys aren't added yet,
 *   and instantly connects to Cloud when keys are configured in .env.local.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User as FirebaseUser,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  Firestore,
} from "firebase/firestore";
import { Listing, AppUser } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes("YOUR_")
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (typeof window !== "undefined" && isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
  } catch (err) {
    console.warn("Firebase initialization skipped or failed:", err);
  }
}

export { auth, db, googleProvider };

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<AppUser> {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    throw new Error(
      "Firebase is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY in .env.local to enable Google Sign-In."
    );
  }

  const result = await signInWithPopup(auth, googleProvider);
  const fbUser: FirebaseUser = result.user;

  const appUser: AppUser = {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
    identifier: fbUser.email || fbUser.phoneNumber || "Google User",
    isAdmin: (fbUser.email || "").toLowerCase().includes("admin"),
    photoURL: fbUser.photoURL || undefined,
    email: fbUser.email || undefined,
    phoneNumber: fbUser.phoneNumber || undefined,
    authProvider: "google",
  };

  return appUser;
}

/**
 * Setup RecaptchaVerifier for Phone OTP
 */
export function createRecaptchaVerifier(containerId: string): RecaptchaVerifier | null {
  if (!isFirebaseConfigured || !auth) return null;
  try {
    return new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved
      },
    });
  } catch (err) {
    console.warn("RecaptchaVerifier error:", err);
    return null;
  }
}

/**
 * Send Phone OTP via Firebase
 */
export async function sendFirebasePhoneOtp(
  phoneNumber: string,
  verifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Auth is not configured for Phone OTP.");
  }
  // Ensure Indian E.164 format (+91)
  const formattedPhone = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+91${phoneNumber.replace(/^0+/, "")}`;

  return await signInWithPhoneNumber(auth, formattedPhone, verifier);
}

/**
 * Save or Sync Listing to Cloud Firestore
 */
export async function saveListingToFirestore(listing: Listing): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const docRef = doc(db, "listings", listing.id);
    await setDoc(docRef, { ...listing, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Failed to save to Firestore:", err);
    return false;
  }
}

/**
 * Update Listing in Cloud Firestore
 */
export async function updateListingInFirestore(
  listingId: string,
  patch: Partial<Listing>
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;
  try {
    const docRef = doc(db, "listings", listingId);
    await updateDoc(docRef, { ...patch, updatedAt: new Date().toISOString() });
    return true;
  } catch (err) {
    console.warn("Failed to update Firestore listing:", err);
    return false;
  }
}

/**
 * Subscribe to Real-Time Cloud Listings
 */
export function subscribeToCloudListings(
  userId: string | null,
  isAdmin: boolean,
  callback: (listings: Listing[]) => void
): (() => void) | null {
  if (!isFirebaseConfigured || !db) return null;

  try {
    const listingsRef = collection(db, "listings");
    const q = isAdmin
      ? query(listingsRef, orderBy("createdAt", "desc"))
      : userId
      ? query(listingsRef, where("userId", "==", userId))
      : query(listingsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Listing[] = [];
        snapshot.forEach((d) => items.push(d.data() as Listing));
        callback(items);
      },
      (err) => {
        console.warn("Firestore subscription error:", err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Could not subscribe to Firestore:", err);
    return null;
  }
}
