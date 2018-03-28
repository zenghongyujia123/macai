/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
Purchases = appDb.model('Purchases');
Supply = appDb.model('Supply');
User = appDb.model('User');
Goods = appDb.model('Goods');
var sysErr = require('./../errors/system');

exports.create_purchases = function (user, info, callback) {
  var purchases = new Purchases({
    user: user._id,
    goods_name: info.goods_name || '',
    goods_class: info.goods_class || '',
    goods_category: info.goods_category || '',
    goods_brand: info.goods_brand || '',
    goods_specs: info.goods_specs || '',
    need_number: info.need_number || '',
    need_unit: info.need_unit || '',
    expect_price: info.expect_price || '',
    expect_price_unit: info.expect_price_unit || '',
    expect_address: info.expect_address || '',
    expect_province: info.expect_province || '',
    expect_city: info.expect_city || '',
    expect_district: info.expect_district || '',
    remark: info.remark || '',
    duration: info.duration || '',
    frequency: info.frequency || '',
    receive_province: info.receive_province || '',
    receive_city: info.receive_city || '',
    receive_district: info.receive_district || '',
    receive_address: info.receive_address || '',
    mobile_phone: info.mobile_phone || '',
    photos: info.photos || [],
  });


  var goods_specs_list = [];
  if (info.goods_class) {
    goods_specs_list.push({
      key: '大品类',
      value: info.goods_class
    });
  }
  if (info.goods_category) {
    goods_specs_list.push({
      key: '小品类',
      value: info.goods_category
    });
  }
  if (info.goods_brand) {
    goods_specs_list.push({
      key: '品种',
      value: info.goods_brand
    });
  }

  if (info.goods_specs) {
    info.goods_specs = info.goods_specs.replace('，', ',');
    var spesces = info.goods_specs.split(',');
    spesces.forEach(function (item) {
      item = item.split('|');
      if (item.length === 2) {
        goods_specs_list.push({
          key: item[0],
          value: item[1],
        })
      }
    })
  }
  purchases.goods_specs_list = goods_specs_list;
  purchases.save(function (err, savedPurchases) {
    if (err || !savedPurchases) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedPurchases);
  });

}
exports.update_purchases_status = function (user, purchases, status, callback) {
  purchases.status = status;
  purchases.save(function (err, savedPurchases) {
    if (err || !savedPurchases) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedPurchases);
  });
}
exports.my_purchases_list = function (user, info, callback) {
  var last_item = info.last_item || {};

  var query = {
    user: user._id,
  };
  var create_time = info.last_create_time || '';

  if (info.status) {
    query.status = info.status;
  }
  if (last_item.create_time) {
    query.create_time = { $lte: new Date(last_item.create_time) }
    query._id = { $ne: last_item._id };
  }

  Purchases.find(query).limit(10).sort({ create_time: -1 }).exec(function (err, list) {
    if (err || !list) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, list);
  });
}
exports.get_purchases_by_id = function (purchases_id, callback) {
  Purchases.findOne({ _id: purchases_id }).populate('user').exec(function (err, purchases) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, purchases);
  });
}
exports.increase_purchases_browse_count = function (purchases, callback) {
  Purchases.update({ _id: purchases }, { $inc: { browse_count: 1 } }, function (err, result) {
    if (err) {
      console.error(err);
    }
    return callback();
  })
}
exports.purchases_list = function (user, info, callback) {
  var last_item = info.last_item || {};

  var query = {
    deleted_status: { $ne: true },
    is_top: { $ne: true }
  };
  var create_time = info.last_create_time || '';

  if (last_item.create_time) {
    query.create_time = { $lte: new Date(last_item.create_time) }
    query._id = { $ne: last_item._id };
  }

  Purchases.find(query).limit(10).sort({ create_time: -1 }).populate('user').exec(function (err, list) {
    if (err || !list) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, list);
  });
}

exports.create_supply = function (user, info, callback) {
  var supply = new Supply({
    unpassed_reason: info.unpassed_reason || '',
    nickname: user.nickname || '-',
    user: user._id,
    mobile_phone: user.username,
    goods_name: info.goods_name,
    goods_category: info.goods_category,
    goods_brand: info.goods_brand,
    goods_specs: info.goods_specs,
    is_cash_goods: info.is_cash_goods,
    undercarriage_time: info.undercarriage_time,
    remark: info.remark,
    grounding_time: info.grounding_time,
    price: info.price,
    price_unit: info.price_unit,
    min_count: info.min_count,
    send_province: info.send_province,
    send_city: info.send_city,
    send_district: info.send_district,
    send_address: info.send_address,
    provide_services: info.provide_services.split(','),
    photos: info.photos,
  });

  var goods_specs_list = [];
  if (info.goods_class) {
    goods_specs_list.push({
      key: '大品类',
      value: info.goods_class
    });
  }
  if (info.goods_category) {
    goods_specs_list.push({
      key: '小品类',
      value: info.goods_category
    });
  }
  if (info.goods_brand) {
    goods_specs_list.push({
      key: '品种',
      value: info.goods_brand
    });
  }

  if (info.goods_specs) {
    info.goods_specs = info.goods_specs.replace('，', ',');
    var spesces = info.goods_specs.split(',');
    spesces.forEach(function (item) {
      item = item.split('|');
      if (item.length === 2) {
        goods_specs_list.push({
          key: item[0],
          value: item[1],
        })
      }
    })
  }
  supply.goods_specs_list = goods_specs_list;
  supply.save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });

}
exports.update_supply_status = function (user, supply, status, callback) {
  supply.status = status;
  supply.save(function (err, result) {
    if (err || !result) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, result);
  });
}
exports.my_supply_list = function (user, info, callback) {
  var last_item = info.last_item || {};

  var query = {
    user: user._id,
  };
  var create_time = info.last_create_time || '';

  if (info.status) {
    query.status = info.status;
  }
  if (last_item.create_time) {
    query.create_time = { $lte: new Date(last_item.create_time) }
    query._id = { $ne: last_item._id };
  }

  Supply.find(query).limit(10).sort({ create_time: -1 }).exec(function (err, list) {
    if (err || !list) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, list);
  });
}
exports.increase_supply_browse_count = function (supply, callback) {
  Supply.update({ _id: supply._id }, { $inc: { browse_count: 1 } }, function (err, result) {
    if (err) {
      console.error(err);
    }
    return callback();
  })
}
exports.supply_list = function (user, info, callback) {
  var last_item = info.last_item || {};

  var query = {
    deleted_status: { $ne: true },
    is_top: { $ne: true }
  };
  var create_time = info.last_create_time || '';

  if (last_item.create_time) {
    query.create_time = { $lte: new Date(last_item.create_time) }
    query._id = { $ne: last_item._id };
  }

  if (info.goods_category) {
    query.goods_category = info.goods_category;
  }


  Supply.find(query).populate('user').limit(10).sort({ create_time: -1 }).exec(function (err, list) {
    if (err || !list) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, list);
  });
}
exports.get_supply_by_id = function (id, callback) {
  Supply.findOne({ _id: id }).populate('user').exec(function (err, supply) {
    if (err) {
      return callback({ err: sysErr.database_query_error });
    }
    return callback(null, supply);
  });
}


