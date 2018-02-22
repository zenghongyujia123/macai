/**
 * Created by zenghong on 2017/8/8.
 */

var qiniu = require('../controllers/qiniu');

module.exports = function (app) {
  app.route('/api_token/qiniu/uptoken').get(qiniu.uptoken);
};