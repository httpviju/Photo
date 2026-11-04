import React from 'react';
import { X, Printer, CheckCircle, Info, FileText } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-xs text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        {/* Title Bar */}
        <div className="bg-white px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-sm text-slate-900">
            <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Info className="w-4 h-4" />
            </div>
            <span>Photo 4×6 Print — Guide & Instructions</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Bento Grid */}
        <div className="p-5 overflow-y-auto space-y-3.5 leading-relaxed text-slate-700">
          <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 text-blue-950">
            <h4 className="font-bold text-sm mb-1 text-blue-900 flex items-center gap-2">
              <Printer className="w-4 h-4 text-blue-700" />
              <span>1. Epson Easy Photo Print Alternative (4×6 Fixed)</span>
            </h4>
            <p className="text-xs text-blue-900/90 leading-normal">
              This utility is dedicated specifically for standard <strong>4 × 6 inch (10 × 15 cm)</strong> photo
              paper. Internal resolution is locked at <strong>1200 × 1800 pixels at 300 DPI</strong> for maximum studio
              print sharpness.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              2. Multi-Photo Selection & Drag-and-Drop (1, 2, 3...)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>
                <strong>Select Multiple Photos:</strong> Click "Add Photos (1, 2, 3...)" or drop multiple image files simultaneously.
              </li>
              <li>
                <strong>Drag & Drop to Slot:</strong> Drag any photo from the tray and drop it directly onto any slot on the 4×6 paper canvas.
              </li>
              <li>
                <strong>Individual vs. ALL Rotation:</strong> Use <strong>Rotate Slot</strong> to rotate just the selected photo by 90°, or click <strong>Rotate ALL</strong> to rotate every slot on the sheet simultaneously.
              </li>
              <li>
                <strong>Auto-Distribute:</strong> Automatically maps Photo 1 → Slot 1, Photo 2 → Slot 2, Photo 3 → Slot 3 across the entire sheet with one click.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              3. What is "Wallet (2)"?
            </h4>
            <p className="text-xs text-slate-600 leading-normal">
              <strong>Wallet (2)</strong> means printing <strong>2 wallet-sized photos onto a SINGLE 4×6 inch sheet</strong>.
              It does NOT print 2 separate full sheets. You get 2 photos side-by-side / stacked on one paper.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              3. ID & Passport Layouts
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>
                <strong>35 × 45 mm ID (6):</strong> Exactly 6 photos on a 4×6 sheet, each having standard 35×45 mm physical size (413×531 px @ 300 DPI).
              </li>
              <li>
                <strong>25 × 36 mm ID (8):</strong> Exactly 8 stamp photos on a 4×6 sheet, each having standard 25×36 mm physical size (295×425 px @ 300 DPI).
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              4. Quantity Setting
            </h4>
            <p className="text-xs text-slate-600 leading-normal">
              Quantity represents how many <strong>4×6 paper sheets</strong> to feed to the printer. For instance,
              Wallet (2) with Quantity 3 prints 3 sheets (total 6 wallet photos).
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              5. Printer Dialog Settings (Epson / Canon / HP)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Paper Size: <strong>4 × 6 in (10 × 15 cm)</strong> / Photo Paper (Glossy/Matte)</li>
              <li>Scaling: <strong>100% / Actual Size</strong> (do not select "Fit to Page")</li>
              <li>Borderless: Optional (if your printer driver supports Borderless 4×6)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Created by{' '}
            <a
              href="https://www.instagram.com/unfiltered.vijudo/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-pink-600 hover:text-pink-700 font-mono hover:underline"
            >
              @unfiltered.vijudo
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer text-xs transition-colors shadow-xs"
          >
            OK / Close
          </button>
        </div>
      </div>
    </div>
  );
};

