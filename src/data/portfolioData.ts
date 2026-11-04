export type ProjectCategory = 'All Projects' | 'Full-Stack' | 'Desktop & Systems' | 'UI Architecture';

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  year: string;
  kicker: string;
  summary: string;
  bentoSpan: 'col-span-12 lg:col-span-7' | 'col-span-12 lg:col-span-5' | 'col-span-12 lg:col-span-4';
  artworkType: 'nexus-cloud' | 'win32-studio' | 'chronos-engine' | 'vector-canvas' | 'sentinel-mesh';
  clientOrContext: string;
  role: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  architecture: string;
  outcomes: string[];
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
}

export interface CapabilityChapter {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  stackSummary: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  techLine: string;
}

export const HERO_METRICS = [
  { value: '8+ YRS', label: 'Systems & Full-Stack Engineering' },
  { value: '42+', label: 'Production Web & Desktop Releases' },
  { value: '99.98%', label: 'Mission-Critical Uptime SLA' },
  { value: '<14ms', label: 'P95 UI & IPC Frame Latency' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aether-desktop-shell',
    title: 'Aether Studio — Cross-Platform Electron & Native Win32 Workstation',
    category: 'Desktop & Systems',
    year: '2025',
    kicker: 'DESKTOP & SYSTEMS · 2025',
    summary: 'Sandboxed Electron + C++ native addon workstation delivering 120fps canvas rendering and offline NSIS deployment.',
    bentoSpan: 'col-span-12 lg:col-span-7',
    artworkType: 'win32-studio',
    clientOrContext: 'Enterprise Creative Workflow Suite',
    role: 'Principal Desktop Architect',
    metrics: [
      { label: 'Cold Boot Time', value: '380ms' },
      { label: 'Memory Footprint', value: '118 MB' },
      { label: 'Active Installations', value: '64,000+' },
    ],
    challenge:
      'Creative studios needed a zero-dependency Windows 10/11 desktop application capable of processing high-resolution print layouts offline while maintaining strict process isolation and automatic delta updates.',
    architecture:
      'Engineered a multi-process Electron architecture with contextIsolation: true, zero nodeIntegration in renderers, typed contextBridge IPC channels, and an automated electron-builder NSIS + Portable x64 packaging pipeline.',
    outcomes: [
      'Reduced cold startup latency by 62% using V8 snapshot caching and deferred native module loading.',
      'Delivered dual NSIS installer and zero-install portable .exe artifacts with automated desktop & Start Menu shortcuts.',
      'Achieved 100% offline reliability across Windows 10 and Windows 11 64-bit enterprise environments.',
    ],
    techStack: ['Electron 34', 'React 19', 'TypeScript', 'electron-builder', 'NSIS x64', 'IPC ContextBridge'],
    repoUrl: 'https://github.com/vijay-portfolio/aether-desktop-workstation',
    liveUrl: 'https://vijay-portfolio.example.com/projects/aether-studio',
  },
  {
    id: 'Kinetix-distributed-telemetry',
    title: 'Kinetix Cloud — High-Frequency Distributed Telemetry Mesh',
    category: 'Full-Stack',
    year: '2024',
    kicker: 'FULL-STACK · 2024',
    summary: 'Real-time ingestion and observability plane processing 1.4M events/sec with sub-15ms query latency.',
    bentoSpan: 'col-span-12 lg:col-span-5',
    artworkType: 'nexus-cloud',
    clientOrContext: 'Global FinTech Infrastructure',
    role: 'Lead Systems Engineer',
    metrics: [
      { label: 'Ingestion Rate', value: '1.4M/sec' },
      { label: 'P99 Query Latency', value: '11.4ms' },
      { label: 'Cluster Availability', value: '99.99%' },
    ],
    challenge:
      'Legacy monitoring dashboards dropped telemetry packets during peak market volatility and suffered from 4-second UI freezes when rendering live order-book streams.',
    architecture:
      'Built a Rust + Node.js edge aggregation layer streaming binary frames over WebSockets into a React 19 virtualized time-series canvas with worker-thread decimation.',
    outcomes: [
      'Sustained 60fps real-time charting across 48 concurrent telemetry streams in a single viewport.',
      'Cut cloud egress costs by 41% via adaptive delta compression on the wire.',
      'Adopted by 180+ institutional operations teams as their primary incident command surface.',
    ],
    techStack: ['TypeScript', 'React 19', 'Node.js', 'WebSockets', 'PostgreSQL', 'Redis Streams'],
    repoUrl: 'https://github.com/vijay-portfolio/kinetix-telemetry-mesh',
    liveUrl: 'https://vijay-portfolio.example.com/projects/kinetix-cloud',
  },
  {
    id: 'prism-imaging-pipeline',
    title: 'Prism 4×6 Pro — Offline Studio Print & Segmentation Engine',
    category: 'Desktop & Systems',
    year: '2024',
    kicker: 'DESKTOP & SYSTEMS · 2024',
    summary: '300 DPI precision photo layout and native portrait background segmentation engine for Windows desktop studios.',
    bentoSpan: 'col-span-12 lg:col-span-4',
    artworkType: 'chronos-engine',
    clientOrContext: 'Commercial Photography Labs',
    role: 'Core Systems & Imaging Developer',
    metrics: [
      { label: 'Print Resolution', value: '300 DPI' },
      { label: 'BG Removal Speed', value: '420ms/img' },
      { label: 'OS Compatibility', value: 'Win 7–11' },
    ],
    challenge:
      'High-volume passport and studio print shops required an offline-first 4×6-inch layout engine with automatic light-blue background replacement that ran reliably without GPU hardware or cloud APIs.',
    architecture:
      'Designed an unmanaged memory-pinned LockBits pixel segmentation pipeline paired with a color-calibrated 1200×1800px print compositor and non-destructive original file caching.',
    outcomes: [
      'Processed bulk batches of 50+ studio portraits sequentially with responsive progress feedback and zero file locks.',
      'Guaranteed exact millimeter-accurate crop and gutter margins across physical thermal dye-sublimation printers.',
      'Preserved 100% original photo integrity with instant one-click restoration.',
    ],
    techStack: ['C# .NET 4.8', 'WinForms GDI+', 'LockBits SIMD', 'Color Matrix', 'PrintDocument'],
    repoUrl: 'https://github.com/vijay-portfolio/prism-4x6-studio',
    liveUrl: 'https://vijay-portfolio.example.com/projects/prism-4x6-pro',
  },
  {
    id: 'monolith-design-system',
    title: 'Monolith UI — Multi-Brand Architectural Component System',
    category: 'UI Architecture',
    year: '2024',
    kicker: 'UI ARCHITECTURE · 2024',
    summary: 'Zero-runtime token architecture and accessible keyboard-first primitives powering 14 enterprise web & desktop apps.',
    bentoSpan: 'col-span-12 lg:col-span-4',
    artworkType: 'vector-canvas',
    clientOrContext: 'Enterprise Product Platform',
    role: 'Staff Frontend Architect',
    metrics: [
      { label: 'Bundle Overhead', value: '<8.4 KB' },
      { label: 'WCAG Compliance', value: 'AAA / AA' },
      { label: 'Adopting Teams', value: '14 Squads' },
    ],
    challenge:
      'Fourteen engineering squads maintained fragmented component libraries with inconsistent keyboard navigation, bloated CSS-in-JS runtime costs, and jarring dark-mode contrast shifts.',
    architecture:
      'Architected a semantic CSS custom-property token compiler with headless accessible primitives, automated visual regression snapshots, and unified web + Electron window framing.',
    outcomes: [
      'Eliminated 140KB of duplicated runtime styling libraries across flagship applications.',
      'Reduced new feature UI assembly time by 55% according to quarterly developer velocity audits.',
      'Enforced strict WCAG AA/AAA contrast ratios across both atmospheric dark and high-craft light surfaces.',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'ARIA Primitives', 'Storybook', 'Playwright'],
    repoUrl: 'https://github.com/vijay-portfolio/monolith-design-system',
    liveUrl: 'https://vijay-portfolio.example.com/projects/monolith-ui',
  },
  {
    id: 'veritas-ledger-core',
    title: 'Veritas Core — Cryptographic Audit & Document Verification Gateway',
    category: 'Full-Stack',
    year: '2023',
    kicker: 'FULL-STACK · 2023',
    summary: 'Tamper-evident Merkle audit pipeline and instant client-side document verification portal.',
    bentoSpan: 'col-span-12 lg:col-span-4',
    artworkType: 'sentinel-mesh',
    clientOrContext: 'RegTech Compliance Platform',
    role: 'Senior Full-Stack Engineer',
    metrics: [
      { label: 'Proof Verification', value: '3.2ms' },
      { label: 'Documents Sealed', value: '19.5M+' },
      { label: 'Zero-Knowledge Audit', value: '100%' },
    ],
    challenge:
      'Compliance auditors needed deterministic proof that archived financial records had not been altered since issuance, without exposing sensitive PII payloads to third-party verifiers.',
    architecture:
      'Implemented an append-only cryptographic Merkle tree notarization service with WebCrypto client-side hash validation and offline PDF/JSON proof bundles.',
    outcomes: [
      'Enabled instant browser and desktop drag-and-drop proof verification in under 4 milliseconds.',
      'Passed independent SOC2 Type II and ISO-27001 cryptographic integrity audits with zero findings.',
      'Scaled seamlessly to 19.5 million sealed records with sub-second historical inclusion proofs.',
    ],
    techStack: ['TypeScript', 'Node.js', 'WebCrypto API', 'PostgreSQL', 'Docker', 'REST / gRPC'],
    repoUrl: 'https://github.com/vijay-portfolio/veritas-ledger-core',
    liveUrl: 'https://vijay-portfolio.example.com/projects/veritas-core',
  },
];

