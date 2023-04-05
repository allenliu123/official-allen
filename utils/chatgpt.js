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
      json: true,
      rejectUnauthorized: false
    }).then(res => {
      console.log(res)
      resolve(res?.message?.content);
    }).catch((err) => {
      console.log(err);
      reject('chatgpt server error')
    })
  });
};

module.exports = {
  sendMessage
}
