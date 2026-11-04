import React, { useState } from 'react';
import { PortfolioProject } from '../data/portfolioData';

export const HeroSystemsBlueprint: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<0 | 1 | 2>(0);

  const layers = [
    {
      code: 'SYS-01',
      label: 'WIN32 ELECTRON SHELL',
      spec: 'BrowserWindow 1280×820 · contextIsolation: true · NSIS x64',
      metric: '380ms Cold Boot',
    },
    {
      code: 'SYS-02',
      label: 'DISTRIBUTED STREAM MESH',
      spec: '1.4M msg/sec · WebSocket Binary Frames · P99 11.4ms',
      metric: '99.99% Uptime SLA',
    },
    {
      code: 'SYS-03',
      label: '300-DPI IMAGING ENGINE',
      spec: 'LockBits SIMD · 1200×1800px 4×6 Layout · Offline Native',
      metric: '420ms / Portrait',
    },
  ];

  return (
    <div className="relative bg-[#121215] border border-[#27272A] rounded-xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.75)]">
      {/* Top window chrome bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A] bg-[#09090B]/70">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#2563EB] inline-block" />
          <span className="font-mono-code text-[11px] tracking-[0.08em] uppercase text-[#FAFAFA]">
            VIJAY-PORTFOLIO.EXE · ARCHITECTURE TELEMETRY
          </span>
        </div>
        <span className="font-mono-code text-[11px] text-[#71717A]">
          WIN10/11 · X64
        </span>
      </div>

      {/* Main SVG Architectural Blueprint Canvas */}
      <div className="relative p-5 bg-[#09090B]">
        <svg
          viewBox="0 0 520 310"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="Vijay Portfolio Systems Architecture Blueprint"
        >
          <defs>
            <pattern id="heroGrid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path
                d="M 26 0 L 0 0 0 26"
                fill="none"
                stroke="#18181B"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="cobaltGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Precision background grid */}
          <rect width="520" height="310" fill="url(#heroGrid)" />

          {/* Outer Schematic Frame */}
          <rect
            x="12"
            y="12"
            width="496"
            height="286"
            rx="6"
            fill="none"
            stroke="#27272A"
            strokeWidth="1"
          />

          {activeLayer === 0 && (
            <g>
              {/* Electron Main Process Box */}
              <rect
                x="30"
                y="34"
                width="205"
                height="112"
                rx="6"
                fill="url(#cobaltGlow)"
                stroke="#2563EB"
                strokeWidth="1.5"
              />
              <text x="46" y="58" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                MAIN PROCESS · NODE / WIN32
              </text>
              <text x="46" y="80" fill="#FAFAFA" fontSize="14" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                electron/main.cjs
              </text>
              <text x="46" y="102" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                BrowserWindow(1280×820)
              </text>
              <text x="46" y="120" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                shell.openExternal() guard
              </text>

              {/* ContextBridge IPC Bus */}
              <line x1="235" y1="90" x2="290" y2="90" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 3" />
              <rect x="244" y="76" width="38" height="26" rx="4" fill="#121215" stroke="#3B82F6" strokeWidth="1" />
              <text x="263" y="93" fill="#FAFAFA" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                IPC
              </text>

              {/* Sandboxed Renderer Process */}
              <rect
                x="290"
                y="34"
                width="200"
                height="112"
                rx="6"
                fill="#121215"
                stroke="#3F3F46"
                strokeWidth="1.2"
              />
              <text x="306" y="58" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                RENDERER · SANDBOXED
              </text>
              <text x="306" y="80" fill="#FAFAFA" fontSize="14" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                React 19 + Vite Bundle
              </text>
              <text x="306" y="102" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                contextIsolation: true
              </text>
              <text x="306" y="120" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                nodeIntegration: false
              </text>

              {/* Packaging Pipeline Bottom Node */}
              <line x1="132" y1="146" x2="132" y2="180" stroke="#27272A" strokeWidth="1.5" />
              <line x1="390" y1="146" x2="390" y2="180" stroke="#27272A" strokeWidth="1.5" />
              <rect
                x="30"
                y="180"
                width="460"
                height="96"
                rx="6"
                fill="#121215"
                stroke="#27272A"
                strokeWidth="1.2"
              />
              <text x="46" y="205" fill="#71717A" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                ELECTRON-BUILDER ARTIFACT PIPELINE · WINDOWS 10 / 11 (X64)
              </text>
              <rect x="46" y="220" width="206" height="40" rx="4" fill="#09090B" stroke="#2563EB" strokeWidth="1" />
              <text x="60" y="244" fill="#FAFAFA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                dist/Vijay-Portfolio-Setup.exe
              </text>
              <rect x="268" y="220" width="206" height="40" rx="4" fill="#09090B" stroke="#27272A" strokeWidth="1" />
              <text x="280" y="244" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                Vijay-Portfolio-Portable.exe
              </text>
            </g>
          )}

          {activeLayer === 1 && (
            <g>
              {/* Telemetry Stream Nodes */}
              <rect x="30" y="36" width="130" height="238" rx="6" fill="#121215" stroke="#27272A" strokeWidth="1.2" />
              <text x="46" y="62" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                INGEST EDGE
              </text>
              {[0, 1, 2, 3].map((idx) => (
                <g key={idx} transform={`translate(44, ${82 + idx * 44})`}>
                  <rect width="102" height="32" rx="4" fill="#09090B" stroke="#27272A" />
                  <circle cx="14" cy="16" r="3.5" fill="#10B981" />
                  <text x="26" y="20" fill="#FAFAFA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    NODE-0{idx + 1} · OK
                  </text>
                </g>
              ))}

              {/* Signal lines */}
              <path d="M 160 155 L 210 155" stroke="#2563EB" strokeWidth="2" />

              {/* Central Aggregation Engine */}
              <rect x="210" y="36" width="280" height="145" rx="6" fill="url(#cobaltGlow)" stroke="#2563EB" strokeWidth="1.5" />
              <text x="228" y="62" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                REAL-TIME TELEMETRY WAVEFORM · 1.4M/S
              </text>
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.2"
                points="228,142 252,118 276,130 300,88 324,114 348,78 372,108 396,92 420,122 444,82 470,98"
              />
              <line x1="228" y1="158" x2="470" y2="158" stroke="#27272A" strokeWidth="1" />

              {/* Latency SLA Readout */}
              <rect x="210" y="196" width="280" height="78" rx="6" fill="#121215" stroke="#27272A" />
              <text x="228" y="224" fill="#71717A" fontSize="10" fontFamily="JetBrains Mono, monospace">
                TAIL LATENCY BENCHMARK
              </text>
              <text x="228" y="252" fill="#FAFAFA" fontSize="16" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                P50: 2.1ms · P95: 7.8ms · P99: 11.4ms
              </text>
            </g>
          )}

          {activeLayer === 2 && (
            <g>
              {/* 4x6 Print & Segmentation Diagram */}
              <rect x="30" y="36" width="210" height="238" rx="6" fill="#121215" stroke="#27272A" />
              <text x="46" y="60" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                300 DPI 4×6 SHEET (1200×1800)
              </text>
              {[0, 1].map((row) =>
                [0, 1, 2, 3].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={46 + col * 44}
                    y={78 + row * 86}
                    width="38"
                    height="72"
                    rx="2"
                    fill="#1D4ED8"
                    fillOpacity="0.22"
                    stroke="#3B82F6"
                    strokeWidth="1"
                  />
                ))
              )}
              <text x="46" y="258" fill="#A1A1AA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                8-UP PASSPORT MATRIX · LOCKBITS
              </text>

              <rect x="260" y="36" width="230" height="238" rx="6" fill="url(#cobaltGlow)" stroke="#2563EB" strokeWidth="1.5" />
              <text x="278" y="60" fill="#FAFAFA" fontSize="10" fontFamily="JetBrains Mono, monospace">
                PORTRAIT ALPHA MATTE ENGINE
              </text>
              <text x="278" y="94" fill="#FAFAFA" fontSize="14" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
                Zero-Dependency Native C#
              </text>
              <text x="278" y="122" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                • Border-seeded flood fill
              </text>
              <text x="278" y="146" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                • Guided feather alpha composite
              </text>
              <text x="278" y="170" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                • Light-Blue (#ADD8E6) studio fill
              </text>
              <text x="278" y="194" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                • Non-destructive original cache
              </text>
              <rect x="278" y="218" width="194" height="36" rx="4" fill="#09090B" stroke="#27272A" />
              <text x="292" y="240" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono, monospace">
                WIN7 SP1 — WIN11 VERIFIED
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Interactive Layer Selector Tabs (Strict Zero-Pill Rectangular Tabs) */}
      <div className="grid grid-cols-3 border-t border-[#27272A] bg-[#121215]">
        {layers.map((layer, index) => {
          const isActive = activeLayer === index;
          return (
            <button
              key={layer.code}
              type="button"
              onClick={() => setActiveLayer(index as 0 | 1 | 2)}
              className={`text-left px-4 py-3.5 transition-colors border-r last:border-r-0 border-[#27272A] cursor-pointer ${
                isActive
                  ? 'bg-[#18181B] border-b-2 border-b-[#2563EB]'
                  : 'hover:bg-[#18181B]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[10px] tracking-[0.08em] text-[#3B82F6]">
                  {layer.code}
                </span>
                <span className="font-mono-code text-[10px] text-[#71717A]">
                  {layer.metric}
                </span>
              </div>
              <div className="font-mono-code text-[11px] font-medium text-[#FAFAFA] mt-1 truncate">
                {layer.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const ProjectBentoArtwork: React.FC<{
  type: PortfolioProject['artworkType'];
}> = ({ type }) => {
  return (
    <div className="w-full h-56 sm:h-64 bg-[#09090B] border-b border-[#27272A] overflow-hidden relative">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${type}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#18181B" strokeWidth="1" />
          </pattern>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <rect width="600" height="280" fill={`url(#grid-${type})`} />

        {type === 'win32-studio' && (
          <g>
            {/* Desktop Window Frame Mockup */}
            <rect x="36" y="24" width="528" height="232" rx="8" fill="#121215" stroke="#27272A" strokeWidth="1.5" />
            <rect x="36" y="24" width="528" height="30" rx="8" fill="#18181B" />
            <rect x="52" y="35" width="8" height="8" fill="#2563EB" />
            <text x="70" y="43" fill="#FAFAFA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              Vijay-Portfolio-Setup.exe · NSIS x64 Desktop Runtime
            </text>
            {/* Left Sidebar */}
            <rect x="52" y="68" width="136" height="172" rx="4" fill="#09090B" stroke="#27272A" />
            <rect x="64" y="82" width="80" height="8" rx="2" fill="#2563EB" />
            <rect x="64" y="102" width="110" height="6" rx="2" fill="#27272A" />
            <rect x="64" y="118" width="96" height="6" rx="2" fill="#27272A" />
            <rect x="64" y="134" width="104" height="6" rx="2" fill="#27272A" />
            {/* Right Main Viewport */}
            <rect x="202" y="68" width="346" height="172" rx="4" fill={`url(#grad-${type})`} stroke="#2563EB" strokeWidth="1.2" />
            <text x="224" y="102" fill="#60A5FA" fontSize="11" fontFamily="JetBrains Mono, monospace">
              IPC CONTEXTBRIDGE · ISOLATED
            </text>
            <text x="224" y="132" fill="#FAFAFA" fontSize="18" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
              Native Win10/11 Application Shell
            </text>
            <rect x="224" y="156" width="140" height="32" rx="4" fill="#09090B" stroke="#3B82F6" />
            <text x="240" y="176" fill="#FAFAFA" fontSize="11" fontFamily="JetBrains Mono, monospace">
              380ms Cold Boot
            </text>
            <rect x="378" y="156" width="146" height="32" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="394" y="176" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono, monospace">
              118 MB RAM Target
            </text>
          </g>
        )}

        {type === 'nexus-cloud' && (
          <g>
            <rect x="36" y="28" width="528" height="224" rx="8" fill="#121215" stroke="#27272A" strokeWidth="1.5" />
            <text x="58" y="60" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              STREAMING TELEMETRY · 1.4M EVENTS/SEC
            </text>
            <path
              d="M 58 190 Q 130 95, 200 150 T 340 105 T 470 135 T 540 80"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
            />
            <path
              d="M 58 210 Q 140 145, 220 180 T 360 150 T 540 130"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {[110, 230, 350, 470].map((cx, i) => (
              <g key={cx}>
                <line x1={cx} y1="74" x2={cx} y2="220" stroke="#27272A" strokeWidth="1" />
                <circle cx={cx} cy={140 - (i % 2) * 30} r="5" fill="#3B82F6" />
              </g>
            ))}
          </g>
        )}

        {type === 'chronos-engine' && (
          <g>
            <rect x="44" y="28" width="512" height="224" rx="8" fill="#121215" stroke="#27272A" />
            <rect x="68" y="50" width="210" height="180" rx="4" fill="#09090B" stroke="#3B82F6" strokeWidth="1.2" />
            {[0, 1].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={82 + c * 46}
                  y={64 + r * 80}
                  width="38"
                  height="68"
                  fill="#2563EB"
                  fillOpacity="0.28"
                  stroke="#60A5FA"
                  strokeWidth="1"
                />
              ))
            )}
            <text x="304" y="82" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              300 DPI · LOCKBITS SEGMENTATION
            </text>
            <text x="304" y="114" fill="#FAFAFA" fontSize="16" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
              4×6 Studio Layout &amp;
            </text>
            <text x="304" y="138" fill="#FAFAFA" fontSize="16" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
              Auto Blue Background
            </text>
            <rect x="304" y="164" width="210" height="44" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="320" y="190" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono, monospace">
              RGB(173, 216, 230) · PASS
            </text>
          </g>
        )}

        {type === 'vector-canvas' && (
          <g>
            <rect x="44" y="28" width="512" height="224" rx="8" fill="#121215" stroke="#27272A" />
            <rect x="70" y="54" width="140" height="76" rx="4" fill="#09090B" stroke="#2563EB" />
            <text x="86" y="84" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace">
              TOKEN.SURFACE
            </text>
            <text x="86" y="108" fill="#FAFAFA" fontSize="13" fontFamily="JetBrains Mono, monospace">
              #09090B · AAA
            </text>
            <rect x="228" y="54" width="140" height="76" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="244" y="84" fill="#71717A" fontSize="10" fontFamily="JetBrains Mono, monospace">
              TOKEN.ACCENT
            </text>
            <text x="244" y="108" fill="#3B82F6" fontSize="13" fontFamily="JetBrains Mono, monospace">
              #2563EB · 8.4KB
            </text>
            <rect x="386" y="54" width="140" height="76" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="402" y="84" fill="#71717A" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ADOPTION
            </text>
            <text x="402" y="108" fill="#10B981" fontSize="13" fontFamily="JetBrains Mono, monospace">
              14 SQUADS
            </text>
            <rect x="70" y="148" width="456" height="76" rx="4" fill="#09090B" stroke="#27272A" />
            <text x="90" y="191" fill="#FAFAFA" fontSize="13" fontFamily="JetBrains Mono, monospace">
              Zero-Runtime CSS Tokens · Keyboard-First Primitives
            </text>
          </g>
        )}

        {type === 'sentinel-mesh' && (
          <g>
            <rect x="44" y="28" width="512" height="224" rx="8" fill="#121215" stroke="#27272A" />
            {/* Merkle Tree Topology */}
            <line x1="300" y1="74" x2="190" y2="136" stroke="#2563EB" strokeWidth="1.8" />
            <line x1="300" y1="74" x2="410" y2="136" stroke="#2563EB" strokeWidth="1.8" />
            <line x1="190" y1="136" x2="130" y2="200" stroke="#3F3F46" strokeWidth="1.4" />
            <line x1="190" y1="136" x2="250" y2="200" stroke="#3F3F46" strokeWidth="1.4" />
            <line x1="410" y1="136" x2="350" y2="200" stroke="#3F3F46" strokeWidth="1.4" />
            <line x1="410" y1="136" x2="470" y2="200" stroke="#3F3F46" strokeWidth="1.4" />

            <rect x="236" y="52" width="128" height="36" rx="4" fill="#09090B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="300" y="74" fill="#FAFAFA" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              ROOT · 0x8F9A..E21C
            </text>

            <rect x="136" y="120" width="108" height="32" rx="4" fill="#09090B" stroke="#3B82F6" />
            <text x="190" y="140" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              BRANCH · L01
            </text>

            <rect x="356" y="120" width="108" height="32" rx="4" fill="#09090B" stroke="#3B82F6" />
            <text x="410" y="140" fill="#60A5FA" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              BRANCH · R02
            </text>

            {[130, 250, 350, 470].map((lx, i) => (
              <g key={lx}>
                <rect x={lx - 42} y="186" width="84" height="28" rx="4" fill="#09090B" stroke="#27272A" />
                <text x={lx} y="204" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                  LEAF #{i + 1} OK
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};
