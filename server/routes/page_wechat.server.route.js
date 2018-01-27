/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/').get(index.page_signin);
  app.route('/page_wechat/page_home').get(userFilter.requireUser, index.page_home);
  app.route('/page_wechat/page_signin').get(index.page_signin);

  app.route('/page_wechat/page_purchases_create_category').get(index.page_purchases_create_category);
  app.route('/page_wechat/page_purchases_create_breed').get(index.page_purchases_create_breed);
  app.route('/page_wechat/page_purchases_create_main').get(index.page_purchases_create_main);
  app.route('/page_wechat/page_purchases_create_specs').get(index.page_purchases_create_specs);
  app.route('/page_wechat/page_purchases_create_success').get(index.page_purchases_create_success);
  app.route('/page_wechat/page_purchases_create_supply_location').get(index.page_purchases_create_supply_location);
  app.route('/page_wechat/page_purchases_list').get(index.page_purchases_list);
  app.route('/page_wechat/page_purchases_detail').get(index.page_purchases_detail);
  app.route('/page_wechat/page_purchases_my_list').get(index.page_purchases_my_list);


  app.route('/page_wechat/page_supply_detail').get(index.page_supply_detail);
};