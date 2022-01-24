const fs   = require('fs');
const yaml = require('js-yaml');

module.exports = function () {
  try {
    const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
    return config
  } catch (e) {
    console.log(e);
  }
}