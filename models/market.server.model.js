/**
 * Created by zenghong on 2017/8/8.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp'),
  crypto = require('crypto');

module.exports = function (appDb) {
  var MarketPurchasesSchema = new Schema({
    object: {
      type: String,
      default: 'MarketPurchases'
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    market: {
      type: String
    },
    name: {
      type: String
    },
    main_goods: {
      type: String
    },
    day_sales: {
      type: String
    },
    identity: {
      type: String
    },
    phone: {
      type: String
    }
  });

  MarketPurchasesSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('MarketPurchases', MarketPurchasesSchema);

  var MarketSupplySchema = new Schema({
    object: {
      type: String,
      default: 'MarketSupply'
    },
    name: {
      type: String
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    main_goods: {
      type: String
    },
    //供应商商品上市时间
    time: {
      type: String
    },
    identity: {
      type: String
    },
    phone: {
      type: String
    }
  });

  MarketSupplySchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('MarketSupply', MarketSupplySchema);


  var MarketDayInfoSchema = new Schema({
    object: {
      type: String,
      default: 'MarketDayInfo'
    },
    market: {
      type: String
    },
    main_goods: {
      type: String
    },
    last_day_price: {
      type: String
    },
    price: {
      type: String
    },
    day: {
      type: Date
    }
  });

  MarketDayInfoSchema.plugin(timestamps, {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  });
  appDb.model('MarketDayInfo', MarketDayInfoSchema);
};
