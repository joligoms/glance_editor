const createActionButton = function(){}

createActionButton.prototype.create = function (buttonId, fontAwesomeClass, onClickFunction) {
    let btt = document.createElement('button');
    btt.id = buttonId;
    btt.onclick = onClickFunction
    let icon = document.createElement('i');
    if (fontAwesomeClass !== '') {
      icon.classList.add('fa', fontAwesomeClass);
    }

    btt.appendChild(icon);
    return btt;
}

module.exports = createActionButton
