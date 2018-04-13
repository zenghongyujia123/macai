
/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Purchases = appDb.model('Purchases');
var PurchasesOfferPrice = appDb.model('PurchasesOfferPrice');

// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');
var async = require('async');
var that = exports;

exports.list = function (user, info, callback) {
  info = info || {};
  info.last_item = info.last_item || {};
  var query = {
    deleted_status: { $ne: true },
    is_top: { $ne: true }
  };

  if (info.last_item.create_time) {
    query.create_time = { $lte: new Date(info.last_item.create_time) }
    query._id = { $ne: info.last_item._id };
  }

  Purchases.count({}, function (err, count) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    Purchases.find(query).sort({ create_time: -1 }).limit(10).populate('user.role').exec(function (err, results) {
      if (err) {
        return callback({ err: sysErr.database_query_error });
      }
      return callback(null, { list: results, count: count });
    });
  });
}

exports.import = function (user, infos, callback) {
  async.eachSeries(infos.list, function (info, eachCallback) {
    create_purchases(user, info, eachCallback);
  }, function (err) {
    if (err) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, { success: true });
  });
}

function create_purchases(user, info, callback) {
  var purchases = new Purchases({
    goods_name: info.goods_name || '',
    goods_class: info.goods_class || '',
    goods_category: info.goods_category || '',
    goods_brand: info.goods_brand || '',
    goods_specs: info.goods_specs || '',
    need_number: info.need_number || '',
    need_unit: info.need_unit || '',
    expect_price: info.expect_price || '',
    expect_min_price: info.expect_min_price || 0,
    expect_max_price: info.expect_max_price || 0,
    expect_price_unit: info.expect_price_unit || '',
    expect_address: info.expect_address || '',
    expect_province: info.expect_province || '',
    expect_city: info.expect_city || '',
    expect_district: info.expect_district || '',
    remark: info.remark || '',
    duration: info.duration || '',
    frequency: info.frequency || '',
    province_py: info.province_py || '',
    receive_province: info.receive_province || '',
    receive_city: info.receive_city || '',
    receive_district: info.receive_district || '',
    receive_address: info.receive_address || '',
    mobile_phone: info.mobile_phone || '',
    role: info.role || '',
    photos: info.photos || [],
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
    })
  }
  purchases.goods_specs_list = goods_specs_list;

  if (user) {
    purchases.user = user._id;
  }
  purchases.save(function (err, savedPurchases) {
    if (err || !savedPurchases) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedPurchases);
  });

}

exports.purchases_offer_price = function (user,supply, purchases, info, callback) {
  new PurchasesOfferPrice({
    supply:supply,
    purchases: purchases,
    purchases_user:purchases.user,
    price: info.price || 0,
    province: info.province,
    city: info.city,
    supply_count: info.supply_count || 0,
    supply_user: user._id,
    description: info.description || '',
  }).save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }

    return callback(null, result);
  });
}
