// const createJSONConfig = new (require('./src/components/settingsRenderer'))
const BrowserWindow = require('electron').remote.getCurrentWindow()
const app = require('electron').remote.app
const fs = require('fs');
const langDictionary = require('./src/components/langDictionary.json')
global.editors = {}
global.editors.all = []

function createJSONConfig() {

  let data = `{
    "appSettings": {
      "appearance": {
        "theme": "dark"
      },
      "language": "en"
    },
    "firstTime": "true"
  }`

  fs.writeFile(global.configPath, data, finished)
  function finished() {
    console.log('loaded configs');
  }
}
////////
global.configPath = app.getPath('userData') + '/config.json'
console.log(global.configPath)
if(!fs.existsSync(global.configPath)) {
  console.log('doesnt exist');
  createJSONConfig()
}


//////// config
global.config = {}
global.config.data = fs.readFileSync(global.configPath);
global.config.data = JSON.parse(global.config.data);
//////// language
global.dictionary = langDictionary
global.language = global.dictionary[global.config.data.appSettings.language]
////////

const editor = new (require('./src/components/editor'));
const createActionButton = new(require('./src/components/actionButton'));
const toolbar = new (require('./src/components/toolbar'));
const footer =  new(require('./src/components/footer'))
const menubar = new (require('./src/components/menubar'));

function loadApp() {
    let root = document.getElementById('glance_editor');
    setAppTheme(global.config.data.appSettings.appearance.theme)
    let main = document.createElement('main');
    main.id = 'editor_area';
    root.appendChild(
        menubar.load({
            bttNewFile: createActionButton.create(
                'bttNewFile',
                'fa-file-medical',
                menubar.createNewFile
            ),
            bttOpenFile: createActionButton.create(
                'bttOpenFile',
                'fa-file-import',
                menubar.openFile
            ),
            bttSaveFile: createActionButton.create(
                'bttSaveFile',
                'fa-save',
                menubar.saveFile
            ),
            bttAppSettings: createActionButton.create(
                'bttAppSettings',
                'fa-cog',
                menubar.openAppSettings
            ),
        })
    );
    root.appendChild(main);
    let initEditor = editor.createEditorInstance('Plain Text', null);
    global.editors.focusedEditor = initEditor
    global.editors.focusedEditor.on('blur', function () { document.querySelector(".CodeMirror-cursors").style.visibility = 'visible'; });
    global.editors.all.push(initEditor)
    main.appendChild(toolbar.load({
        bttUndo: createActionButton.create(
            'bttUndo',
            'fa-undo',
            toolbar.undo
        ),
        bttRedo: createActionButton.create(
            'bttRedo',
            'fa-redo',
            toolbar.redo
        ),
        bttCopy: createActionButton.create(
            'bttCopy',
            'fa-copy',
            toolbar.copyText
        ),
        bttCut: createActionButton.create(
            'bttCut',
            'fa-cut',
            toolbar.cutText
        ),
        bttPaste: createActionButton.create(
            'bttPaste',
            'fa-paste',
            toolbar.pasteText
        ),
        bttSelectWord: createActionButton.create(
            'bttSelectWord',
            'fa-i-cursor',
            toolbar.selectWord
        ),
        bttSelectAll: createActionButton.create(
            'bttSelectAll',
            'fa-object-ungroup',
            toolbar.selectAll
        ),
        bttSelectLine: createActionButton.create(
            'bttSelectLine',
            'fa-grip-lines',
            toolbar.selectLine
        ),
        bttHelp: createActionButton.create(
            'bttHelp',
            'fa-question',
            toolbar.getHelp
        ),
        bttScrollUp: createActionButton.create(
          'scrollup',
          'fa-chevron-up',
          null
        ),
        bttScrollDown: createActionButton.create(
          'scrolldown',
          'fa-chevron-down',
          null
        )
    }));
    root.appendChild(footer.load())
}

function setAppTheme(theme) {
  document.body.classList.add(theme === 'dark' ? 'dark_theme' : 'light_theme')
}

window.onload = loadApp();

global.editors.focusedEditor.on('blur', () => {
    setTimeout(() => {
        global.editors.focusedEditor.focus();
    }, 0);
});

global.editors.focusedEditor.on('change', () => {
    global.needsSave = true
});
