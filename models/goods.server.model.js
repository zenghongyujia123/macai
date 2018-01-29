/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var GoodsSchema = new Schema({
    object: {
      type: String,
      default: 'Goods'
    },
    goods_name: {
      type: String
    },
    goods_category: {
      type: String
    },
    first_pinyin: {
      type: String
    }
  });

  GoodsSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Goods', GoodsSchema);

  var PurchasesSchema = new Schema({
    object: {
      type: String,
      default: 'Purchases'
    },
    goods_name: {
      type: String
    },
    goods_category: {
      type: String
    }
  });

  PurchasesSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Purchases', PurchasesSchema);

  var SupplySchema = new Schema({
    object: {
      type: String,
      default: 'Supply'
    },
    name: {
      type: String
    },
    category: {
      type: String
    },
    first_pinyin: {
      type: String
    }
  });

  SupplySchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  appDb.model('Supply', SupplySchema);

  var MarketSchema = new Schema({
    object: {
      type: String,
      default: 'Market'
    },
    type: {
      type: String,
      enum: ['growers', 'market'],
      default: 'market'
    },
    market_name: {
      type: String
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    username: {
      type: String
    },
    user_phone: {
      type: String
    },
    goods_name: {
      type: String
    },
    goods_price: {
      type: String
    }

  });

  MarketSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });

  appDb.model('Market', MarketSchema);

};
