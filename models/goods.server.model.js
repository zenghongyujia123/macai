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
    goods_brand: {
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
    status: {
      type: String,
      enum: ['progress', 'stop', 'passed', 'unpassed'],
      default: 'progress'
    },
    unpassed_reason: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    browse_count: {
      type: Number,
      default: 0
    },
    goods_name: {
      type: String
    },
    goods_category: {
      type: String
    },
    goods_brand: {
      type: String
    },
    goods_specs: {
      type: String
    },
    need_number: {
      type: String
    },
    need_unit: {
      type: String
    },
    expect_province: {
      type: String
    },
    expect_city: {
      type: String
    },
    expect_district: {
      type: String
    },
    expect_price: {
      type: Number
    },
    expect_price_unit: {
      type: String
    },
    expect_address: {
      type: String
    },
    duration: {
      type: String
    },
    receive_province: {
      type: String
    },
    receive_city: {
      type: String
    },
    receive_district: {
      type: String
    },
    mobile_phone: {
      type: String
    },
    photos: {
      type: String
    },
    remark: {
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
    status: {
      type: String,
      enum: ['progress', 'stop', 'passed', 'unpassed'],
      default: 'progress'
    },
    unpassed_reason: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    browse_count: {
      type: Number,
      default: 0
    },
    goods_name: {
      type: String
    },
    goods_category: {
      type: String
    },
    goods_brand: {
      type: String
    },
    goods_specs: {
      type: String
    },
    is_cash_goods: {
      type: Boolean
    },
    undercarriage_time: {
      type: Date
    },
    grounding_time: {
      type: Date
    },
    price: {
      type: Number
    },
    price_unit: {
      type: String
    },
    min_count: {
      type: Number
    },
    send_province: {
      type: String
    },
    send_city: {
      type: String
    },
    send_district: {
      type: String
    },
    send_address: {
      type: String
    },
    provide_services: [{ type: String }],
    mobile_phone: {
      type: String
    },
    photos: {
      type: String
    },
    remark: {
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
