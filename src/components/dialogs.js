const glanceDialog = function () {};
const fs = require('fs')

let dictionarySettingsMenu
let dictionarySettingsOptions

glanceDialog.prototype.appSettings = function () {
    dictionarySettingsMenu = global.language.appSettings.settingsMenu
    dictionarySettingsOptions = global.language.appSettings.settingsOptions
    let settingsDialog = document.createElement('div');
    settingsDialog.id = 'dialog';
    let frameSettingsDialog = document.createElement('div');
    frameSettingsDialog.id = 'frame_settings_dialog';
    let settingsMenu = document.createElement('ul');
    settingsMenu.id = 'settings_menu';
    let settingsOptions = document.createElement('div');
    settingsOptions.id = 'settings_options';
    let bttOK = document.createElement('button');
    bttOK.id = 'buttonOK_settings_dialog';
    bttOK.appendChild(document.createTextNode('OK'));
    bttOK.onclick = () => this.closeCurrentDialog('dialog')
    settingsOptions.appendChild(bttOK);

    for (let item in dictionarySettingsMenu) {
        var li = document.createElement('li');
        li.innerHTML = dictionarySettingsMenu[item];
        li.id = `menuitem_${dictionarySettingsMenu[item]}`;
        li.onclick = () => this.loadSettingsOptions(dictionarySettingsMenu[item]);
        settingsMenu.appendChild(li);
    }

    frameSettingsDialog.appendChild(settingsMenu);
    frameSettingsDialog.appendChild(settingsOptions);

    settingsDialog.appendChild(frameSettingsDialog);
    document.body.appendChild(settingsDialog);
    settingsMenu.firstChild.click()
};

glanceDialog.prototype.loadSettingsOptions = function (option) {
  let settingsOptions = document.querySelector('#settings_options')
  while(settingsOptions.children.length > 1) {
    settingsOptions.removeChild(settingsOptions.lastChild)
  }
  if (option == dictionarySettingsMenu.appearance) {
    let titleTheme= document.createElement('h2')
    titleTheme.innerHTML = dictionarySettingsOptions.appearance.title
    let checkbox = document.createElement('input')
    checkbox.id = 'themeCheckbox'
    checkbox.setAttribute('type', 'checkbox')
    let label = document.createElement('label')
    label.innerHTML = dictionarySettingsOptions.appearance.label
    if (global.config.data.appSettings.appearance.theme == 'dark') {
      checkbox.checked = true
    }
    label.appendChild(checkbox)
    checkbox.onclick = global.setTheme

    settingsOptions.appendChild(titleTheme)
    settingsOptions.appendChild(label)
  }
  if (option == dictionarySettingsMenu.language) {
    function changeLanguage(language) {

    }
    let titleLanguage = document.createElement('h2')
    titleLanguage.innerHTML = dictionarySettingsOptions.language.title
    settingsOptions.appendChild(titleLanguage)
    let buttonEN = document.createElement('button')
    buttonEN.innerHTML = 'English'
    buttonEN.onclick = () => {
      global.changeLanguage('en')
    }
    let buttonPT = document.createElement('button')
    buttonPT.innerHTML = 'Português'
    buttonPT.onclick = () => {
      global.changeLanguage('pt')
    }

    settingsOptions.appendChild(buttonEN)
    settingsOptions.appendChild(buttonPT)
  }
}

glanceDialog.prototype.grammarDialog = function () {
    let dialogRoot = document.createElement('div');
    dialogRoot.id = 'dialog';
    let frameGrammarDialog = document.createElement('div');
    frameGrammarDialog.id = 'frame_grammar_dialog';

    let ul = document.createElement('ul');
    for (let item of global.editorModes) {
        var li = document.createElement('li');
        li.innerHTML = item.name;
        li.id = item.mode;
        if (item.mode == global.editors.focusedEditor.getMode().name) {
            li.id = 'active_mode';
        }
        li.onclick = () => {
            global.editors.focusedEditor.setOption('mode', item.mode);
            this.closeCurrentDialog('dialog')
            global.updateGrammar()
        };
        ul.appendChild(li);
    }

    frameGrammarDialog.appendChild(ul);
    dialogRoot.appendChild(frameGrammarDialog);
    document.body.appendChild(dialogRoot);
};

glanceDialog.prototype.helpDialog = function(icon, title, desc) {
  let dialogRoot = document.createElement('div');
  dialogRoot.id = 'dialog_help';
  let frame = document.createElement('div');
  frame.id = 'frame';
  let span = document.createElement('span')
  span.classList.add('fa', icon)
  let h1 = document.createElement('h1')
  h1.innerHTML = title
  let p = document.createElement('p')
  p.innerHTML = desc
  let okButton = document.createElement('button')
  okButton.id = 'buttonOK'
  okButton.innerHTML = 'OK'
  okButton.onclick = () => {
    global.helpTriggered = false
    for(elem of document.getElementsByTagName('button')) {
      elem.style.cursor = 'pointer'
    }
    this.closeCurrentDialog('dialog_help');
  }

  frame.appendChild(span)
  frame.appendChild(h1)
  frame.appendChild(p)
  frame.appendChild(okButton)
  dialogRoot.appendChild(frame)
  document.body.appendChild(dialogRoot)
}

glanceDialog.prototype.closeCurrentDialog = function (id) {
    document.getElementById(id).remove();
};

global.setTheme = function () {
  let theme = global.config.data.appSettings.appearance.theme
  global.config.data.appSettings.appearance.theme = theme == 'dark' ? 'light' : 'dark'
  theme = global.config.data.appSettings.appearance.theme
  let body = document.body
  body.className = theme == 'dark' ? 'dark_theme' : 'light_theme'
  global.editors.focusedEditor.setOption('theme', theme == 'dark' ? 'base16-dark' : 'base16-light')
  let data = JSON.stringify(global.config.data, null, 2)
  fs.writeFile(global.configPath, data, finished)
  function finished() {
    console.log('saved configs');
  }
}

global.changeLanguage = function(lang) {
  global.language = global.dictionary[lang]
  global.config.data.appSettings.language = lang
  let data = JSON.stringify(global.config.data, null, 2)
  fs.writeFile(global.configPath, data, finished)
  function finished() {
    console.log('saved configs');
  }
  global.updateGrammar()
  document.getElementById('dialog').remove();
  document.getElementById('bttAppSettings').click();
  document.getElementById('menuitem_Language').click();
}

module.exports = glanceDialog;
