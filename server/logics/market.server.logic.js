/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var async = require('async');
var Supply = appDb.model('Supply');
var Banner = appDb.model('Banner');
var User = appDb.model('User');
var Goods = appDb.model('Goods');
var moment = require('moment');
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
  if (str === 'Goods') {
    model = Goods;
  }
  return model;
}

exports.market_update = function (user, info, callback) {
  var model = getModel(info.model_string);
  model.update({ _id: info._id }, { $set: info }, function (err, result) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  })
}

exports.market_refresh_time = function (user, info, market, callback) {
  var set = { $set: { create_time: new Date() } };
  var model = getModel(info.model_string);
  market.refresh_info = market.refresh_info || {};
  var today = moment(new Date()).format('YYYY-MM-DD');
  if (!market.refresh_info.day) {
    market.refresh_info = { day: today, count: 0 };
  }

  if (market.refresh_info.day !== today) {
    market.refresh_info.day = today;
    market.refresh_info.count = 0;
  }

  if (market.refresh_info.count >= 3) {
    return callback({ err: { type: 'limit_count', message: '该货品今日已刷新超过3次！' } });
  }

  market.refresh_info.count += 1;

  if (info.price) {
    if (info.model_string === 'Purchases') {
      set.$set.expect_price = info.price;
    }
    else {
      set.$set.price = info.price;
    }
  }

  set.$set.refresh_info = market.refresh_info;

  model.update({ _id: info.detail_id }, set, function (err, result) {
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
  var query = { is_top: true, deleted_status: false };
  if (info.goods_category) {
    query.goods_category = info.goods_category;
  }
  model.find(query).populate('user').exec(function (err, results) {
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

  if (info.market) {
    query.market = info.market;
  }

  if (info.city) {
    query.city = info.city;
  }

  if (info.personal_auth_stauts) {
    query.personal_auth_stauts = info.personal_auth_stauts;
  }

  if (info.goal) {
    query.goal = info.goal;
  }

  if (info.keyword) {
    if (mongoose.isObjectId(info.keyword)) {
      query._id = info.keyword;
    }
    else {
      query.$or = [
        { username: info.keyword },
        { nickname: info.keyword },
        { mobile_phone: info.keyword },
        { phone: info.keyword },
        { main_goods: info.keyword },
        { goods_category: info.keyword }];
    }
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
        var skip_count = 9;
        if (info.skip_count) {
          skip_count = info.skip_count;
        }
        query.create_time = { $gte: new Date(info.last_item.create_time) }
        query._id = { $ne: info.last_item._id };
        model.find(query).sort({ create_time: 1 }).skip(skip_count).limit(10).exec(function (err, results) {
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

exports.market_day_info_list = function (user, info, callback) {
  info = info || {};
  info.next = info.next || 'next';
  info.last_item = info.last_item || {};
  var query = {
    deleted_status: { $ne: true }
  };
  if (info.market) {
    query.market = info.market;
  }
  if (info.last_item.market) {
    query.market = { $lt: info.last_item.market }
  }

  MarketDayInfo.aggregate([
    {
      $match: query
    },
    {
      $group: {
        _id: '$market',
        market: { $first: '$market' },
        list: { $push: '$$ROOT' }
      }
    }
  ]).sort({ market: -1 }).limit(10).exec(function (err, results) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}


exports.market_purchases_list = function (user, info, callback) {
  info = info || {};
  info.next = info.next || 'next';
  info.last_item = info.last_item || {};
  var query = {
    deleted_status: { $ne: true }
  };
  if (info.market) {
    query.market = info.market;
  }
  if (info.city) {
    query.city = info.city;
  }
  if (info.last_item.market) {
    query.market = { $lt: info.last_item.market }
  }

  MarketPurchases.aggregate([
    {
      $match: query
    },
    {
      $group: {
        _id: '$market',
        market: { $first: '$market' },
        list: { $push: '$$ROOT' }
      }
    }
  ]).sort({ market: -1 }).limit(10).exec(function (err, results) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
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
        }, 100);
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
      name: info.name,
    }, function (err, marketPurchases) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
        return eachCallback();
      }

      // if (!marketPurchases) {
      marketPurchases = new MarketPurchases({
        market_py: info.market_py,
        province: info.province,
        province_py: info.province_py,
        city_py: info.city_py,
        city: info.city,
        market: info.market,
        name: info.name
      });
      // }
      marketPurchases.day_sales = info.day_sales || '';
      marketPurchases.main_goods = info.main_goods;
      marketPurchases.time = info.time;
      marketPurchases.identity = info.identity;
      marketPurchases.phone = info.phone;
      marketPurchases.deleted_status = false;
      marketPurchases.save(function (err, result) {
        if (err) {
          console.error(new Date().toLocaleString(), err);
        }
        setTimeout(function () {
          return eachCallback();
        }, 100);
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
      day: new Date(info.day)
    }, function (err, marketDayInfo) {
      if (err) {
        console.error(new Date().toLocaleString(), err);
        return eachCallback();
      }

      if (!marketDayInfo) {
        marketDayInfo = new MarketDayInfo({
          market: info.market,
          main_goods: info.main_goods,
          day: info.day
        });
      }

      marketDayInfo.price = info.price;
      marketDayInfo.last_day_price = info.last_day_price;
      marketDayInfo.deleted_status = false;
      marketDayInfo.save(function (err, result) {
        if (err) {
          console.error(new Date().toLocaleString(), err);
        }
        setTimeout(function () {
          return eachCallback();
        }, 10);
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
        province_py: { $first: '$province_py' },
        city: { $first: '$city' }
      }
    },
    {
      $group: {
        _id: '$_id.province',
        province_py: { $first: '$province_py' },
        province: { $first: '$_id.province' },
        citys: { $push: '$city' }
      }
    },
    {
      $sort: {
        province_py: 1
      }
    }
  ]).exec(function (err, results) {
    console.log(results);
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, results);
  });
}

exports.market_get_market = function (user, info, callback) {
  var model = getModel(info.model_string);
  var query = {};
  if (info.city) {
    query.city = info.city;
  }
  model.aggregate([
    {
      $match: query
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






