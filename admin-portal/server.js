/**
 * ReMeD Dedicated Admin Portal Server
 * - Runs standalone on Port 3001 (or process.env.PORT)
 * - Real-Time Server-Sent Events (SSE) bridge with Client Portal
 * - Live Order Dispatch, Status Management, and Instant NPCI UPI Payouts
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, "public");

// In-Memory Database with initial seed data
let listings = [
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
  {
    id: "rem-103",
    userId: "cust-1109",
    userName: "Rajesh Gupta",
    userPhone: "+91 70071 89234",
    userEmail: "rajesh.gupta@outlook.com",
    medicineName: "Pan 40mg Tablet",
    genericComposition: "Pantoprazole Gastro-resistant 40mg",
    category: "tablet",
    quantityValue: 2,
    quantityUnit: "strip",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10),
    mfd: "11/2023",
    batchNumber: "PN4091",
    mrp: 310,
    condition: "sealed",
    photos: [],
    estimatedPrice: 155,
    finalPrice: 155,
    status: "paid",
    payoutStatus: "credited",
    payoutUtr: "626819034182",
    payoutTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    aiConfidence: 0.95,
    aiSource: "gemini",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    pickup: {
      addressLine: "Shop 12, Hazratganj Market",
      city: "Lucknow",
      pincode: "226001",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
      slot: "11:00 AM - 1:00 PM",
      addressType: "work",
      upiId: "rajesh@ybl",
      payoutMode: "upi",
      otp: "9142",
      whatsappAlerts: true,
    },
  },
];

// Active SSE client connections
const sseClients = new Set();

function broadcastEvent(type, data) {
  const payload = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
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

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers for all incoming requests (Client portal can communicate freely)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Real-Time SSE Stream for Admin Portal
  if (pathname === "/api/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("event: connected\ndata: {\"status\":\"connected\"}\n\n");
    sseClients.add(res);
    req.on("close", () => sseClients.delete(res));
    return;
  }

  // 2. Health Check
  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", time: new Date().toISOString(), ordersCount: listings.length }));
    return;
  }

  // 3. GET /api/listings
  if (pathname === "/api/listings" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(listings));
    return;
  }

  // 4. POST /api/sync (Real-time synchronization bridge from Client Portal)
  if (pathname === "/api/sync" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { action, listing } = JSON.parse(body);
        if (!listing || !listing.id) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing listing payload" }));
          return;
        }

        const existingIndex = listings.findIndex((l) => l.id === listing.id);
        if (existingIndex >= 0) {
          listings[existingIndex] = { ...listings[existingIndex], ...listing };
          broadcastEvent("order_updated", listings[existingIndex]);
        } else {
          listings.unshift(listing);
          // Broadcast NEW order event to trigger audio chime and highlight on admin screen!
          broadcastEvent("new_order", listing);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, count: listings.length }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 5. PATCH /api/listings/:id (Admin updating listing price, status, or executing payout)
  if (pathname.startsWith("/api/listings/") && req.method === "PATCH") {
    const id = pathname.replace("/api/listings/", "").trim();
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const patch = JSON.parse(body);
        const listing = listings.find((l) => l.id === id);
        if (!listing) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Listing not found" }));
          return;
        }

        // Handle Instant UPI Payout trigger
        if (patch.triggerPayout) {
          patch.payoutStatus = "credited";
          patch.payoutUtr = generateNpciUtr();
          patch.payoutTimestamp = new Date().toISOString();
          patch.status = "paid";
          delete patch.triggerPayout;
        }

        Object.assign(listing, patch);
        broadcastEvent("order_updated", listing);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, listing }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 6. Static File Serving from public/
  let filePath = path.join(PUBLIC_DIR, pathname === "/" ? "index.html" : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || "text/plain";
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 ReMeD Dedicated Admin Operations Portal is LIVE!`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📡 Real-Time SSE Stream: http://localhost:${PORT}/api/events`);
  console.log(`🔄 Client Sync Bridge: http://localhost:${PORT}/api/sync`);
  console.log(`=======================================================`);
});
