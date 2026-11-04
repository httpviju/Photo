import React, { useState, useEffect, useRef } from 'react';
import { LoadedPhoto, LayoutConfig, CellSlot } from '../types';
import {
  Sparkles,
  Check,
  LayoutGrid,
  Plus,
  Minus,
  ArrowRightLeft,
  Maximize2,
  Minimize2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  ZoomIn,
  Eye,
  X,
} from 'lucide-react';

interface MultiPhotoCopiesManagerProps {
  loadedPhotos: LoadedPhoto[];
  layout: LayoutConfig;
  cellSlots: CellSlot[];
  onApplyDistribution: (newSlots: CellSlot[]) => void;
  onSelectPhoto: (id: string) => void;
}

type ThumbnailSize = 'medium' | 'large' | 'xlarge';

export const MultiPhotoCopiesManager: React.FC<MultiPhotoCopiesManagerProps> = ({
  loadedPhotos,
  layout,
  cellSlots,
  onApplyDistribution,
  onSelectPhoto,
}) => {
  const totalSlots = layout.photoCount;

  // Track desired count of copies per loaded photo
  const [photoCounts, setPhotoCounts] = useState<{ [photoId: string]: number }>({});
  // Expand view so user can see all photos without scrolling
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // Image size in list: default to 'large' as user requested
  const [thumbnailSize, setThumbnailSize] = useState<ThumbnailSize>('large');
  // Visual apply confirmation status
  const [justAppliedMessage, setJustAppliedMessage] = useState<string | null>(null);
  // Full-size image modal inspection
  const [previewPhoto, setPreviewPhoto] = useState<LoadedPhoto | null>(null);

  const prevPhotosRef = useRef<string>('');
  const prevLayoutRef = useRef<string>('');

  // Synchronize initial counts only when loaded photos or layout actually changes
  useEffect(() => {
    const currentPhotosKey = loadedPhotos.map((p) => p.id).join(',');
    const currentLayoutKey = `${layout.id}-${totalSlots}`;

    if (
      currentPhotosKey !== prevPhotosRef.current ||
      currentLayoutKey !== prevLayoutRef.current
    ) {
      prevPhotosRef.current = currentPhotosKey;
      prevLayoutRef.current = currentLayoutKey;

      const counts: { [photoId: string]: number } = {};
      loadedPhotos.forEach((p) => {
        counts[p.id] = 0;
      });

      cellSlots.forEach((slot) => {
        if (slot.photoId && counts[slot.photoId] !== undefined) {
          counts[slot.photoId]++;
        }
      });

      // If all are 0 or empty, default auto-distribute
      const sum = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0);
      if (sum === 0 && loadedPhotos.length > 0) {
        if (loadedPhotos.length === 3 && totalSlots === 8) {
          counts[loadedPhotos[0].id] = 6;
          counts[loadedPhotos[1].id] = 1;
          counts[loadedPhotos[2].id] = 1;
        } else if (loadedPhotos.length === 4 && totalSlots === 8) {
          counts[loadedPhotos[0].id] = 5;
          counts[loadedPhotos[1].id] = 1;
          counts[loadedPhotos[2].id] = 1;
          counts[loadedPhotos[3].id] = 1;
        } else if (loadedPhotos.length >= 2) {
          const main = Math.max(1, totalSlots - (loadedPhotos.length - 1));
          counts[loadedPhotos[0].id] = main;
          for (let i = 1; i < loadedPhotos.length; i++) counts[loadedPhotos[i].id] = 1;
        } else if (loadedPhotos.length === 1) {
          counts[loadedPhotos[0].id] = totalSlots;
        }
      }

      setPhotoCounts(counts);
    }
  }, [loadedPhotos, layout, totalSlots, cellSlots]);

  const allocatedTotal = (Object.values(photoCounts) as number[]).reduce((a, b) => a + b, 0);
  const isExactFit = allocatedTotal === totalSlots;

  // Flash temporary success notification
  const triggerSuccessFeedback = (msg: string) => {
    setJustAppliedMessage(msg);
    setTimeout(() => {
      setJustAppliedMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  // Apply distribution sequence to the actual 4x6 paper slots
  const applyCountsToSlots = (
    counts: { [photoId: string]: number },
    successNote = 'Sheet Updated!'
  ) => {
    const newSlots: CellSlot[] = [];
    const sequence: string[] = [];

    // Build ordered sequence of photo IDs
    loadedPhotos.forEach((p) => {
      const count = counts[p.id] || 0;
      for (let i = 0; i < count; i++) {
        sequence.push(p.id);
      }
    });

    for (let i = 0; i < totalSlots; i++) {
      const existing = cellSlots[i] || {
        transform: { zoom: 1, panX: 0, panY: 0, rotation: 0 },
      };
      const assignedPhotoId = sequence[i] !== undefined ? sequence[i] : null;
      newSlots.push({
        ...existing,
        photoId: assignedPhotoId,
      });
    }

    onApplyDistribution(newSlots);
    triggerSuccessFeedback(successNote);
  };

  // Change count for a specific photo with instant live sync
  const handleUpdateCount = (photoId: string, delta: number) => {
    const current = photoCounts[photoId] || 0;
    const next = Math.max(0, Math.min(totalSlots, current + delta));
    const nextCounts = {
      ...photoCounts,
      [photoId]: next,
    };
    setPhotoCounts(nextCounts);
    applyCountsToSlots(nextCounts, `${next} copies set`);
  };

  // Directly set exact count from input field with instant live sync
  const handleSetExactCount = (photoId: string, rawVal: string | number) => {
    const num = typeof rawVal === 'string' ? parseInt(rawVal, 10) : rawVal;
    const validCount = Math.max(0, Math.min(totalSlots, isNaN(num) ? 0 : num));
    const nextCounts = {
      ...photoCounts,
      [photoId]: validCount,
    };
    setPhotoCounts(nextCounts);
    applyCountsToSlots(nextCounts, `${validCount} copies set`);
  };

  // Quick 1-click pill to set exact count for a photo
  const handleQuickSetPhotoCount = (photoId: string, targetCount: number) => {
    const nextCounts = {
      ...photoCounts,
      [photoId]: Math.max(0, Math.min(totalSlots, targetCount)),
    };
    setPhotoCounts(nextCounts);
    applyCountsToSlots(nextCounts, `${targetCount} copies set`);
  };

  // PRESET: 6 + 1 + 1 (Photo 1 = 6 copies, Photo 2 = 1, Photo 3 = 1)
  const handlePreset611 = () => {
    if (loadedPhotos.length === 0) return;
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p) => {
      newCounts[p.id] = 0;
    });

    if (totalSlots === 8) {
      if (loadedPhotos.length >= 3) {
        newCounts[loadedPhotos[0].id] = 6;
        newCounts[loadedPhotos[1].id] = 1;
        newCounts[loadedPhotos[2].id] = 1;
      } else if (loadedPhotos.length === 2) {
        newCounts[loadedPhotos[0].id] = 6;
        newCounts[loadedPhotos[1].id] = 2;
      } else if (loadedPhotos.length === 1) {
        newCounts[loadedPhotos[0].id] = 8;
      }
    } else {
      const mainCopies = Math.max(1, totalSlots - (Math.min(loadedPhotos.length, 3) - 1));
      newCounts[loadedPhotos[0].id] = mainCopies;
      if (loadedPhotos[1]) newCounts[loadedPhotos[1].id] = 1;
      if (loadedPhotos[2]) newCounts[loadedPhotos[2].id] = 1;
    }

    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, 'Applied: 6 + 1 + 1 (8 Slots)');
  };

  // PRESET: 5 + 1 + 1 + 1 (For 4 photos on 8 slots)
  const handlePreset5111 = () => {
    if (loadedPhotos.length < 4 || totalSlots < 8) return;
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p) => {
      newCounts[p.id] = 0;
    });

    newCounts[loadedPhotos[0].id] = 5;
    newCounts[loadedPhotos[1].id] = 1;
    newCounts[loadedPhotos[2].id] = 1;
    newCounts[loadedPhotos[3].id] = 1;

    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, 'Applied: 5 + 1 + 1 + 1 (8 Slots)');
  };

  // PRESET: 50% / 50% (e.g. 4 copies Photo 1 + 4 copies Photo 2)
  const handlePreset5050 = () => {
    if (loadedPhotos.length < 2) return;
    const half = Math.floor(totalSlots / 2);
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p, idx) => {
      if (idx === 0) newCounts[p.id] = half;
      else if (idx === 1) newCounts[p.id] = totalSlots - half;
      else newCounts[p.id] = 0;
    });
    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, `Applied: 50/50 (${half} + ${totalSlots - half})`);
  };

  // PRESET: Equal Split across all loaded photos
  const handlePresetEqualAll = () => {
    if (loadedPhotos.length === 0) return;
    const countPerPhoto = Math.floor(totalSlots / loadedPhotos.length);
    const remainder = totalSlots % loadedPhotos.length;
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p, idx) => {
      newCounts[p.id] = countPerPhoto + (idx < remainder ? 1 : 0);
    });
    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, 'Applied: Equal distribution');
  };

  // PRESET: All slots with Photo 1
  const handlePresetAllPhoto1 = () => {
    if (loadedPhotos.length === 0) return;
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p, idx) => {
      newCounts[p.id] = idx === 0 ? totalSlots : 0;
    });
    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, `All ${totalSlots} with Photo 1`);
  };

  // Fill remaining unallocated slots to a photo
  const handleFillRemainderToPhoto = (photoId: string) => {
    const currentSum = (Object.values(photoCounts) as number[]).reduce((a, b) => a + b, 0);
    const remainder = totalSlots - currentSum;
    if (remainder <= 0) return;

    const nextCounts = {
      ...photoCounts,
      [photoId]: (photoCounts[photoId] || 0) + remainder,
    };
    setPhotoCounts(nextCounts);
    applyCountsToSlots(nextCounts, `+${remainder} assigned`);
  };

  // Reset all to 0
  const handleResetCounts = () => {
    const newCounts: { [photoId: string]: number } = {};
    loadedPhotos.forEach((p) => {
      newCounts[p.id] = 0;
    });
    setPhotoCounts(newCounts);
    applyCountsToSlots(newCounts, 'Reset to 0');
  };

  if (loadedPhotos.length === 0) return null;

  // Dimensions classes for thumbnails
  const thumbClass =
    thumbnailSize === 'xlarge'
      ? 'w-28 h-28 sm:w-32 sm:h-32'
      : thumbnailSize === 'large'
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : 'w-14 h-14';

  return (
    <div className="bg-gradient-to-b from-blue-50/90 via-indigo-50/70 to-slate-50/90 border-2 border-blue-300 rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-tight">
          <div className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-[10px] shadow-2xs">
            <LayoutGrid className="w-3 h-3" />
          </div>
          <span className="font-extrabold text-blue-950">Manual Copies Manager</span>
          <span className="text-[10px] font-mono text-blue-800 bg-blue-200/80 px-1.5 py-0.5 rounded font-bold">
            {totalSlots} slots
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
              isExactFit
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
            }`}
          >
            {isExactFit ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-amber-600" />
            )}
            {allocatedTotal} / {totalSlots}
          </span>

          {loadedPhotos.length > 2 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse list' : 'Expand list to show all photos'}
              className="p-1 text-slate-500 hover:text-blue-700 hover:bg-white rounded-md transition-colors cursor-pointer"
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Image Size Selector (User requested: isme img ki size badi kar large me) */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
          <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
          <span>Photo Image Size:</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setThumbnailSize('medium')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              thumbnailSize === 'medium'
                ? 'bg-white text-blue-900 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setThumbnailSize('large')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              thumbnailSize === 'large'
                ? 'bg-blue-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Large (बड़ा)</span>
          </button>
          <button
            type="button"
            onClick={() => setThumbnailSize('xlarge')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              thumbnailSize === 'xlarge'
                ? 'bg-indigo-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Extra Large
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-blue-100/70 border border-blue-200/90 rounded-xl p-2 text-[11px] text-blue-950 leading-snug">
        <strong>Manual Quantity:</strong> Photo 1 ki 6 copy + baaki photo ki 1-1 copy set karein.
        Sheet me turant live change ho jayega!
      </div>

      {/* Instant Success Alert */}
      {justAppliedMessage && (
        <div className="bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            <span>{justAppliedMessage}</span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-700/60 px-1.5 py-0.5 rounded">
            {allocatedTotal}/{totalSlots} Slots
          </span>
        </div>
      )}

      {/* 1-Click Presets specially for 8 slots */}
      <div className="space-y-1.5">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Quick 1-Click Presets:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {/* Highlighted 6 + 1 + 1 Button */}
          {loadedPhotos.length >= 2 && totalSlots >= 3 && (
            <button
              type="button"
              onClick={handlePreset611}
              title="Set Photo 1 = 6 copies, Photo 2 = 1 copy, Photo 3 = 1 copy (Total = 8)"
              className="flex-1 min-w-[130px] py-2 px-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {totalSlots === 8 && loadedPhotos.length >= 3
                  ? '6 + 1 + 1 (8 Slots)'
                  : `${Math.max(1, totalSlots - (Math.min(loadedPhotos.length, 3) - 1))} + 1 + 1`}
              </span>
            </button>
          )}

          {/* 5 + 1 + 1 + 1 for 4 photos */}
          {loadedPhotos.length >= 4 && totalSlots === 8 && (
            <button
              type="button"
              onClick={handlePreset5111}
              title="Set Photo 1 = 5 copies, Photo 2 = 1, Photo 3 = 1, Photo 4 = 1 (Total = 8)"
              className="py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-[11px] rounded-xl border border-indigo-200 cursor-pointer transition-all"
            >
              <span>5 + 1 + 1 + 1</span>
            </button>
          )}

          {/* 50/50 Split */}
          {loadedPhotos.length >= 2 && (
            <button
              type="button"
              onClick={handlePreset5050}
              className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-[11px] rounded-xl border border-slate-300 shadow-2xs cursor-pointer transition-all"
            >
              <span>
                50/50 ({Math.floor(totalSlots / 2)}+{totalSlots - Math.floor(totalSlots / 2)})
              </span>
            </button>
          )}

          {/* Equal Split */}
          {loadedPhotos.length > 2 && (
            <button
              type="button"
              onClick={handlePresetEqualAll}
              className="py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-[11px] rounded-xl border border-slate-300 shadow-2xs cursor-pointer flex items-center gap-1 transition-all"
            >
              <ArrowRightLeft className="w-3 h-3 text-blue-600" />
              <span>Equal ({Math.floor(totalSlots / loadedPhotos.length)} ea)</span>
            </button>
          )}

          {/* All Photo 1 */}
          <button
            type="button"
            onClick={handlePresetAllPhoto1}
            title={`Fill all ${totalSlots} slots with Photo 1`}
            className="py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 font-medium text-[11px] rounded-xl border border-slate-300 cursor-pointer transition-all"
          >
            <span>All Photo 1</span>
          </button>

          <button
            type="button"
            onClick={handleResetCounts}
            title="Reset all copies to 0"
            className="p-1.5 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Per-Photo Copy Allocator Rows with LARGE Image Previews */}
      <div
        className={`space-y-3 pr-1 custom-scrollbar overscroll-contain touch-pan-y ${
          isExpanded ? 'max-h-none' : 'max-h-96 overflow-y-auto'
        }`}
      >
        {loadedPhotos.map((photo, idx) => {
          const currentCount = photoCounts[photo.id] || 0;
          const remainingSlots = Math.max(0, totalSlots - allocatedTotal);
          return (
            <div
              key={photo.id}
              className="bg-white border-2 border-slate-200/90 rounded-2xl p-3 shadow-xs hover:border-blue-400 transition-all space-y-2.5"
            >
              {/* Photo Header Row: Large Thumbnail + Details + Stepper */}
              <div className="flex items-start justify-between gap-3">
                {/* Large Photo Preview Card */}
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={() => {
                    onSelectPhoto(photo.id);
                    setPreviewPhoto(photo);
                  }}
                  title="Click to view full photo zoom"
                >
                  <div
                    className={`${thumbClass} rounded-xl overflow-hidden border-2 border-slate-300 group-hover:border-blue-500 bg-slate-100 shadow-sm relative transition-all group-hover:shadow-md`}
                  >
                    <img
                      src={photo.dataUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Tag: Photo Number */}
                    <span className="absolute top-1 left-1 bg-blue-700/95 text-white font-mono text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      #{idx + 1}
                    </span>

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <ZoomIn className="w-5 h-5 drop-shadow" />
                    </div>
                  </div>
                </div>

                {/* Photo Details & Info */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => onSelectPhoto(photo.id)}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black text-slate-900">Photo {idx + 1}</span>
                    <span className="font-mono text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {photo.width}×{photo.height}px
                    </span>
                  </div>
                  <p
                    className="text-[10px] text-slate-600 truncate mt-0.5 max-w-[140px] sm:max-w-[180px]"
                    title={photo.name}
                  >
                    {photo.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                    <span className="text-slate-500 font-medium">Selected:</span>
                    <span
                      className={`font-mono font-black px-2 py-0.5 rounded-lg border text-xs ${
                        currentCount > 0
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {currentCount} {currentCount === 1 ? 'copy' : 'copies'}
                    </span>
                  </div>
                </div>

                {/* Stepper with Large + / - and Direct Numeric Input */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-300 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleUpdateCount(photo.id, -1)}
                      disabled={currentCount <= 0}
                      title="Decrease 1 copy"
                      className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-800 font-black text-sm flex items-center justify-center cursor-pointer border border-slate-200 shadow-2xs transition-all active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    {/* Numeric Input */}
                    <input
                      type="number"
                      min={0}
                      max={totalSlots}
                      value={currentCount}
                      onChange={(e) => handleSetExactCount(photo.id, e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      aria-label={`Copies for Photo ${idx + 1}`}
                      className="w-12 h-8 text-center font-mono font-black text-sm text-blue-900 bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      type="button"
                      onClick={() => handleUpdateCount(photo.id, 1)}
                      disabled={currentCount >= totalSlots}
                      title="Increase 1 copy"
                      className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:pointer-events-none text-white font-black text-sm flex items-center justify-center cursor-pointer shadow-2xs transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fast 1-Click Copy Number Pills */}
              <div className="flex items-center gap-1 text-[11px] pt-1.5 border-t border-slate-100 flex-wrap">
                <span className="text-slate-500 font-bold mr-0.5 text-[10px]">Quick Set:</span>
                {[6, 5, 4, 2, 1, 0].map((num) => {
                  if (num > totalSlots) return null;
                  const isCurrent = currentCount === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleQuickSetPhotoCount(photo.id, num)}
                      className={`px-2 py-0.5 rounded-lg font-mono font-black transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-700 text-white shadow-xs scale-105'
                          : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-200/80'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}

                {/* Fill Remainder Button if slots remain */}
                {remainingSlots > 0 && (
                  <button
                    type="button"
                    onClick={() => handleFillRemainderToPhoto(photo.id)}
                    title={`Assign remaining ${remainingSlots} slots to Photo ${idx + 1}`}
                    className="ml-auto text-[10px] font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2 py-0.5 rounded-lg cursor-pointer transition-colors shadow-2xs"
                  >
                    +{remainingSlots} Rest
                  </button>
                )}

                {/* All Button */}
                <button
                  type="button"
                  onClick={() => handleQuickSetPhotoCount(photo.id, totalSlots)}
                  title={`Set all ${totalSlots} copies to this photo`}
                  className="ml-auto text-[10px] font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 px-2 py-0.5 rounded-lg cursor-pointer transition-colors"
                >
                  All {totalSlots}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Slot Distribution Bar */}
      <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex justify-between text-[10px] text-slate-600 font-bold">
          <span>Sheet Slot Preview ({totalSlots} Slots):</span>
          <span>{layout.name}</span>
        </div>
        <div className="flex items-center gap-1 w-full bg-slate-100 p-1 rounded-lg border border-slate-200">
          {Array.from({ length: totalSlots }).map((_, slotIdx) => {
            const slotPhotoId = cellSlots[slotIdx]?.photoId;
            const photoIndex = loadedPhotos.findIndex((p) => p.id === slotPhotoId);
            const colors = [
              'bg-blue-600 text-white',
              'bg-emerald-600 text-white',
              'bg-purple-600 text-white',
              'bg-amber-600 text-white',
              'bg-rose-600 text-white',
            ];
            const colorClass =
              photoIndex >= 0
                ? colors[photoIndex % colors.length]
                : 'bg-slate-200 text-slate-500 border border-dashed border-slate-300';

            return (
              <div
                key={slotIdx}
                title={`Slot #${slotIdx + 1}: ${
                  photoIndex >= 0 ? `Photo ${photoIndex + 1}` : 'Empty Slot'
                }`}
                className={`flex-1 h-6 rounded flex items-center justify-center font-mono text-[9px] font-black shadow-2xs transition-all ${colorClass}`}
              >
                #{slotIdx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Big Prominent Apply Button (Always ready and gives feedback) */}
      <button
        type="button"
        onClick={() => applyCountsToSlots(photoCounts, '✓ Applied to 4x6 Sheet Successfully!')}
        className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-800 active:scale-[0.99] text-white rounded-xl font-black text-xs shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4 text-emerald-300" />
        <span>Apply Photo Distribution to Sheet (लागू करें)</span>
      </button>

      {/* Full Size Photo Inspection Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-4 shadow-2xl space-y-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{previewPhoto.name}</span>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {previewPhoto.width}×{previewPhoto.height} px
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-slate-950">
              <img
                src={previewPhoto.dataUrl}
                alt={previewPhoto.name}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
