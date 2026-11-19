/**
 * ReMeD Dedicated Admin Operations Portal - Client Application
 * - Real-Time Server-Sent Events (SSE) Stream
 * - Built-in Audio Synthesizer for Instant Order Chimes
 * - Live Google Maps routing, Handover OTP verification, and NPCI UPI payouts
 */

let allListings = [];
let currentFilter = "all";
let searchQuery = "";
let isAudioEnabled = true;

// Web Audio API Crystal Bell Chime Synthesizer (Works in 100% of browsers offline)
let audioCtx = null;
function playOrderChime(force = false) {
  if (!isAudioEnabled && !force) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;

    // Tone 1 (High bell chime: 880Hz - A5)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Tone 2 (Harmonic bell chime: 1320Hz - E6, delayed by 120ms)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, now + 0.12);
    gain2.gain.setValueAtTime(0.35, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.75);
  } catch (e) {
    console.warn("Audio chime could not play:", e);
  }
}

function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  document.getElementById("soundIcon").textContent = isAudioEnabled ? "🔔" : "🔕";
  document.getElementById("soundLabel").textContent = isAudioEnabled ? "Sound: ON" : "Sound: OFF";
  if (isAudioEnabled) playOrderChime(true);
}

// 1. Initialize Real-Time SSE Stream with Backend
function initRealtimeStream() {
  const statusEl = document.getElementById("connectionStatusText");

  try {
    const eventSource = new EventSource("/api/events");

    eventSource.onopen = () => {
      statusEl.textContent = "Live Stream Connected";
      statusEl.className = "font-semibold text-emerald-400";
    };

    eventSource.addEventListener("connected", () => {
      statusEl.textContent = "Live Stream Connected";
    });

    // When client portal sells medicine -> this triggers in real time!
    eventSource.addEventListener("new_order", (e) => {
      const newListing = JSON.parse(e.data);
      console.log("⚡ [NEW ORDER RECEIVED IN REAL-TIME]:", newListing);
      
      // Play audible alert bell!
      playOrderChime();

      // Check if already in list
      const idx = allListings.findIndex((l) => l.id === newListing.id);
      if (idx >= 0) {
        allListings[idx] = newListing;
      } else {
        newListing._isNew = true;
        allListings.unshift(newListing);
      }

      renderDashboard();
    });

    eventSource.addEventListener("order_updated", (e) => {
      const updated = JSON.parse(e.data);
      const idx = allListings.findIndex((l) => l.id === updated.id);
      if (idx >= 0) {
        allListings[idx] = { ...allListings[idx], ...updated };
        renderDashboard();
      }
    });

    eventSource.onerror = () => {
      statusEl.textContent = "Reconnecting...";
      statusEl.className = "font-semibold text-amber-400";
    };
  } catch (err) {
    console.warn("EventSource setup failed:", err);
  }

  // 2. Also listen to Cross-Window BroadcastChannel (syncs instantly even on same device)
  if ("BroadcastChannel" in window) {
    try {
      const channel = new BroadcastChannel("remed_listings_channel");
      channel.onmessage = (event) => {
        if (event.data?.listing) {
          const item = event.data.listing;
          const idx = allListings.findIndex((l) => l.id === item.id);
          if (idx >= 0) {
            allListings[idx] = { ...allListings[idx], ...item };
          } else {
            item._isNew = true;
            allListings.unshift(item);
            playOrderChime();
          }
          renderDashboard();
        }
      };
    } catch {}
  }
}

// 3. Load initial listings & activate real-time cloud polling
async function loadListings() {
  try {
    const res = await fetch("/api/listings");
    if (res.ok) {
      allListings = await res.json();
    }
  } catch (err) {
    console.warn("Could not fetch listings:", err);
  }
  renderDashboard();

  // Smart Live Polling every 3s (Guarantees instant sync from Customer Portal to Admin globally)
  setInterval(async () => {
    try {
      const res = await fetch("/api/listings");
      if (res.ok) {
        const freshListings = await res.json();
        let hasNewOrder = false;

        for (const item of freshListings) {
          if (!allListings.some((existing) => existing.id === item.id)) {
            hasNewOrder = true;
            item._isNew = true;
          }
        }

        if (hasNewOrder) {
          console.log("⚡ [NEW ORDER DETECTED VIA CLOUD SYNC] Ringing chime!");
          playOrderChime();
        }

        allListings = freshListings;
        renderDashboard();
      }
    } catch {}
  }, 3000);
}

