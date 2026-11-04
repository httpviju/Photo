export type LayoutId =
  | '1-photo'
  | 'wallet-2'
  | '2-photo'
  | '4-photo'
  | '8-photo'
  | '16-photo'
  | 'id-35x45-6'
  | 'id-25x36-8';

export interface PhotoCell {
  x: number; // pixel in 1200x1800 canvas (300 DPI)
  y: number;
  width: number;
  height: number;
  label?: string;
  physicalMm?: { width: number; height: number };
}

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  hindiLabel: string;
  description: string;
  photoCount: number;
  isIdPhoto?: boolean;
  cells: PhotoCell[];
}

export interface PhotoTransform {
  zoom: number;
  panX: number; // offset in percentage (-50 to 50)
  panY: number;
  rotation: number; // 0, 90, 180, 270
}

export interface LoadedPhoto {
  id: string;
  name: string;
  image: HTMLImageElement;
  dataUrl: string;
  width: number;
  height: number;
}

export interface CellSlot {
  photoId: string | null;
  transform: PhotoTransform;
}

export interface PrintSettings {
  quantity: number; // sheets to print
  fitMode: 'center-crop' | 'fit-entire';
  showCutLines: boolean;
  showBorder: boolean;
  borderColor: string;
  borderWidthPx: number;
}

