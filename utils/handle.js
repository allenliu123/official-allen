const fs = require('fs');
const request = require('request');
const rp = require('request-promise');
const generateUUID = require('./uuid');
const loadconfig = require('./loadconfig');
const config = loadconfig()

function saveText(str) {
  return rp({
    method: 'post',
    uri: 'https://file.ifthat.com/postText',
    form: {
      textarea: str
    },
    json: true
  })
}

function saveImage(url) {
  const filename = 'wx' + generateUUID() + '-image.jpg'
  console.log(config.savePath);
  return new Promise((resolve, reject) => {
    let stream = fs.createWriteStream(config.savePath + filename);
    request({
      url: url,
      followRedirect: true,
      headers: {
        'User-Agent': 'Request-Promise'
      }
    }).pipe(stream).on('close', () => {
      console.log(filename + ' download success');
      resolve('https://file.ifthat.com/public/data/' + filename)
    }).on('error', (err) => {
      console.log(err)
      reject(err)
    });
  })
}

module.exports = {
  saveText,
  saveImage
}
