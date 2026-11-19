/**
 * Netlify Serverless API Function for ReMeD
 * - Syncs Customer Portal submissions to Admin Portal in real time globally
 * - Persistent storage with Netlify Blobs + In-Memory fallback
 * - Handles /api/listings, /api/sync, /api/listings/:id
 */

const { getStore } = require("@netlify/blobs");

// Seed listings if database is empty
const INITIAL_SEED_LISTINGS = [
  {
    id: "rem-101",
    userId: "cust-9821",
    userName: "Aditya Verma",
    userPhone: "+91 98765 43210",
    userEmail: "aditya.verma@gmail.com",
    medicineName: "Augmentin 625 Duo Tablet",
    genericComposition: "Amoxicillin and Potassium Clavulanate",
    category: "tablet",
    quantityValue: 2,
    quantityUnit: "strip",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 280).toISOString().slice(0, 10),
    mfd: "02/2024",
    batchNumber: "AG7892",
    mrp: 410,
    condition: "sealed",
    photos: [],
    estimatedPrice: 220,
    finalPrice: 215,
    status: "pending_review",
    aiConfidence: 0.96,
    aiSource: "gemini",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    pickup: {
      addressLine: "Flat 402, Royal Palms, Gomti Nagar",
      city: "Lucknow",
      pincode: "226010",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
      slot: "10:00 AM - 12:00 PM",
      addressType: "home",
      upiId: "aditya@oksbi",
      payoutMode: "upi",
      otp: "7419",
      whatsappAlerts: true,
      riderName: "Vikram Singh",
      riderPhone: "+91 94150 12345",
    },
  },
  {
    id: "rem-102",
    userId: "cust-5542",
    userName: "Pooja Sharma",
    userPhone: "+91 88741 22901",
    userEmail: "pooja.sharma@yahoo.com",
    medicineName: "Dolo 650mg Tablet",
    genericComposition: "Paracetamol 650mg",
    category: "tablet",
    quantityValue: 3,
    quantityUnit: "strip",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 420).toISOString().slice(0, 10),
    mfd: "01/2024",
    batchNumber: "DL6501",
    mrp: 102,
    condition: "sealed",
    photos: [],
    estimatedPrice: 65,
    finalPrice: 65,
    status: "scheduled_pickup",
    aiConfidence: 0.98,
    aiSource: "gemini",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    pickup: {
      addressLine: "B-14 Sector C, Mahanagar",
      city: "Lucknow",
      pincode: "226006",
      date: new Date().toISOString().slice(0, 10),
      slot: "2:00 PM - 4:00 PM",
      addressType: "home",
      upiId: "pooja@paytm",
      payoutMode: "upi",
      otp: "3820",
      whatsappAlerts: true,
      riderName: "Rahul Sharma",
      riderPhone: "+91 98390 98765",
    },
  },
];

// Global in-memory cache for warm function invocations
if (!global._remedListingsCache) {
  global._remedListingsCache = [...INITIAL_SEED_LISTINGS];
}

async function getListingsStore() {
  try {
    const store = getStore({ name: "remed-data", consistency: "strong" });
    const data = await store.get("listings", { type: "json" });
    if (data && Array.isArray(data) && data.length > 0) {
      global._remedListingsCache = data;
      return { store, listings: data };
    }
    // If empty in blob, initialize with cache or seed
    await store.setJSON("listings", global._remedListingsCache);
    return { store, listings: global._remedListingsCache };
  } catch (err) {
    console.warn("Netlify Blobs not available, falling back to in-memory store:", err.message);
    return { store: null, listings: global._remedListingsCache };
  }
}

async function saveListingsStore(store, listings) {
  global._remedListingsCache = listings;
  if (store) {
    try {
      await store.setJSON("listings", listings);
    } catch (err) {
      console.warn("Error saving to Netlify Blobs:", err.message);
    }
  }
}

// Generate NPCI Standard 12-digit UTR
function generateNpciUtr() {
  const now = new Date();
  const yearDigit = String(now.getFullYear()).slice(-1);
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(3, "0");
  const randomSuffix = String(Math.floor(10000000 + Math.random() * 90000000));
  return `${yearDigit}${dayOfYear}${randomSuffix}`;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

exports.handler = async (event, context) => {
  // 1. Handle CORS Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  const rawPath = event.path || "";
  // Normalize path removing /.netlify/functions/api
  let cleanPath = rawPath
    .replace(/^\/\.netlify\/functions\/api/, "")
    .replace(/^\/api/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

  const method = event.httpMethod;

  try {
    const { store, listings } = await getListingsStore();

    // 2. GET /listings or /
    if (cleanPath === "/listings" || cleanPath === "/" || cleanPath === "") {
      if (method === "GET") {
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify(listings),
        };
      }
    }

    // 3. POST /sync (From Customer Portal)
    if (cleanPath === "/sync" && method === "POST") {
      let bodyData = {};
      try {
        bodyData = JSON.parse(event.body || "{}");
      } catch (e) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: "Invalid JSON body" }),
        };
      }

      const { action, listing } = bodyData;
      if (!listing || !listing.id) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: "Missing listing payload" }),
        };
      }

      const existingIndex = listings.findIndex((l) => l.id === listing.id);
      if (existingIndex >= 0) {
        listings[existingIndex] = { ...listings[existingIndex], ...listing };
      } else {
        listings.unshift(listing);
      }

      await saveListingsStore(store, listings);

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, count: listings.length, item: listing }),
      };
    }

    // 4. PATCH /listings/:id (From Admin Portal updating status/rider/payout)
    if (cleanPath.startsWith("/listings/") && method === "PATCH") {
      const id = cleanPath.replace("/listings/", "").trim();
      let patch = {};
      try {
        patch = JSON.parse(event.body || "{}");
      } catch (e) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: "Invalid JSON body" }),
        };
      }

      const listing = listings.find((l) => l.id === id);
      if (!listing) {
        return {
          statusCode: 404,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: "Listing not found" }),
        };
      }

      // If status changed to 'paid' and no UTR, generate standard NPCI 12-digit UTR
      if (patch.status === "paid" && (!patch.payoutUtr && !listing.payoutUtr)) {
        patch.payoutUtr = generateNpciUtr();
        patch.payoutStatus = "credited";
        patch.payoutTimestamp = new Date().toISOString();
      }

      Object.assign(listing, patch);
      await saveListingsStore(store, listings);

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, listing }),
      };
    }

    // 5. Health Check
    if (cleanPath === "/health") {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ status: "healthy", time: new Date().toISOString(), count: listings.length }),
      };
    }

    // Fallback for unknown sub-route
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(listings),
    };
  } catch (err) {
    console.error("API Error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
