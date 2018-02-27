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
var appid = 'wx682b6bf0f5c1e84d';
var sk = '51de065319b6dac43fcaa21a81b41d74';

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
      callback(err, result);
    });
}
// exports.getUserAccessToken = function (code, callback) {
//   agent.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + sk + '&code=' + code + '&grant_type=authorization_code ')
//     .end(function (err, result) {
//       console.log(' code err-----');
//       console.log(err);
//       console.log('code  result-----');
//       console.log(result.text);
//       result = JSON.parse(result.text);
//       // access_token = result.access_token;
//       console.log('user_access_token : ', access_token);
//       callback(err, result);
//     });
// }



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
  // access_token = '4_IIXrooJzi6z8VDgmlFnKDHGjpvnCdCbcNUlpYK9S9QFbDE4Jj0uqi-odXuwPbpAVJ-eIC9Fgmi6udWn4C2hm_OauSQin2KtVktiu2M9caJVSSB5IfRVXUxS3Q1IJYGjABAXMU'
  // serverId = 'KHQuIPRFSU05jXkJF30l6bz1b1w_SxXiOMhMI_Clxd5U8fwhGn7ZNFfHitwGDbpe';
  // var url = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + serverId;
  // agent
  //   .get(url)
  //   .end(function (err, result) {
  //     agent.post('https://cn-api.openport.com/delivery/shipments/' + id + '/upload/')
  //       .set({
  //         'x-openport-token': accessToken,
  //         'x-openPort-operation': operation === 'pod' ? 'delivery' : 'pickup'
  //       })
  //       .attach('file', result.body, new Date().getTime() + '.jpg')
  //       .on('error', function (err) {
  //         console.log(err);
  //         return callback();
  //       })
  //       .end(function (err, result) {
  //         console.log('err')
  //         console.log(err)
  //         console.log('result')
  //         console.log(result.text)
  //         return callback(JSON.parse(result.text));
  //       })
  //   });



  var qiniu_a_key = '2ZL-HVYMoDc9m-nCnr1J_QDIJNRN8nfi3JWvWhtL';
  var qiniu_s_key = '7oeAB2iQIHovgxK4lNAaXhMEeqGWd3D-YigAkdlL';

  var fileUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + serverId;
  console.log('fileUrl ' + fileUrl);

  var qiniuUrlPath = cryptoLib.toBase64(fileUrl).replace(/\+/g, '-').replace(/\//g, '_') + '/to/' + cryptoLib.toBase64('maicai:' + 'http://p3tm0tvs2.bkt.clouddn.com/' + serverId).replace(/\+/g, '-').replace(/\//g, '_');
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





