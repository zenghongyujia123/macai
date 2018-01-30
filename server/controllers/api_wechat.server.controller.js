/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var wechatLogic = require('../logics/wechat');
var userLogic = require('../logics/user');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();

exports.send_verify_code = function (req, res, next) {
  var username = req.body.username || '';
  if (!username) {
    return res.send({ err: { type: 'invalid_username', message: '无效的手机号' } });
  }
  smsLib.ypSendSmsVerifyCode(req.body.username, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}

exports.signin = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid || '';
  var role = req.body.role || '';
  var username = req.body.username;
  userLogic.signin({ openid: openid, username: username, role: role }, function (err, user) {
    if (err) {
      return res.send(err);
    }
    cookieLib.setCookie(res, 'user_id', user._id.toString());
    return res.send({ success: true });
  });
}

exports.create_purchases = function (req, res, next) {
  goodsLogic.create_purchases(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
}

exports.my_purchases_list = function (req, res, next) {
  goodsLogic.my_purchases_list(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
}

exports.purchases_by_id = function (req, res, next) {
  return res.send(req.purchases);
}

exports.supply_by_id = function (req, res, next) {
  return res.send(req.supply);
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
    {
      title: '单果重',
      list: ['60g以下', '60g以下', '60g以下', '60g以下', '60g以下', '60g以下', '60g以下']
    },
    {
      title: '种植方式',
      list: ['野生', '种植']
    },
    {
      title: '外皮颜色',
      list: ['黄色', '红色', '紫色', '黄麻', '红色']
    }
  ])
};

exports.get_choose_brand = function (req, res, next) {
  return res.send(['苹果', '栗子', '桃子', '苹果',]);
}





