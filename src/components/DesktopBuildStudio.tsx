import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Terminal,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Monitor,
  PackageCheck,
  FileCode2,
} from 'lucide-react';
import { ELECTRON_CONFIG_FILES } from '../data/portfolioData';

type ConfigFileKey = keyof typeof ELECTRON_CONFIG_FILES;

export const DesktopBuildStudio: React.FC<{ isElectronRuntime: boolean }> = ({
  isElectronRuntime,
}) => {
  const [selectedFile, setSelectedFile] = useState<ConfigFileKey>('electron/main.cjs');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback copy
    }
  };

  const handleDownloadPackagingZip = async () => {
    setIsGeneratingZip(true);
    try {
      const zip = new JSZip();
      Object.entries(ELECTRON_CONFIG_FILES).forEach(([filePath, content]) => {
        zip.file(filePath, content);
      });
      zip.file(
        'WINDOWS_BUILD_INSTRUCTIONS.txt',
        [
          'VIJAY PORTFOLIO — STANDALONE WINDOWS (.EXE) BUILD GUIDE',
          '========================================================',
          '',
          '1. Install dependencies (including Electron & electron-builder):',
          '   npm install',
          '   npm install --save-dev electron electron-builder concurrently wait-on cross-env',
          '',
          '2. Run the desktop application locally in development mode:',
          '   npm run electron:dev',
          '',
          '3. Build the production React bundle and Windows 10/11 (x64) installer:',
          '   npm run dist',
          '',
          '4. Output Artifacts (generated in the dist/ folder):',
          '   - dist/Vijay-Portfolio-Setup.exe     (Windows NSIS Installer with Desktop & Start Menu shortcuts)',
          '   - dist/Vijay-Portfolio-Portable.exe  (Zero-install standalone Portable Windows executable)',
        ].join('\n')
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Vijay-Portfolio-Electron-Windows-Config.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const cliSteps = [
    {
      id: 'cmd-install',
      step: '01 · INSTALL ELECTRON & BUILDER TOOLCHAIN',
      command:
        'npm install && npm install --save-dev electron electron-builder concurrently wait-on cross-env',
      note: 'Installs Electron runtime and electron-builder NSIS x64 packager.',
    },
    {
      id: 'cmd-dev',
      step: '02 · LAUNCH LOCAL DESKTOP APPLICATION',
      command: 'npm run electron:dev',
      note: 'Generates build/icon.ico, starts Vite on port 3000, and opens the native 1280×820 Vijay Portfolio window.',
    },
    {
      id: 'cmd-dist',
      step: '03 · COMPILE STANDALONE WINDOWS .EXE INSTALLER',
      command: 'npm run dist',
      note: 'Outputs dist/Vijay-Portfolio-Setup.exe (NSIS Installer) and dist/Vijay-Portfolio-Portable.exe.',
    },
  ];

  const fileKeys = Object.keys(ELECTRON_CONFIG_FILES) as ConfigFileKey[];

  return (
    <section
      id="desktop-build"
      className="py-24 border-t border-[#27272A] scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-3">
              <span className="w-2 h-2 bg-[#2563EB] inline-block" />
              <span>STANDALONE WINDOWS 10 / 11 (X64) PACKAGING ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
              Electron &amp; NSIS <span className="font-serif-accent italic font-normal text-[#A1A1AA]">Executable</span> Pipeline
            </h2>
            <p className="mt-3 text-[#A1A1AA] max-w-2xl text-base leading-relaxed">
              Configured to compile this portfolio into an offline-capable Windows desktop executable (
              <code className="font-mono-code text-xs text-[#FAFAFA] bg-[#121215] px-1.5 py-0.5 border border-[#27272A]">
                dist/Vijay-Portfolio-Setup.exe
              </code>
              ) with desktop and Start Menu shortcuts, strict context isolation, and custom 256×256 icon resources.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPackagingZip}
              disabled={isGeneratingZip}
              className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {isGeneratingZip ? 'Bundling Config...' : 'Download Config Bundle (.zip)'}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Architectural Spec Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-[#121215] border border-[#27272A] rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A]">
                WINDOW &amp; SHELL SPEC
              </span>
              <Monitor className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="font-display text-lg font-semibold text-[#FAFAFA]">
              1280×820 Native Frame
            </div>
            <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
              Enforces <code className="font-mono-code text-xs text-[#FAFAFA]">minWidth: 960</code>,{' '}
              <code className="font-mono-code text-xs text-[#FAFAFA]">minHeight: 640</code>, auto-hidden menu bar, single-instance lock, and native OS browser delegation.
            </p>
          </div>

          <div className="p-6 bg-[#121215] border border-[#27272A] rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A]">
                SECURITY POSTURE
              </span>
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="font-display text-lg font-semibold text-[#FAFAFA]">
              Sandboxed ContextBridge
            </div>
            <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
              Hardened with <code className="font-mono-code text-xs text-[#FAFAFA]">contextIsolation: true</code>,{' '}
              <code className="font-mono-code text-xs text-[#FAFAFA]">nodeIntegration: false</code>, and zero direct Node.js primitives exposed to the DOM.
            </p>
          </div>

          <div className="p-6 bg-[#121215] border border-[#27272A] rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#71717A]">
                WINDOWS X64 ARTIFACTS
              </span>
              <PackageCheck className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="font-display text-lg font-semibold text-[#FAFAFA]">
              NSIS Setup + Portable .EXE
            </div>
            <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
              Produces <code className="font-mono-code text-xs text-[#FAFAFA]">Vijay-Portfolio-Setup.exe</code> (Desktop &amp; Start Menu shortcuts) plus{' '}
              <code className="font-mono-code text-xs text-[#FAFAFA]">Vijay-Portfolio-Portable.exe</code>.
            </p>
          </div>
        </div>

        {/* Main 12-Col Grid: Left 5 Cols CLI Build Steps | Right 7 Cols Source Code Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Exact CLI Build Commands */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-[#121215] border border-[#27272A] rounded-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#27272A]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#3B82F6]" />
                  <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA]">
                    EXACT WINDOWS .EXE BUILD COMMANDS
                  </span>
                </div>
                <span className="font-mono-code text-[11px] text-[#10B981]">
                  {isElectronRuntime ? 'ELECTRON ACTIVE' : 'WEB / READY'}
                </span>
              </div>

              <div className="space-y-4">
                {cliSteps.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-code text-[11px] text-[#3B82F6]">
                        {item.step}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.command, item.id)}
                        className="flex items-center gap-1.5 text-[11px] font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#10B981]" />
                            <span className="text-[#10B981]">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono-code text-xs text-[#FAFAFA] overflow-x-auto whitespace-pre-wrap break-all bg-[#121215] p-2.5 border border-[#27272A] rounded">
                      {item.command}
                    </pre>
                    <p className="mt-2 text-xs text-[#71717A] leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Project Config File Inspector */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#27272A] rounded-xl overflow-hidden flex flex-col">
            {/* Unboxed Bottom-Border File Tabs (Strict Zero-Pill Rule) */}
            <div className="flex items-center justify-between border-b border-[#27272A] bg-[#09090B] px-4 overflow-x-auto">
              <div className="flex items-center">
                {fileKeys.map((fileKey) => {
                  const active = selectedFile === fileKey;
                  return (
                    <button
                      key={fileKey}
                      type="button"
                      onClick={() => setSelectedFile(fileKey)}
                      className={`px-4 py-3.5 font-mono-code text-xs border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                        active
                          ? 'border-[#2563EB] text-[#FAFAFA] bg-[#121215]'
                          : 'border-transparent text-[#71717A] hover:text-[#A1A1AA]'
                      }`}
                    >
                      <FileCode2 className="w-3.5 h-3.5" />
                      <span>{fileKey}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopy(ELECTRON_CONFIG_FILES[selectedFile], `file-${selectedFile}`)
                }
                className="px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#121215] hover:border-[#3F3F46] text-xs font-mono-code text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-1.5 shrink-0 ml-2 cursor-pointer"
              >
                {copiedId === `file-${selectedFile}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY FILE</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Display Area */}
            <div className="p-5 bg-[#09090B] flex-1 overflow-auto max-h-[520px]">
              <pre className="font-mono-code text-xs text-[#E4E4E7] leading-relaxed">
                <code>{ELECTRON_CONFIG_FILES[selectedFile]}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
