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
  var user = req.user;
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_home.client.view.html');
  return res.render(filepath, {});

};
exports.page_signin = function (req, res, next) {
  // var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_list.client.view.html');
  var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
  return res.render(filepath, {});

  // wechatLogic.getUserAccessToken(req.query.code, function (err, result) {
  //   if (result.openid) {
  //     cookieLib.setCookie(res, 'openid', result.openid);
  //     cookieLib.setCookie(res, 'user_access_token', result.access_token);

  //     shippmentLogic.getUserWechatInfo(result.openid, function (err, userWechat) {
  //       if (userWechat) {
  //         var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
  //         return res.render(filepath, { username: userWechat.username, password: userWechat.password });
  //       }
  //       else {
  //         var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
  //         return res.render(filepath, { username: '', password: '' });
  //       }
  //     });
  //   }
  //   else {
  //     var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
  //     return res.render(filepath, { username: '', password: '' });
  //   }
  // });
};
exports.page_purchases_create_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_create_main.client.view.html');
  return res.render(filepath, {});
};
exports.page_purchases_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_list.client.view.html');
  return res.render(filepath, {});
};
exports.page_purchases_my_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_my_list.client.view.html');
  return res.render(filepath, {});
};
exports.page_purchases_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_detail.client.view.html');
  return res.render(filepath, { purchases: req.purchases });
};

exports.page_supply_create_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_create_main.client.view.html');
  return res.render(filepath, {});
};
exports.page_supply_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_list.client.view.html');
  return res.render(filepath, {});
};
exports.page_supply_my_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_my_list.client.view.html');
  return res.render(filepath, {});
};
exports.page_supply_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_detail.client.view.html');
  return res.render(filepath, {});
};

exports.page_market_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/market/page_market_list.client.view.html');
  return res.render(filepath, {});
};




