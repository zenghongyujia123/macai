/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.signup = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', zh_message: '用户名不能为空' } });

  }
  if (!userInfo.password) {
    return callback({ err: { type: 'password_empty', zh_message: '用户密码不能为空' } });
  }

  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (user) {
      return callback({ err: { type: 'username_exist', zh_message: '该用户已存在' } });
    }

    user = new User({
      username: userInfo.username,
      openid: userInfo.openid
    });
    user.password = user.hashPassword(userInfo.password);
    user.save(function (err, saveUser) {
      if (err) {
        return callback({ err: sysErr.database_save_error });
      }
      return callback(null, { success: true, user_id: saveUser._id });
    });
  });
}

exports.signin = function (userInfo, callback) {
  if (!userInfo.username) {
    return callback({ err: { type: 'username_empty', message: '手机号不能为空' } });
  }


  User.findOne({ username: userInfo.username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    if (!user) {
      user = new User({ username: userInfo.username });
    }
    user.openid = userInfo.openid;

    User.update({ openid: userInfo.openid, username: { $ne: userInfo.username } }, { $set: { openid: null } }, function (err, result) {
      if (err) {
        console.error(err);
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

