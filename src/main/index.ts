import { app, BrowserWindow, ipcMain } from 'electron'
import { join, resolve } from 'path'
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');
import * as fs from 'fs/promises'


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // Load your app
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

    win.webContents.openDevTools();

}
// Add these debug logs
console.log('App path:', app.getAppPath())
console.log('__dirname:', __dirname)
console.log('Preload path:', resolve(__dirname, '../preload/index.js'))

app.whenReady().then(() => {
  installExtension(VUEJS_DEVTOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
    .finally(() => {
      createWindow();
    });
});

ipcMain.handle('read-directory', async (_, path: string) => {
  try {
    return await fs.readdir(path)
  } catch (error) {
    throw error
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})