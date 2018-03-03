'use strict';

var cookieLib = require('../../libraries/cookie');
var userLogic = require('../logics/user');
exports.requireUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  if (!cookie.user_id) {
    return res.redirect('/page_wechat/page_signin');
  }
  userLogic.getById(cookie.user_id, function (err, user) {
    // userLogic.getById('5a7075812b63d50b8827e81d', function (err, user) {
    if (err || !user) {
      return res.redirect('/page_wechat/page_signin');
    }
    req.user = user;
    return next();
  });
};

exports.requirePostUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  // userLogic.getById(cookie.user_id, function (err, user) {
  userLogic.getById(cookie.user_id, function (err, user) {
    if (err) {
      return res.send(err);
    }

    if (!user) {
      return res.send({ err: { type: 'user_not_exist', message: '用户不存在' } });

    }
    req.user = user;
    return next();
  });
};

exports.requireByUserId = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var userid = req.body.user_id || req.query.user_id || '';
  // userLogic.getById(cookie.user_id, function (err, user) {
  userLogic.getById(userid, function (err, user) {
    if (err) {
      return res.send(err);
    }

    if (!user) {
      return res.send({ err: { type: 'user_not_exist', message: '用户不存在' } });

    }
    req.requireByUserId = user;
    return next();
  });
};