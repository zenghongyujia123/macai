/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var shippmentLogic = require('../logics/shippment');
var wechatLogic = require('../logics/wechat');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();


exports.signin = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid || '';
  var username = req.body.username;
  var password = req.body.password;

  agent.post('https://cn-api.openport.com/token/getMobiletoken')
    .send(
    {
      "device": {
        "identifyKey": "357990070920211",
        "deviceName": "LG-K350",
        "deviceType": "Android",
        "version": "6.0"
      },
      "app": {
        "appFrom": "",
        "appVersion": "5.4.0",
        "appId": "com.openport.delivery.uat"
      }, "networkType": "2",
      "language": "en",
      "regId": "de00d5cbc73d94ddff9c4c",
      "password": password,
      "userId": username
    }
    )
    .end(function (err, result) {
      result = JSON.parse(result.text)
      if (result.status === 200) {
        cookieLib.setCookie(res, 'accessToken', result.token.accessToken);
        cookieLib.setCookie(res, 'userName', result.user.userName);
        cookieLib.setCookie(res, 'phoneNumber', result.user.phoneNumber);
        cookieLib.setCookie(res, 'pic', result.user.pic);
        if (openid) {
          shippmentLogic.updateUserWechatInfo({ username: username, password: password, openid: openid }, function () { });
        }
      }
      console.log(result);
      return res.send(result);
    });
}

exports.get_choose_categorys = function (req, res, next) {
  return res.send([
    {
      goods_category: '蔬菜',
      goods_name_list: [
        {
          first_pinyin: 'A',
          items: ['sss', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'B',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'C',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'D',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'E',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'F',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
      ]
    },
    {
      goods_category: '水果',
      goods_name_list: [
        {
          first_pinyin: 'A',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'B',
          items: ['ssddd', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'C',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'D',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'E',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'F',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
      ]
    }
  ]);
};

exports.get_choose_specs = function (req, res, next) {
  return res.send([
    {}
  ])
};

exports.get_choose_brand = function (req, res, next) {
  return res.send(['苹果', '栗子', '桃子', '苹果',]);
}





