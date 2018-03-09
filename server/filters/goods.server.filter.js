'use strict';

var cookieLib = require('../../libraries/cookie');
var mongoose = require('./../../libraries/mongoose');
var goodsLogic = require('../logics/goods');
var appDb = mongoose.appDb;
var Supply = appDb.model('Supply');
var Banner = appDb.model('Banner');
var Purchases = appDb.model('Purchases');
var MarketSupply = appDb.model('MarketSupply');
var MarketPurchases = appDb.model('MarketPurchases');
var MarketDayInfo = appDb.model('MarketDayInfo');
exports.requirePurchases = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var purchases_id = req.body.purchases_id || req.query.purchases_id || '';
  // userLogic.getById(cookie.user_id, function (err, user) {
  goodsLogic.get_purchases_by_id(purchases_id, function (err, purchases) {
    if (err || !purchases) {
      return res.send({ err: { type: 'purchases_not_exist', message: '采购不存在' } });
    }
    req.purchases = purchases;
    return next();
  });
};

exports.requireSupply = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var supply_id = req.body.supply_id || req.query.supply_id || '';
  // userLogic.getById(cookie.user_id, function (err, user) {
  goodsLogic.get_supply_by_id(supply_id, function (err, supply) {
    if (err || !supply) {
      return res.send({ err: { type: 'supply_not_exist', message: '供应不存在' } });
    }
    req.supply = supply;
    return next();
  });
};


exports.requireMarket = function (req, res, next) {
  var info;
  if (req.body.model_string)
    info = req.body;
  if (req.query.model_string)
    info = req.query;
  var model;
  if (info.model_string === 'MarketSupply') {
    model = MarketSupply;
  }
  if (info.model_string === 'MarketPurchases') {
    model = MarketPurchases;
  }
  if (info.model_string === 'MarketDayInfo') {
    model = MarketDayInfo;
  }
  if (info.model_string === 'Purchases') {
    model = Purchases;
  }
  if (info.model_string === 'Supply') {
    model = Supply;
  }
  if (info.model_string === 'Banner') {
    model = Banner;
  }
  model.findOne({ _id: info.detail_id }, function (err, require_market) {
    if (err || !require_market) {
      return res.send({ err: { type: 'not_exist', message: '数据不存在' } });
    }
    req.require_market = require_market;
    return next();
  });
};



