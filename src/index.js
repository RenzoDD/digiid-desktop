const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
let myWindow = null;


// handle url
var uri = process.argv[1] || '';
if (uri.startsWith('digiid://'))
  fs.writeFileSync(__dirname + '/uri', uri);

// set default protocol
app.setAsDefaultProtocolClient('digiid')

// only one instance
if (!app.requestSingleInstanceLock()) {
  app.quit()
  return;
}

app.whenReady().then(() => {
  myWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: __dirname + "\\views\\img\\logo.png",
    autoHideMenuBar: true,
    //maximizable: false,
    //resizable: false,
    show: false
  })
  //myWindow.setAlwaysOnTop(true, 'screen');
  myWindow.loadFile(__dirname + '\\views\\index.html');
  myWindow.webContents.once('did-finish-load', function () { myWindow.show() });
})

app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})