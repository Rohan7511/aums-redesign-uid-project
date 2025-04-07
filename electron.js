const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startURL = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'build/index.html')}`;
  console.log("Loading URL in Electron:", startURL); // Add this

  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
