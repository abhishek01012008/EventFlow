const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  isElectron: true,
  appVersion: '1.0.0',
  sendNotification: (title, body) => ipcRenderer.send('app-notification', { title, body }),
  onUpdate: (callback) => ipcRenderer.on('app-update', (event, data) => callback(data))
});
