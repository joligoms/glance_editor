const createActionButton = new(require('./actionButton'))
const glanceDialog = new(require('./dialogs.js'))

const footer = function(){}

let dictionaryFooter

footer.prototype.load = function() {
  dictionaryFooter = global.language.footer
  let footer = document.createElement('div');
  footer.id = 'footer';
  let bttGrammar = createActionButton.create('bttGrammar', '', () => global.helpTriggered ? glanceDialog.helpDialog(null, dictionaryFooter.title, dictionaryFooter.subtitle) : glanceDialog.grammarDialog())
  let grammar = global.editors.focusedEditor.getMode().name
  bttGrammar.innerHTML = grammar == 'null' ? 'Plain Text' : grammar;
  footer.appendChild(bttGrammar);
  return footer;
}

global.updateGrammar = function() {
  document.getElementById('bttGrammar').innerHTML = global.editors.focusedEditor.getMode().name == 'null' ? 'Plain Text' : global.editors.focusedEditor.getMode().name
  dictionaryFooter = global.language.footer
}

module.exports = footer;
