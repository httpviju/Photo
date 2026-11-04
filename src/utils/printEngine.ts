import { LayoutConfig, PhotoTransform, PrintSettings, LoadedPhoto, CellSlot } from '../types';
import { renderCanvas, CANVAS_WIDTH, CANVAS_HEIGHT } from './layoutEngine';

/**
 * Triggers direct high-resolution 4x6 print job with exact sheets quantity
 */
export function triggerPrint(
  imageSource: HTMLImageElement | null | LoadedPhoto[],
  layout: LayoutConfig,
  transformSource: PhotoTransform | CellSlot[],
  settings: PrintSettings
) {
  // 1. Generate full-resolution 1200x1800 300DPI canvas
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  renderCanvas(ctx, imageSource, layout, transformSource, settings);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.98);

  // 2. Build offscreen print iframe with real 4x6 dimensions so browser calculates 4x6 page box
  const existingFrame = document.getElementById('photo-print-iframe');
  if (existingFrame) {
    existingFrame.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'photo-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.top = '-10000px';
  iframe.style.left = '-10000px';
  iframe.style.width = '4in';
  iframe.style.height = '6in';
  iframe.style.border = 'none';
  iframe.style.zIndex = '-9999';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  // Generate pages HTML for the chosen quantity
  const pagesHtml = Array.from({ length: settings.quantity })
    .map(
      (_, i) => `
      <div class="print-page">
        <img src="${dataUrl}" alt="Photo 4x6 Sheet ${i + 1}" />
      </div>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Photo 4x6 Print (${layout.name})</title>
        <style>
          /* Standard CSS Paged Media 4x6 size rule (without trailing portrait keyword) */
          @page {
            size: 4in 6in;
            margin: 0 !important;
          }
          @page :left {
            margin: 0 !important;
          }
          @page :right {
            margin: 0 !important;
          }
          @page :first {
            margin: 0 !important;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            width: 4in;
            height: 6in;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff;
            overflow: hidden;
          }
          .print-page {
            width: 4in;
            height: 6in;
            max-width: 4in;
            max-height: 6in;
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            break-inside: avoid;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #ffffff;
            position: relative;
          }
          .print-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .print-page img {
            width: 4in;
            height: 6in;
            max-width: 4in;
            max-height: 6in;
            object-fit: fill;
            display: block;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          @media print {
            @page {
              size: 4in 6in;
              margin: 0 !important;
            }
            html, body {
              width: 4in !important;
              height: 6in !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }
            .print-page {
              width: 4in !important;
              height: 6in !important;
              page-break-after: always !important;
              break-after: page !important;
            }
            .print-page:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
            .print-page img {
              width: 4in !important;
              height: 6in !important;
              object-fit: fill !important;
            }
          }
        </style>
      </head>
      <body>
        ${pagesHtml}
      </body>
    </html>
  `;

  doc.open();
  doc.write(html);
  doc.close();

  // Wait for images inside iframe to fully render before triggering print
  const triggerPrintJob = () => {
    try {
      iframe.contentWindow?.addEventListener('afterprint', () => {
        setTimeout(() => {
          try {
            iframe.remove();
          } catch {
            // ignore
          }
        }, 100);
      });
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      // fallback
      window.print();
    }
  };

  // Check if images are already loaded or add load listener
  const images = doc.getElementsByTagName('img');
  let loadedCount = 0;
  const totalImgs = images.length;

  if (totalImgs === 0) {
    setTimeout(triggerPrintJob, 300);
  } else {
    for (let i = 0; i < totalImgs; i++) {
      if (images[i].complete) {
        loadedCount++;
      } else {
        images[i].onload = () => {
          loadedCount++;
          if (loadedCount >= totalImgs) {
            setTimeout(triggerPrintJob, 200);
          }
        };
      }
    }
    if (loadedCount >= totalImgs) {
      setTimeout(triggerPrintJob, 250);
    }
  }
}

/**
 * Downloads the exact 1200x1800 300DPI canvas as JPG
 */
export function savePhotoAsJpg(
  imageSource: HTMLImageElement | null | LoadedPhoto[],
  layout: LayoutConfig,
  transformSource: PhotoTransform | CellSlot[],
  settings: PrintSettings
) {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  renderCanvas(ctx, imageSource, layout, transformSource, settings);

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timeStr = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
      const cleanLayoutName = layout.name.replace(/[^a-zA-Z0-9]/g, '_');
      a.download = `Photo4x6_${cleanLayoutName}_300DPI_${timeStr}.jpg`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    'image/jpeg',
    0.95
  );
}

