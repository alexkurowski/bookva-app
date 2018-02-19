import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

function deleteChromeCache () {
  const chromeCacheDir = path.join(app.getPath('userData'), 'Cache')

  if(fs.existsSync(chromeCacheDir)) {
    const files = fs.readdirSync(chromeCacheDir)

    for(let i = 0; i < files.length; i++) {
      let filename = path.join(chromeCacheDir, files[i])

      if(fs.existsSync(filename)) {
        try {
          fs.unlinkSync(filename)
        }
        catch(error) {
          console.log(error)
        }
      }
    }
  }
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1000,
    height: 563,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#333231',
    icon: path.join(__dirname, 'icons/64x64.png'),
    webPreferences: {
      experimentalFeatures: true
    }
  })

  mainWindow.setMenu(null)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

deleteChromeCache()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
