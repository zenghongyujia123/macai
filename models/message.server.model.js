/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var MessageSchema = new Schema({
    object: {
      type: String,
      default: 'Message'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    }
  });

  MessageSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Message', MessageSchema);
};
