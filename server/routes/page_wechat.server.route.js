/**
 * Created by zenghong on 2017/8/8.
 */

var index = require('../controllers/page_wechat');
var userFilter = require('../filters/user');

module.exports = function (app) {
  app.route('/page_wechat/page_home').get(userFilter.requireUser, index.page_home);
  app.route('/page_wechat/page_signin').get(index.page_signin);
};