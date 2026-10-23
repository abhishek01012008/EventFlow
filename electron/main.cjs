const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const fs = require('fs');
const http = require('http');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 720,
    title: 'EventFlow — College Event Management & Participation System',
    backgroundColor: '#F5F7FB',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
  const distPath = path.join(__dirname, '../dist/index.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(devServerUrl).catch(() => {
      if (fs.existsSync(distPath)) {
        mainWindow.loadFile(distPath);
      }
    });
  } else {
    // Try connecting to Vite dev server first; if not running, immediately load built dist/index.html
    const req = http.get(devServerUrl, (res) => {
      if (res.statusCode === 200) {
        mainWindow.loadURL(devServerUrl);
      } else if (fs.existsSync(distPath)) {
        mainWindow.loadFile(distPath);
      }
    });
    req.on('error', () => {
      if (fs.existsSync(distPath)) {
        mainWindow.loadFile(distPath);
      } else {
        mainWindow.loadURL(devServerUrl).catch(() => {});
      }
    });
    req.setTimeout(800, () => {
      req.destroy();
      if (fs.existsSync(distPath)) {
        mainWindow.loadFile(distPath);
      }
    });
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Fallback: make sure the window is displayed even if network was slow
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show();
    }
  }, 1200);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('app-notification', (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'EventFlow Notification',
      body: body || '',
      silent: false
    }).show();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
