const glanceDialog = new(require('./dialogs'))

const toolbar = function () {};

let dictionaryToolbar;


toolbar.prototype.load = function (toolbarButtons) {
    let toolbarElement = document.createElement('aside');
    toolbarElement.id = 'toolbar';

    global.editors.focusedEditor.scrollerUp = '';
    global.editors.focusedEditor.scrollerDown = '';
    for (button in toolbarButtons) {
        if (toolbarButtons[button].id.includes('scroll')) {
            if (toolbarButtons[button].id.includes('up')) {
                toolbarButtons[button].onmouseenter = () => {
                    global.editors.focusedEditor.scrollerUp = setInterval(
                        scroll_up,
                        15
                    );
                };
                toolbarButtons[button].onmouseleave = () => {
                  clearInterval(global.editors.focusedEditor.scrollerUp)
                }
            } else {
                toolbarButtons[button].onmouseenter = () => {
                    global.editors.focusedEditor.scrollerDown = setInterval(
                        scroll_down,
                        15
                    );
                };
                toolbarButtons[button].onmouseleave = () => {
                    clearInterval(global.editors.focusedEditor.scrollerDown);
                };
            }
        }
        toolbarButtons[button].classList.add('toolbar_button')
        toolbarElement.appendChild(toolbarButtons[button]);
    }

    return toolbarElement;
};

function scroll_up() {
    global.editors.focusedEditor.scrollTo(null, global.editors.focusedEditor.getScrollInfo().top - 10);
}

function scroll_down() {
    global.editors.focusedEditor.scrollTo(null, global.editors.focusedEditor.getScrollInfo().top + 10);
}

toolbar.prototype.undo = function () {
  if (!global.helpTriggered) {
    global.editors.focusedEditor.undo();
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-undo', dictionaryToolbar.bttUndo.title, dictionaryToolbar.bttUndo.subtitle)
  }
};

toolbar.prototype.redo = function () {
  if (!global.helpTriggered) {
    global.editors.focusedEditor.redo();
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-redo', dictionaryToolbar.bttRedo.title, dictionaryToolbar.bttRedo.subtitle)
  }
};

toolbar.prototype.copyText = function () {
  if (!global.helpTriggered) {
    if (!global.editors.focusedEditor.somethingSelected()) {
        this.selectWord();
    }
    navigator.clipboard.writeText(global.editors.focusedEditor.getSelection());
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-copy', dictionaryToolbar.bttCopy.title, dictionaryToolbar.bttCopy.subtitle)
  }
};

toolbar.prototype.cutText = function () {
  if (!global.helpTriggered) {
    if (global.editors.focusedEditor.somethingSelected()) {
        navigator.clipboard.writeText(
            global.editors.focusedEditor.getSelection()
        );
        global.editors.focusedEditor.replaceSelection('');
    }
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-cut', dictionaryToolbar.bttCut.title, dictionaryToolbar.bttCut.subtitle)
  }

};

toolbar.prototype.pasteText = function () {
  if (!global.helpTriggered) {
    let line = global.editors.focusedEditor.getCursor().line;
    let ch = global.editors.focusedEditor.getCursor().ch;
    let lastPosEmpty =
        (global.editors.focusedEditor.getLine(
            global.editors.focusedEditor.lastLine()
        ).length === ch &&
            global.editors.focusedEditor.getValue().slice(-1) === ' ') ||
        ch === 0;
    navigator.clipboard.readText().then((clipboardText) =>
        global.editors.focusedEditor.replaceRange(
            lastPosEmpty ? clipboardText : ' ' + clipboardText,
            {
                line,
                ch,
            }
        )
    );
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-paste', dictionaryToolbar.bttPaste.title, dictionaryToolbar.bttPaste.subtitle)
  }
};

toolbar.prototype.selectWord = function () {
  if(!global.helpTriggered) {
    let word = global.editors.focusedEditor.findWordAt(
        global.editors.focusedEditor.getCursor()
    );
    global.editors.focusedEditor.setSelection(word.anchor, word.head);
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-i-cursor', dictionaryToolbar.bttSelectWord.title, dictionaryToolbar.bttSelectWord.subtitle)
  }

};

toolbar.prototype.selectLine = function () {
  if(!global.helpTriggered) {
    let line = global.editors.focusedEditor.getCursor().line;
    let startLine = { line: line, ch: 0 };
    let endLine = {
        line: line,
        ch: global.editors.focusedEditor.getLine(line).length,
    };
    global.editors.focusedEditor.setSelection(startLine, endLine);
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-grip-lines', dictionaryToolbar.bttSelectLine.title, dictionaryToolbar.bttSelectLine.subtitle)
  }
};

toolbar.prototype.selectAll = function () {
  if(!global.helpTriggered) {
    global.editors.focusedEditor.execCommand('selectAll');
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-object-ungroup', dictionaryToolbar.bttSelectAll.title, dictionaryToolbar.bttSelectAll.subtitle)
  }
};

toolbar.prototype.getHelp = function () {
  if(!global.helpTriggered) {
    global.helpTriggered = true
    let elemArray = document.getElementsByTagName('button')
    for(el of elemArray) {
      if (!el.id.includes('scroll') && el.id != 'bttAppSettings') {
        el.style.cursor = 'help'
      }
    }
  } else {
    dictionaryToolbar = global.language.toolbar
    glanceDialog.helpDialog('fa-question', dictionaryToolbar.bttHelpButton.title, dictionaryToolbar.bttHelpButton.subtitle)
  }
};

module.exports = toolbar;

// bttPrettier: createActionButton.create(
//     'bttPrettier',
//     'fa-magic',
//     this.prettierFormat()
// ),
