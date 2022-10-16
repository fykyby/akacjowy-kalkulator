const { app, BrowserWindow } = require("electron");
// const isDev = require("electron-is-dev");
// const path = require("path");
require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // win.loadURL(
  //   isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "../build/index.html")}`
  // );
  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);
