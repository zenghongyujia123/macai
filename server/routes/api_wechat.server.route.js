/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_wechat');
var payCtr = require('../controllers/api_wechat_pay');
var userFilter = require('../filters/user');
var goodsFilter = require('../filters/goods');

module.exports = function (app) {
  app.route('/api_wechat/send_verify_code').post(ctr.send_verify_code);
  app.route('/api_wechat/signin').post(ctr.signin);
  app.route('/api_wechat/get_choose_categorys').post(ctr.get_choose_categorys);
  app.route('/api_wechat/get_choose_brand').post(ctr.get_choose_brand);
  app.route('/api_wechat/get_choose_specs').post(ctr.get_choose_specs);

  app.route('/api_wechat/purchases/create_purchases').post(userFilter.requirePostUser, ctr.create_purchases);
  app.route('/api_wechat/purchases/my_purchases_list').post(userFilter.requirePostUser, ctr.my_purchases_list);
  app.route('/api_wechat/purchases/purchases_by_id').post(userFilter.requirePostUser, ctr.purchases_by_id)
  app.route('/api_wechat/purchases/supply_by_id').post(userFilter.requirePostUser, ctr.supply_by_id)
  app.route('/api_wechat/purchases/update_purchases_status').post(userFilter.requirePostUser, ctr.update_purchases_status)
  app.route('/api_wechat/purchases/increase_purchases_browse_count').post(userFilter.requirePostUser, ctr.increase_purchases_browse_count)
  app.route('/api_wechat/purchases/purchases_list').post(ctr.purchases_list)

  // app.route('/api_wechat/supply/supply_list').post(userFilter.requirePostUser, ctr.supply_list)
  app.route('/api_wechat/supply/create_supply').post(userFilter.requirePostUser, ctr.create_supply)
  app.route('/api_wechat/supply/update_supply_status').post(userFilter.requirePostUser, ctr.update_supply_status)
  app.route('/api_wechat/supply/my_supply_list').post(userFilter.requirePostUser, ctr.my_supply_list)
  app.route('/api_wechat/supply/increase_supply_browse_count').post(userFilter.requirePostUser, ctr.increase_supply_browse_count)
  app.route('/api_wechat/supply/supply_list').post(ctr.supply_list)
  app.route('/api_wechat/supply/has_supply').post(userFilter.requireUser, ctr.has_supply);
  // app.route('/api_wechat/shippments').post(ctr.shippments);
  // app.route('/api_wechat/uploadEvent').post(ctr.uploadEvent);
  // app.route('/api_wechat/createExpense').post(ctr.createExpense);
  // app.route('/api_wechat/getDeliveriedShippments').post(userFilter.requireUser, ctr.getDeliveriedShippments);
  app.route('/api_wechat/getUserJsApiTicket').post(ctr.getUserJsApiTicket);
  // app.route('/api_wechat/downloadPhoto').get(ctr.downloadPhoto);
  // app.route('/api_wechat/updateUserSetting').post(ctr.updateUserSetting);
  // app.route('/api_wechat/getUserSetting').post(ctr.getUserSetting);
  app.route('/api_wechat/auth/update_personal_auth_info').post(userFilter.requirePostUser, ctr.update_personal_auth_info);
  app.route('/api_wechat_pay/payment/get_pre_pay_id').post(userFilter.requirePostUser, payCtr.get_pre_pay_id);
  app.route('/api_wechat_pay/payment/get_pre_pay_info').post(userFilter.requirePostUser, payCtr.get_pre_pay_info);
  app.route('/api_wechat_pay/payment/vip_pay_notify_url').post(payCtr.vip_pay_notify_url);
  app.route('/api_wechat/purchases/purchases_offer_price').post(userFilter.requirePostUser,goodsFilter.requireSupply,goodsFilter.requirePurchases, ctr.purchases_offer_price)
  app.route('/api_wechat/purchases/un_read_offer_price_count').post(userFilter.requirePostUser, ctr.un_read_offer_price_count)

  app.route('/api_wechat/purchases/delete_purchases').post(userFilter.requirePostUser,goodsFilter.requirePurchases, ctr.delete_purchases)
  app.route('/api_wechat/supply/delete_supply').post(userFilter.requirePostUser,goodsFilter.requireSupply, ctr.delete_supply)
};