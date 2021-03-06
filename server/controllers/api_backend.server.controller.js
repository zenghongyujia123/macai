/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var messageLogic = require('../logics/message');
var purchasesLogic = require('../logics/purchases');
var supplyLogic = require('../logics/supply');
var marketLogic = require('../logics/market');
var wechatLogic = require('../logics/wechat');
var userLogic = require('../logics/user');
var bannerLogic = require('../logics/banner');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var moment = require('moment');
var agent = require('superagent').agent();

exports.signin = function (req, res, next) {
  var users = ['13472423583'];
  var passes = ['123456'];
  var index = users.indexOf(req.body.username);
  if (index === -1) {
    return res.send({ err: { type: 'invalid_account' } });
  }
  if (passes[index] !== req.body.password) {
    return res.send({ err: { type: 'invalid_password' } });
  }

  cookieLib.setCookie(res, 'back_username', req.body.username);
  return res.send({ success: true });
}

exports.market_list = function (req, res, next) {
  marketLogic.market_list(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_day_info_list = function (req, res, next) {
  marketLogic.market_day_info_list(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_purchases_list = function (req, res, next) {
  marketLogic.market_purchases_list(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_detail = function (req, res, next) {
  marketLogic.market_detail(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_save_photos = function (req, res, next) {
  marketLogic.market_save_photos(req.require_market, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}


exports.market_supply_import = function (req, res, next) {
  marketLogic.market_supply_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.goods_import = function (req, res, next) {
  goodsLogic.goods_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_purchases_import = function (req, res, next) {
  marketLogic.market_purchases_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.market_day_info_import = function (req, res, next) {
  marketLogic.market_day_info_import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.supply_import = function (req, res, next) {
  supplyLogic.import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.purchases_import = function (req, res, next) {
  purchasesLogic.import(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.update_personal_auth_info = function (req, res, next) {
  userLogic.update_personal_auth_info(req.requireByUserId, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}
exports.market_make_top = function (req, res, next) {
  marketLogic.market_make_top(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}
exports.market_get_top = function (req, res, next) {
  marketLogic.market_get_top(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}
exports.market_update = function (req, res, next) {
  marketLogic.market_update(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.create_banner = function (req, res, next) {
  bannerLogic.create_banner(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  })
}


exports.market_update_status = function (req, res, next) {
  marketLogic.market_update_status(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  })
}


exports.market_refresh_time = function (req, res, next) {
  var require_market = req.require_market || {};

  marketLogic.market_refresh_time(req.user, req.body,require_market, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  })
}


exports.market_get_city = function (req, res, next) {
  marketLogic.market_get_city(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  })
}

exports.market_get_market = function (req, res, next) {
  marketLogic.market_get_market(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  })
}

exports.offer_price_list = function (req, res, next) {
  purchasesLogic.offer_price_list(null, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.user_count_by_status = function (req, res, next) {
  userLogic.user_count_by_status(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send({ count: results });
  });
}

exports.message_create = function (req, res, next) {
  messageLogic.message_create(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.message_list = function (req, res, next) {
  messageLogic.message_list(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}

exports.udpate_user_base_info = function (req, res, next) {
  userLogic.udpate_user_base_info(req.user, req.body, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}












