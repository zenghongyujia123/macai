/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var BannerSchema = new Schema({
    object: {
      type: String,
      default: 'Banner'
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    status: {
      type: String,
      enum: ['start', 'stop'],
      default: 'start'
    },
    photos: [{ type: String }]
  });

  BannerSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Banner', BannerSchema);
};