export const CAPABILITY_CHAPTERS: CapabilityChapter[] = [
  {
    number: '01.',
    title: 'Desktop Applications & Native Packaging',
    subtitle: 'Electron · Windows 10/11 (x64) · NSIS & Portable Executables · .NET WinForms',
    description:
      'Transforming modern web codebases and native runtimes into self-contained, production-hardened Windows desktop software. Every build enforces strict context isolation, native OS integration, custom .ico branding, and zero-dependency offline execution.',
    deliverables: [
      'Hardened Electron Main & Preload architecture (contextIsolation: true, nodeIntegration: false)',
      'Automated electron-builder pipelines producing NSIS Setup wizards & Portable .exe binaries',
      'Native OS window management, single-instance locks, and system browser link delegation',
      'Legacy & modern Windows compatibility from Windows 7 SP1 (.NET 4.8) through Windows 11 24H2 (x64)',
    ],
    stackSummary: 'Electron · electron-builder · NSIS · C# .NET · Node.js · IPC ContextBridge',
  },
  {
    number: '02.',
    title: 'Full-Stack Distributed Systems & APIs',
    subtitle: 'Node.js · TypeScript · Real-Time Streaming · High-Availability Data Planes',
    description:
      'Architecting resilient backend services and real-time data pipelines engineered for predictable tail latency. From typed RPC contracts and WebSocket multiplexers to transactional relational schemas.',
    deliverables: [
      'Low-latency REST, GraphQL, and bidirectional WebSocket event architectures',
      'Relational database modeling, query indexing, and caching layers with PostgreSQL & Redis',
      'End-to-end type safety across client, preload bridge, and server boundaries',
      'Automated CI/CD build verification, containerization, and zero-downtime release workflows',
    ],
    stackSummary: 'TypeScript · Node.js · Express · PostgreSQL · Redis · WebSockets · Docker',
  },
  {
    number: '03.',
    title: 'Frontend Architecture & Precision UI Systems',
    subtitle: 'React 19 · Vite · Tailwind CSS · 60fps Interactive Canvas & SVG Telemetry',
    description:
      'Crafting Swiss-grid editorial interfaces and high-density operational workspaces where typography, hierarchy, and frame-rate responsiveness are treated as first-class engineering constraints.',
    deliverables: [
      'Zero-bloat React + Vite single-page and desktop-hybrid application architectures',
      'Bespoke interactive SVG & Canvas data visualizations with hardware-accelerated motion',
      'Keyboard-accessible modal workflows, command palettes, and deterministic state machines',
      'Relative asset bundling (base: "./") engineered for both CDN edge hosting and file:// desktop protocols',
    ],
    stackSummary: 'React 19 · Vite 6 · Tailwind CSS v4 · Motion · SVG / Canvas 2D · WCAG AA/AAA',
  },
];

