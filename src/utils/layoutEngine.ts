import { LayoutConfig, LayoutId, PhotoCell, PhotoTransform, PrintSettings, LoadedPhoto, CellSlot } from '../types';

export const CANVAS_WIDTH = 1200; // 4 inches @ 300 DPI
export const CANVAS_HEIGHT = 1800; // 6 inches @ 300 DPI
export const DPI = 300;
export const MM_PER_INCH = 25.4;
export const PX_PER_MM = DPI / MM_PER_INCH; // ~11.811 px per mm

export const LAYOUTS: LayoutConfig[] = [
  {
    id: '1-photo',
    name: '1 Photo',
    hindiLabel: '1 फोटो (पूरा 4×6 पेज)',
    description: '1 full sheet photo (4×6 inch / 10×15 cm)',
    photoCount: 1,
    cells: [
      {
        x: 30,
        y: 30,
        width: 1140,
        height: 1740,
        label: 'Photo 1 (Full 4×6)',
        physicalMm: { width: 96.5, height: 147.3 },
      },
    ],
  },
  {
    id: 'wallet-2',
    name: 'Wallet (2)',
    hindiLabel: 'वॉलेट - 2 फोटो (1 शीट पर 2 वॉलेट)',
    description: '2 Wallet photos on ONE 4×6 sheet (Epson Easy Photo Print Style)',
    photoCount: 2,
    cells: [
      {
        x: 50,
        y: 50,
        width: 1100,
        height: 825,
        label: 'Wallet 1 (Top)',
        physicalMm: { width: 93.1, height: 69.8 },
      },
      {
        x: 50,
        y: 925,
        width: 1100,
        height: 825,
        label: 'Wallet 2 (Bottom)',
        physicalMm: { width: 93.1, height: 69.8 },
      },
    ],
  },
  {
    id: '2-photo',
    name: '2 Photo',
    hindiLabel: '2 फोटो (1 शीट पर 2 फोटो)',
    description: '2 horizontal photo cards on 4×6 sheet',
    photoCount: 2,
    cells: [
      {
        x: 60,
        y: 60,
        width: 1080,
        height: 810,
        label: 'Photo 1',
        physicalMm: { width: 91.4, height: 68.6 },
      },
      {
        x: 60,
        y: 930,
        width: 1080,
        height: 810,
        label: 'Photo 2',
        physicalMm: { width: 91.4, height: 68.6 },
      },
    ],
  },
  {
    id: '4-photo',
    name: '4 Photo',
    hindiLabel: '4 फोटो (2×2 ग्रिड)',
    description: '4 photos in 2×2 grid layout on 4×6 sheet',
    photoCount: 4,
    cells: [
      { x: 40, y: 40, width: 540, height: 840, label: 'Photo 1 (Top Left)' },
      { x: 620, y: 40, width: 540, height: 840, label: 'Photo 2 (Top Right)' },
      { x: 40, y: 920, width: 540, height: 840, label: 'Photo 3 (Bottom Left)' },
      { x: 620, y: 920, width: 540, height: 840, label: 'Photo 4 (Bottom Right)' },
    ],
  },
  {
    id: '8-photo',
    name: '8 Photo',
    hindiLabel: '8 फोटो (2×4 ग्रिड)',
    description: '8 photos in 2×4 grid layout on 4×6 sheet',
    photoCount: 8,
    cells: [
      // Row 1
      { x: 40, y: 40, width: 545, height: 407, label: 'Photo 1' },
      { x: 615, y: 40, width: 545, height: 407, label: 'Photo 2' },
      // Row 2
      { x: 40, y: 477, width: 545, height: 407, label: 'Photo 3' },
      { x: 615, y: 477, width: 545, height: 407, label: 'Photo 4' },
      // Row 3
      { x: 40, y: 914, width: 545, height: 407, label: 'Photo 5' },
      { x: 615, y: 914, width: 545, height: 407, label: 'Photo 6' },
      // Row 4
      { x: 40, y: 1351, width: 545, height: 407, label: 'Photo 7' },
      { x: 615, y: 1351, width: 545, height: 407, label: 'Photo 8' },
    ],
  },
  {
    id: '16-photo',
    name: '16 Photo',
    hindiLabel: '16 फोटो (4×4 मिनी थंबनेल)',
    description: '16 mini sticker/token photos in 4×4 grid',
    photoCount: 16,
    cells: (() => {
      const cells: PhotoCell[] = [];
      const cols = 4;
      const rows = 4;
      const marginX = 40;
      const marginY = 40;
      const gapX = 20;
      const gapY = 25;
      const cellW = Math.floor((1200 - 2 * marginX - (cols - 1) * gapX) / cols); // ~265
      const cellH = Math.floor((1800 - 2 * marginY - (rows - 1) * gapY) / rows); // ~411

      let idx = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: marginX + c * (cellW + gapX),
            y: marginY + r * (cellH + gapY),
            width: cellW,
            height: cellH,
            label: `P${idx++}`,
          });
        }
      }
      return cells;
    })(),
  },
  {
    id: 'id-35x45-6',
    name: '35 × 45 mm ID (6)',
    hindiLabel: '35×45 mm पासपोर्ट/आईडी (6 फोटो)',
    description: 'Standard 35×45 mm ID / Passport size (6 photos on 4×6 sheet)',
    photoCount: 6,
    isIdPhoto: true,
    cells: [
      // 35mm x 45mm at 300 DPI = 413.38 x 531.5 px -> 413 x 531
      { x: 110, y: 51, width: 413, height: 531, label: 'ID 1', physicalMm: { width: 35, height: 45 } },
      { x: 677, y: 51, width: 413, height: 531, label: 'ID 2', physicalMm: { width: 35, height: 45 } },
      { x: 110, y: 634, width: 413, height: 531, label: 'ID 3', physicalMm: { width: 35, height: 45 } },
      { x: 677, y: 634, width: 413, height: 531, label: 'ID 4', physicalMm: { width: 35, height: 45 } },
      { x: 110, y: 1217, width: 413, height: 531, label: 'ID 5', physicalMm: { width: 35, height: 45 } },
      { x: 677, y: 1217, width: 413, height: 531, label: 'ID 6', physicalMm: { width: 35, height: 45 } },
    ],
  },
  {
    id: 'id-25x36-8',
    name: '25 × 36 mm ID (8)',
    hindiLabel: '25×36 mm स्टैंप/आईडी (8 फोटो)',
    description: 'Stamp / Small ID 25×36 mm size (8 photos on 4×6 sheet)',
    photoCount: 8,
    isIdPhoto: true,
    cells: [
      // 25mm x 36mm at 300 DPI = 295.27 x 425.19 px -> 295 x 425
      { x: 215, y: 30, width: 295, height: 425, label: 'Stamp 1', physicalMm: { width: 25, height: 36 } },
      { x: 690, y: 30, width: 295, height: 425, label: 'Stamp 2', physicalMm: { width: 25, height: 36 } },
      { x: 215, y: 470, width: 295, height: 425, label: 'Stamp 3', physicalMm: { width: 25, height: 36 } },
      { x: 690, y: 470, width: 295, height: 425, label: 'Stamp 4', physicalMm: { width: 25, height: 36 } },
      { x: 215, y: 910, width: 295, height: 425, label: 'Stamp 5', physicalMm: { width: 25, height: 36 } },
      { x: 690, y: 910, width: 295, height: 425, label: 'Stamp 6', physicalMm: { width: 25, height: 36 } },
      { x: 215, y: 1350, width: 295, height: 425, label: 'Stamp 7', physicalMm: { width: 25, height: 36 } },
      { x: 690, y: 1350, width: 295, height: 425, label: 'Stamp 8', physicalMm: { width: 25, height: 36 } },
    ],
  },
];

