/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var shippmentLogic = require('../logics/shippment');
var wechatLogic = require('../logics/wechat');
var moment = require('moment');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();

exports.page_home = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var username = cookie.userName;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_home.client.view.html');
  return res.render(filepath, {});
};
