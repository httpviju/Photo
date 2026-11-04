import React, { useState, useRef, useEffect } from 'react';
import { LAYOUTS } from '../utils/layoutEngine';
import { LayoutId } from '../types';
import {
  ChevronDown,
  FolderOpen,
  Printer,
  Save,
  Code2,
  HelpCircle,
  Scissors,
  Square,
  RotateCcw,
  RotateCw,
  RefreshCw,
  Sparkles,
  ArrowRightLeft,
  Plus,
} from 'lucide-react';

interface WinMenuBarProps {
  onSelectPhotoClick: () => void;
  onPrintClick: () => void;
  onSaveClick: () => void;
  selectedLayout: LayoutId;
  onSelectLayout: (id: LayoutId) => void;
  showCutLines: boolean;
  onToggleCutLines: () => void;
  showBorder: boolean;
  onToggleBorder: () => void;
  onResetTransform: () => void;
  onRotateSelectedSlot: () => void;
  onRotateAllPhotos: () => void;
  onAutoDistribute: () => void;
  onLoadSamplePack: () => void;
  onOpenCSharp: () => void;
  onOpenHelp: () => void;
  onOpenAbout: () => void;
}

export const WinMenuBar: React.FC<WinMenuBarProps> = ({
  onSelectPhotoClick,
  onPrintClick,
  onSaveClick,
  selectedLayout,
  onSelectLayout,
  showCutLines,
  onToggleCutLines,
  showBorder,
  onToggleBorder,
  onResetTransform,
  onRotateSelectedSlot,
  onRotateAllPhotos,
  onAutoDistribute,
  onLoadSamplePack,
  onOpenCSharp,
  onOpenHelp,
  onOpenAbout,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div
      ref={menuRef}
      className="bg-slate-50/80 backdrop-blur-xs border-b border-slate-200/70 px-4 py-1 flex items-center justify-between text-xs text-slate-700 select-none relative z-40"
    >
      <div className="flex items-center gap-1">
        {/* FILE MENU */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('file')}
            onMouseEnter={() => openMenu && setOpenMenu('file')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              openMenu === 'file'
                ? 'bg-slate-200 text-slate-900'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <span>File</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {openMenu === 'file' && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  onSelectPhotoClick();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                  Select Photos (1, 2, 3...)...
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Ctrl+O</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onLoadSamplePack();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Load Sample Pack (3 Portraits)</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                type="button"
                onClick={() => {
                  onPrintClick();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-900 hover:text-blue-700 font-semibold flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  Print (4×6)...
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Ctrl+P</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSaveClick();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Save className="w-3.5 h-3.5 text-emerald-600" />
                  Save 4×6 (JPG 300 DPI)...
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Ctrl+S</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                type="button"
                onClick={() => {
                  onOpenCSharp();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-amber-50 text-amber-900 font-medium flex items-center gap-2 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Export C# .NET 4.8 Project (.ZIP)...</span>
              </button>
            </div>
          )}
        </div>

        {/* EDIT / ARRANGE MENU */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('edit')}
            onMouseEnter={() => openMenu && setOpenMenu('edit')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              openMenu === 'edit'
                ? 'bg-slate-200 text-slate-900'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <span>Photo / Edit</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {openMenu === 'edit' && (
            <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  onRotateAllPhotos();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-900 font-bold hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Rotate ALL Photos (90°)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onRotateSelectedSlot();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Rotate Active Slot (90°)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onAutoDistribute();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-slate-600" />
                <span>Auto-Distribute (1, 2, 3...)</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                type="button"
                onClick={() => {
                  onResetTransform();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Zoom & Position</span>
              </button>
            </div>
          )}
        </div>

        {/* LAYOUT MENU */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('layout')}
            onMouseEnter={() => openMenu && setOpenMenu('layout')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              openMenu === 'layout'
                ? 'bg-slate-200 text-slate-900'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <span>Layout</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {openMenu === 'layout' && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                4×6 Sheet Presets
              </div>
              {LAYOUTS.map((lay) => (
                <button
                  key={lay.id}
                  type="button"
                  onClick={() => {
                    onSelectLayout(lay.id);
                    setOpenMenu(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center justify-between cursor-pointer ${
                    selectedLayout === lay.id
                      ? 'bg-blue-50/80 font-bold text-blue-700'
                      : 'text-slate-700 hover:text-blue-700'
                  }`}
                >
                  <span>{lay.name}</span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                    {lay.photoCount} slots
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* OPTIONS MENU */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('options')}
            onMouseEnter={() => openMenu && setOpenMenu('options')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              openMenu === 'options'
                ? 'bg-slate-200 text-slate-900'
                : 'hover:bg-slate-200/70 text-slate-700'
            }`}
          >
            <span>Options</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {openMenu === 'options' && (
            <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  onToggleCutLines();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <span className={`w-4 text-center font-bold ${showCutLines ? 'text-blue-600' : 'text-transparent'}`}>
                  ✓
                </span>
                <Scissors className="w-3.5 h-3.5 text-slate-500" />
                <span>Show Cutting Guides</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleBorder();
                  setOpenMenu(null);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-slate-800 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <span className={`w-4 text-center font-bold ${showBorder ? 'text-blue-600' : 'text-transparent'}`}>
                  ✓
                </span>
                <Square className="w-3.5 h-3.5 text-slate-500" />
                <span>Draw Photo Border</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onOpenHelp}
          className="px-2.5 py-1 rounded-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>User Guide</span>
        </button>

        <button
          type="button"
          onClick={onOpenAbout}
          title="About Photo 4x6 Print — Created by @unfiltered.vijudo"
          className="px-2.5 py-1 rounded-lg font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200/60 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>About (@unfiltered.vijudo)</span>
        </button>
      </div>
    </div>
  );
};


