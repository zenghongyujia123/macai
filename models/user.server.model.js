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
    nickname: {
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
    wechat_info: {
      type: Schema.Types.Mixed
    },
    role: {
      type: String,
      trim: true
    },
    goal: {
      type: String
    },
    identity: {
      type: String,
    },
    vip_user: {
      type: Boolean,
      default: false
    },
    vip_user_time: {
      type: Date
    },
    vip_pay_info: {
      type: Schema.Types.Mixed
    },
    personal_auth_real_name: {
      type: String
    },
    personal_auth_id_number: {
      type: String
    },
    personal_auth_stauts: {
      type: String,
      enum: ['unauth', 'authing', 'authed'],
      default: 'unauth'
    },
    personal_auth_stauts_description: {
      type: String,
    },
    personal_auth_by_user: {
      type: String
    },
    personal_auth_time: {
      type: Date
    },
    personal_auth_id_front_photo: {
      type: String
    },
    personal_auth_id_back_photo: {
      type: String
    },
    personal_auth_id_real_photo: {
      type: String
    },
    read_message_time: {
      type: Date
    }
  });

  UserSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  var User = appDb.model('User', UserSchema);
};