/**
 * Helper to get the image and transform for a specific cell index
 */
export function resolveCellImageAndTransform(
  cellIndex: number,
  imageSource: HTMLImageElement | null | LoadedPhoto[],
  transformSource: PhotoTransform | CellSlot[]
): { image: HTMLImageElement | null; transform: PhotoTransform; photoName?: string } {
  const defaultTransform: PhotoTransform = { zoom: 1.0, panX: 0, panY: 0, rotation: 0 };

  if (Array.isArray(imageSource)) {
    const photos = imageSource;
    const slots = Array.isArray(transformSource) ? transformSource : [];
    const slot = slots[cellIndex];

    const currentTransform = slot ? slot.transform : (Array.isArray(transformSource) ? defaultTransform : transformSource);

    if (slot && slot.photoId) {
      const found = photos.find((p) => p.id === slot.photoId);
      if (found) {
        return { image: found.image, transform: currentTransform, photoName: found.name };
      }
    }

    // Default distribution: pick corresponding photo from list or first photo
    if (photos.length > 0) {
      const defaultPhoto = photos[cellIndex % photos.length] || photos[0];
      return { image: defaultPhoto.image, transform: currentTransform, photoName: defaultPhoto.name };
    }

    return { image: null, transform: currentTransform };
  } else {
    // Single image mode
    const transform = Array.isArray(transformSource)
      ? (transformSource[cellIndex]?.transform || defaultTransform)
      : transformSource;
    return { image: imageSource, transform };
  }
}

