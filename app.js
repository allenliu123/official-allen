const http = require('http');
const wechat = require('wechat-public-nodejs');
const request = require('sync-request');
const {
  saveText,
  saveImage
} = require('./utils/handle');
const {
  sendMessage
} = require('./utils/chatgpt');

const Message = wechat.Message;
const message = new Message();

const port = 8087;

http.createServer(function(req, res) {
  
  message.save(req, res);
  // wechat.auth(req, res, '');

  // message.onEventAll(function(msg) {
  //   console.log(msg)
  //   // 点击获取文本
  //   if (msg.Event === 'CLICK' && msg.EventKey === 'GET_CONTENT') {
  //     const str = request('get', 'https://file.ifthat.com/getText').getBody('utf8')
  //     const content = JSON.parse(str).content
  //     message.reply(msg, content);
  //   } else {
  //     res.end('')
  //   }
  // })
  message.onEventClick(function(msg) {
    if (msg.EventKey === 'GET_CONTENT') {
      const str = request('get', 'https://file.ifthat.com/getText').getBody('utf8')
      const content = JSON.parse(str).content
      message.reply(msg, content);
    } else {
      res.end('')
    }
  })

  message.onEventSubscribe(function(msg) {
    message.reply(msg, '感谢关注');
  })

  // 收到文本
  message.onText(function(msg) {
    // message.reply(msg, `收到 ${msg.Content}`);
    if (msg.Content === '1') {
      const str = request('get', 'https://file.ifthat.com/getText').getBody('utf8');
      const content = JSON.parse(str).content;
      message.reply(msg, content);
    } else if (msg.Content.slice(0, 5) === 'chat:') {
      // 使用 chatgpt
      const content = msg.Content.slice(5)
      sendMessage(content)
        .then(res => message.reply(msg, res))
        .catch(err => message.reply(msg, err))
    } else {
      saveText(msg.Content).then(() => {
        message.reply(msg, 'saved your text');
      }).catch(() => {
        message.reply(msg, '');
      });
    }
  })

  // 收到图片
  message.onImage(function(msg) {
    saveImage(msg.PicUrl).then((url) => {
      message.reply(msg, 'upload success, there is ' + url);
    }).catch(() => {
      message.reply(msg, '');
    });
  })

  message.onVoice(function(msg) {
    message.reply(msg, `收到 voice: ${msg.MediaId}`);
  })

  message.onVideo(function(msg) {
    message.reply(msg, `收到 video: ${msg.MediaId}`);
  })

  message.onShortVideo(function(msg) {
    message.reply(msg, `收到 short video ${msg.MediaId}`);
  })

  message.onLocation(function(msg) {
    message.reply(msg, `收到 location x: ${msg.Location_X} y: ${msg.Location_Y}`);
  })

  message.onLink(function(msg) {
    message.reqly(msg, `收到 link title: ${msg.Title} description: ${msg.Description} url:${msg.Url}`);
  })

  // message.on('all', function(msg) {
  //   console.log('1212', msg);
  //   message.reply(msg, `收到 ${msg.Content}`);
  // })

}).listen(port)

console.log(`server start success in port ${port}`)

