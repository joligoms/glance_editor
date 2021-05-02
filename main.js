const { app, session, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

async function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 720,
        // autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    win.loadFile(path.join(__dirname, 'index.html'));
    win.removeMenu()
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
