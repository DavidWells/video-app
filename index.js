/**
 * This spawns the main electron thread
 */
'use strict'

const path = require('path')
const app = require('app')
const BrowserWindow = require('browser-window')

// report crashes to the Electron project
// report crashes to the Electron project
const crashReporter = require('crash-reporter')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://davidwell.io/contact',
  autoSubmit: true
})
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window being garbage collected
let mainWindow
var appIcon = null


function onClosed () {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null
}

function createMainWindow () {
  const is2nd = process.argv.indexOf('--2nd') >= 0

  var opts = {
    width: 620,
    height: 430,
    'accept-first-mouse': true,
    frame: false,
    'title-bar-style': 'hidden',
  }
  /* Make window transparent */
  var makeTransparent = true
  if (makeTransparent) {
    /**
     * Important Note:
     * Transparency is disabled when developer tools are open
     */
    /*
      Also you will need to add this CSS to your app
      html, body {
       background: rgba(0, 0, 0, 0)
      }
     */
    opts.transparent = true
    opts.frame = false
    opts.toolbar = false
  }

  if (is2nd) {
    setOptsForDualScreen(opts)
  }

  const win = new BrowserWindow(opts)
  if (process.env.DEV) {
    win.loadUrl('http://localhost:8000/dev.html')
    /* automatically open dev tools on start */
    // win.openDevTools()
  } else {
    win.loadUrl(`file://${__dirname}/index.html`)
  }
  win.on('closed', onClosed)



  return win
}

function setOptsForDualScreen(opts) {
  var atomScreen = require('screen')
  var displays = atomScreen.getAllDisplays()
  var d2 = displays.length > 1 ? displays[1] : null
  if (d2) {
    opts.x = d2.bounds.x + (d2.size.width - opts.width) / 2
    opts.y = d2.bounds.y + (d2.size.height - opts.height) / 2
  }
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate-with-no-open-windows', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()

  var alwaysOnTop = true
  if (alwaysOnTop) {
    /* set window to always be on top */
    mainWindow.setAlwaysOnTop(true)
  }
  var isFullScreen = false
  if (isFullScreen) {
    /* set window to always be fullScreen */
    mainWindow.setFullScreen(true)
  }

  if (process.env.DEV) {
    const watcher = require('./scripts/watcher.js')
    watcher.watch(app, ['./index.js', './scripts'])
  }

})
