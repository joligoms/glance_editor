const app = require('electron').remote.app
const fs = require('fs')


function createJSONConfig() {

  let data = `
  {
    "appSettings": {
      "appearance": {
        "theme": "dark"
      },
      "language": "en"
    },
    "firstTime": "true"
  }
  `

  global.configPath = app.getAppPath() + '/config.json'
  console.log(global.configPath)

  fs.writeFile(global.configPath, data, finished)
  function finished() {
    console.log('loaded configs');
  }
}

module.exports = createJSONConfig
