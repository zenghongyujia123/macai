/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var async = require('async');
var Supply = appDb.model('Supply');
var Purchases = appDb.model('Purchases');
var MarketSupply = appDb.model('MarketSupply');
var MarketPurchases = appDb.model('MarketPurchases');
var MarketDayInfo = appDb.model('MarketDayInfo');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.market_save_photos = function (market, info, callback) {
  market.photos = info.photos;
  market.save(function (err) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  });
}

exports.market_detail = function (user, info, callback) {
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

  model.findOne({ _id: info.detail_id }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  });
}

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
  if (info.model_string === 'Purchases') {
    model = Purchases;
  }
  if (info.model_string === 'Supply') {
    model = Supply;
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
    MarketSupply.findOne({
      province: info.province,
      city: info.city,
      market: info.market,
      name: info.name,
    }, function (err, marketSupply) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
        return eachCallback();
      }
      if (!marketSupply) {
        marketSupply = new MarketSupply({
          province: info.province,
          city: info.city,
          market: info.market,
          name: info.name,
        });
      }

      marketSupply.main_goods = info.main_goods;
      marketSupply.time = info.time;
      marketSupply.identity = info.identity;
      marketSupply.phone = info.phone;
      marketSupply.save(function (err, result) {
        if (err) {
          console.error(new Date().toLocaleString(), err);
        }
        setTimeout(function () {
          return eachCallback();
        }, 500);
      });
    });
  }, function () {
    return callback(null, { success: true });
  });
}

exports.market_purchases_import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    MarketPurchases.findOne({
      province: info.province,
      city: info.city,
      market: info.market,
      name: info.name
    }, function (err, marketPurchases) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
        return eachCallback();
      }

      if (!marketPurchases) {
        marketPurchases = new MarketPurchases({
          province: info.province,
          city: info.city,
          market: info.market,
          name: info.name
        });
      }
      marketPurchases.main_goods = info.main_goods;
      marketPurchases.time = info.time;
      marketPurchases.identity = info.identity;
      marketPurchases.phone = info.phon;
      marketPurchases.save(function (err, result) {
        if (err) {
          console.error(new Date().toLocaleString(), err);
        }
        setTimeout(function () {
          return eachCallback();
        }, 500);
      });
    });
  }, function () {
    return callback(null, { success: true });
  });
}

exports.market_day_info_import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    MarketDayInfo.findOne({
      market: info.market,
      main_goods: info.main_goods,
      price: info.price,
      day: new Date(info.day)
    }, function (err, marketDayInfo) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
        return eachCallback();
      }

      if (marketDayInfo) {
        return eachCallback();
      }
      marketDayInfo = new MarketDayInfo({
        market: info.market,
        main_goods: info.main_goods,
        price: info.price,
        day: info.day
      });
      marketDayInfo.save(function (err, result) {
        if (err) {
          console.error(new Date().toLocaleString(), err);
        }
        setTimeout(function () {
          return eachCallback();
        }, 500);
      });
    });
  }, function () {
    return callback(null, { success: true });
  });
}

exports.supply_import = function (user, infos, callback) {
  async.eachSeries(infos, function (info, eachCallback) {


  });
}