export const CAREER_TIMELINE: CareerMilestone[] = [
  {
    period: '2022 — PRESENT',
    role: 'Principal Systems & Full-Stack Engineer',
    company: 'Vijay Engineering Studio',
    location: 'Remote · Global',
    summary:
      'Leading end-to-end architecture for standalone Windows desktop applications, Electron enterprise workstations, and high-throughput React + TypeScript cloud platforms.',
    highlights: [
      'Architected and shipped 15+ standalone Windows desktop applications (.exe) using Electron, electron-builder NSIS installers, and .NET runtimes.',
      'Standardized secure desktop packaging blueprints with contextIsolation, sandboxed preload bridges, and offline asset bundling.',
      'Delivered sub-15ms interactive telemetry dashboards and 300 DPI commercial imaging software used daily across thousands of workstations.',
    ],
    techLine: 'React 19 · TypeScript · Electron · electron-builder · Node.js · C# .NET · Tailwind CSS',
  },
  {
    period: '2020 — 2022',
    role: 'Senior Full-Stack & UI Systems Architect',
    company: 'NexaCore Technologies',
    location: 'Bengaluru · Hybrid',
    summary:
      'Spearheaded the core web and desktop client platform for real-time operational analytics and multi-tenant enterprise SaaS products.',
    highlights: [
      'Migrated legacy browser-only dashboards into hybrid web + Windows desktop executables with offline local caching.',
      'Built the Monolith UI component system adopted by 14 product squads, cutting bundle overhead by 140KB.',
      'Reduced P95 page and window initialization times from 2.4s to 380ms.',
    ],
    techLine: 'React · TypeScript · Vite · Node.js · PostgreSQL · WebSockets · Design Systems',
  },
  {
    period: '2017 — 2020',
    role: 'Software Engineer — Desktop & Web Applications',
    company: 'Veridian Digital Systems',
    location: 'Ahmedabad · On-Site',
    summary:
      'Developed commercial imaging tools, automated print layout engines, and full-stack internal operations portals.',
    highlights: [
      'Engineered high-DPI photo layout and printing software supporting automated background segmentation and thermal printer drivers.',
      'Built RESTful backend microservices and automated installer deployment scripts for retail studio networks.',
    ],
    techLine: 'C# .NET · JavaScript · React · HTML5 Canvas · REST APIs · Windows Installer (NSIS)',
  },
];

