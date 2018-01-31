'use strict';

var cookieLib = require('../../libraries/cookie');
var mongoose = require('./../../libraries/mongoose');
var goodsLogic = require('../logics/goods');
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
    if (err || !purchases) {
      return res.send({ err: { type: 'supply_not_exist', message: '供应不存在' } });
    }
    req.supply = supply;
    return next();
  });
};