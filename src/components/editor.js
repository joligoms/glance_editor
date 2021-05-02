const CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlembedded/htmlembedded');
require('codemirror/mode/css/css');
require('codemirror/mode/sass/sass');
require('codemirror/mode/python/python');
require('codemirror/mode/vb/vb');
require('codemirror/mode/vbscript/vbscript');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/sql/sql');
require('codemirror/mode/php/php');
require('codemirror/mode/clike/clike');
require('codemirror/mode/pascal/pascal');
require('codemirror/mode/powershell/powershell');
require('codemirror/mode/shell/shell');
require('codemirror/addon/scroll/simplescrollbars')

const editor = function(){}

editor.prototype.createEditorInstance = function(editorMode, textAreaElement) {
    if (!textAreaElement) {
      textAreaElement = document.createElement('textarea')
      document.getElementById('editor_area').appendChild(textAreaElement)
    }
    let theme = global.config.data.appSettings.appearance.theme
    let thisEditor = new CodeMirror.fromTextArea(textAreaElement, {
        lineNumbers: true,
        theme: theme == 'dark' ? 'base16-dark' : 'base16-light',
        mode: editorMode,
        lineWrapping: true,
        scrollbarStyle: 'simple'
    });
    thisEditor.id = 12
    setTimeout(function () {
        thisEditor.refresh();
    }, 1);
    return thisEditor;
}

module.exports = editor;
