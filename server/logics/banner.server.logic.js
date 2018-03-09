
/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Banner = appDb.model('Banner');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');
var async = require('async');
var that = exports;

exports.create_banner = function (user, info, callback) {
  if (info._id) {
    Banner.update({ _id: info._id }, { $set: info }, function (err, result) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, result);
    })
  }
  else {
    new Banner(info).save(function (err, result) {
      if (err || !result) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, result);
    });
  }
}


