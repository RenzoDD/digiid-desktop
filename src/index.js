const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
let myWindow = null;

if (__dirname.indexOf("app.asar") !== -1)
  global.path = __dirname.substring(0, __dirname.length - 23);
else
  global.path = __dirname.substring(0, __dirname.length - 4);

// handle url
var uri = process.argv[1] || '';
if (uri.startsWith('digiid://'))
  fs.writeFileSync(global.path + '/uri', uri);

// set default protocol
if (__dirname.indexOf("app.asar") !== -1)
  app.setAsDefaultProtocolClient('digiid')

// only one instance
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit();
}

app.whenReady().then(() => {
  myWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: __dirname + "\\views\\img\\icon.png",
    autoHideMenuBar: true,
    maximizable: false,
    resizable: false,
    show: false
  })
  myWindow.setAlwaysOnTop(true, 'screen');
  myWindow.loadFile(__dirname + '/views/index.html');
  myWindow.webContents.once('did-finish-load', function () { myWindow.show() });
})

app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})