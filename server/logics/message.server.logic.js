/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
var Message = appDb.model('Message');
var User = appDb.model('User');
// var UserPay = appDb.model('UserPay');
var sysErr = require('./../errors/system');

var that = exports;

exports.message_create = function (user, info, callback) {
  new Message({
    user: info.user_id,
    content: info.content
  }).save(function (err, result) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}

exports.message_list = function (user, info, callback) {
  Message.find({ user: info.user_id }).sort({ create_time: -1 }).exec(function (err, message) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, message);
  });
}

exports.un_read_message_count = function (user, callback) {
  var query = {
    user_id: user._id
  };
  if (user.read_message_time) {
    query.create_time = { $gte: user.read_message_time };
  }

  Message.count(query, function (err, count) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, count);
  });
}

exports.update_user_read_message = function (user, callback) {
  var now = new Date();
  User.update({ _id: user._id }, { $set: { read_message_time: now } }, function (err, result) {
    if (err) {
      console.error(new Date().toLocaleString(), err);
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  })
}
