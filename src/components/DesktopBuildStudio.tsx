import React, { useState, useEffect } from 'react';
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
  HardDriveDownload,
  CheckCircle2,
  GitBranch,
  ArrowUpRight,
} from 'lucide-react';
import { ELECTRON_CONFIG_FILES } from '../data/portfolioData';

type ConfigFileKey = keyof typeof ELECTRON_CONFIG_FILES;

interface ReleaseArtifactInfo {
  fileName: string;
  sizeBytes?: number;
  sizeFormatted?: string;
  downloadUrl?: string;
  ready: boolean;
}

interface ReleaseStatusResponse {
  version: string;
  appId: string;
  productName: string;
  arch: string;
  setupExe: ReleaseArtifactInfo;
  portableExe: ReleaseArtifactInfo;
}

export const DesktopBuildStudio: React.FC<{ isElectronRuntime: boolean }> = ({
  isElectronRuntime,
}) => {
  const [selectedFile, setSelectedFile] = useState<ConfigFileKey>('electron/main.cjs');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatusResponse | null>(null);

  useEffect(() => {
    fetch('/api/releases')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setReleaseStatus(data);
      })
      .catch(() => {
        // Fallback when running as static file inside Electron
      });
  }, []);

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
          '4. Output Artifacts (generated in the dist/ and release/ folders):',
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
      note: 'Generates build/icon.ico, starts Vite on port 3000, and opens the native 1280×800 Vijay Portfolio window.',
    },
    {
      id: 'cmd-dist',
      step: '03 · COMPILE STANDALONE WINDOWS .EXE INSTALLER',
      command: 'npm run dist',
      note: 'Outputs dist/Vijay-Portfolio-Setup.exe (NSIS Installer) and dist/Vijay-Portfolio-Portable.exe.',
    },
  ];

  const fileKeys = Object.keys(ELECTRON_CONFIG_FILES) as ConfigFileKey[];
  const originUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const setupDirectUrl = `${originUrl}/releases/Vijay-Portfolio-Setup.exe`;
  const portableDirectUrl = `${originUrl}/releases/Vijay-Portfolio-Portable.exe`;

  return (
    <section
      id="desktop-build"
      className="py-24 border-t border-[#27272A] scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 font-mono-code text-xs uppercase tracking-[0.08em] text-[#3B82F6] mb-3">
              <span className="w-2 h-2 bg-[#10B981] inline-block" />
              <span>RELEASE v1.0.0 · STANDALONE WINDOWS 10 / 11 (X64) EXECUTABLES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAFAFA] tracking-tight">
              Verified Windows <span className="font-serif-accent italic font-normal text-[#A1A1AA]">Release</span> &amp; Build Studio
            </h2>
            <p className="mt-3 text-[#A1A1AA] max-w-2xl text-base leading-relaxed">
              Download the pre-compiled Windows 10/11 (64-bit) NSIS installer (
              <code className="font-mono-code text-xs text-[#FAFAFA] bg-[#121215] px-1.5 py-0.5 border border-[#27272A]">
                Vijay-Portfolio-Setup.exe
              </code>
              ) or standalone portable executable directly below, or inspect the Electron packaging source files.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/releases/Vijay-Portfolio-Setup.exe"
              download="Vijay-Portfolio-Setup.exe"
              className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <HardDriveDownload className="w-4 h-4" />
              <span>
                Download Vijay-Portfolio-Setup.exe
                {releaseStatus?.setupExe?.sizeFormatted
                  ? ` (${releaseStatus.setupExe.sizeFormatted})`
                  : ''}
              </span>
            </a>

            <button
              type="button"
              onClick={handleDownloadPackagingZip}
              disabled={isGeneratingZip}
              className="px-4 py-2.5 rounded-lg bg-[#121215] border border-[#27272A] hover:border-[#3F3F46] text-xs font-mono-code font-medium text-[#FAFAFA] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>
                {isGeneratingZip ? 'Bundling Config...' : 'Download Source Config (.zip)'}
              </span>
            </button>
          </div>
        </div>

        {/* VERIFIED RELEASE ASSETS PANEL (Direct .EXE Downloads & URLs) */}
        <div className="mb-10 p-6 bg-[#121215] border border-[#27272A] rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#27272A]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="font-mono-code text-xs uppercase tracking-[0.08em] text-[#FAFAFA]">
                DIRECT RELEASE ASSETS · VERSION 1.0.0 · WINDOWS 10/11 (X64)
              </span>
            </div>
            <span className="font-mono-code text-xs text-[#10B981]">
              {releaseStatus?.setupExe?.ready
                ? '● VERIFIED BINARIES READY FOR DOWNLOAD'
                : '● STATIC RELEASE ARTIFACTS CONFIGURED'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset 1: NSIS Setup Installer */}
            <div className="p-5 bg-[#09090B] border border-[#27272A] rounded-lg flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono-code text-xs font-semibold text-[#3B82F6]">
                    NSIS WINDOWS INSTALLER (RECOMMENDED)
                  </span>
                  <span className="font-mono-code text-xs text-[#A1A1AA]">
                    {releaseStatus?.setupExe?.sizeFormatted || 'x64 .EXE'}
                  </span>
                </div>
                <div className="font-display text-lg font-semibold text-[#FAFAFA]">
                  Vijay-Portfolio-Setup.exe
                </div>
                <p className="mt-1.5 text-xs text-[#A1A1AA] leading-relaxed">
                  Full Windows 10/11 x64 setup wizard with custom installation directory selection, Desktop shortcut, Start Menu shortcut, and automatic uninstaller.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#27272A]/70">
                <div className="flex items-center justify-between gap-2 bg-[#121215] px-3 py-2 rounded border border-[#27272A]">
                  <code className="font-mono-code text-[11px] text-[#A1A1AA] truncate">
                    {setupDirectUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(setupDirectUrl, 'url-setup')}
                    className="font-mono-code text-[11px] text-[#3B82F6] hover:text-[#60A5FA] shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'url-setup' ? (
                      <>
                        <Check className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#10B981]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY URL</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href="/releases/Vijay-Portfolio-Setup.exe"
                  download="Vijay-Portfolio-Setup.exe"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <HardDriveDownload className="w-4 h-4" />
                  <span>
                    Download Vijay-Portfolio-Setup.exe
                    {releaseStatus?.setupExe?.sizeFormatted
                      ? ` (${releaseStatus.setupExe.sizeFormatted})`
                      : ''}
                  </span>
                </a>
              </div>
            </div>

            {/* Asset 2: Portable Executable */}
            <div className="p-5 bg-[#09090B] border border-[#27272A] rounded-lg flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono-code text-xs font-semibold text-[#10B981]">
                    STANDALONE PORTABLE EXECUTABLE
                  </span>
                  <span className="font-mono-code text-xs text-[#A1A1AA]">
                    {releaseStatus?.portableExe?.sizeFormatted || 'x64 .EXE'}
                  </span>
                </div>
                <div className="font-display text-lg font-semibold text-[#FAFAFA]">
                  Vijay-Portfolio-Portable.exe
                </div>
                <p className="mt-1.5 text-xs text-[#A1A1AA] leading-relaxed">
                  Zero-install single-file Windows 10/11 x64 executable. Launches immediately from any folder or USB drive without requiring administrator privileges.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#27272A]/70">
                <div className="flex items-center justify-between gap-2 bg-[#121215] px-3 py-2 rounded border border-[#27272A]">
                  <code className="font-mono-code text-[11px] text-[#A1A1AA] truncate">
                    {portableDirectUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(portableDirectUrl, 'url-portable')}
                    className="font-mono-code text-[11px] text-[#3B82F6] hover:text-[#60A5FA] shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'url-portable' ? (
                      <>
                        <Check className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#10B981]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY URL</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href="/releases/Vijay-Portfolio-Portable.exe"
                  download="Vijay-Portfolio-Portable.exe"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#121215] border border-[#27272A] hover:border-[#3B82F6] text-xs font-mono-code font-medium text-[#FAFAFA] flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#3B82F6]" />
                  <span>
                    Download Vijay-Portfolio-Portable.exe
                    {releaseStatus?.portableExe?.sizeFormatted
                      ? ` (${releaseStatus.portableExe.sizeFormatted})`
                      : ''}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GITHUB RELEASES UPLOAD INSTRUCTIONS (For httpviju / Photo) */}
        <div className="mb-10 p-6 bg-[#121215] border border-[#2563EB]/40 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-[#27272A]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[#60A5FA]" />
              </div>
              <div>
                <span className="font-mono-code text-xs font-semibold uppercase tracking-[0.08em] text-[#FAFAFA]">
                  HOW TO MAKE .EXE DOWNLOAD APPEAR IN GITHUB RELEASES (HTTPVIJU / PHOTO)
                </span>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  GitHub code repository me code push hota hai, lekin "Releases" section me .exe aane ke liye release publish karni hoti hai.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/httpviju/Photo/releases/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-mono-code font-medium text-white flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <span>Open GitHub New Release</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg space-y-2">
              <div className="font-mono-code text-xs text-[#3B82F6] font-semibold">
                STEP 01
              </div>
              <div className="font-display text-sm font-semibold text-[#FAFAFA]">
                Download .EXE to PC
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Upar diye gaye blue button se <strong className="text-white">Vijay-Portfolio-Setup.exe</strong> apne computer me save karein.
              </p>
            </div>

            <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg space-y-2">
              <div className="font-mono-code text-xs text-[#3B82F6] font-semibold">
                STEP 02
              </div>
              <div className="font-display text-sm font-semibold text-[#FAFAFA]">
                Click "Create a new release"
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                GitHub me apne <strong className="text-white">Photo</strong> repository me right side <strong className="text-[#3B82F6]">"Create a new release"</strong> par click karein.
              </p>
            </div>

            <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg space-y-2">
              <div className="font-mono-code text-xs text-[#3B82F6] font-semibold">
                STEP 03
              </div>
              <div className="font-display text-sm font-semibold text-[#FAFAFA]">
                Tag &amp; Drag-and-Drop
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Tag me <code className="text-white font-mono bg-[#18181B] px-1 py-0.5 rounded">v1.0.0</code> likhein aur "Attach binaries" box me <strong className="text-white">Vijay-Portfolio-Setup.exe</strong> upload karein.
              </p>
            </div>

            <div className="p-4 bg-[#09090B] border border-[#27272A] rounded-lg space-y-2">
              <div className="font-mono-code text-xs text-[#10B981] font-semibold">
                STEP 04 · COMPLETE
              </div>
              <div className="font-display text-sm font-semibold text-[#FAFAFA]">
                Publish Release
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Neeche green <strong className="text-white">"Publish release"</strong> dabayein. Turant GitHub ke sidebar me download button live ho jayega!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#71717A] font-mono-code">
            <div>
              💡 AUTOMATED PIPELINE: Humne <code className="text-[#FAFAFA]">.github/workflows/release.yml</code> bhi add kar diya hai, jisse GitHub Actions automatic build karke release publish kar sake.
            </div>
            <a
              href="https://github.com/httpviju/Photo/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:text-[#60A5FA] flex items-center gap-1 shrink-0"
            >
              <span>GitHub Actions Tab</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
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
              1280×800 Native Frame
            </div>
            <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
              Enforces <code className="font-mono-code text-xs text-[#FAFAFA]">minWidth: 900</code>,{' '}
              <code className="font-mono-code text-xs text-[#FAFAFA]">minHeight: 600</code>, auto-hidden menu bar, single-instance lock, and native OS browser delegation.
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
