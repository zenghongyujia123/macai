/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var crypto = require('crypto');
var cryptoLib = require('../../libraries/crypto');
var agent = require('superagent').agent();
var moment = require('moment');
var access_token = '';
var ticket = '';
var userLogic = require('./user.server.logic');


var appid = 'wx322186a972a5e048';
var sk = '175a1b9364e6c80c3689bde986368794';
// var appid = 'wx682b6bf0f5c1e84d';
// var sk = '51de065319b6dac43fcaa21a81b41d74';
var pay_sk = 'sdwewwwwdddddssss345444432wwwsss';
var mch_id = '1496512372';

var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var that = exports;
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

exports.getAccessToken = function (callback) {
  agent.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + sk)
    .end(function (err, result) {
      console.log('err-----');
      console.log(err);
      access_token = JSON.parse(result.text).access_token;

      that.getUserJsApiTicketFromWechat();
      callback(err, access_token);
    });
}

exports.getUserAccessToken = function (code, callback) {
  agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + sk + '&code=' + code + '&grant_type=authorization_code ')
    .end(function (err, result) {
      console.log(' code err-----');
      console.log(err);
      console.log('code  result-----');
      console.error(new Date());
      console.error(result.text);
      result = JSON.parse(result.text);
      // access_token = result.access_token;
      console.log('user_access_token : ', result.access_token);
      if (result.access_token) {
        that.getUserInfo(result.access_token, result.openid, function (err, wechat_info) {
          result.wechat_info = wechat_info;
          callback(err, result);
        });
      }
      else {
        callback(err, result);
      }
    });
}

exports.getUserInfo = function (user_access_token, openid, callback) {
  agent.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + user_access_token + '&openid=' + openid + '&lang=zh_CN')
    .end(function (err, result) {
      console.log(' getUserInfo err-----');
      console.log(err);
      console.log('getUserInfo  result-----');
      console.error(new Date());
      console.error(result.text);
      result = JSON.parse(result.text);
      // access_token = result.access_token;
      callback(err, result);
    });
}

exports.getUserJsApiTicketFromWechat = function () {
  agent.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi')
    .end(function (err, result) {
      ticket = JSON.parse(result.text).ticket;
      console.error(new Date());
      console.error(result.text);
      console.log('getUserJsApiTicket', ticket);
    })
}

exports.getUserJsApiTicket = function (url, callback) {
  var noncestr = new Date().getTime().toString();
  var timestamp = new Date().getTime();
  var str = [
    'jsapi_ticket=' + ticket,
    'noncestr=' + noncestr,
    'timestamp=' + timestamp,
    'url=' + url
  ];
  str = str.sort().join('&');
  console.log(str);
  var signature = cryptoLib.toSHA1(str);
  if (callback)
    callback(null, {
      ticket: ticket,
      noncestr: noncestr,
      timestamp: timestamp,
      signature: signature,
      appid: appid
    });
}

function getPhotoItemFromWechat(photoItem, wechatToken, callback) {

  var fileUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + wechatToken + '&media_id=' + photoItem.serverId;
  console.log('fileUrl ' + fileUrl);

  var qiniuUrlPath = cryptoLib.toBase64(fileUrl).replace(/\+/g, '-').replace(/\//g, '_') + '/to/' + cryptoLib.toBase64('zhuzhuqs:@' + photoItem.filename).replace(/\+/g, '-').replace(/\//g, '_');
  var sigingStr = '/fetch/' + qiniuUrlPath + '\n';
  var signBinary = crypto.createHmac('sha1', config.qiniu_s_key).update(sigingStr).digest();
  var base64Str = signBinary.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  var accessToken = config.qiniu_a_key + ':' + base64Str;

  console.log('accessToken: ' + accessToken);

  var url = 'http://iovip.qbox.me/fetch/' + qiniuUrlPath;

  superagent.post(url)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'QBox ' + accessToken)
    .send()
    .end(function (err, res) {
      callback(err, res.body);
    });
}

exports.downloadImageFromWechatToQiniu = function (serverId, callback) {
  var qiniu_a_key = '2ZL-HVYMoDc9m-nCnr1J_QDIJNRN8nfi3JWvWhtL';
  var qiniu_s_key = '7oeAB2iQIHovgxK4lNAaXhMEeqGWd3D-YigAkdlL';

  var fileUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + serverId;
  console.log('fileUrl ' + fileUrl);

  var qiniuUrlPath = cryptoLib.toBase64(fileUrl).replace(/\+/g, '-').replace(/\//g, '_') + '/to/' + cryptoLib.toBase64('maicai:' + serverId).replace(/\+/g, '-').replace(/\//g, '_');
  var sigingStr = '/fetch/' + qiniuUrlPath + '\n';
  var signBinary = crypto.createHmac('sha1', qiniu_s_key).update(sigingStr).digest();
  var base64Str = signBinary.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  var accessToken = qiniu_a_key + ':' + base64Str;

  console.log('qiniu accessToken: ' + accessToken);

  var url = 'http://iovip.qbox.me/fetch/' + qiniuUrlPath;

  agent.post(url)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'QBox ' + accessToken)
    .send()
    .end(function (err, res) {
      console.log('qiniu fetch res . body');
      callback(err, res.body);
    });
}