export const ELECTRON_CONFIG_FILES = {
  'package.json': `{
  "name": "vijay-portfolio",
  "productName": "Vijay Portfolio",
  "description": "Vijay Portfolio — Standalone Windows Desktop Application & Engineering Showcase",
  "author": "Vijay <thakorvijay51098@gmail.com>",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "main": "electron/main.cjs",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "node scripts/generate-icon.mjs && vite build",
    "preview": "vite preview",
    "electron:dev": "node scripts/generate-icon.mjs && concurrently -k \\"vite --port=3000\\" \\"wait-on tcp:3000 && cross-env ELECTRON_START_URL=http://localhost:3000 electron .\\"",
    "dist": "npm run build && electron-builder --win --x64"
  },
  "build": {
    "appId": "com.vijay.portfolio",
    "productName": "Vijay Portfolio",
    "copyright": "Copyright © 2025 Vijay",
    "asar": true,
    "directories": {
      "buildResources": "build",
      "output": "dist"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "build/icon.ico",
      "build/icon.png"
    ],
    "win": {
      "icon": "build/icon.ico",
      "target": [
        { "target": "nsis", "arch": ["x64"] },
        { "target": "portable", "arch": ["x64"] }
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "Vijay Portfolio",
      "installerIcon": "build/icon.ico",
      "uninstallerIcon": "build/icon.ico",
      "installerHeaderIcon": "build/icon.ico",
      "artifactName": "Vijay-Portfolio-Setup.\${ext}"
    },
    "portable": {
      "artifactName": "Vijay-Portfolio-Portable.\${ext}"
    }
  }
}`,
  'electron/main.cjs': `const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

if (process.platform === 'win32') {
  app.setAppUserModelId('com.vijay.portfolio');
}

app.setName('Vijay Portfolio');

let mainWindow = null;

function resolveIconPath() {
  const candidates = [
    path.join(__dirname, '..', 'build', 'icon.ico'),
    path.join(__dirname, '..', 'build', 'icon.png'),
    path.join(__dirname, '..', 'public', 'icon.svg'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

function isAllowedExternalUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return ['https:', 'http:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    title: 'Vijay Portfolio',
    backgroundColor: '#09090B',
    show: false,
    autoHideMenuBar: true,
    icon: resolveIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      devTools: !app.isPackaged,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const startUrl = process.env.ELECTRON_START_URL;
    const isDevLocal = startUrl && navigationUrl.startsWith(startUrl);
    const isFileLocal = navigationUrl.startsWith('file://');

    if (!isDevLocal && !isFileLocal) {
      event.preventDefault();
      if (isAllowedExternalUrl(navigationUrl)) shell.openExternal(navigationUrl);
    }
  });

  const devServerUrl = process.env.ELECTRON_START_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    ipcMain.handle('portfolio:open-external', async (_e, url) => {
      if (typeof url === 'string' && isAllowedExternalUrl(url)) {
        await shell.openExternal(url);
        return { ok: true };
      }
      return { ok: false };
    });
    createMainWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}`,
  'electron/preload.cjs': `const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  platform: process.platform,
  arch: process.arch,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  openExternal: (url) => ipcRenderer.invoke('portfolio:open-external', url),
  getRuntimeInfo: () => ipcRenderer.invoke('portfolio:get-runtime-info'),
});`,
  'vite.config.ts': `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // CRITICAL FOR ELECTRON: Relative asset paths ensure dist/index.html loads cleanly via file://
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});`,
};
