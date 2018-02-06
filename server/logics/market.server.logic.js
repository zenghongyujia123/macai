/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var async = require('async');
var MarketSupply = appDb.model('MarketSupply');
var MarketPurchases = appDb.model('MarketPurchases');
var MarketDayInfo = appDb.model('MarketDayInfo');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.market_list = function (user, info, callback) {
  var model = {};
  if (info.model_string === 'MarketSupply') {
    model = MarketSupply;
  }
  if (info.model_string === 'MarketPurchases') {
    model = MarketPurchases;
  }
  if (info.model_string === 'MarketDayInfo') {
    model = MarketDayInfo;
  }

  info = info || {};
  info.next = info.next || 'next';
  info.last_item = info.last_item || {};
  var query = {};


  model.count({}, function (err, count) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    if (info.last_item.create_time) {
      if (info.next === 'next') {
        query.create_time = { $lte: new Date(info.last_item.create_time) }
        query._id = { $ne: info.last_item._id };
        model.find(query).sort({ create_time: -1 }).limit(10).exec(function (err, results) {
          if (err) {
            return callback({ err: sysErr.database_query_error });
          }
          return callback(null, { list: results, count: count });
        });
      }
      else {
        query.create_time = { $gte: new Date(info.last_item.create_time) }
        query._id = { $ne: info.last_item._id };
        model.find(query).sort({ create_time: 1 }).skip(9).limit(10).exec(function (err, results) {
          if (err) {
            return callback({ err: sysErr.database_query_error });
          }
          return callback(null, { list: results, count: count });
        });
      }
    }
    else {
      model.find(query).sort({ create_time: -1 }).limit(10).exec(function (err, results) {
        if (err) {
          return callback({ err: sysErr.database_query_error });
        }
        return callback(null, { list: results, count: count });
      });
    }



  });
}

exports.market_supply_import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    new MarketSupply({
      province: info.province,
      city: info.city,
      market: info.market,
      name: info.name,
      main_goods: info.main_goods,
      time: info.time,
      identity: info.identity,
      phone: info.phone
    }).save(function (err, result) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
      }
      return eachCallback();
    });
  }, function () {
    return callback(null, { success: true });
  });
}

exports.market_purchases_import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    new MarketPurchases({
      province: info.province,
      city: info.city,
      market: info.market,
      name: info.name,
      main_goods: info.main_goods,
      time: info.time,
      identity: info.identity,
      phone: info.phone
    }).save(function (err, result) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
      }
      return eachCallback();
    });
  }, function () {
    return callback(null, { success: true });
  });
}

exports.market_day_info_import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    new MarketDayInfo({
      market: info.market,
      main_goods: info.main_goods,
      price: info.price,
      day: info.day
    }).save(function (err, result) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
      }
      return eachCallback();
    });
  }, function () {
    return callback(null, { success: true });
  });
}

