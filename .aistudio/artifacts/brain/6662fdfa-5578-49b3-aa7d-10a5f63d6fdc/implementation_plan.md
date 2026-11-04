# Vijay Portfolio — React + Vite & Windows Desktop (.exe) Packaging Plan

## 1. Overview & Architecture
We will build the **Vijay Portfolio** application in React + Vite + Tailwind CSS and configure a complete **Electron + electron-builder** packaging pipeline to produce standalone Windows 10/11 (64-bit) executables (`Vijay-Portfolio-Setup.exe` NSIS installer and portable `.exe`).

- **Application Identity**: `Vijay Portfolio` (`com.vijay.portfolio`)
- **Desktop Window Style**: Standard native Windows window (`1280×820` default, `960×640` minimum) with an auto-hidden menu bar (`autoHideMenuBar: true`) and native OS window controls.
- **Security Configuration**: `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, paired with a minimal `electron/preload.cjs` bridge for safe desktop info and external link handling.
- **External Link Handling**: Intercept external URLs (`https://`, `mailto:`) via `setWindowOpenHandler` and `will-navigate` in the Electron main process so GitHub, LinkedIn, and email links open automatically in the user's default system browser (`shell.openExternal`).

---

## 2. Visual Direction & Portfolio Features
Following editorial portfolio conventions:
- **Aesthetic & Color Palette (60-30-10)**:
  - **60% Canvas**: Stark obsidian (`#09090B`) with clean structural framing.
  - **30% Structural Surfaces**: Subtle zinc surfaces (`#121215`) and hairline borders (`#27272A`).
  - **10% Focal Accent**: Electric cobalt (`#2563EB`) for primary actions and active states.
- **Typography**:
  - Display Headings: `Bricolage Grotesque` / `Plus Jakarta Sans` with tight tracking and balanced headlines.
  - Editorial Accents: `Playfair Display` for project indices.
  - Monospace Metrics & Build Commands: `JetBrains Mono` (`tabular-nums`).
- **Core Portfolio Sections & Interactive Flows**:
  - **3-Zone Top Bar**: Single-line brand wordmark (`Vijay Portfolio`), 4 single-line navigation links (`Work`, `Experience`, `Capabilities`, `Desktop Build`), and 1 primary CTA button (`Contact Vijay`).
  - **Split-Screen Hero + Full-Width Metrics Row**: Left column with intro, role, and primary actions; right column with high-resolution showcase artwork; full-width 4-metric strip directly below.
  - **Media-First Bento Project Showcase & Lightbox Modal**: Interactive category filter tabs (`All Projects`, `Full-Stack`, `Desktop & Systems`, `UI Architecture`), dynamic Bento grid, and full-screen project detail modal (`ESC` or `✕` to close).
  - **Experience & Capabilities**: Editorial numbered chapters (`01.`, `02.`, `03.`) and chronological career timeline with unboxed metadata (`·` separators).
  - **Interactive Windows `.exe` Build & Packaging Drawer/Section**: Allows inspecting and downloading the Electron source files (`electron/main.cjs`, `electron/preload.cjs`, `package.json`, `electron-builder.yml`, custom `.ico` icon generator) and provides one-click copyable CLI commands to build `Vijay-Portfolio-Setup.exe` locally on Windows.

---

## 3. Electron & Build Configuration Files

### A. `vite.config.ts`
- Set `base: './'` so all compiled JS, CSS, and image assets resolve cleanly via `file://` protocol when loaded inside the packaged Electron `.exe` while maintaining port 3000 dev server compatibility.

### B. `electron/main.cjs`
- Creates `BrowserWindow` (`width: 1280`, `height: 820`, `minWidth: 960`, `minHeight: 640`, `title: "Vijay Portfolio"`, `autoHideMenuBar: true`, `backgroundColor: "#09090b"`).
- Loads `http://localhost:3000` in development (`npm run electron:dev`) and `path.join(__dirname, '../dist/index.html')` in production.
- Configures `webPreferences`:
  - `contextIsolation: true`
  - `nodeIntegration: false`
  - `preload: path.join(__dirname, 'preload.cjs')`
- Routes external `http:` / `https:` / `mailto:` links to `shell.openExternal`.

### C. `electron/preload.cjs`
- Uses `contextBridge.exposeInMainWorld('electronAPI', ...)` to expose safe read-only platform metadata (`isDesktop: true`, `platform`, `appVersion`) and an `openExternal(url)` helper.

### D. Custom Application Icon (`build/icon.ico` & `public/icon.svg`)
- Generate a custom vector & multi-resolution `.ico` / `.png` portfolio monogram icon (`VP`) in `build/icon.ico` and `build/icon.png` for the Windows installer, desktop shortcut, and window taskbar icon.

### E. `package.json` Scripts & `electron-builder` Config
- **Scripts**:
  - `"dev"`: `"vite --port=3000 --host=0.0.0.0"`
  - `"build"`: `"vite build"`
  - `"electron:dev"`: `"concurrently -k \"vite --port=3000\" \"wait-on tcp:3000 && electron electron/main.cjs\""`
  - `"dist"`: `"npm run build && electron-builder --win --x64"`
- **`build` (electron-builder configuration)**:
  - `appId`: `"com.vijay.portfolio"`
  - `productName`: `"Vijay Portfolio"`
  - `directories.output`: `"dist"` (or `"release"` / `"dist"` configured so `dist/Vijay-Portfolio-Setup.exe` is emitted cleanly alongside portable build)
  - `win`:
    - `icon`: `"build/icon.ico"`
    - `target`: `[{ "target": "nsis", "arch": ["x64"] }, { "target": "portable", "arch": ["x64"] }]`
  - `nsis`:
    - `oneClick`: `false`
    - `allowToChangeInstallationDirectory`: `true`
    - `createDesktopShortcut`: `true`
    - `createStartMenuShortcut`: `true`
    - `shortcutName`: `"Vijay Portfolio"`
    - `artifactName`: `"Vijay-Portfolio-Setup.${ext}"`
  - `portable`:
    - `artifactName`: `"Vijay-Portfolio-Portable.${ext}"`

---

## 4. Verification & Delivery Checklist
1. Generate custom portfolio showcase visuals and icon assets.
2. Implement `electron/main.cjs`, `electron/preload.cjs`, `build/icon.ico`, `vite.config.ts` (`base: './'`), and `package.json` Electron configuration.
3. Build the complete **Vijay Portfolio** interface with smooth animations, project lightbox, contact flow, and Electron build/export helper.
4. Run `compile_applet` (`npm run build`) and `lint_applet` to verify zero TypeScript or asset path errors.
