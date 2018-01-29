/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var UserSchema = new Schema({
    object: {
      type: String,
      default: 'User'
    },
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    openid: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    is_vip: {
      type: Boolean,
      default: false
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
};
