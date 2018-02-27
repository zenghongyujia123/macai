/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var User = appDb.model('User');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.backLogin = function (username, password, callback) {
  if (!username) {
    return callback({ err: { type: 'username_empty', message: '手机号不能为空' } });
  }
  if (!password) {
    return callback({ err: { type: 'password_empty', message: '密码不能为空' } });
  }

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    if (!user) {
      return callback({ err: { type: 'user_not_exist', message: '用户不存在' } });
    }

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
      user = new User({ username: userInfo.username, role: userInfo.role.split(' ')[1], goal: userInfo.role.split(' ')[0] });
    }
    user.openid = userInfo.openid;
    User.update({ openid: userInfo.openid, username: { $ne: userInfo.username } }, { $set: { openid: null, wechat_info: {} } }, function (err, result) {
      if (err) {
        console.error(err);
        return callback({ err: sysErr.database_save_error });
      }
      if (userInfo.wechat_info) {
        user.wechat_info = userInfo.wechat_info;
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

exports.list = function (user, info, callback) {
  info = info || {};
  info.last_item = info.last_item || {};
  var query = {};

  if (info.last_item.create_time) {
    query.create_time = { $lte: new Date(info.last_item.create_time) }
    query._id = { $ne: info.last_item._id };
  }

  User.count({}, function (err, count) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }

    User.find(query).sort({ create_time: -1 }).limit(10).exec(function (err, results) {
      if (err) {
        return callback({ err: sysErr.database_query_error });
      }
      return callback(null, { list: results, count: count });
    });
  });
}

