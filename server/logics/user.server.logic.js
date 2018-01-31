/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.signin = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', message: '手机号不能为空' } });
  }

  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      user = new User({ username: userInfo.username, role: userInfo.role });
    }
    user.openid = userInfo.openid;
    User.update({ openid: userInfo.openid, username: { $ne: userInfo.username } }, { $set: { openid: null } }, function (err, result) {
      if (err) {
        console.error(err);
        return callback({ err: sysErr.database_save_error });
      }
      user.save(function (err, savedUser) {
        if (err) {
          console.error(err);
          return callback({ err: sysErr.database_save_error });
        }
        return callback(err, savedUser);
      });
    })
  });
};

exports.getById = function (user_id, callback) {
  User.findOne({ _id: user_id }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}

exports.getByOpenId = function (openid, callback) {
  User.findOne({ openid: openid }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, user);
  });
}

