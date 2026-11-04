import React from 'react';
import { X, Heart, ExternalLink, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { VLogo } from './VLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden text-xs text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        {/* Title Header */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 p-6 text-white text-center relative overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex justify-center mb-3">
            <VLogo size="xl" />
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">Photo 4×6 Print</h2>
          <p className="text-blue-200 text-xs mt-0.5">
            4×6" (10×15 cm) High-Definition Photo Layout & Print Utility
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-semibold text-white mt-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Version 2.4.0 • 300 DPI Studio Engine</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {/* Creator Attribution Bento Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
              Application Author & Developer
            </span>
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span className="text-sm font-bold text-slate-900">Created by</span>
              <a
                href="https://www.instagram.com/unfiltered.vijudo/"
                target="_blank"
                rel="noreferrer"
                title="Follow on Instagram"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-mono font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
              >
                <span>@unfiltered.vijudo</span>
                <ExternalLink className="w-3 h-3 text-white/90" />
              </a>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-blue-200/60 flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://www.instagram.com/unfiltered.vijudo/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-mono font-semibold text-[11px] rounded-lg transition-colors"
              >
                <span>📷 Instagram: @unfiltered.vijudo</span>
              </a>
              <a
                href="https://wa.me/916352475937"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs rounded-lg shadow-xs transition-colors"
              >
                <span>WhatsApp: +91 6352475937</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Crafted with precision for fast 4×6 photo printing, multi-photo layouts, and Windows standalone executables.
            </p>
          </div>

          {/* System Specs */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Resolution</span>
              <span className="font-mono font-semibold text-slate-800">1200 × 1800 px (300 DPI)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Standard Paper</span>
              <span className="font-semibold text-slate-800">4 × 6 Inch (10 × 15 cm)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Target Platforms</span>
              <span className="font-semibold text-slate-800">Windows 7 / 8 / 10 / 11 (.NET 4.8 / .NET 8)</span>
            </div>
            <div className="flex justify-between items-center text-[11px] py-0.5">
              <span className="text-slate-500 font-medium">Privacy</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline & Local Processing
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Created by{' '}
            <a
              href="https://www.instagram.com/unfiltered.vijudo/"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 hover:text-pink-700 font-bold hover:underline"
            >
              @unfiltered.vijudo
            </a>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer text-xs transition-colors shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
