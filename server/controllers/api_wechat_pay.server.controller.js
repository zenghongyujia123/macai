/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var purchasesLogic = require('../logics/purchases');
var supplyLogic = require('../logics/supply');
var paymentLogic = require('../logics/payment');
var marketLogic = require('../logics/market');
var wechatLogic = require('../logics/wechat');
var userLogic = require('../logics/user');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();
var async = require('async');

exports.get_pre_pay_id = function (req, res, next) {
  var user = req.user;
  wechatLogic.get_pre_pay_id(req, user.openid, user._id.toString(), function (err, result) {
    if (err) {
      return res.send(err);
    }

    return res.send(result);
  });
}

exports.get_pre_pay_info = function (req, res, next) {
  return res.send(wechatLogic.get_pre_pay_info(req.body.prepay_id));
}

exports.vip_pay_notify_url = function (req, res, next) {
  wechatLogic.vip_pay_notify_url(req, function (result) {
    return res.send(result);
  });
}