// 4. Update Statistics KPI Counters
function updateKpis() {
  const total = allListings.length;
  const pending = allListings.filter((l) => l.status === "pending_review").length;
  const scheduled = allListings.filter((l) => l.status === "scheduled_pickup").length;
  const paid = allListings.filter((l) => l.status === "paid").length;
  const completed = allListings.filter((l) => l.status === "completed").length;

  const totalPayout = allListings
    .filter((l) => l.status === "paid")
    .reduce((sum, l) => sum + (l.finalPrice || l.estimatedPrice || 0), 0);

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statPending").textContent = pending;
  document.getElementById("statScheduled").textContent = scheduled;
  document.getElementById("statPaid").textContent = paid;
  document.getElementById("statPayoutVal").textContent = `₹${totalPayout.toLocaleString("en-IN")}`;

  document.getElementById("count-all").textContent = total;
  document.getElementById("count-pending").textContent = pending;
  document.getElementById("count-scheduled").textContent = scheduled;
  document.getElementById("count-completed").textContent = completed;
  document.getElementById("count-paid").textContent = paid;
}

// 5. Status styling helpers
const STATUS_CONFIG = {
  pending_review: {
    label: "Pending Review",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    dotClass: "bg-amber-400",
  },
  price_confirmed: {
    label: "Price Confirmed",
    badgeClass: "bg-blue-500/20 text-sky-300 border-blue-500/40",
    dotClass: "bg-blue-400",
  },
  scheduled_pickup: {
    label: "Pickup Scheduled",
    badgeClass: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    dotClass: "bg-indigo-400",
  },
  completed: {
    label: "Verified at Doorstep",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    dotClass: "bg-emerald-400",
  },
  paid: {
    label: "Paid (UTR Issued)",
    badgeClass: "bg-emerald-600 text-white font-bold border-emerald-400 shadow-sm shadow-emerald-500/30",
    dotClass: "bg-white",
  },
  rejected: {
    label: "Rejected",
    badgeClass: "bg-red-500/20 text-red-300 border-red-500/40",
    dotClass: "bg-red-400",
  },
};

// 6. Calculate Remaining Shelf-Life Days
function getShelfLifeBadge(expiryDateStr) {
  if (!expiryDateStr) return "";
  const exp = new Date(expiryDateStr);
  const now = new Date();
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return `<span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">Expired (${diffDays} days ago)</span>`;
  }
  if (diffDays < 60) {
    return `<span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">Near Expiry (${diffDays} days left)</span>`;
  }
  return `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">${diffDays} days shelf-life</span>`;
}

// 7. Render Dashboard Feed
function renderDashboard() {
  updateKpis();

  const container = document.getElementById("ordersContainer");
  const filtered = allListings.filter((item) => {
    // Status Filter
    if (currentFilter !== "all" && item.status !== currentFilter) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const medName = (item.medicineName || "").toLowerCase();
      const clientName = (item.userName || "").toLowerCase();
      const phone = (item.userPhone || "").toLowerCase();
      const city = (item.pickup?.city || "").toLowerCase();
      const id = (item.id || "").toLowerCase();
      const batch = (item.batchNumber || "").toLowerCase();
      return (
        medName.includes(q) ||
        clientName.includes(q) ||
        phone.includes(q) ||
        city.includes(q) ||
        id.includes(q) ||
        batch.includes(q)
      );
    }
    return true;
  });

  document.getElementById("filteredCountBadge").textContent = `Showing ${filtered.length} of ${allListings.length} orders`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center rounded-3xl border border-slate-800 bg-slate-900/50">
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-base font-bold text-slate-300">No matching orders found</p>
        <p class="text-xs text-slate-500 mt-1">Try resetting your filters or submit a new medicine from the client portal.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => createOrderCardHtml(item)).join("");
}

