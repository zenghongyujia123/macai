/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var userFilter = require('../filters/user');
var goodsFilter = require('../filters/goods');

module.exports = function (app) {
  app.route('/').get(index.page_home);
  app.route('/page_wechat/page_home').get(index.page_home);
  app.route('/page_wechat/page_signin').get(index.page_signin);

  // app.route('/page_wechat/page_purchases_create_main').get(index.page_purchases_create_main);
  app.route('/page_wechat/page_purchases_create_main').get(userFilter.requireUser, index.page_purchases_create_main);
  app.route('/page_wechat/page_purchases_create_price').get(userFilter.requireUser,goodsFilter.requirePurchases, index.page_purchases_create_price);
  app.route('/page_wechat/page_purchases_list').get(index.page_purchases_list);
  app.route('/page_wechat/page_purchases_price_list').get(userFilter.requireUser,index.page_purchases_price_list);
  app.route('/page_wechat/page_purchases_my_list').get(index.page_purchases_my_list);
  app.route('/page_wechat/page_purchases_detail').get(goodsFilter.requirePurchases, index.page_purchases_detail);

  app.route('/page_wechat/page_supply_create_main').get(userFilter.requireUser, index.page_supply_create_main);
  app.route('/page_wechat/page_supply_create_price').get(userFilter.requireUser, index.page_supply_create_price);
  // app.route('/page_wechat/page_supply_create_main').get(index.page_supply_create_main);
  app.route('/page_wechat/page_supply_list').get(index.page_supply_list);
  app.route('/page_wechat/page_supply_my_list').get(index.page_supply_my_list);
  app.route('/page_wechat/page_supply_detail').get(goodsFilter.requireSupply, index.page_supply_detail);

  // app.route('/page_market_list').get(userFilter.requireUser, index.page_market_list);
  app.route('/page_market_detail').get(userFilter.requireUser, index.page_market_detail);
  // app.route('/page_market_detail').get(index.page_market_detail);
  app.route('/page_market_list').get(index.page_market_list);
  // app.route('/page_market_purchases_list').get(userFilter.requireUser, index.page_market_purchases_list);
  app.route('/page_market_purchases_list').get(index.page_market_purchases_list);

  app.route('/page_vip_agree').get(userFilter.requireUser, index.page_vip_agree);

  app.route('/page_wechat/page_my_main').get(userFilter.requireUser, index.page_my_main);
  app.route('/page_wechat/page_my_auth').get(userFilter.requireUser, index.page_my_auth);
  app.route('/page_wechat/page_my_vip').get(userFilter.requireUser, index.page_my_vip);
  app.route('/page_wechat/page_my_message').get(userFilter.requireUser, index.page_my_message);

  app.route('/page_wechat/page_banner_detail').get(goodsFilter.requireMarket, index.page_banner_detail);
};