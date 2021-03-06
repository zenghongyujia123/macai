/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_backend');
var userFilter = require('../filters/user');
var goodsFilter = require('../filters/goods');

module.exports = function (app) {
  app.route('/api_backend/market_list').post(ctr.market_list);
  app.route('/api_backend/market_day_info_list').post(ctr.market_day_info_list);
  app.route('/api_backend/market_purchases_list').post(ctr.market_purchases_list);
  app.route('/api_backend/market_detail').post(ctr.market_detail);
  app.route('/api_backend/market_save_photos').post(goodsFilter.requireMarket, ctr.market_save_photos);
  app.route('/api_backend/signin').post(ctr.signin);
  app.route('/api_backend/market_supply_import').post(ctr.market_supply_import);
  app.route('/api_backend/market_purchases_import').post(ctr.market_purchases_import);
  app.route('/api_backend/market_day_info_import').post(ctr.market_day_info_import);
  app.route('/api_backend/purchases_import').post(ctr.purchases_import);
  app.route('/api_backend/supply_import').post(ctr.supply_import);
  app.route('/api_backend/goods_import').post(ctr.goods_import);
  app.route('/api_backend/update_personal_auth_info').post(userFilter.requireByUserId, ctr.update_personal_auth_info);
  app.route('/api_backend/market_make_top').post(ctr.market_make_top);
  app.route('/api_backend/market_get_top').post(ctr.market_get_top);
  app.route('/api_backend/market_update_status').post(ctr.market_update_status);
  app.route('/api_backend/market_refresh_time').post(goodsFilter.requireMarket, ctr.market_refresh_time);
  app.route('/api_backend/create_banner').post(ctr.create_banner);
  app.route('/api_backend/market_get_city').post(ctr.market_get_city);
  app.route('/api_backend/market_get_market').post(ctr.market_get_market);
  app.route('/api_backend/offer_price_list').post(ctr.offer_price_list);
  app.route('/api_backend/user_count_by_status').post(ctr.user_count_by_status);
  app.route('/api_backend/market_update').post(ctr.market_update);
  app.route('/api_backend/message_create').post(ctr.message_create);
  app.route('/api_backend/message_list').post(ctr.message_list);
  app.route('/api_backend/udpate_user_base_info').post(ctr.udpate_user_base_info);
};