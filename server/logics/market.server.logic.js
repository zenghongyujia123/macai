/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var async = require('async');
var Supply = appDb.model('Supply');
var Banner = appDb.model('Banner');
var User = appDb.model('User');
var Purchases = appDb.model('Purchases');
var MarketSupply = appDb.model('MarketSupply');
var MarketPurchases = appDb.model('MarketPurchases');
var MarketDayInfo = appDb.model('MarketDayInfo');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

function getModel(str) {
  var model;
  if (str === 'MarketSupply') {
    model = MarketSupply;
  }
  if (str === 'MarketPurchases') {
    model = MarketPurchases;
  }
  if (str === 'MarketDayInfo') {
    model = MarketDayInfo;
  }
  if (str === 'Purchases') {
    model = Purchases;
  }
  if (str === 'Supply') {
    model = Supply;
  }

  if (str === 'User') {
    model = User;
  }
  if (str === 'Banner') {
    model = Banner;
  }
  return model;
}

exports.market_refresh_time = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.update({ _id: info.detail_id }, { $set: { create_time: new Date() } }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  });
}

exports.market_update_status = function (user, info, callback) {
  var model = getModel(info.model_string);
  var set = {};
  if (info.status === 'delete') {
    set.deleted_status = true;
  }

  if (['stop', 'passed', 'unpassed'].indexOf(info.status) >= 0) {
    set.status = info.status;
  }

  model.update({ _id: info.detail_id }, { $set: set }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  })
}

exports.market_make_top = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.update({ _id: info.detail_id }, { $set: { is_top: info.is_top } }, function (err) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  })
}

exports.market_get_top = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.find({ is_top: true }, function (err, results) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }

    return callback(null, results);
  })
}

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
  var model = getModel(info.model_string);
  model.findOne({ _id: info.detail_id }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, result);
  });
}

exports.market_list = function (user, info, callback) {
  var model = getModel(info.model_string);

  info = info || {};
  info.next = info.next || 'next';
  info.last_item = info.last_item || {};
  var query = {
    deleted_status: { $ne: true }
  };

  if (info.goods_category) {
    query.goods_category = info.goods_category;
  }

  model.count(query, function (err, count) {
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

exports.market_get_city = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.aggregate([
    {
      $group: {
        _id: { province: '$province', city: '$city' },
        province: { $first: '$province' },
        city: { $first: '$city' }
      }
    },
    {
      $group: {
        _id: '$_id.province',
        province: '$province',
        citys: { $push: '$city' }
      }
    }
  ]).exec(function (err, results) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}

exports.market_get_market = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.aggregate([
    {
      $match: {
        city: info.city
      }
    },
    {
      $group: {
        _id: '$market',
        name: { $first: '$market' }
      }
    }
  ]).exec(function (err, results) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}






