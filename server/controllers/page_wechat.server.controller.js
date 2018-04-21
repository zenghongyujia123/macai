/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var userLogic = require('../logics/user');
var goodsLogic = require('../logics/goods');
var purchasesLogic = require('../logics/purchases');
var wechatLogic = require('../logics/wechat');
var marketLogic = require('../logics/market');
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
      if (result.wechat_info) {
        cookieLib.setCookie(res, 'wechat_info', JSON.stringify(result.wechat_info));
      }
    }

    var url;

    if (page === 'page_purchases_list') {
      url = '/page_wechat/page_purchases_list';
    }
    else {
      url = '/page_wechat/page_supply_list';
    }
    return res.redirect(url);
  });
};

exports.page_signin = function (req, res, next) {
  // var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_list.client.view.html');
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid || '';
  userLogic.getByOpenId(openid, function (err, user) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/page_signin.client.view.html');
    return res.render(filepath, { user: user || '' });
  });
};
exports.page_purchases_create_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_create_main.client.view.html');
  return res.render(filepath, { user: req.user });
};

exports.page_purchases_create_price = function (req, res, next) {
  goodsLogic.my_supply_list(req.user, { goods_category: req.purchases.goods_category || '' }, function (err, results) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_create_price.client.view.html');
    return res.render(filepath, { purchases: req.purchases || {}, supplys: results });
  });
};

exports.page_purchases_list = function (req, res, next) {
  marketLogic.market_list(req.user, { model_string: 'Banner' }, function (err, results) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_list.client.view.html');
    return res.render(filepath, { banners: results.list || [] });
  })
};

exports.page_purchases_price_list = function (req, res, next) {
  purchasesLogic.offer_price_list(req.user, { purchases_id: req.query.purchases_id || '', status: req.query.status || '' }, function (err, results) {
    var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_price_list.client.view.html');
    return res.render(filepath, { prices: results || [] });
  })
};

exports.page_purchases_my_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_my_list.client.view.html');
  return res.render(filepath, {});
};
exports.page_purchases_detail = function (req, res, next) {
  var purchases = req.purchases || {};
  var filepath = path.join(__dirname, '../../web/c_wechat/views/purchases/page_purchases_detail.client.view.html');
  goodsLogic.increase_purchases_browse_count(purchases, function () {
    return res.render(filepath, { purchases: req.purchases, user: purchases.user || {} });
  });
};

exports.page_supply_create_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_create_main.client.view.html');
  return res.render(filepath, {});
};

exports.page_supply_create_price = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_create_price.client.view.html');
  return res.render(filepath, {});
};

exports.page_supply_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/supply/page_supply_list.client.view.html');
  return res.render(filepath);
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
  return res.render(filepath, { user: req.user || {} });
};

exports.page_vip_agree = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/vip/page_vip_agree.client.view.html');
  return res.render(filepath, { user: req.user || {} });
};

exports.page_market_detail = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/market/page_market_detail.client.view.html');
  return res.render(filepath, { user: req.user || {}, market: req.query.market });
};

exports.page_market_purchases_list = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/market/page_market_purchases_list.client.view.html');
  return res.render(filepath, { user: req.user || {}, market: req.query.market });
};

exports.page_my_main = function (req, res, next) {
  var filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_main.client.view.html');
  return res.render(filepath, { user: req.user });
};

exports.page_my_auth = function (req, res, next) {
  var filepath;
  if (req.user.personal_auth_stauts === 'unauth') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_auth.client.view.html');
  }
  else if (req.user.personal_auth_stauts === 'authing') {
    filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_auth_2.client.view.html');
  }
  else {
    filepath = path.join(__dirname, '../../web/c_wechat/views/my/page_my_auth_3.client.view.html');
  }

  return res.render(filepath, { user: req.user });
};

exports.page_my_vip = function (req, res, next) {
  return res.render(path.join(__dirname, '../../web/c_wechat/views/my/page_my_vip.client.view.html'), { user: req.user });
};

exports.page_banner_detail = function (req, res, next) {
  return res.render(path.join(__dirname, '../../web/c_wechat/views/banner/page_banner_detail.client.view.html'), { banner: req.require_market || {} });
};








