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
    //大品类
    goods_class: {
      type: String
    },
    //小品类
    goods_category: {
      type: String
    },
    //品种
    goods_brand: {
      type: String
    },
    first_pinyin: {
      type: String
    },
    deleted_status: {
      type: Boolean,
      default: false
    }
  });

  GoodsSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('Goods', GoodsSchema);
  var PurchasesOfferPriceSchema = new Schema({
    object: {
      type: String,
      default: 'PurchasesOfferPrice'
    },
    status: {
      type: String,
      enum:['unread','read'],
      default: 'unread'
    },
    supply: {
      type: Schema.Types.ObjectId,
      ref: 'Supply',
    },
    purchases: {
      type: Schema.Types.ObjectId,
      ref: 'Purchases',
    },
    purchases_user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: String,
    },
    supply_count: {
      type: String,
    },
    supply_user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    province: {
      type: String,
    },
    city: {
      type: String,
    },
    description: {
      type: String,
    }
  });
  PurchasesOfferPriceSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('PurchasesOfferPrice', PurchasesOfferPriceSchema);

  var PurchasesSchema = new Schema({
    object: {
      type: String,
      default: 'Purchases'
    },
    is_banner: {
      type: Boolean,
      default: false
    },
    is_top: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['stop', 'passed', 'unpassed'],
      default: 'passed'
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
    //大类
    goods_class: {
      type: String
    },
    //品类
    goods_category: {
      type: String
    },
    //品种
    goods_brand: {
      type: String
    },
    goods_specs: {
      type: String
    },
    goods_specs_list: [],
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
      type: String
    },
    expect_min_price: {
      type: Number
    },
    expect_max_price: {
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
    frequency: {
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
    photos: [{
      type: String
    }],
    remark: {
      type: String
    },
    role: {
      type: String
    },
    deleted_status: {
      type: Boolean,
      default: false
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
    is_banner: {
      type: Boolean,
      default: false
    },
    is_top: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['stop', 'passed', 'unpassed'],
      default: 'passed'
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
    goods_class: {
      type: String
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
    goods_specs_list: [],
    is_cash_goods: {
      type: Boolean
    },
    //下架时间
    undercarriage_time: {
      type: Date
    },
    //上架时间
    grounding_time: {
      type: Date
    },
    price: {
      type: Number
    },
    price_unit: {
      type: String
    },
    //起批量
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
    provide_services_string: {
      type: String
    },
    mobile_phone: {
      type: String
    },
    photos: [{
      type: String
    }],
    remark: {
      type: String
    },
    role: {
      type: String
    },
    nickname: {
      type: String
    },
    deleted_status: {
      type: Boolean,
      default: false
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
