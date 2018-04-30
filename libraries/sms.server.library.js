'use strict';

var agent = require('superagent').agent();
var ypSmsUrl = 'http://yunpian.com/v1/sms/send.json';
var ypApikey = '3ffb93004c47dcd38eb73626ac4f0213';


exports.ypSendSmsVerifyCode = function (phone, callback) {
  var code = generateVerifyCode();
  if (process.env.NODE_ENV === 'test') {
    return callback();
  }

  agent.post(ypSmsUrl)
    .set('Accept', 'text/plain;charset=utf-8')
    .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    .send({
      apikey: ypApikey,
      mobile: phone,
      text: '【柱柱签收】您的验证码' + code + '，请在10分钟内使用。'
    })
    .end(function (err, res) {
      var resp = JSON.parse(res.text);
      if (err || resp.code != 0) {
        console.log('ypSendSmsVerifyCode', phone, code, err, res.text);
      }
      resp.verify_code = code;
      return callback(err, resp);
    });
};

function getTimeString(time) {
  if (!time) {
    return '';
  }
  if (time.getTime) {
    return time.format('yyyy-MM-DD hh:mm');
  }
  return time;
}



//不唯一
function generateVerifyCode() {
  var date = new Date();
  return '' + date.getHours() + date.getMinutes() + date.getSeconds();
};