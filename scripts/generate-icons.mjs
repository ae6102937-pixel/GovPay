import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. High quality SVG icon for GovPay TrueFunds
// Features a rounded square with royal blue to navy gradient, glowing golden ring,
// prominent Indian Rupee symbol (₹), and an upward salary growth accent mark.
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e40af" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Background Base with Squircle -->
  <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#bgGrad)" stroke="#3b82f6" stroke-width="8" stroke-opacity="0.4" />

  <!-- Inner Soft Glowing Ring -->
  <rect x="36" y="36" width="440" height="440" rx="96" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-opacity="0.6" />

  <!-- Dynamic Upward Growth Ribbon / Bar Chart Accent behind Rupee -->
  <g opacity="0.35">
    <rect x="110" y="320" width="36" height="70" rx="10" fill="#38bdf8" />
    <rect x="160" y="270" width="36" height="120" rx="10" fill="#60a5fa" />
    <rect x="360" y="190" width="36" height="200" rx="10" fill="#34d399" />
    <path d="M128 300 L256 190 L378 170" fill="none" stroke="#34d399" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <polygon points="378,150 400,175 370,185" fill="#34d399" />
  </g>

  <!-- Center Sovereign Emblem: Bold Stylized Indian Rupee Sign ₹ -->
  <g filter="url(#shadow)">
    <!-- Top Horizontal Bar -->
    <path d="M164 156 H348" stroke="url(#goldGrad)" stroke-width="42" stroke-linecap="round" />
    <!-- Second Horizontal Bar -->
    <path d="M164 218 H320" stroke="url(#goldGrad)" stroke-width="42" stroke-linecap="round" />
    <!-- Vertical Stem -->
    <path d="M228 156 V360" stroke="url(#goldGrad)" stroke-width="42" stroke-linecap="round" />
    <!-- Upper Loop of Rupee -->
    <path d="M228 156 C310 156, 320 256, 228 266" fill="none" stroke="url(#goldGrad)" stroke-width="42" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Diagonal Leg of Rupee -->
    <path d="M228 266 L336 384" stroke="url(#goldGrad)" stroke-width="42" stroke-linecap="round" />
  </g>

  <!-- Star / 8th CPC Badge in Top Right -->
  <circle cx="390" cy="116" r="32" fill="url(#emeraldGrad)" stroke="#ffffff" stroke-width="4" filter="url(#glow)" />
  <text x="390" y="127" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">8th</text>
</svg>`;

// Write favicon.svg
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);
console.log('Created public/favicon.svg');

// Render raster icons via Sharp
async function buildIcons() {
  const svgBuffer = Buffer.from(svgIcon);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Critical for Google Search favicon guidelines
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  const pngBuffers = {};

  for (const { name, size } of sizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain' })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, name), buf);
    pngBuffers[size] = buf;
    console.log(`Generated public/${name} (${size}x${size})`);
  }

  // Generate standard valid multi-resolution favicon.ico containing 16x16, 32x32, and 48x48
  // Windows ICO format:
  // ICONDIR header: 6 bytes (Reserved 0, Type 1 for icon, Count N)
  // ICONDIRENTRY: 16 bytes per image (Width, Height, Colors 0, Reserved 0, Planes 1, BPP 32, BytesInRes, Offset)
  const icoSizes = [16, 32, 48];
  const headerLen = 6 + (16 * icoSizes.length);
  let currentOffset = headerLen;

  const entries = [];
  const imageBuffers = [];

  for (const size of icoSizes) {
    const imgBuf = pngBuffers[size];
    imageBuffers.push(imgBuf);

    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(imgBuf.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset

    entries.push(entry);
    currentOffset += imgBuf.length;
  }

  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type 1 = ICO
  iconDir.writeUInt16LE(icoSizes.length, 4); // count

  const icoBuffer = Buffer.concat([iconDir, ...entries, ...imageBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated public/favicon.ico (multi-resolution 16, 32, 48)');

  // Also generate 1200x630 OpenGraph & Twitter Preview Card (og-image.png)
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0b1329" />
        <stop offset="40%" stop-color="#111c44" />
        <stop offset="100%" stop-color="#070a14" />
      </linearGradient>
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fde047" />
        <stop offset="50%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#ogBg)" />

    <!-- Subtle Grid Pattern & Ambient Glows -->
    <circle cx="150" cy="150" r="300" fill="#1e40af" opacity="0.25" filter="blur(80px)" />
    <circle cx="1050" cy="480" r="280" fill="#047857" opacity="0.2" filter="blur(90px)" />

    <!-- Top Badge -->
    <rect x="80" y="65" width="280" height="40" rx="20" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="220" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#60a5fa" text-anchor="middle">CENTRAL GOVT EMPLOYEES PORTAL</text>

    <!-- Main Headline -->
    <text x="80" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="900" fill="#ffffff" letter-spacing="-1">
      8th Pay Commission
    </text>
    <text x="80" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="url(#goldText)" letter-spacing="-1">
      Salary &amp; Pay Matrix Calculator
    </text>

    <!-- Subtitle -->
    <text x="80" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">
      Levels 1 to 18 • Fitment Factors 1.92 to 2.86 • UPS vs NPS • DA Arrears
    </text>

    <!-- Feature Pills -->
    <g transform="translate(80, 360)">
      <rect x="0" y="0" width="220" height="52" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="110" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#e2e8f0" text-anchor="middle">✓ Pay Matrix 1-18</text>

      <rect x="240" y="0" width="220" height="52" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="350" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#e2e8f0" text-anchor="middle">✓ In-Hand Salary</text>

      <rect x="480" y="0" width="220" height="52" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="590" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#e2e8f0" text-anchor="middle">✓ UPS vs NPS Analysis</text>
    </g>

    <!-- Branding & Domain Footer -->
    <g transform="translate(80, 520)">
      <rect x="0" y="0" width="46" height="46" rx="12" fill="url(#blueGlow)" />
      <text x="23" y="32" font-family="system-ui, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">₹</text>
      <text x="60" y="32" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#ffffff">GovPay</text>
      <text x="166" y="32" font-family="system-ui, sans-serif" font-size="28" font-weight="400" fill="#64748b">• govpay.truefunds.co.in</text>
    </g>

    <!-- Large Right Graphic Emblem (Shield with Rupee & 8th badge) -->
    <g transform="translate(820, 115) scale(0.7)">
      ${svgIcon.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">', '').replace('</svg>', '')}
    </g>
  </svg>`;

  const ogBuffer = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogBuffer);
  console.log('Generated public/og-image.png (1200x630)');
}

buildIcons().catch(err => {
  console.error('Failed generating icons:', err);
  process.exit(1);
});
