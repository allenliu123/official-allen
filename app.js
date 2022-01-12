let http = require('http');
let wechat = require('wechat-public-nodejs');
let request = require('sync-request');

let Message = wechat.Message;
let message = new Message();

let port = 8085;

http.createServer(function(req, res) {
  
  message.save(req, res);

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

  message.onText(function(msg) {
    // message.reply(msg, `收到 ${msg.Content}`);
    if (msg === '1') {
      const str = request('get', 'https://file.ifthat.com/getText').getBody('utf8')
      const content = JSON.parse(str).content
      message.reply(msg, content);
    } else {
      message.reply(msg, '')
    }
  })

  message.onImage(function(msg) {
    message.reply(msg, `收到 image url: ${msg.PicUrl}`);
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

