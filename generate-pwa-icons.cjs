const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const crcTable = new Int32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[i] = c;
}

function writeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(len + 12);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generatePNG(width, height, drawFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // deflate
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // no interlace
  const ihdr = writeChunk('IHDR', ihdrData);

  // Raw image scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = writeChunk('IDAT', compressed);
  const iend = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// Brand drawer: Emerald gradient background, golden coin, sparkle and growth arrow
function createBrandIcon(isMaskable = false) {
  return (x, y, w, h) => {
    const cx = w / 2;
    const cy = h * 0.46;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Background: Dark luxury emerald gradient
    const t = (x + y) / (w + h);
    let bgR = Math.round(2 + t * 10);
    let bgG = Math.round(44 + (1 - t) * 35);
    let bgB = Math.round(34 + t * 20);

    // If not maskable, round corners with anti-aliasing
    if (!isMaskable) {
      const radius = w * 0.22;
      const rx = Math.max(0, Math.abs(x - w / 2) - (w / 2 - radius));
      const ry = Math.max(0, Math.abs(y - h / 2) - (h / 2 - radius));
      const cornerDist = Math.sqrt(rx * rx + ry * ry);
      if (cornerDist > radius) {
        return [0, 0, 0, 0]; // transparent outside rounded corner
      }
    }

    const scale = isMaskable ? 0.72 : 0.88;
    const outerR = (w * 0.32) * scale;
    const innerR = (w * 0.25) * scale;

    // Outer emerald glow ring
    if (dist <= outerR + 6 && dist >= outerR - 4) {
      return [52, 211, 153, 230]; // emerald-400
    }

    // Gold coin body
    if (dist < outerR - 4) {
      if (dist >= innerR) {
        // Gold rim
        return [245, 158, 11, 255]; // amber-500
      } else if (dist >= innerR - 3) {
        return [254, 240, 138, 255]; // light gold
      } else {
        // Coin center: deep dark emerald
        const coinInnerDist = dist / innerR;
        let cR = Math.round(4 + coinInnerDist * 10);
        let cG = Math.round(60 - coinInnerDist * 20);
        let cB = Math.round(45 - coinInnerDist * 15);

        // Dollar sign / growth mark inside coin
        const sx = dx / scale;
        const sy = dy / scale;

        // Vertical bar
        if (Math.abs(sx) < w * 0.02 && Math.abs(sy) < w * 0.16) {
          return [254, 240, 138, 255];
        }
        // Top curve of S
        const topCircleDist = Math.sqrt(sx * sx + (sy + w * 0.05) * (sy + w * 0.05));
        if (topCircleDist >= w * 0.04 && topCircleDist <= w * 0.08 && (sx > 0 || sy < -w * 0.05)) {
          return [251, 191, 36, 255];
        }
        // Bottom curve of S
        const botCircleDist = Math.sqrt(sx * sx + (sy - w * 0.05) * (sy - w * 0.05));
        if (botCircleDist >= w * 0.04 && botCircleDist <= w * 0.08 && (sx < 0 || sy > w * 0.05)) {
          return [251, 191, 36, 255];
        }

        return [cR, cG, cB, 255];
      }
    }

    // Sparkle near top right
    const spX = cx + outerR * 0.9;
    const spY = cy - outerR * 0.8;
    const spDist = Math.hypot(x - spX, y - spY);
    if (spDist < w * 0.035) {
      return [254, 240, 138, 255];
    }

    return [bgR, bgG, bgB, 255];
  };
}

const publicDir = path.join(__dirname, 'public');

// Generate 192x192
const pwa192 = generatePNG(192, 192, createBrandIcon(false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);

// Generate 512x512
const pwa512 = generatePNG(512, 512, createBrandIcon(false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);

// Generate maskable 512x512
const pwaMaskable = generatePNG(512, 512, createBrandIcon(true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pwaMaskable);

// Generate apple-touch-icon 180x180
const appleIcon = generatePNG(180, 180, createBrandIcon(false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

console.log('Successfully generated all PWA icons in /public:');
console.log('- pwa-192x192.png');
console.log('- pwa-512x512.png');
console.log('- pwa-maskable-512x512.png');
console.log('- apple-touch-icon.png');
