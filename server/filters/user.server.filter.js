'use strict';

var cookieLib = require('../../libraries/cookie');
var mongoose = require('./../../libraries/mongoose');
var userLogic = require('../logics/user');
exports.requireUser = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  userLogic.getById(cookie.user_id, function (err, user) {
    if (err || !user) {
      return res.redirect('/page_wechat/page_signin');
    }
    req.user = user;
    return next();
  });
};