/**
 * Created by zenghong on 2017/8/8.
 */
var mongoose = require('./../../libraries/mongoose');
var appDb = mongoose.appDb;
Purchases = appDb.model('Purchases');
User = appDb.model('User');
Goods = appDb.model('Goods');

exports.create_purchases = function (user, info, callback) {
  var purchases = new Purchases({
    user: user._id,
    goods_name: info.goods_name || '',
    goods_category: info.goods_category || '',
    goods_brand: info.goods_brand || '',
    goods_specs: info.goods_specs || '',
    need_number: info.need_number || '',
    need_unit: info.need_unit || '',
    expect_address: info.expect_address || '',
    expect_province: info.expect_province || '',
    expect_city: info.expect_city || '',
    expect_district: info.expect_district || '',
    remark: info.remark || '',
    duration: info.duration || '',
    receive_province: info.receive_province || '',
    receive_city: info.receive_city || '',
    receive_district: info.receive_district || '',
    receive_address: info.receive_address || '',
    mobile_phone: info.mobile_phone || '',
    photos: info.photos || [],
  });
  purchases.save(function (err, savedPurchases) {
    if (err || !savedPurchases) {
      return callback({ err: sysErr.database_save_error });
    }
    return callback(null, savedPurchases);
  });

}

exports.my_purchases_list = function (user, info, callback) {

}
