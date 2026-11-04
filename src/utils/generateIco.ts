// Generates a valid standard Win32 32x32 32-bpp .ICO file with a stylized 'V' logo
export function generateVLogoIco(): Uint8Array {
  const width = 32;
  const height = 32;
  const bpp = 32;
  
  const headerSize = 6;
  const entrySize = 16;
  const bihSize = 40;
  const pixelDataSize = width * height * 4; // 4096 bytes
  const maskRowSize = Math.ceil(width / 32) * 4; // 4 bytes per row
  const maskSize = maskRowSize * height; // 128 bytes
  const imageResSize = bihSize + pixelDataSize + maskSize;
  const totalFileSize = headerSize + entrySize + imageResSize;

  const buffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // 1. ICONDIR header (6 bytes)
  view.setUint16(0, 0, true); // Reserved (must be 0)
  view.setUint16(2, 1, true); // Type (1 = ICO)
  view.setUint16(4, 1, true); // Count (1 image)

  // 2. ICONDIRENTRY (16 bytes)
  view.setUint8(6, width); // Width
  view.setUint8(7, height); // Height
  view.setUint8(8, 0); // Color count (0 = >=8bpp)
  view.setUint8(9, 0); // Reserved
  view.setUint16(10, 1, true); // Color planes
  view.setUint16(12, bpp, true); // Bits per pixel
  view.setUint32(14, imageResSize, true); // Size of image data in bytes
  view.setUint32(18, headerSize + entrySize, true); // Offset of image data (22)

  // 3. BITMAPINFOHEADER (40 bytes at offset 22)
  let offset = 22;
  view.setUint32(offset, bihSize, true); // biSize (40)
  view.setInt32(offset + 4, width, true); // biWidth (32)
  view.setInt32(offset + 8, height * 2, true); // biHeight (64 = XOR height + AND height)
  view.setUint16(offset + 12, 1, true); // biPlanes (1)
  view.setUint16(offset + 14, bpp, true); // biBitCount (32)
  view.setUint32(offset + 16, 0, true); // biCompression (BI_RGB = 0)
  view.setUint32(offset + 20, pixelDataSize + maskSize, true); // biSizeImage
  view.setInt32(offset + 24, 0, true); // biXPelsPerMeter
  view.setInt32(offset + 28, 0, true); // biYPelsPerMeter
  view.setUint32(offset + 32, 0, true); // biClrUsed
  view.setUint32(offset + 36, 0, true); // biClrImportant

  // 4. Pixel data (BGRA, bottom-to-top)
  offset += bihSize;

  // Let's define the 32x32 graphic pattern for stylized 'V' logo
  // Navy background: #0f2552 -> B: 0x52, G: 0x25, R: 0x0f, A: 0xff
  // Darker navy corner: #091530 -> B: 0x30, G: 0x15, R: 0x09, A: 0xff
  // Gold 'V': #ffcc00 -> B: 0x00, G: 0xcc, R: 0xff, A: 0xff
  // Amber border: #f59e0b -> B: 0x0b, G: 0x9e, R: 0xf5, A: 0xff

  for (let row = 0; row < height; row++) {
    // In BMP bottom-up format, row 0 is the bottom row of the image (y = 31 in standard coords)
    const y = height - 1 - row;

    for (let x = 0; x < width; x++) {
      const pixelOffset = offset + (row * width + x) * 4;

      // Rounded rectangle test: radius = 7
      const isInsideRect = isInsideRoundedRect(x, y, 0, 0, 32, 32, 7);

      if (!isInsideRect) {
        // Transparent outside rounded corners
        bytes[pixelOffset] = 0;
        bytes[pixelOffset + 1] = 0;
        bytes[pixelOffset + 2] = 0;
        bytes[pixelOffset + 3] = 0;
        continue;
      }

      // Border test: radius = 7, thickness = 1.5
      const isBorder = isInsideRoundedRect(x, y, 0, 0, 32, 32, 7) &&
        !isInsideRoundedRect(x, y, 1.5, 1.5, 29, 29, 5.5);

      if (isBorder) {
        bytes[pixelOffset] = 0x0b; // B
        bytes[pixelOffset + 1] = 0x9e; // G
        bytes[pixelOffset + 2] = 0xf5; // R
        bytes[pixelOffset + 3] = 0xff; // A
        continue;
      }

      // Is pixel part of 'V' glyph?
      const isV = isPixelInV(x, y);

      if (isV) {
        // Gold gradient
        const t = y / 32;
        bytes[pixelOffset] = 0x00; // B
        bytes[pixelOffset + 1] = Math.round(0xda * (1 - t) + 0xa0 * t); // G
        bytes[pixelOffset + 2] = 0xff; // R
        bytes[pixelOffset + 3] = 0xff; // A
      } else {
        // Navy blue background gradient
        const t = (x + y) / 64;
        bytes[pixelOffset] = Math.round(0x55 * (1 - t) + 0x25 * t); // B
        bytes[pixelOffset + 1] = Math.round(0x28 * (1 - t) + 0x12 * t); // G
        bytes[pixelOffset + 2] = Math.round(0x12 * (1 - t) + 0x08 * t); // R
        bytes[pixelOffset + 3] = 0xff; // A
      }
    }
  }

  // 5. AND mask (1-bit per pixel, 0 = opaque, 1 = transparent, row size padded to 4 bytes)
  offset += pixelDataSize;
  for (let row = 0; row < height; row++) {
    const y = height - 1 - row;
    let maskByte = 0;

    for (let x = 0; x < width; x++) {
      const isInside = isInsideRoundedRect(x, y, 0, 0, 32, 32, 7);
      if (!isInside) {
        const bitPos = 7 - (x % 8);
        maskByte |= 1 << bitPos;
      }
      if ((x % 8 === 7) || x === width - 1) {
        const byteIndex = offset + row * maskRowSize + Math.floor(x / 8);
        bytes[byteIndex] = maskByte;
        maskByte = 0;
      }
    }
  }

  return bytes;
}

