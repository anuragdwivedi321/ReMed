const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 512x512 SVG of the official ReMeD Logo Icon
const svg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0080eb" />
      <stop offset="50%" stop-color="#006bc8" />
      <stop offset="100%" stop-color="#0050a4" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#002d62" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background Squircle with subtle border highlight -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="4" y="4" width="504" height="504" rx="108" stroke="rgba(255,255,255,0.22)" stroke-width="8" fill="none" />

  <!-- Center Medical Cross with Soft Shadow -->
  <g filter="url(#shadow)">
    <path
      d="M196 68 H316 V172 H420 V292 H316 V444 H196 V292 H92 V172 H196 Z"
      fill="#FFFFFF"
      fill-opacity="0.98"
    />
    <!-- Signature Green Leaf Curl Accent -->
    <path
      d="M298 192 C362 192 420 134 420 70 C356 70 298 128 298 192 Z"
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
  entry.writeUInt8(48, 0); // Width: 48 (or 0 for 256)
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

  const svgBuffer = Buffer.from(svg);

  // 1. Save SVG
  fs.writeFileSync(path.join(pub, 'icon.svg'), svg);
  fs.writeFileSync(path.join(app, 'icon.svg'), svg);
  console.log('Saved icon.svg');

  // 2. Generate PNGs
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'icon-512.png'), p512);

  const p192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'icon-192.png'), p192);

  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(app, 'apple-icon.png'), p180);

  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(app, 'icon.png'), p32);

  // 3. Generate .ico with PNG payload
  const ico48 = pngToIco(p48);
  fs.writeFileSync(path.join(app, 'favicon.ico'), ico48);
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico48);

  console.log('All icons generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
