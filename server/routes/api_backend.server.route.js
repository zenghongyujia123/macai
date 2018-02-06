/**
 * Created by zenghong on 2017/8/8.
 */

var ctr = require('../controllers/api_backend');
var userFilter = require('../filters/user');
var goodsFilter = require('../filters/goods');

module.exports = function (app) {
  app.route('/api_backend/market_list').post(ctr.market_list);
  app.route('/api_backend/market_supply_import').post(ctr.market_supply_import);
  app.route('/api_backend/market_purchases_import').post(ctr.market_purchases_import);
  app.route('/api_backend/market_day_info_import').post(ctr.market_day_info_import);
};