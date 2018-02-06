/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var purchasesLogic = require('../logics/purchases');
var marketLogic = require('../logics/market');
var wechatLogic = require('../logics/wechat');
var userLogic = require('../logics/user');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();

exports.market_list = function (req, res, next) {
  marketLogic.market_list(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_supply_import = function (req, res, next) {
  marketLogic.market_supply_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_purchases_import = function (req, res, next) {
  marketLogic.market_purchases_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_day_info_import = function (req, res, next) {
  marketLogic.market_day_info_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}


