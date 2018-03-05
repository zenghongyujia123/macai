
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

function create_banner(user, info, callback) {
  var banner = new Banner({
    name: info.name,
    type: info.type,
    photos: info.photos
  });

  banner.save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}


