import React, { useRef, useEffect, useState, useCallback } from 'react';
import { LayoutConfig, PhotoTransform, PrintSettings, LoadedPhoto, CellSlot } from '../types';
import { renderCanvas, CANVAS_WIDTH, CANVAS_HEIGHT, resolveCellImageAndTransform } from '../utils/layoutEngine';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Sparkles,
  RefreshCw,
  GripVertical,
  Check,
  Image as ImageIcon,
} from 'lucide-react';

interface PhotoCanvasPreviewProps {
  loadedPhotos: LoadedPhoto[];
  layout: LayoutConfig;
  cellSlots: CellSlot[];
  settings: PrintSettings;
  activeSlotIndex: number;
  onSelectSlot: (slotIndex: number) => void;
  onAssignPhotoToSlot: (slotIndex: number, photoId: string) => void;
  onFileDroppedOnSlot: (slotIndex: number, file: File) => void;
  onUpdateSlotTransform: (
    slotIndex: number,
    updater: (prev: PhotoTransform) => PhotoTransform
  ) => void;
  onRotateSelectedSlot: () => void;
  onRotateAllPhotos: () => void;
}

export const PhotoCanvasPreview: React.FC<PhotoCanvasPreviewProps> = ({
  loadedPhotos,
  layout,
  cellSlots,
  settings,
  activeSlotIndex,
  onSelectSlot,
  onAssignPhotoToSlot,
  onFileDroppedOnSlot,
  onUpdateSlotTransform,
  onRotateSelectedSlot,
  onRotateAllPhotos,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [previewScale, setPreviewScale] = useState<number>(0.42);
  const [canvasViewMode, setCanvasViewMode] = useState<'fit' | 'large' | 'xlarge'>('large');
  const [hoveredSlotIndex, setHoveredSlotIndex] = useState<number | null>(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState<number | null>(null);

  // Active slot transform
  const activeTransform: PhotoTransform =
    cellSlots[activeSlotIndex]?.transform || { zoom: 1.0, panX: 0, panY: 0, rotation: 0 };

  // Render canvas whenever any input changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderCanvas(ctx, loadedPhotos, layout, cellSlots, settings);
  }, [loadedPhotos, layout, cellSlots, settings]);

  // Adjust preview scaling to container size with user-chosen view mode
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const availW = rect.width - 40;
      const availH = rect.height - 110;
      const scaleW = availW / CANVAS_WIDTH;
      const scaleH = availH / CANVAS_HEIGHT;
      const calculated = Math.min(scaleW, scaleH);

      const multiplier = canvasViewMode === 'xlarge' ? 1.4 : canvasViewMode === 'large' ? 1.15 : 0.95;
      const targetScale = calculated * multiplier;
      setPreviewScale(Math.max(0.2, Math.min(0.8, targetScale)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [canvasViewMode]);

  // Mouse pan handlers for the selected slot
  const handleSlotMouseDown = (e: React.MouseEvent, slotIndex: number) => {
    onSelectSlot(slotIndex);
    setIsDraggingPan(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPan) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const speed = 0.15 / previewScale;
    onUpdateSlotTransform(activeSlotIndex, (prev) => ({
      ...prev,
      panX: Math.max(-100, Math.min(100, prev.panX + dx * speed)),
      panY: Math.max(-100, Math.min(100, prev.panY + dy * speed)),
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDraggingPan(false);
  };

  const handleWheelOnSlot = useCallback(
    (e: React.WheelEvent, slotIndex: number) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      onSelectSlot(slotIndex);
      const delta = e.deltaY < 0 ? 0.05 : -0.05;
      onUpdateSlotTransform(slotIndex, (prev) => ({
        ...prev,
        zoom: Math.max(0.5, Math.min(3.0, prev.zoom + delta)),
      }));
    },
    [onSelectSlot, onUpdateSlotTransform]
  );

  // Drag and Drop into specific slot
  const handleCellDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (dragOverSlotIndex !== slotIndex) {
      setDragOverSlotIndex(slotIndex);
    }
  };

  const handleCellDragLeave = (slotIndex: number) => {
    if (dragOverSlotIndex === slotIndex) {
      setDragOverSlotIndex(null);
    }
  };

  const handleCellDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlotIndex(null);

    // 1. Check if it is a photo dragged from our Photo Tray
    const rawData = e.dataTransfer.getData('text/plain');
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed && parsed.type === 'photo-tray-item' && parsed.photoId) {
          onAssignPhotoToSlot(slotIndex, parsed.photoId);
          onSelectSlot(slotIndex);
          return;
        }
      } catch {
        // Not a JSON payload, proceed to check files
      }
    }

    // 2. Check if user dropped direct image files from OS onto this cell
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDroppedOnSlot(slotIndex, e.dataTransfer.files[0]);
      onSelectSlot(slotIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      id="preview-viewport-container"
      className="flex-1 p-3 lg:p-4 flex flex-col items-center justify-center relative overflow-hidden select-none min-h-[420px]"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* BENTO CONTAINER: Card encompassing preview stage */}
      <div className="w-full h-full bg-slate-200/60 border border-slate-300/80 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-between relative shadow-inner overflow-hidden">
        {/* Top Floating Badge Bar */}
        <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-2xl shadow-xs text-xs text-slate-700 z-10">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200/60">
              {layout.name}
            </span>
            <span className="font-semibold text-slate-700">
              {layout.photoCount} {layout.photoCount === 1 ? 'slot' : 'slots'} on 1 × 4×6 Sheet
            </span>
          </div>

          {/* Canvas Preview Size Mode */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[10px] font-bold">
            <span className="text-slate-500 px-1 font-semibold hidden sm:inline">Preview Size:</span>
            <button
              type="button"
              onClick={() => setCanvasViewMode('fit')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                canvasViewMode === 'fit'
                  ? 'bg-white text-slate-900 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setCanvasViewMode('large')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                canvasViewMode === 'large'
                  ? 'bg-blue-600 text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Large (बड़ा)
            </button>
            <button
              type="button"
              onClick={() => setCanvasViewMode('xlarge')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                canvasViewMode === 'xlarge'
                  ? 'bg-indigo-600 text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              X-Large
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="bg-slate-100 px-2 py-0.5 border border-slate-200 rounded-md font-semibold text-slate-800">
              4" × 6" (10 × 15 cm)
            </span>
            <span className="text-slate-500 hidden md:inline">1200×1800 px @ 300 DPI</span>
          </div>
        </div>

        {/* Center 4x6 Paper Canvas Frame (Scrollable if preview is extra large) */}
        <div className="relative my-auto flex items-center justify-center py-2 sm:py-4 max-w-full max-h-full overflow-auto custom-scrollbar p-2">
          {/* Top Dimension Marker */}
          <div
            className="absolute -top-4 flex items-center justify-between text-[10px] text-slate-500 font-mono font-medium pointer-events-none"
            style={{ width: `${CANVAS_WIDTH * previewScale}px` }}
          >
            <span className="border-l border-slate-400 pl-0.5">0 mm</span>
            <span className="bg-white/90 px-1.5 py-0.5 border border-slate-300/80 rounded-md text-[9px] shadow-2xs">
              Width: 4.0 in (101.6 mm)
            </span>
            <span className="border-r border-slate-400 pr-0.5">101.6 mm</span>
          </div>

          {/* Left Dimension Marker */}
          <div
            className="absolute -left-6 flex flex-col items-center justify-between text-[10px] text-slate-500 font-mono font-medium pointer-events-none"
            style={{ height: `${CANVAS_HEIGHT * previewScale}px` }}
          >
            <span className="border-t border-slate-400">0</span>
            <span className="bg-white/90 px-1 border border-slate-300/80 rounded-md text-[9px] -rotate-90 whitespace-nowrap shadow-2xs">
              Height: 6.0 in (152.4 mm)
            </span>
            <span className="border-b border-slate-400">152.4</span>
          </div>

          {/* Canvas Surface simulating photo paper */}
          <div
            className="relative bg-white shadow-2xl rounded-sm border border-slate-300 overflow-hidden"
            style={{
              width: `${CANVAS_WIDTH * previewScale}px`,
              height: `${CANVAS_HEIGHT * previewScale}px`,
            }}
          >
            {/* Actual 1200x1800 Canvas */}
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="w-full h-full block"
            />

            {/* Interactive Cell Drop Targets & Drag Pan Overlays */}
            {layout.cells.map((cell, idx) => {
              const isActive = idx === activeSlotIndex;
              const isDragOver = idx === dragOverSlotIndex;
              const resolved = resolveCellImageAndTransform(idx, loadedPhotos, cellSlots);

              return (
                <div
                  key={idx}
                  onClick={() => onSelectSlot(idx)}
                  onMouseDown={(e) => handleSlotMouseDown(e, idx)}
                  onWheel={(e) => handleWheelOnSlot(e, idx)}
                  onDragOver={(e) => handleCellDragOver(e, idx)}
                  onDragLeave={() => handleCellDragLeave(idx)}
                  onDrop={(e) => handleCellDrop(e, idx)}
                  onMouseEnter={() => setHoveredSlotIndex(idx)}
                  onMouseLeave={() => setHoveredSlotIndex(null)}
                  title={`Slot #${idx + 1}: ${resolved.photoName || 'Empty'} — Drag photo from tray here or drag inside to position`}
                  className={`absolute transition-all ${
                    isDragOver
                      ? 'bg-blue-500/25 border-3 border-blue-600 ring-4 ring-blue-300 scale-[1.01] z-30'
                      : isActive
                      ? 'border-2 border-blue-600 bg-blue-500/5 ring-2 ring-blue-400/40 z-20 cursor-grab active:cursor-grabbing'
                      : 'border border-dashed border-slate-400/60 hover:border-blue-400 hover:bg-slate-900/5 cursor-pointer z-10'
                  } flex flex-col justify-between p-1.5`}
                  style={{
                    left: `${cell.x * previewScale}px`,
                    top: `${cell.y * previewScale}px`,
                    width: `${cell.width * previewScale}px`,
                    height: `${cell.height * previewScale}px`,
                  }}
                >
                  {/* Slot Top Badges */}
                  <div className="flex items-center justify-between w-full pointer-events-none">
                    <span
                      className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-900/80 text-white/90 backdrop-blur-xs'
                      }`}
                    >
                      #{idx + 1} {resolved.photoName ? `• ${resolved.photoName.slice(0, 10)}` : ''}
                    </span>

                    {cell.physicalMm && (
                      <span className="bg-white/90 text-slate-800 font-mono text-[8px] px-1 py-0.5 rounded border border-slate-300 shadow-2xs hidden sm:inline">
                        {cell.physicalMm.width}×{cell.physicalMm.height}mm
                      </span>
                    )}
                  </div>

                  {/* Drag-over indicator overlay */}
                  {isDragOver && (
                    <div className="my-auto flex flex-col items-center justify-center bg-blue-600/90 text-white p-2 rounded-xl text-center shadow-lg pointer-events-none animate-pulse">
                      <ImageIcon className="w-5 h-5 mb-1 text-blue-200" />
                      <span className="font-bold text-[11px]">Drop Photo into Slot #{idx + 1}</span>
                    </div>
                  )}

                  {/* Slot Bottom Rotation Tag */}
                  {resolved.transform.rotation !== 0 && !isDragOver && (
                    <div className="self-end pointer-events-none">
                      <span className="bg-amber-600 text-white font-mono text-[8px] font-bold px-1 py-0.5 rounded shadow-xs">
                        {resolved.transform.rotation}°
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Canvas Quick Controls Bento Toolstrip */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1.5 rounded-2xl shadow-sm text-xs text-slate-700 z-10 max-w-full">
          {/* Active Slot Pill */}
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-800">
            <span className="text-slate-500 font-normal">Active:</span>
            <span className="text-blue-700 font-mono">Slot #{activeSlotIndex + 1}</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          {/* Zoom controls */}
          <button
            type="button"
            onClick={() =>
              onUpdateSlotTransform(activeSlotIndex, (prev) => ({
                ...prev,
                zoom: Math.max(0.5, prev.zoom - 0.1),
              }))
            }
            title="Zoom Out active slot"
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer active:scale-95 transition-all"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs w-11 text-center font-bold text-slate-800">
            {Math.round(activeTransform.zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() =>
              onUpdateSlotTransform(activeSlotIndex, (prev) => ({
                ...prev,
                zoom: Math.min(3.0, prev.zoom + 0.1),
              }))
            }
            title="Zoom In active slot"
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer active:scale-95 transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />

          {/* Rotate Slot button */}
          <button
            type="button"
            onClick={onRotateSelectedSlot}
            title="Rotate active slot photo 90°"
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg cursor-pointer font-medium active:scale-95 transition-all"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Rotate Slot ({activeTransform.rotation}°)</span>
          </button>

          {/* Rotate ALL button */}
          <button
            type="button"
            onClick={onRotateAllPhotos}
            title="Rotate ALL photos on sheet simultaneously 90°"
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60 rounded-lg cursor-pointer font-bold active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Rotate ALL</span>
          </button>

          {/* Reset position button */}
          <button
            type="button"
            onClick={() =>
              onUpdateSlotTransform(activeSlotIndex, (prev) => ({
                ...prev,
                panX: 0,
                panY: 0,
                zoom: 1.0,
              }))
            }
            title="Center active photo framing"
            className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer font-medium active:scale-95 transition-all"
          >
            <Move className="w-3.5 h-3.5 text-slate-600" />
            <span>Center</span>
          </button>

          {/* Quick Photo Switcher for Active Slot */}
          {loadedPhotos.length > 1 && (
            <>
              <div className="h-4 w-[1px] bg-slate-200 mx-0.5" />
              <div className="flex items-center gap-1.5 bg-blue-50/80 px-2 py-1 rounded-lg border border-blue-200/80">
                <span className="text-[10px] text-blue-950 font-bold">Slot Photo:</span>
                <select
                  value={cellSlots[activeSlotIndex]?.photoId || ''}
                  onChange={(e) => onAssignPhotoToSlot(activeSlotIndex, e.target.value)}
                  className="py-0.5 px-1 bg-white border border-blue-300 text-blue-900 font-bold rounded text-[11px] focus:outline-none cursor-pointer"
                >
                  {loadedPhotos.map((p, idx) => (
                    <option key={p.id} value={p.id}>
                      Photo #{idx + 1} ({p.name.slice(0, 12)})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


