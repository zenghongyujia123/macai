/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Purchases = appDb.model('Purchases');
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

