const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

// Set Windows Application User Model ID for proper taskbar grouping and notifications
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
    if (fs.existsSync(candidate)) {
      return candidate;
    }
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

  // Hide default menu bar on Windows/Linux (accessible via Alt key if needed)
  Menu.setApplicationMenu(null);
  mainWindow.setMenuBarVisibility(false);

  // Prevent white flash by showing window only when ready-to-show
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Route target="_blank" and window.open links to the OS default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Prevent navigation away from the local portfolio app inside the Electron window
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const startUrl = process.env.ELECTRON_START_URL;
    const isDevLocal = startUrl && navigationUrl.startsWith(startUrl);
    const isFileLocal = navigationUrl.startsWith('file://');

    if (!isDevLocal && !isFileLocal) {
      event.preventDefault();
      if (isAllowedExternalUrl(navigationUrl)) {
        shell.openExternal(navigationUrl);
      }
    }
  });

  // Load development server URL or production build (dist/index.html)
  const devServerUrl = process.env.ELECTRON_START_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    const prodIndex = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(prodIndex);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ensure single application instance on Windows
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    ipcMain.handle('portfolio:open-external', async (_event, targetUrl) => {
      if (typeof targetUrl === 'string' && isAllowedExternalUrl(targetUrl)) {
        await shell.openExternal(targetUrl);
        return { ok: true };
      }
      return { ok: false, error: 'Unsupported URL protocol' };
    });

    ipcMain.handle('portfolio:get-runtime-info', () => ({
      appName: app.getName(),
      appVersion: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
      electronVersion: process.versions.electron,
      chromeVersion: process.versions.chrome,
      nodeVersion: process.versions.node,
      isPackaged: app.isPackaged,
    }));

    createMainWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
