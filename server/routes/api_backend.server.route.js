/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_backend');
var userFilter = require('../filters/user');
var goodsFilter = require('../filters/goods');

module.exports = function (app) {
  app.route('/api_backend/market_list').post(ctr.market_list);
  app.route('/api_backend/market_detail').post(ctr.market_detail);
  app.route('/api_backend/market_save_photos').post(goodsFilter.requireMarket, ctr.market_save_photos);
  app.route('/api_backend/signin').post(ctr.signin);
  app.route('/api_backend/market_supply_import').post(ctr.market_supply_import);
  app.route('/api_backend/market_purchases_import').post(ctr.market_purchases_import);
  app.route('/api_backend/market_day_info_import').post(ctr.market_day_info_import);
  app.route('/api_backend/purchases_import').post(ctr.purchases_import);
  app.route('/api_backend/supply_import').post(ctr.supply_import);
  app.route('/api_backend/update_personal_auth_info').post(userFilter.requireByUserId, ctr.update_personal_auth_info);
  app.route('/api_backend/market_make_top').post(ctr.market_make_top);
  app.route('/api_backend/market_update_status').post(ctr.market_update_status);
  app.route('/api_backend/market_refresh_time').post(ctr.market_refresh_time);
  app.route('/api_backend/create_banner').post(ctr.create_banner);
};