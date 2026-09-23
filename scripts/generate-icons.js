const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 512x512 SVG of the official ReMeD Logo Icon
// IMPORTANT: Full-bleed solid background (NO transparent corners) so Android & iOS launchers never render black backgrounds!
const fullBleedSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="40%" stop-color="#0072d2" />
      <stop offset="100%" stop-color="#034b8c" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#02284d" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Solid full-bleed blue gradient background (Guarantees zero black borders on phone screen) -->
  <rect width="512" height="512" fill="url(#bgGrad)" />

  <!-- Subtle radial glow behind the cross -->
  <circle cx="256" cy="256" r="220" fill="#ffffff" fill-opacity="0.08" />

  <!-- Center Medical Cross with Soft Depth Shadow - Fits inside 80% safe zone (r=204.8) -->
  <g filter="url(#shadow)">
    <!-- White Medical Cross -->
    <path
      d="M206 106 H306 V206 H406 V306 H306 V406 H206 V306 H106 V206 H206 Z"
      fill="#FFFFFF"
    />
    <!-- Emerald Green Leaf Accent nestled at top-right corner of the cross -->
    <path
      d="M290 220 C356 220 412 164 412 98 C346 98 290 154 290 220 Z"
      fill="url(#leafGrad)"
    />
  </g>
</svg>`;

// Convert PNG buffer to a basic Windows ICO buffer containing 1 image
function pngToIco(pngBuffer) {
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Image type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // Number of images

  const entry = Buffer.alloc(16);
  entry.writeUInt8(48, 0); // Width: 48
  entry.writeUInt8(48, 1); // Height: 48
  entry.writeUInt8(0, 2);  // Color count
  entry.writeUInt8(0, 3);  // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
  entry.writeUInt32LE(22, 12); // Offset to image data (6 header + 16 entry = 22)

  return Buffer.concat([icoHeader, entry, pngBuffer]);
}

async function run() {
  const root = path.resolve(__dirname, '..');
  const pub = path.join(root, 'public');
  const app = path.join(root, 'app');

  if (!fs.existsSync(pub)) fs.mkdirSync(pub, { recursive: true });

  const svgBuffer = Buffer.from(fullBleedSvg);

  // 1. Save SVG
  fs.writeFileSync(path.join(pub, 'icon.svg'), fullBleedSvg);
  fs.writeFileSync(path.join(app, 'icon.svg'), fullBleedSvg);
  console.log('Saved icon.svg');

  // 2. Generate 512x512 PNGs (both regular and maskable)
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'icon-512.png'), p512);
  fs.writeFileSync(path.join(pub, 'icon-maskable-512.png'), p512);

  // 3. Generate 192x192 PNGs (both regular and maskable)
  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'icon-192.png'), p192);
  fs.writeFileSync(path.join(pub, 'icon-maskable-192.png'), p192);

  // 4. Generate Apple Touch Icon (180x180, solid background required by iOS)
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(app, 'apple-icon.png'), p180);

  // 5. Generate Favicons (48x48 and 32x32)
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(app, 'icon.png'), p32);
  fs.writeFileSync(path.join(pub, 'icon.png'), p32);

  const ico48 = pngToIco(p48);
  fs.writeFileSync(path.join(app, 'favicon.ico'), ico48);
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico48);

  console.log('All full-bleed ReMeD brand icons generated successfully with zero transparency!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
