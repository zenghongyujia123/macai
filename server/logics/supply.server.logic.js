/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Supply = appDb.model('Supply');
var async = require('async');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.list = function (user, info, callback) {
  info = info || {};
  info.last_item = info.last_item || {};
  var query = {};

  if (info.last_item.create_time) {
    query.create_time = { $lte: new Date(info.last_item.create_time) }
    query._id = { $ne: info.last_item._id };
  }

  Supply.count({}, function (err, count) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    Supply.find(query).sort({ create_time: -1 }).limit(10).exec(function (err, results) {
      if (err) {
        return callback({ err: sysErr.database_query_error });
      }
      return callback(null, { list: results, count: count });
    });
  });
}


exports.import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    create_supply(user, info, eachCallback);
  }, function (err) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  });
}

function create_supply(user, info, callback) {
  var supply = new Supply({
    unpassed_reason: info.unpassed_reason || '',
    // user: user._id,
    role: info.role,
    mobile_phone: info.mobile_phone,
    nickname: info.nickname,
    goods_name: info.goods_name,
    goods_class: info.goods_class,
    goods_category: info.goods_category,
    goods_brand: info.goods_brand,
    goods_specs: info.goods_specs,
    is_cash_goods: info.is_cash_goods,
    undercarriage_time: info.undercarriage_time,
    grounding_time: info.grounding_time,
    price: info.price,
    price_unit: info.price_unit,
    min_count: info.min_count,
    send_province: info.send_province,
    send_city: info.send_city,
    send_district: info.send_district,
    send_address: info.send_address,
    provide_services: info.provide_services_string.split('|'),
    provide_services_string: info.provide_services_string,
    photos: info.photos,
  });
  var goods_specs_list = [];
  if (info.goods_class) {
    goods_specs_list.push({
      key: '大品类',
      value: info.goods_class
    });
  }
  if (info.goods_category) {
    goods_specs_list.push({
      key: '小品类',
      value: info.goods_category
    });
  }
  if (info.goods_brand) {
    goods_specs_list.push({
      key: '品种',
      value: info.goods_brand
    });
  }

  if (info.goods_specs) {
    info.goods_specs = info.goods_specs.replace('，', ',');
    var spesces = info.goods_specs.split(',');
    spesces.forEach(function (item) {
      item = item.split('|');
      if (item.length === 2) {
        goods_specs_list.push({
          key: item[0],
          value: item[1],
        })
      }
    });
  }
  supply.goods_specs_list = goods_specs_list;
  supply.save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });

}




