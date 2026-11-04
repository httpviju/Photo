import React, { useState } from 'react';
import { getCSharpProject } from '../utils/csharpSource';
import { generateVLogoIco } from '../utils/generateIco';
import JSZip from 'jszip';
import { Download, Copy, Check, X, FileCode, Terminal, HelpCircle, Laptop } from 'lucide-react';
import { VLogo } from './VLogo';

interface CSharpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CSharpModal: React.FC<CSharpModalProps> = ({ isOpen, onClose }) => {
  const projectFiles = getCSharpProject();
  const [selectedFile, setSelectedFile] = useState<keyof typeof projectFiles>('Form1.cs');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(projectFiles[selectedFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('Photo4x6_Windows7_DotNet48');

      Object.entries(projectFiles).forEach(([fileName, content]) => {
        folder?.file(fileName, content);
      });

      // Add valid Win32 binary app.ico to zip
      const icoBytes = generateVLogoIco();
      folder?.file('app.ico', icoBytes, { binary: true });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Photo4x6_Windows7_DotNet48_Source.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create ZIP', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-3 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-xs text-slate-800 animate-in fade-in zoom-in-95 duration-150">
        {/* Bento Header */}
        <div className="bg-white px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <VLogo size="sm" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>Windows 7 / .NET 4.8 C# Source Code & x86 Build</span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded font-bold">Free Lifetime Offline</span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 rounded">Anti-Tamper</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Pure GDI+ System.Drawing • Zero Dependencies • Custom 'V' Icon • Unlimited 4×6 Printing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-200/80 px-5 py-3.5 flex items-center justify-between gap-4 text-xs text-slate-800">
          <div className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span>Instant 1-Click .EXE Creation for Windows 7 / 8 / 10 / 11</span>
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Download this package, extract the folder, and double-click <strong className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">compile_x86.bat</strong>. Windows will compile <strong className="text-blue-700">Photo4x6.exe</strong> in 1 second!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 text-xs"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Creating Package...' : 'Download .EXE Creator (ZIP)'}</span>
          </button>
        </div>

        {/* Body: File Tabs + Code Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-950">
          {/* File sidebar tabs */}
          <div className="w-full md:w-56 bg-slate-900 border-r border-slate-800 p-2.5 flex flex-row md:flex-col gap-1.5 overflow-x-auto">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 py-1 hidden md:block">
              Project Files
            </div>
            {Object.keys(projectFiles).map((fileKey) => (
              <button
                key={fileKey}
                type="button"
                onClick={() => setSelectedFile(fileKey as keyof typeof projectFiles)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-mono transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedFile === fileKey
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 opacity-80 shrink-0" />
                <span className="truncate">{fileKey}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-300">
              <span className="font-mono text-[11px] text-amber-400 font-semibold">{selectedFile}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 text-xs cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="flex-1 p-4 overflow-auto text-emerald-400 font-mono text-[11px] leading-relaxed select-text">
              <code>{projectFiles[selectedFile]}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-600">
            Created by{' '}
            <a
              href="https://www.instagram.com/unfiltered.vijudo/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-pink-600 hover:text-pink-700 font-mono hover:underline"
            >
              @unfiltered.vijudo
            </a>{' '}
            • 100% Offline Windows 7
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors text-xs"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Zipping...' : 'Download Complete Project (.ZIP)'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-700 font-medium cursor-pointer text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

