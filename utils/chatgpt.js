const request = require('request');
const rp = require('request-promise');

function sendMessage(text) {
  return new Promise((resolve, reject) => {
    rp({
      method: 'post',
      uri: 'https://api.ifthat.com/chatgpt-server/sendMessage',
      body: {
        message: text
      },
      json: true
    }).then(res => {
      resolve(res.message);
    }).catch(() => {
      reject('chatgpt server error')
    })
  });
};

module.exports = {
  sendMessage
}
