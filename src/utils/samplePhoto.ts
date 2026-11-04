/**
 * Generates an elegant high-res studio portrait avatar for instant testing
 */
export function generateSamplePhotoDataUrl(variant: number = 1): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (variant === 2) {
    // Warm Amber Studio Backdrop (Sample Photo 2)
    const bgGrad = ctx.createRadialGradient(600, 550, 80, 600, 750, 800);
    bgGrad.addColorStop(0, '#fef3c7');
    bgGrad.addColorStop(0.5, '#fde68a');
    bgGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1500);

    // Body / Crimson Blazer
    ctx.fillStyle = '#831843';
    ctx.beginPath();
    ctx.ellipse(600, 1400, 500, 400, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shirt
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(530, 950);
    ctx.lineTo(600, 1150);
    ctx.lineTo(670, 950);
    ctx.closePath();
    ctx.fill();

    // Neck & Face
    ctx.fillStyle = '#e2a97e';
    ctx.fillRect(540, 840, 120, 180);
    ctx.fillStyle = '#f6c3a1';
    ctx.beginPath();
    ctx.ellipse(600, 650, 190, 250, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair - Long auburn style
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.ellipse(600, 480, 230, 170, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(535, 640, 15, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(665, 640, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gentle Smile
    ctx.strokeStyle = '#9f1239';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(600, 760, 45, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO #2 (PORTRAIT)', 600, 1420);

    return canvas.toDataURL('image/jpeg', 0.95);
  }

  if (variant === 3) {
    // Emerald Green Backdrop (Sample Photo 3)
    const bgGrad = ctx.createRadialGradient(600, 550, 80, 600, 750, 800);
    bgGrad.addColorStop(0, '#d1fae5');
    bgGrad.addColorStop(0.5, '#a7f3d0');
    bgGrad.addColorStop(1, '#059669');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1500);

    // Body / Slate Grey Jacket
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(600, 1400, 500, 400, 0, 0, Math.PI * 2);
    ctx.fill();

    // Blue Polo
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(530, 950);
    ctx.lineTo(600, 1150);
    ctx.lineTo(670, 950);
    ctx.closePath();
    ctx.fill();

    // Neck & Face
    ctx.fillStyle = '#e2a97e';
    ctx.fillRect(540, 840, 120, 180);
    ctx.fillStyle = '#f0be9b';
    ctx.beginPath();
    ctx.ellipse(600, 650, 200, 260, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(600, 470, 210, 150, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glasses
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 6;
    ctx.strokeRect(500, 615, 75, 55);
    ctx.strokeRect(625, 615, 75, 55);
    ctx.beginPath();
    ctx.moveTo(575, 642);
    ctx.lineTo(625, 642);
    ctx.stroke();

    // Smile
    ctx.strokeStyle = '#ab5b49';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(600, 765, 45, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO #3 (ID/PASSPORT)', 600, 1420);

    return canvas.toDataURL('image/jpeg', 0.95);
  }

  // 1. Studio Gradient Backdrop (soft light studio blue/grey)
  const bgGrad = ctx.createRadialGradient(600, 550, 80, 600, 750, 800);
  bgGrad.addColorStop(0, '#eaf2f8');
  bgGrad.addColorStop(0.5, '#c9dbe9');
  bgGrad.addColorStop(1, '#97b3ce');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1500);

  // 2. Soft lighting vignette
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.ellipse(600, 450, 350, 400, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Body / Suit Silhouette
  ctx.fillStyle = '#1e293b'; // Navy formal suit
  ctx.beginPath();
  ctx.ellipse(600, 1400, 500, 400, 0, 0, Math.PI * 2);
  ctx.fill();

  // White formal shirt collar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(530, 950);
  ctx.lineTo(600, 1150);
  ctx.lineTo(670, 950);
  ctx.closePath();
  ctx.fill();

  // Red/Burgundy Necktie
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.moveTo(585, 1060);
  ctx.lineTo(615, 1060);
  ctx.lineTo(625, 1350);
  ctx.lineTo(600, 1420);
  ctx.lineTo(575, 1350);
  ctx.closePath();
  ctx.fill();

  // 4. Neck
  ctx.fillStyle = '#e2a97e';
  ctx.fillRect(540, 840, 120, 180);

  // 5. Head / Face Shape
  ctx.fillStyle = '#f0be9b';
  ctx.beginPath();
  ctx.ellipse(600, 650, 200, 260, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = '#271c19';
  ctx.beginPath();
  ctx.ellipse(600, 480, 220, 160, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#26170d';
  ctx.beginPath();
  ctx.ellipse(530, 640, 16, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(670, 640, 16, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#271c19';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(495, 605);
  ctx.quadraticCurveTo(530, 590, 565, 610);
  ctx.moveTo(635, 610);
  ctx.quadraticCurveTo(670, 590, 705, 605);
  ctx.stroke();

  // Nose
  ctx.strokeStyle = '#cb8f6a';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(600, 630);
  ctx.lineTo(590, 720);
  ctx.lineTo(615, 720);
  ctx.stroke();

  // Gentle Smile
  ctx.strokeStyle = '#ab5b49';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(600, 760, 45, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Watermark text in corner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PHOTO #1 (STUDIO SUIT)', 600, 1420);

  return canvas.toDataURL('image/jpeg', 0.95);
}

export function generateMultiSamplePhotos(): Array<{ id: string; name: string; dataUrl: string }> {
  return [
    {
      id: 'sample-photo-1',
      name: '01_Studio_Suit.jpg',
      dataUrl: generateSamplePhotoDataUrl(1),
    },
    {
      id: 'sample-photo-2',
      name: '02_Portrait_Warm.jpg',
      dataUrl: generateSamplePhotoDataUrl(2),
    },
    {
      id: 'sample-photo-3',
      name: '03_Passport_Glasses.jpg',
      dataUrl: generateSamplePhotoDataUrl(3),
    },
  ];
}