/**
 * Draws the high resolution 1200x1800 canvas with all cells, images, borders and cut lines
 */
export function renderCanvas(
  ctx: CanvasRenderingContext2D,
  imageSource: HTMLImageElement | null | LoadedPhoto[],
  layout: LayoutConfig,
  transformSource: PhotoTransform | CellSlot[],
  settings: PrintSettings
) {
  // 1. Clear with Pure White Photo Paper Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 2. Draw each photo cell
  layout.cells.forEach((cell, index) => {
    const { image, transform } = resolveCellImageAndTransform(index, imageSource, transformSource);
    drawCell(ctx, cell, image, transform, settings, index);
  });

  // 3. Draw cut lines / guide lines if enabled
  if (settings.showCutLines) {
    drawCutGuides(ctx, layout);
  }
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  cell: PhotoCell,
  image: HTMLImageElement | null,
  transform: PhotoTransform,
  settings: PrintSettings,
  cellIndex?: number
) {
  const { x, y, width, height } = cell;

  ctx.save();

  if (image && image.complete && image.naturalWidth > 0) {
    // Clip to cell boundary
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();

    // Calculate source crop & orientation
    const naturalW = image.naturalWidth;
    const naturalH = image.naturalHeight;
    const isRotated90or270 = transform.rotation === 90 || transform.rotation === 270;
    const effectiveImgW = isRotated90or270 ? naturalH : naturalW;
    const effectiveImgH = isRotated90or270 ? naturalW : naturalH;

    const cellAspect = width / height;
    const imgAspect = effectiveImgW / effectiveImgH;

    let drawW: number;
    let drawH: number;

    if (settings.fitMode === 'center-crop') {
      // Fill cell completely without distorting face (Center Crop)
      if (imgAspect > cellAspect) {
        // Image is wider than cell -> match height, crop width
        drawH = height * transform.zoom;
        drawW = drawH * imgAspect;
      } else {
        // Image is taller than cell -> match width, crop height
        drawW = width * transform.zoom;
        drawH = drawW / imgAspect;
      }
    } else {
      // Fit Entire Image inside cell
      if (imgAspect > cellAspect) {
        drawW = width * transform.zoom;
        drawH = drawW / imgAspect;
      } else {
        drawH = height * transform.zoom;
        drawW = drawH * imgAspect;
      }
    }

    // Center coordinates
    const centerX = x + width / 2 + (transform.panX / 100) * width;
    const centerY = y + height / 2 + (transform.panY / 100) * height;

    // Apply rotation & draw
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((transform.rotation * Math.PI) / 180);

    const actualDrawW = isRotated90or270 ? drawH : drawW;
    const actualDrawH = isRotated90or270 ? drawW : drawH;

    // High quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      -actualDrawW / 2,
      -actualDrawH / 2,
      actualDrawW,
      actualDrawH
    );
    ctx.restore();
  } else {
    // Empty cell placeholder for preview
    ctx.fillStyle = '#F4F4F6';
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);
    ctx.setLineDash([]);

    // Cell Label
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 24px "Segoe UI", Tahoma, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelText = cell.physicalMm
      ? `${cell.label || `Photo ${typeof cellIndex === 'number' ? cellIndex + 1 : ''}`} (${cell.physicalMm.width}×${cell.physicalMm.height} mm)`
      : cell.label || `Slot #${typeof cellIndex === 'number' ? cellIndex + 1 : '1'}`;
    ctx.fillText(labelText, x + width / 2, y + height / 2);
  }

  // Draw border if requested
  if (settings.showBorder) {
    ctx.strokeStyle = settings.borderColor || '#E5E7EB';
    ctx.lineWidth = settings.borderWidthPx || 2;
    ctx.strokeRect(x, y, width, height);
  }

  ctx.restore();
}

function drawCutGuides(ctx: CanvasRenderingContext2D, layout: LayoutConfig) {
  ctx.save();
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);

  for (const cell of layout.cells) {
    const { x, y, width, height } = cell;

    // Corner cutting ticks (30px length)
    const tickLen = 30;

    // Top-Left corner
    ctx.beginPath();
    ctx.moveTo(x - tickLen, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y - tickLen);
    ctx.stroke();

    // Top-Right corner
    ctx.beginPath();
    ctx.moveTo(x + width + tickLen, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y - tickLen);
    ctx.stroke();

    // Bottom-Left corner
    ctx.beginPath();
    ctx.moveTo(x - tickLen, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + height + tickLen);
    ctx.stroke();

    // Bottom-Right corner
    ctx.beginPath();
    ctx.moveTo(x + width + tickLen, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width, y + height + tickLen);
    ctx.stroke();
  }

  ctx.restore();
}

