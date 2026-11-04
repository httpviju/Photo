import React from 'react';
import { Code2, MonitorCheck, KeyRound, Sparkles } from 'lucide-react';
import { VLogo } from './VLogo';

interface WinTitleBarProps {
  onOpenCSharp: () => void;
  onOpenAbout?: () => void;
}

export const WinTitleBar: React.FC<WinTitleBarProps> = ({
  onOpenCSharp,
  onOpenAbout,
}) => {
  return (
    <div
      id="app-header-bento"
      className="bg-white border-b border-slate-200/80 px-4 py-2 flex items-center justify-between shadow-xs select-none z-30"
    >
      <div className="flex items-center gap-3">
        <VLogo size="md" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm tracking-tight text-slate-900 leading-none">
              Photo 4×6 Print
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 border border-blue-200/60 rounded-full text-[10px] font-semibold text-blue-700">
              Windows 7 / .NET 4.8
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-none">
            Epson-style 4×6" (10×15 cm) Studio Print Utility • 300 DPI
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://www.instagram.com/unfiltered.vijudo/"
          target="_blank"
          rel="noreferrer"
          title="Created by @unfiltered.vijudo — View Instagram Profile"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border border-pink-200/80 rounded-xl text-[11px] text-slate-800 font-medium transition-colors cursor-pointer shadow-2xs"
        >
          <span className="text-slate-400">by</span>
          <span className="font-mono font-bold text-pink-700">@unfiltered.vijudo</span>
        </a>

        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-600 font-mono">
          <MonitorCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Offline • x86 / x64</span>
        </div>

        <button
          type="button"
          onClick={onOpenCSharp}
          title="Download Standalone Windows 7 / 8 / 10 / 11 .EXE Package"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-amber-300" />
          <span>⚡ Get Windows .EXE Package</span>
        </button>
      </div>
    </div>
  );
};

