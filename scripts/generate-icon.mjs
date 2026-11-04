import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a 256x256 RGBA PNG and wraps it into a valid Windows .ICO file
 * at build/icon.ico and build/icon.png with zero external dependencies.
 * This ensures electron-builder can package Vijay-Portfolio-Setup.exe out of the box.
 */
const WIDTH = 256;
const HEIGHT = 256;

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function pointInSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function renderPortfolioIconPixels() {
  // Each scanline starts with filter byte 0, followed by WIDTH * 4 RGBA bytes
  const raw = Buffer.alloc(HEIGHT * (1 + WIDTH * 4));
  const radius = 44;

  for (let y = 0; y < HEIGHT; y++) {
    const rowOffset = y * (1 + WIDTH * 4);
    raw[rowOffset] = 0; // No filter

    for (let x = 0; x < WIDTH; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Check rounded rectangle bounds [8, 248]
      const minB = 8;
      const maxB = 247;
      if (x < minB || x > maxB || y < minB || y > maxB) {
        raw[pxOffset] = 0;
        raw[pxOffset + 1] = 0;
        raw[pxOffset + 2] = 0;
        raw[pxOffset + 3] = 0;
        continue;
      }

      // Corner rounding check
      let cx = x;
      let cy = y;
      if (x < minB + radius) cx = minB + radius;
      else if (x > maxB - radius) cx = maxB - radius;
      if (y < minB + radius) cy = minB + radius;
      else if (y > maxB - radius) cy = maxB - radius;

      const distCorner = Math.hypot(x - cx, y - cy);
      if (distCorner > radius) {
        raw[pxOffset] = 0;
        raw[pxOffset + 1] = 0;
        raw[pxOffset + 2] = 0;
        raw[pxOffset + 3] = 0;
        continue;
      }

      // Base Obsidian surface (#09090B -> #121215 subtle diagonal gradient)
      const gradT = (x + y) / (WIDTH + HEIGHT);
      let r = Math.round(9 + gradT * 9);
      let g = Math.round(9 + gradT * 9);
      let b = Math.round(11 + gradT * 10);

      // Subtle architectural grid lines at 64, 192
      if (x === 64 || x === 192 || y === 64 || y === 192) {
        r = 28;
        g = 28;
        b = 33;
      }

      // Outer 6px Zinc border (#27272A)
      const isBorder =
        x < minB + 6 ||
        x > maxB - 6 ||
        y < minB + 6 ||
        y > maxB - 6 ||
        distCorner > radius - 6;
      if (isBorder) {
        r = 39;
        g = 39;
        b = 42;
      }

      // Top-left Electric Cobalt accent bar (x: 32..80, y: 32..40)
      if (x >= 32 && x <= 80 && y >= 32 && y <= 40) {
        r = 37;
        g = 99;
        b = 235;
      }

      // Letter 'V' in Crisp Alabaster (#FAFAFA) using thick line segments
      const dVLeft = pointInSegmentDistance(x, y, 66, 82, 102, 178);
      const dVRight = pointInSegmentDistance(x, y, 102, 178, 138, 82);
      if (dVLeft <= 10.5 || dVRight <= 10.5) {
        r = 250;
        g = 250;
        b = 250;
      }

      // Letter 'P' in Electric Cobalt (#3B82F6)
      const dPStem = pointInSegmentDistance(x, y, 156, 82, 156, 178);
      const dPTop = pointInSegmentDistance(x, y, 156, 82, 190, 82);
      const dPMid = pointInSegmentDistance(x, y, 156, 132, 190, 132);
      const dPArc = Math.abs(Math.hypot(x - 190, y - 107) - 25);
      const inP =
        dPStem <= 10 ||
        (y >= 72 && y <= 142 && (dPTop <= 10 || dPMid <= 10)) ||
        (x >= 188 && dPArc <= 10 && y >= 72 && y <= 142);

      if (inP) {
        r = 59;
        g = 130;
        b = 246;
      }

      // Bottom-right Emerald status indicator dot (cx: 214, cy: 214, r: 8)
      if (Math.hypot(x - 214, y - 214) <= 8) {
        r = 16;
        g = 185;
        b = 129;
      }

      raw[pxOffset] = r;
      raw[pxOffset + 1] = g;
      raw[pxOffset + 2] = b;
      raw[pxOffset + 3] = 255;
    }
  }

  return raw;
}

function buildPngBuffer() {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawData = renderPortfolioIconPixels();
  const compressed = zlib.deflateSync(rawData, { level: 9 });

  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function buildIcoFromPng(pngBuffer) {
  // ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG payload
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 image

  // Entry
  header[6] = 0; // 0 means 256px width
  header[7] = 0; // 0 means 256px height
  header[8] = 0; // Color palette
  header[9] = 0; // Reserved
  header.writeUInt16LE(1, 10); // Color planes
  header.writeUInt16LE(32, 12); // 32 bits per pixel
  header.writeUInt32LE(pngBuffer.length, 14); // Size of image data
  header.writeUInt32LE(22, 18); // Offset of image data

  return Buffer.concat([header, pngBuffer]);
}

const buildDir = path.join(__dirname, '..', 'build');
fs.mkdirSync(buildDir, { recursive: true });

const pngBuf = buildPngBuffer();
const icoBuf = buildIcoFromPng(pngBuf);

fs.writeFileSync(path.join(buildDir, 'icon.png'), pngBuf);
fs.writeFileSync(path.join(buildDir, 'icon.ico'), icoBuf);

console.log('[Vijay Portfolio] Generated build/icon.ico and build/icon.png (256x256 RGBA)');
