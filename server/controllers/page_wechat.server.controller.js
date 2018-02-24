/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var userLogic = require('../logics/user');
var goodsLogic = require('../logics/goods');
var wechatLogic = require('../logics/wechat');
var moment = require('moment');
var cookieLib = require('../../libraries/cookie');
var agent = require('superagent').agent();

exports.page_home = function (req, res, next) {
  var page = req.query.page || 'page_purchases_list';
  var filepath;

  wechatLogic.getUserAccessToken(req.query.code, function (err, result) {
    if (result.openid) {
      cookieLib.setCookie(res, 'openid', result.openid);
      cookieLib.setCookie(res, 'user_access_token', result.access_token);
    }
    if (page === 'page_purchases_list') {
      return res.redirect('/page_wechat/page_purchases_list');
    }
    else {
      return res.redirect('/page_wechat/page_supply_list');
    }
  });
};

exports.page_signin = function (req, res, next) {
  // var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_list.client.view.html');
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid;
  userLogic.getByOpenId(openid, function (err, user) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
    return res.render(filepath, { user: user || '' });
  });


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
  var purchases = req.purchases || {};
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_detail.client.view.html');
  goodsLogic.increase_purchases_browse_count(purchases, function () {
    return res.render(filepath, { purchases: req.purchases });
  });
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
  goodsLogic.increase_supply_browse_count(req.supply, function () {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_detail.client.view.html');
    return res.render(filepath, { supply: req.supply });
    // return res.render(filepath, { purchases: req.purchases });
  });
};

exports.page_market_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/market/page_market_list.client.view.html');
  return res.render(filepath, {});
};

exports.page_my_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_main.client.view.html');
  return res.render(filepath, {});
};

exports.page_my_auth = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_auth.client.view.html');
  return res.render(filepath, {});
};






