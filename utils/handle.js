
var rp = require('request-promise');


const saveText = (str) => {
  return rp({
    method: 'post',
    uri: 'https://file.ifthat.com/postText',
    form: {
      textarea: str
    },
    json: true
  })
}

module.exports = {
  saveText
}
