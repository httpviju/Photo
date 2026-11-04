const { contextBridge, ipcRenderer } = require('electron');

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
});