exports.downloadImageFromWechat = function (serverId, accessToken, operation, id, callback) {
  // access_token = '4_IIXrooJzi6z8VDgmlFnKDHGjpvnCdCbcNUlpYK9S9QFbDE4Jj0uqi-odXuwPbpAVJ-eIC9Fgmi6udWn4C2hm_OauSQin2KtVktiu2M9caJVSSB5IfRVXUxS3Q1IJYGjABAXMU'
  // serverId = 'KHQuIPRFSU05jXkJF30l6bz1b1w_SxXiOMhMI_Clxd5U8fwhGn7ZNFfHitwGDbpe';
  var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + serverId;
  agent
    .get(url)
    .end(function (err, result) {
      agent.post('https://cn-api.openport.com/delivery/shipments/' + id + '/upload/')
        .set({
          'x-openport-token': accessToken,
          'x-openPort-operation': operation === 'pod' ? 'delivery' : 'pickup'
        })
        .attach('file', result.body, new Date().getTime() + '.jpg')
        .on('error', function (err) {
          console.log(err);
          return callback();
        })
        .end(function (err, result) {
          console.log('err')
          console.log(err)
          console.log('result')
          console.log(result.text)
          return callback(JSON.parse(result.text));
        })
    });
}
setInterval(function () {
  that.getAccessToken(function () {
    console.log(new Date(), 'get access token ,', access_token);
  });
}, 360000)

that.getAccessToken(function () {
  console.log(new Date(), 'get access token ,', access_token);
});

exports.get_pre_pay_id = function (req, openid, user_id, callback) {
  // console.log('test  pay tEST ===============>');

  var jsonInfo = {
    xml: {
      appid: appid,
      mch_id: mch_id,
      device_info: 'web',
      nonce_str: new Date().getTime().toString(),
      sign_type: 'MD5',
      body: '卖菜帮，vip会员充值',
      out_trade_no: new Date().getTime().toString(),
      fee_type: 'CNY',
      detail: user_id,
      total_fee: 1,
      openid: openid,
      spbill_create_ip: getClientIp(req),
      notify_url: 'http://www.365mcb.com/api_wechat_pay/payment/vip_pay_notify_url',
      trade_type: 'JSAPI',
    }
  };

  var signArray = [];
  for (var prop in jsonInfo.xml) {
    signArray.push(prop + '=' + jsonInfo.xml[prop]);
  }
  signArray = signArray.sort();
  signArray.push('key=' + pay_sk);
  console.log(signArray.join('&'));
  jsonInfo.xml.sign = cryptoLib.toMd5(signArray.join('&')).toUpperCase();

  var builder = new xml2js.Builder();
  var xml = builder.buildObject(jsonInfo);

  console.log(xml);


  agent.post('https://api.mch.weixin.qq.com/pay/unifiedorder')
    .set('Content-Type', 'application/xml')
    .send(xml)
    .end(function (err, res) {
      console.log('get_pre_pay_id res.err =================================================================>');
      console.log(err);
      console.log('get_pre_pay_id res.body =================================================================>');
      console.log(res.text);

      parseString(res.text, { explicitArray: false, ignoreAttrs: true }, function (err, data) {
        return callback(null, data.xml);
      });
    });
  // // var json = parser.toJson(xml);
  // console.log("to json -> %s", json);
};


exports.get_pre_pay_info = function (prepay_id, callback) {
  console.log('prepay_id', prepay_id);
  var info = {
    appId: appid,
    timeStamp: new Date().getTime().toString(),
    nonceStr: new Date().getTime().toString(),
    package: 'prepay_id=' + prepay_id,
    signType: 'MD5',
  }

  var signArray = [];
  for (var prop in info) {
    signArray.push(prop + '=' + info[prop]);
  }
  signArray = signArray.sort();
  signArray.push('key=' + pay_sk);
  info.paySign = cryptoLib.toMd5(signArray.join('&')).toUpperCase();
  return info;
}

exports.vip_pay_notify_url = function (req, callback) {
  console.log(' notify_url = {------------>');
  console.log(req.body);
  var info = {
    appid: req.body.xml.appid[0],
    bank_type: req.body.xml.bank_type[0],
    cash_fee: req.body.xml.cash_fee[0],
    device_info: req.body.xml.device_info[0],
    fee_type: req.body.xml.fee_type[0],
    is_subscribe: req.body.xml.is_subscribe[0],
    mch_id: req.body.xml.mch_id[0],
    nonce_str: req.body.xml.nonce_str[0],
    openid: req.body.xml.openid[0],
    out_trade_no: req.body.xml.out_trade_no[0],
    result_code: req.body.xml.result_code[0],
    return_code: req.body.xml.return_code[0],
    sign: req.body.xml.sign[0],
    time_end: req.body.xml.time_end[0],
    total_fee: req.body.xml.total_fee[0],
    trade_type: req.body.xml.trade_type[0],
    transaction_id: req.body.xml.transaction_id[0]
  }
  if (info.result_code == 'SUCCESS' && info.openid) {
    userLogic.updateUserVipInfos(info, function (err, result) {
    });
  }

  console.log('vip_pay_notify_url', info);
  var json = {
    xml: {
      return_code: 'SUCCESS',
      return_msg: 'OK'
    }
  }
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(json);

  return callback(xml);
}