function isInsideRoundedRect(
  x: number,
  y: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  r: number
): boolean {
  if (x < rx || x >= rx + rw || y < ry || y >= ry + rh) return false;
  // Check 4 corners
  if (x < rx + r && y < ry + r) {
    const dx = x - (rx + r);
    const dy = y - (ry + r);
    return dx * dx + dy * dy <= r * r;
  }
  if (x >= rx + rw - r && y < ry + r) {
    const dx = x - (rx + rw - r);
    const dy = y - (ry + r);
    return dx * dx + dy * dy <= r * r;
  }
  if (x < rx + r && y >= ry + rh - r) {
    const dx = x - (rx + r);
    const dy = y - (ry + rh - r);
    return dx * dx + dy * dy <= r * r;
  }
  if (x >= rx + rw - r && y >= ry + rh - r) {
    const dx = x - (rx + rw - r);
    const dy = y - (ry + rh - r);
    return dx * dx + dy * dy <= r * r;
  }
  return true;
}

function isPixelInV(x: number, y: number): boolean {
  // 'V' glyph inside 32x32 canvas
  // Top left: x: 7..11, y: 7
  // Top right: x: 20..24, y: 7
  // Bottom vertex: x: 14..17, y: 24
  if (y < 7 || y > 24) return false;

  // Left stroke center x at height y
  // from (9, 7) to (15.5, 23)
  const leftCenterX = 9 + ((y - 7) / 16) * 6.5;
  const rightCenterX = 22 - ((y - 7) / 16) * 6.5;

  const thickness = 2.2;
  if (Math.abs(x - leftCenterX) <= thickness) return true;
  if (Math.abs(x - rightCenterX) <= thickness) return true;

  // Bottom rounded cap connecting both strokes
  if (y >= 21 && y <= 24 && x >= 13 && x <= 18) {
    return true;
  }

  // Top serif caps
  if (y >= 7 && y <= 8) {
    if (x >= 6 && x <= 12) return true;
    if (x >= 19 && x <= 25) return true;
  }

  return false;
}
