import React, { useRef } from 'react';
import { LayoutConfig, LayoutId, PrintSettings, LoadedPhoto, CellSlot } from '../types';
import { LAYOUTS } from '../utils/layoutEngine';
import { MultiPhotoCopiesManager } from './MultiPhotoCopiesManager';
import {
  Upload,
  Printer,
  Save,
  RotateCw,
  Scissors,
  Square,
  Sparkles,
  Info,
  CheckCircle2,
  FileImage,
  Layers,
  Plus,
  Trash2,
  GripVertical,
  RefreshCw,
  ArrowRightLeft,
  Check,
  User,
} from 'lucide-react';
import { VLogo } from './VLogo';

interface ControlsPanelProps {
  loadedPhotos: LoadedPhoto[];
  selectedPhotoId: string | null;
  onSelectPhoto: (id: string) => void;
  onFilesSelected: (files: FileList | File[]) => void;
  onLoadSamplePack: () => void;
  onRemovePhoto: (id: string) => void;
  onRotatePhotoInLibrary: (id: string) => void;
  selectedLayoutId: LayoutId;
  onSelectLayout: (id: LayoutId) => void;
  settings: PrintSettings;
  onUpdateSettings: (updater: (prev: PrintSettings) => PrintSettings) => void;
  onRotateSelectedSlot: () => void;
  onRotateAllPhotos: () => void;
  onAutoDistributeSlots: () => void;
  onFillAllWithSelected: () => void;
  onPrint: () => void;
  onSave: () => void;
  onOpenCSharp: () => void;
  activeSlotIndex: number;
  cellSlots: CellSlot[];
  onApplyDistribution: (newSlots: CellSlot[]) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  loadedPhotos,
  selectedPhotoId,
  onSelectPhoto,
  onFilesSelected,
  onLoadSamplePack,
  onRemovePhoto,
  onRotatePhotoInLibrary,
  selectedLayoutId,
  onSelectLayout,
  settings,
  onUpdateSettings,
  onRotateSelectedSlot,
  onRotateAllPhotos,
  onAutoDistributeSlots,
  onFillAllWithSelected,
  onPrint,
  onSave,
  onOpenCSharp,
  activeSlotIndex,
  cellSlots,
  onApplyDistribution,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentLayout = LAYOUTS.find((l) => l.id === selectedLayoutId) || LAYOUTS[1];

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTrayDragStart = (e: React.DragEvent, photoId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'photo-tray-item', photoId }));
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  return (
    <div
      id="bento-controls-sidebar"
      className="w-full md:w-88 lg:w-96 p-3 lg:p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar overscroll-contain text-xs text-slate-800 shrink-0"
    >
      {/* Hidden File Input supporting multiple photo selection (1, 2, 3...) */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* AUTHOR BANNER: Created by @unfiltered.vijudo with V Logo */}
      <a
        href="https://www.instagram.com/unfiltered.vijudo/"
        target="_blank"
        rel="noreferrer"
        title="Created by @unfiltered.vijudo — Follow on Instagram"
        className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 hover:from-slate-950 hover:to-indigo-950 text-white rounded-2xl p-3 shadow-md border border-blue-600/50 flex items-center justify-between transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <VLogo size="md" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold leading-tight">
              Software Created by
            </div>
            <div className="text-sm font-black font-mono tracking-wide text-amber-300 group-hover:text-amber-200">
              @unfiltered.vijudo
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/40 rounded-full text-[10px] font-mono font-semibold text-blue-200 shadow-2xs group-hover:border-blue-300">
            Photo4x6.exe
          </span>
        </div>
      </a>

      {/* BENTO CARD 1: MULTI-PHOTO SELECTION & TRAY */}
      <div
        className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
            <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">
              1
            </div>
            <span>Photo Tray (1, 2, 3...)</span>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold">
              {loadedPhotos.length} loaded
            </span>
          </div>
          <button
            type="button"
            onClick={onLoadSamplePack}
            title="Load sample photos (Photo 1, Photo 2, Photo 3)"
            className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium hover:underline"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            Sample Pack
          </button>
        </div>

        {/* Big Add / Select Photos Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          id="btn-select-photo"
          className="w-full py-2.5 px-3 bg-gradient-to-b from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 active:scale-[0.99] text-white rounded-xl font-bold text-xs shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-blue-300" />
          <span>Select Photos (1, 2, 3 or multiple)</span>
        </button>

        {/* Draggable Photos Tray with Large Photo Images */}
        <div className="mt-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar overscroll-contain touch-pan-y pr-1">
          {loadedPhotos.length === 0 ? (
            <div className="text-center py-4 px-2 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-[11px]">
              <p className="font-medium">No photos selected</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Click above or drag image files here
              </p>
            </div>
          ) : (
            loadedPhotos.map((p, idx) => {
              const isSelected = p.id === selectedPhotoId;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPhoto(p.id)}
                  title={`Click to select or drag grip icon to place on 4x6 paper (${p.name})`}
                  className={`group flex items-center justify-between p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div
                      draggable
                      onDragStart={(e) => handleTrayDragStart(e, p.id)}
                      title="Drag to drop into any slot on the sheet"
                      className="p-1 hover:bg-slate-200/80 rounded-lg cursor-grab active:cursor-grabbing text-slate-400 group-hover:text-slate-700 transition-colors shrink-0"
                    >
                      <GripVertical className="w-4 h-4 shrink-0" />
                    </div>

                    {/* Large Photo Preview Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-100 shrink-0 shadow-xs">
                      <img
                        src={p.dataUrl}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1 left-1 bg-blue-700/95 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-900 truncate">
                        Photo {idx + 1}
                      </p>
                      <p className="text-[10px] text-slate-600 truncate mt-0.5" title={p.name}>
                        {p.name}
                      </p>
                      <p className="text-[9px] font-mono text-slate-500 mt-1">
                        {p.width}×{p.height}px
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-1 shrink-0 ml-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRotatePhotoInLibrary(p.id);
                      }}
                      title="Rotate this photo 90°"
                      className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                    {loadedPhotos.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePhoto(p.id);
                        }}
                        title="Remove photo"
                        className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Slot Placement Actions */}
        {loadedPhotos.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={onAutoDistributeSlots}
              title="Place Photo 1 in Slot 1, Photo 2 in Slot 2, Photo 3 in Slot 3..."
              className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold rounded-lg border border-blue-200/60 cursor-pointer flex items-center justify-center gap-1 transition-all"
            >
              <ArrowRightLeft className="w-3 h-3 text-blue-600" />
              <span>Auto 1, 2, 3...</span>
            </button>
            <button
              type="button"
              onClick={onFillAllWithSelected}
              title="Repeat currently selected photo across all slots on 4x6 sheet"
              className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-200 cursor-pointer flex items-center justify-center gap-1 transition-all"
            >
              <Check className="w-3 h-3 text-slate-600" />
              <span>Fill All Same</span>
            </button>
          </div>
        )}
      </div>

      {/* BENTO CARD: MULTI-PHOTO COPIES MANAGER (e.g. 4 copies Photo 1 + 4 copies Photo 2) */}
      <MultiPhotoCopiesManager
        loadedPhotos={loadedPhotos}
        layout={currentLayout}
        cellSlots={cellSlots}
        onApplyDistribution={onApplyDistribution}
        onSelectPhoto={onSelectPhoto}
      />

      {/* BENTO CARD 2: ROTATE CONTROLS (ROTATE ALL + ROTATE ACTIVE) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
            <RotateCw className="w-4 h-4 text-blue-600" />
            <span>Photo Rotation</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium font-mono">90° Step</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onRotateAllPhotos}
            title="Rotate all photos on the 4x6 paper sheet simultaneously by 90 degrees"
            className="py-2 px-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-[11px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white" />
            <span>Rotate ALL (90°)</span>
          </button>

          <button
            type="button"
            onClick={onRotateSelectedSlot}
            title="Rotate only the currently selected slot photo by 90 degrees"
            className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-[11px] border border-slate-300/80 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Slot #{activeSlotIndex + 1} (90°)</span>
          </button>
        </div>
      </div>

      {/* BENTO CARD 3: LAYOUT SELECTION */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
            <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">
              2
            </div>
            <span>Layout (4×6 Sheet)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-medium">
            {currentLayout.photoCount} on 1 Paper
          </span>
        </div>

        <select
          id="select-layout-dropdown"
          value={selectedLayoutId}
          onChange={(e) => onSelectLayout(e.target.value as LayoutId)}
          className="w-full py-2 px-3 bg-white border-2 border-blue-600 rounded-xl text-slate-900 font-bold text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {LAYOUTS.map((layout) => (
            <option key={layout.id} value={layout.id}>
              {layout.name} — {layout.hindiLabel} ({layout.photoCount} photos)
            </option>
          ))}
        </select>

        <div className="mt-2.5 text-[11px] text-slate-600 bg-blue-50/60 border border-blue-200/60 rounded-xl p-2.5">
          <p className="font-semibold text-blue-950 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{currentLayout.description}</span>
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-blue-900/80 font-mono">
            <span>Fixed 4×6" (10×15 cm)</span>
            <span className="font-semibold">{currentLayout.photoCount} slots on paper</span>
          </div>
        </div>
      </div>

      {/* BENTO CARD 4: QUANTITY (SHEETS) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
            <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">
              3
            </div>
            <span>Quantity (4×6 Sheets)</span>
          </div>
          <span className="text-[11px] text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
            Total {settings.quantity * currentLayout.photoCount} Photos
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({
                ...prev,
                quantity: Math.max(1, prev.quantity - 1),
              }))
            }
            className="w-10 h-9 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-base text-slate-800 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          >
            -
          </button>

          <input
            id="input-quantity"
            type="number"
            min="1"
            max="999"
            value={settings.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              onUpdateSettings((prev) => ({
                ...prev,
                quantity: isNaN(val) || val < 1 ? 1 : Math.min(999, val),
              }));
            }}
            className="flex-1 py-1.5 px-3 text-center border border-slate-300 rounded-xl font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
          />

          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({
                ...prev,
                quantity: Math.min(999, prev.quantity + 1),
              }))
            }
            className="w-10 h-9 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl font-bold text-base text-slate-800 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        <p className="text-[10px] text-slate-500 mt-1.5">
          Kitni 4×6 photo sheets print karni hain (e.g. 1 = 1 paper sheet).
        </p>
      </div>

      {/* BENTO CARD 5: PHOTO FITTING & CUTTING GUIDES */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs space-y-2.5 hover:border-slate-300 transition-colors">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
          <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px]">
            4
          </div>
          <span>Fitting & Cutting Options</span>
        </div>

        {/* Fit Mode Toggle */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/70">
          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({ ...prev, fitMode: 'center-crop' }))
            }
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer ${
              settings.fitMode === 'center-crop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Center Crop (Fill)
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({ ...prev, fitMode: 'fit-entire' }))
            }
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer ${
              settings.fitMode === 'fit-entire'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fit Entire Photo
          </button>
        </div>

        {/* Cut lines & Border check options */}
        <div className="space-y-2 pt-0.5">
          <label className="flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-black">
            <input
              type="checkbox"
              checked={settings.showCutLines}
              onChange={(e) =>
                onUpdateSettings((prev) => ({ ...prev, showCutLines: e.target.checked }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
            />
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Scissors className="w-3.5 h-3.5 text-slate-500" />
              Show Cutting Guides (Corner Marks)
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-black">
            <input
              type="checkbox"
              checked={settings.showBorder}
              onChange={(e) =>
                onUpdateSettings((prev) => ({ ...prev, showBorder: e.target.checked }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
            />
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Square className="w-3.5 h-3.5 text-slate-500" />
              Draw Thin Photo Border
            </span>
          </label>
        </div>
      </div>

      {/* BENTO CARD 6: SPECIFICATION INFO BOX */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-[11px] text-slate-600 space-y-1">
        <div className="flex items-center justify-between font-mono">
          <span>Paper Size:</span>
          <span className="font-bold text-slate-900">4 × 6 in (10 × 15 cm)</span>
        </div>
        <div className="flex items-center justify-between font-mono">
          <span>Resolution:</span>
          <span className="text-slate-800">1200 × 1800 px (300 DPI)</span>
        </div>
        <div className="flex items-center justify-between font-mono">
          <span>Drag & Drop:</span>
          <span className="text-blue-700 font-semibold">1-by-1 per slot enabled</span>
        </div>
        <div className="flex items-center justify-between font-mono">
          <span>Compatibility:</span>
          <span className="text-emerald-700 font-semibold">Windows 7 (32/64-bit)</span>
        </div>
      </div>

      {/* BENTO CARD 7: PRIMARY ACTION BUTTONS */}
      <div className="space-y-2 pt-0.5">
        <button
          type="button"
          onClick={onPrint}
          id="btn-print-main"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all tracking-tight"
        >
          <Printer className="w-5 h-5 text-white" />
          <span>PRINT 4×6</span>
          <span className="text-xs font-normal text-blue-200">
            ({settings.quantity} {settings.quantity === 1 ? 'Sheet' : 'Sheets'})
          </span>
        </button>

        <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl p-2 text-center text-[10px] text-emerald-900 font-medium">
          ✓ <strong>Auto 4×6 Paper Locked:</strong> Browser dialog me automatically <strong>4×6 in (10×15 cm)</strong> paper size & Zero Margins select hoga.
        </div>

        <button
          type="button"
          onClick={onSave}
          id="btn-save-main"
          className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Save className="w-4 h-4 text-emerald-600" />
          <span>SAVE 4×6 (JPG 300 DPI)</span>
        </button>

        <button
          type="button"
          onClick={onOpenCSharp}
          className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-900 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>Download C# .NET 4.8 Windows 7 Project (.ZIP)</span>
        </button>
      </div>
    </div>
  );
};