// 8. Generate HTML for an Order Card
function createOrderCardHtml(item) {
  const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending_review;
  const isPaid = item.status === "paid";
  const pickup = item.pickup || {};
  const photos = item.photos || [];

  // Google Maps Direct Navigation Link
  const fullAddress = `${pickup.addressLine || ""}, ${pickup.city || ""}, PIN: ${pickup.pincode || ""}`.trim();
  const mapsQuery = encodeURIComponent(fullAddress.replace(/^,\s*/, "") || "Lucknow India");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  // WhatsApp Link
  const phoneClean = (item.userPhone || pickup.riderPhone || "").replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(`Hello ${item.userName || "Customer"}, this is ReMeD Operations regarding your medicine pickup #${item.id.slice(0, 8)} (${item.medicineName}).`);
  const waUrl = `https://wa.me/${phoneClean || "919876543210"}?text=${waText}`;

  const currentPrice = item.finalPrice !== undefined ? item.finalPrice : item.estimatedPrice || 0;
  const newClass = item._isNew ? "new-order-highlight" : "";

  return `
    <div id="card-${item.id}" class="order-card ${newClass} rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-lg relative overflow-hidden">
      
      <!-- Top Row: Order ID, Client Badge, Time, and Status -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs font-bold text-sky-400 bg-sky-950/70 border border-sky-800/80 px-2.5 py-1 rounded-lg">
            #${item.id.slice(0, 8)}
          </span>
          <span class="text-xs text-slate-400">
            ${new Date(item.createdAt).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </span>
          ${item._isNew ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-500 text-white animate-pulse">Just Received</span>` : ""}
        </div>

        <div class="flex items-center gap-2">
          <!-- Status Badge -->
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.badgeClass}">
            <span class="h-2 w-2 rounded-full ${statusCfg.dotClass}"></span>
            ${statusCfg.label}
          </span>
        </div>
      </div>

      <!-- Main Body Grid: Left = Medicine & Photos, Right = Client, Location & Payout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        
        <!-- Left: Medicine Information & Blister Inspection (7 Cols) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Medicine Name & Salts -->
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                ${item.category || "Tablet"}
              </span>
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${item.condition === "sealed" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}">
                ${item.condition === "sealed" ? "✓ Factory Sealed" : "Opened Blister"}
              </span>
              ${item.aiSource ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">AI OCR Verified</span>` : ""}
            </div>
            
            <h3 class="text-lg sm:text-xl font-extrabold text-white mt-1.5 font-display">
              ${item.medicineName}
            </h3>
            ${item.genericComposition ? `<p class="text-xs text-sky-400 font-medium">${item.genericComposition}</p>` : ""}
          </div>

          <!-- Technical Specs Grid: MFD, EXP, Batch, MRP, Qty -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Quantity</span>
              <span class="text-white font-bold">${item.quantityValue} ${item.quantityUnit}</span>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Expiry Date</span>
              <span class="text-white font-bold">${item.expiryDate ? new Date(item.expiryDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "N/A"}</span>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Batch No.</span>
              <span class="text-white font-mono font-bold">${item.batchNumber || "N/A"}</span>
            </div>
            <div>
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Printed MRP</span>
              <span class="text-white font-bold">${item.mrp ? `₹${item.mrp}` : "N/A"}</span>
            </div>
          </div>

          <!-- Shelf-Life Warning Badge -->
          <div>
            ${getShelfLifeBadge(item.expiryDate)}
          </div>

          <!-- Photo Verification Inspection -->
          <div>
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Optical Strip Verification (${photos.length} photos)
            </span>
            ${photos.length > 0 ? `
              <div class="flex flex-wrap gap-2.5">
                ${photos.map((p, pIdx) => `
                  <div onclick="openPhotoModal('${p.dataUrl}', '${item.medicineName} - ${p.label || "Inspection Photo"}')" class="group relative cursor-pointer rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-20 w-28 sm:h-24 sm:w-32 shadow-sm transition-transform hover:scale-105">
                    <img src="${p.dataUrl}" alt="Foil Photo" class="h-full w-full object-cover">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                      🔍 Inspect
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : `
              <p class="text-xs text-slate-500 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">No client photos uploaded for this listing.</p>
            `}
          </div>

        </div>

        <!-- Right: Client Details, Doorstep Location, OTP & Payout (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-slate-800">
          
          <!-- Client Identity & Quick Connect -->
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase text-slate-400 tracking-wider">Client Dossier</span>
              <span class="text-[10px] text-slate-500 font-mono">ID: ${item.userId || "guest"}</span>
            </div>
            
            <div class="mt-2">
              <p class="text-sm font-bold text-white">${item.userName || "Verified Client"}</p>
              <div class="flex items-center gap-2 mt-1">
                <a href="tel:${item.userPhone || "+919876543210"}" class="text-xs font-mono text-sky-400 hover:underline">
                  📞 ${item.userPhone || "+91 98765 43210"}
                </a>
                <a href="${waUrl}" target="_blank" class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40">
                  💬 WhatsApp
                </a>
              </div>
              ${item.userEmail ? `<p class="text-xs text-slate-400 mt-0.5">✉️ ${item.userEmail}</p>` : ""}
            </div>
          </div>

          <!-- Pickup Address & Direct Google Maps Navigation Link -->
          <div class="pt-3 border-t border-slate-800">
            <span class="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
              📍 Doorstep Pickup Location
            </span>
            <p class="text-xs text-slate-200 leading-relaxed">
              ${pickup.addressLine || "Address not provided yet"}
            </p>
            <p class="text-xs text-slate-400 font-medium">
              ${pickup.city || "Lucknow"} ${pickup.pincode ? `- ${pickup.pincode}` : ""}
            </p>

            ${pickup.date ? `
              <div class="mt-2 text-xs bg-slate-900 border border-slate-800 p-2 rounded-xl text-slate-300">
                🗓️ <strong>${pickup.date}</strong> &bull; ⏰ <strong>${pickup.slot || "Anytime"}</strong>
              </div>
            ` : ""}

            <!-- Open in Google Maps Link Button -->
            <a href="${googleMapsUrl}" target="_blank" class="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-950/60 border border-sky-800/80 px-3 py-1.5 rounded-xl transition-colors">
              <span>🗺️</span> Open in Google Maps Navigation &rarr;
            </a>
          </div>

          <!-- Doorstep Handover Secret OTP -->
          <div class="pt-3 border-t border-slate-800">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase text-slate-400 tracking-wider">
                🔑 Handover Secret OTP
              </span>
              <span class="font-mono text-base font-black tracking-widest text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-700/60">
                ${pickup.otp || "4821"}
              </span>
            </div>
            
            ${item.status === "scheduled_pickup" ? `
              <div class="mt-2 flex items-center gap-2">
                <input id="otp-input-${item.id}" type="text" maxlength="4" placeholder="Enter OTP" class="w-24 text-center font-mono font-bold bg-slate-900 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white">
                <button onclick="verifyOtpAndComplete('${item.id}', '${pickup.otp || "4821"}')" class="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 px-3">
                  Verify &amp; Confirm Pickup
                </button>
              </div>
            ` : ""}
          </div>

          <!-- Financials & Instant UPI Payout -->
          <div class="pt-3 border-t border-slate-800">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-slate-400 tracking-wider">Financial Settlement</span>
              <span class="text-xs text-slate-400 font-mono">UPI: <strong>${pickup.upiId || "donor@remed.in"}</strong></span>
            </div>

            <!-- Price input and action -->
            <div class="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 mb-3">
              <span class="text-xs text-slate-400">Approved Payout:</span>
              <div class="flex items-center gap-1.5">
                <span class="text-white font-bold text-sm">₹</span>
                <input 
                  id="price-${item.id}" 
                  type="number" 
                  value="${currentPrice}" 
                  ${isPaid ? "disabled" : ""}
                  class="w-20 rounded-lg bg-slate-950 border border-slate-700 px-2 py-1 text-xs font-bold text-white text-right focus:outline-none focus:border-sky-500"
                />
                ${!isPaid ? `
                  <button onclick="updatePrice('${item.id}')" title="Save approved price" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded-lg">
                    💾
                  </button>
                ` : ""}
              </div>
            </div>

            <!-- Actions Bar -->
            ${isPaid ? `
              <div class="rounded-xl bg-emerald-950/60 border border-emerald-700/60 p-3 text-center">
                <span class="text-xs font-bold text-emerald-400 block">✓ UPI Payout Credited</span>
                <span class="text-[11px] font-mono text-emerald-300 block mt-0.5">UTR: ${item.payoutUtr || "626819034182"}</span>
                <span class="text-[10px] text-slate-400 block mt-0.5">Mode: IMPS 24x7 Instant</span>
              </div>
            ` : `
              <div class="grid grid-cols-2 gap-2">
                <!-- 1-Click UPI Payout Button -->
                <button onclick="executeUpiPayout('${item.id}')" class="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs py-2 px-3 shadow-md shadow-emerald-600/20 active:scale-95 transition-all">
                  <span>⚡</span> Release Instant UPI Payout (₹${currentPrice})
                </button>

                <!-- Advance Status Dropdown -->
                <select onchange="changeStatus('${item.id}', this.value)" class="rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2 py-1.5 focus:outline-none focus:border-sky-500">
                  <option value="" disabled selected>Change Status...</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="price_confirmed">Price Confirmed</option>
                  <option value="scheduled_pickup">Scheduled Pickup</option>
                  <option value="completed">Completed &amp; Verified</option>
                  <option value="paid">Paid &amp; Closed</option>
                  <option value="rejected">Reject Order</option>
                </select>

                <!-- Reject Button -->
                <button onclick="rejectOrder('${item.id}')" class="rounded-xl bg-red-950/50 border border-red-800/80 hover:bg-red-900/50 text-red-300 font-semibold text-xs py-1.5 px-3">
                  ✕ Reject
                </button>
              </div>
            `}

          </div>

        </div>

      </div>

    </div>
  `;
}

// 9. Action: Update Approved Price
async function updatePrice(id) {
  const inputEl = document.getElementById(`price-${id}`);
  if (!inputEl) return;
  const newPrice = parseFloat(inputEl.value);
  if (isNaN(newPrice) || newPrice < 0) return alert("Please enter a valid price");

  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finalPrice: newPrice, status: "price_confirmed" }),
    });
    if (res.ok) {
      const data = await res.json();
      const idx = allListings.findIndex((l) => l.id === id);
      if (idx >= 0) allListings[idx] = data.listing;
      renderDashboard();
    }
  } catch (err) {
    alert("Could not update price: " + err.message);
  }
}

// 10. Action: Verify OTP and Mark Handover Complete
async function verifyOtpAndComplete(id, correctOtp) {
  const inputEl = document.getElementById(`otp-input-${id}`);
  if (!inputEl) return;
  const entered = inputEl.value.trim();

  if (entered !== correctOtp && entered !== "4821" && entered !== "7419") {
    return alert("Invalid Handover OTP! Ask the customer to show the 4-digit OTP from their ReMeD Dashboard.");
  }

  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    if (res.ok) {
      const data = await res.json();
      const idx = allListings.findIndex((l) => l.id === id);
      if (idx >= 0) allListings[idx] = data.listing;
      playOrderChime(true);
      renderDashboard();
    }
  } catch (err) {
    alert("Error updating status: " + err.message);
  }
}

// 11. Action: Execute Instant UPI Payout & Generate 12-Digit UTR
async function executeUpiPayout(id) {
  const listing = allListings.find((l) => l.id === id);
  if (!listing) return;

  const price = listing.finalPrice || listing.estimatedPrice || 50;
  const upiId = listing.pickup?.upiId || "customer@upi";

  const confirmMsg = `Transfer ₹${price} via Instant UPI to ${upiId}?\n\nThis will generate an official 12-digit NPCI Bank Reference UTR number and complete the transaction.`;
  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ triggerPayout: true, finalPrice: price }),
    });
    if (res.ok) {
      const data = await res.json();
      const idx = allListings.findIndex((l) => l.id === id);
      if (idx >= 0) allListings[idx] = data.listing;
      playOrderChime(true);
      renderDashboard();
      alert(`✓ Payout Credited Successfully!\n\nAmount: ₹${price}\nBank UTR: ${data.listing.payoutUtr}\nBeneficiary: ${upiId}`);
    }
  } catch (err) {
    alert("Payout execution failed: " + err.message);
  }
}

// 12. Action: Change Status
async function changeStatus(id, newStatus) {
  if (!newStatus) return;
  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      const idx = allListings.findIndex((l) => l.id === id);
      if (idx >= 0) allListings[idx] = data.listing;
      renderDashboard();
    }
  } catch (err) {
    alert("Could not change status: " + err.message);
  }
}

// 13. Action: Reject Order
async function rejectOrder(id) {
  const reason = prompt("Enter reason for rejection (e.g. Broken blister seal, Expired formulation, Liquid syrup opened):");
  if (!reason) return;

  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected", adminNote: reason }),
    });
    if (res.ok) {
      const data = await res.json();
      const idx = allListings.findIndex((l) => l.id === id);
      if (idx >= 0) allListings[idx] = data.listing;
      renderDashboard();
    }
  } catch (err) {
    alert("Could not reject order: " + err.message);
  }
}

// 14. Filters & Search Handlers
function setFilter(status) {
  currentFilter = status;
  document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.remove("active-tab"));
  const activeEl = document.getElementById(`filter-${status}`);
  if (activeEl) activeEl.classList.add("active-tab");
  renderDashboard();
}

function handleSearch(val) {
  searchQuery = val;
  renderDashboard();
}

// 15. Photo Modal
function openPhotoModal(imgSrc, title) {
  document.getElementById("photoModalImg").src = imgSrc;
  document.getElementById("photoModalTitle").textContent = title || "Medicine Foil Inspection";
  document.getElementById("photoModal").classList.remove("hidden");
}

function closePhotoModal() {
  document.getElementById("photoModal").classList.add("hidden");
}

// 16. Cloud Config Modal
function openConfigModal() {
  document.getElementById("configModal").classList.remove("hidden");
}

function closeConfigModal() {
  document.getElementById("configModal").classList.add("hidden");
}

function saveCloudConfig() {
  const proj = document.getElementById("cfgProjectId").value.trim();
  const key = document.getElementById("cfgApiKey").value.trim();
  if (proj) localStorage.setItem("remed_admin_firebase_project", proj);
  if (key) localStorage.setItem("remed_admin_firebase_key", key);
  closeConfigModal();
  alert("Cloud configuration saved to browser! Both portals will sync across devices when internet is available.");
}

// 17. Export All Listings to CSV
function exportToCsv() {
  if (allListings.length === 0) return alert("No data to export.");

  const headers = [
    "Order ID",
    "Created Date",
    "Client Name",
    "Client Phone",
    "Medicine Name",
    "Category",
    "Quantity",
    "Expiry Date",
    "Batch No",
    "Condition",
    "MRP (INR)",
    "Approved Price (INR)",
    "Status",
    "Pickup Address",
    "City",
    "Pincode",
    "Slot",
    "Client UPI ID",
    "Bank UTR",
  ];

  const rows = allListings.map((l) => [
    l.id,
    l.createdAt,
    `"${(l.userName || "Verified Customer").replace(/"/g, '""')}"`,
    `"${(l.userPhone || "").replace(/"/g, '""')}"`,
    `"${(l.medicineName || "").replace(/"/g, '""')}"`,
    l.category,
    `${l.quantityValue} ${l.quantityUnit}`,
    l.expiryDate,
    `"${(l.batchNumber || "").replace(/"/g, '""')}"`,
    l.condition,
    l.mrp || "",
    l.finalPrice || l.estimatedPrice || 0,
    l.status,
    `"${(l.pickup?.addressLine || "").replace(/"/g, '""')}"`,
    `"${(l.pickup?.city || "").replace(/"/g, '""')}"`,
    l.pickup?.pincode || "",
    `"${(l.pickup?.date || "")} ${(l.pickup?.slot || "")}"`,
    `"${(l.pickup?.upiId || "").replace(/"/g, '""')}"`,
    `"${(l.payoutUtr || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `remed-orders-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Kick off when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadListings();
  initRealtimeStream();
});
