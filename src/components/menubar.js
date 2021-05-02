const { dialog, remote, BrowserWindow } = require('electron').remote;
const fs = require('fs');
const glanceDialog = new (require('./dialogs'))();

const menubar = function () {};

let dictionaryMenubar;

menubar.prototype.load = function (menubarButtons) {
    let menuBarElement = document.createElement('header');
    menuBarElement.id = 'menu_bar';

    for (button in menubarButtons) {
        menuBarElement.appendChild(menubarButtons[button]);
    }

    return menuBarElement;
};

menubar.prototype.createNewFile = function () {
  if(!global.helpTriggered) {
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
        }
      })
    newWindow.loadFile('index.html')
    newWindow.removeMenu()
  } else {
    dictionaryMenubar = global.language.menubar
    glanceDialog.helpDialog('fa-file-medical', dictionaryMenubar.bttNewFile.title, dictionaryMenubar.bttNewFile.subtitle)
  }
};

menubar.prototype.openFile = function () {
  if(!global.helpTriggered){
    dialog.showOpenDialog({properties: ['openFile'] }).then((response) => {
        if (!response.canceled) {
          global.editors.focusedEditor.setValue(fs.readFileSync(response.filePaths[0]).toString())
          let ext = response.filePaths[0].split('.').pop();
          let mode = global.editorModes.find(x => x.ext == ext).mode
          global.editors.focusedEditor.setOption('mode', mode)
          global.updateGrammar()
        } else {
          console.log("no file selected");
        }
    })
  } else {
    dictionaryMenubar = global.language.menubar
    glanceDialog.helpDialog('fa-file-import', dictionaryMenubar.bttOpenFile.title, dictionaryMenubar.bttOpenFile.subtitle)
  }
};

menubar.prototype.saveFile = function () {
  if(!global.helpTriggered) {
    dialog.showSaveDialog().then({}).then((result) => {
      fs.writeFile(result.filePath, global.editors.focusedEditor.getValue(), (err) => {
        if (err !== null) {
          console.log(err);
        }
      })
    })
  } else {
    dictionaryMenubar = global.language.menubar
    glanceDialog.helpDialog('fa-save', dictionaryMenubar.bttSaveFile.title, dictionaryMenubar.bttSaveFile.subtitle )
  }
};

menubar.prototype.openAppSettings = function () {
    glanceDialog.appSettings();
};

module.exports = menubar;
