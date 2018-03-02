/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var purchasesLogic = require('../logics/purchases');
var supplyLogic = require('../logics/supply');
var paymentLogic = require('../logics/payment');
var marketLogic = require('../logics/market');
var wechatLogic = require('../logics/wechat');
var userLogic = require('../logics/user');
var cookieLib = require('../../libraries/cookie');
var smsLib = require('../../libraries/sms');
var agent = require('superagent').agent();
var async = require('async');

exports.send_verify_code = function (req, res, next) {
  var username = req.body.username || '';
  if (!username) {
    return res.send({ err: { type: 'invalid_username', message: '无效的手机号' } });
  }
  smsLib.ypSendSmsVerifyCode(req.body.username, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.signin = function (req, res, next) {
  var cookie = cookieLib.getCookie(req);
  var openid = cookie.openid || '';
  var role = req.body.role || '';
  var username = req.body.username;
  console.log('cookie.wechat_info', cookie.wechat_info);
  var wechat_info = JSON.parse(decodeURIComponent(cookie.wechat_info || '{}'));
  userLogic.signin({ openid: openid, username: username, role: role, wechat_info: wechat_info }, function (err, user) {
    if (err) {
      return res.send(err);
    }
    cookieLib.setCookie(res, 'user_id', user._id.toString());
    return res.send({ success: true });
  });
}
exports.create_purchases = function (req, res, next) {
  var info = req.body || {};
  info.photos = info.photos || [];
  async.auto({
    getImages: function (autoCallback) {
      if (!info.wechat_server_ids && info.wechat_server_ids.length === 0) {
        return autoCallback();
      }
      async.eachSeries(info.wechat_server_ids, function (server_id, eachCallback) {
        wechatLogic.downloadImageFromWechatToQiniu(server_id, function (err, imageResult) {
          if (!err) {
            info.photos.push('http://p3tm0tvs2.bkt.clouddn.com/' + imageResult.key);
          }
          console.log(imageResult);
          return eachCallback();
        });

      }, function (err) {
        return autoCallback();
      });
    },
    create: ['getImages', function (autoCallback, autoReault) {
      goodsLogic.create_purchases(req.user, info, function (err, result) {
        return autoCallback(err, result)
      });
    }]
  }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result.create);
  });
}
exports.my_purchases_list = function (req, res, next) {
  goodsLogic.my_purchases_list(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  });
}
exports.purchases_by_id = function (req, res, next) {
  return res.send(req.purchases);
}
exports.supply_by_id = function (req, res, next) {
  return res.send(req.supply);
}
exports.update_purchases_status = function (req, res, next) {
  goodsLogic.update_purchases_status(req.user, req.body.status, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.increase_purchases_browse_count = function (req, res, next) {
  goodsLogic.increase_purchases_browse_count(req.user, req.purchases, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.purchases_list = function (req, res, next) {
  goodsLogic.purchases_list(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.create_supply = function (req, res, next) {
  var info = req.body || {};
  info.photos = info.photos || [];
  async.auto({
    getImages: function (autoCallback) {
      if (!info.wechat_server_ids && info.wechat_server_ids.length === 0) {
        return autoCallback();
      }
      async.eachSeries(info.wechat_server_ids, function (server_id, eachCallback) {
        wechatLogic.downloadImageFromWechatToQiniu(server_id, function (err, imageResult) {
          if (!err) {
            info.photos.push('http://p3tm0tvs2.bkt.clouddn.com/' + imageResult.key);
          }
          console.log(imageResult);
          return eachCallback();
        });

      }, function (err) {
        return autoCallback();
      });
    },
    create: ['getImages', function (autoCallback, autoReault) {
      goodsLogic.create_supply(req.user, info, function (err, result) {
        return autoCallback(err, result)
      });
    }]
  }, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result.create);
  });
}
exports.update_supply_status = function (req, res, next) {
  goodsLogic.update_supply_status(req.user, req.supply, req.body.status, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.my_supply_list = function (req, res, next) {
  goodsLogic.my_supply_list(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.increase_supply_browse_count = function (req, res, next) {
  goodsLogic.increase_supply_browse_count(req.user, req.supply, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.supply_list = function (req, res, next) {
  goodsLogic.supply_list(req.user, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
}
exports.get_choose_categorys = function (req, res, next) {
  return res.send([
    {
      goods_category: '蔬菜',
      goods_name_list: [
        {
          first_pinyin: 'B',
          items: ['八月瓜', '菠萝', '菠萝蜜', '百香果']
        },
        {
          first_pinyin: 'C',
          items: ['草莓', '橙子']
        },
        {
          first_pinyin: 'D',
          items: ['吊瓜', '蛋黄果']
        },
        {
          first_pinyin: 'G',
          items: ['甘蔗', '橄榄', '姑娘果']
        },
        {
          first_pinyin: 'H',
          items: ['哈密瓜', '火龙果', '黑莓', '黄桃']
        },
        {
          first_pinyin: 'L',
          items: ['荔枝', '龙眼', '榴莲', '蓝莓']
        },
        {
          first_pinyin: 'M',
          items: ['芒果', '木瓜', '猕猴桃', '毛桃']
        },
        {
          first_pinyin: 'N',
          items: ['牛油果', '柠檬', '牛奶果', '诺丽果']
        },
        {
          first_pinyin: 'P',
          items: ['葡萄', '苹果', '蟠桃', '枇杷']
        },
        {
          first_pinyin: 'Q',
          items: ['青梅']
        },
        {
          first_pinyin: 'R',
          items: ['人心果', '人参果']
        },
        {
          first_pinyin: 'N',
          items: ['牛油果', '柠檬', '牛奶果', '诺丽果']
        },
        {
          first_pinyin: 'W',
          items: ['无花果', '乌梅']
        },
        {
          first_pinyin: 'X',
          items: ['西瓜', '香蕉']
        },
        {
          first_pinyin: 'Y',
          items: ['椰子', '杨桃', '柚子']
        },
      ]
    },
    {
      goods_category: '水果',
      goods_name_list: [
        {
          first_pinyin: 'A',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'B',
          items: ['ssddd', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'C',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'D',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'E',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
        {
          first_pinyin: 'F',
          items: ['香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉', '香蕉',]
        },
      ]
    }
  ]);
};
exports.get_choose_specs = function (req, res, next) {
  return res.send([
    {
      title: '单果重',
      list: ['60g以下', '60g以下', '60g以下', '60g以下', '60g以下', '60g以下', '60g以下']
    },
    {
      title: '种植方式',
      list: ['野生', '种植']
    },
    {
      title: '外皮颜色',
      list: ['黄色', '红色', '紫色', '黄麻', '红色']
    }
  ])
};
exports.get_choose_brand = function (req, res, next) {
  return res.send(['苹果', '栗子', '桃子', '苹果',]);
}

exports.getUserJsApiTicket = function (req, res, next) {
  wechatLogic.getUserJsApiTicket(req.body.url, function (err, data) {
    return res.send(data);
  });
}

exports.update_personal_auth_info = function (req, res, next) {
  var info = req.body;
  wechatLogic.downloadImageFromWechatToQiniu(info.personal_auth_id_front_photo, function (err, imageResult) {
    if (!err) {
      info.personal_auth_id_front_photo = 'http://p3tm0tvs2.bkt.clouddn.com/' + imageResult.key;
    }
    wechatLogic.downloadImageFromWechatToQiniu(info.personal_auth_id_back_photo, function (err, imageResult) {
      if (!err) {
        info.personal_auth_id_back_photo = 'http://p3tm0tvs2.bkt.clouddn.com/' + imageResult.key;
      }
      wechatLogic.downloadImageFromWechatToQiniu(info.personal_auth_id_real_photo, function (err, imageResult) {
        if (!err) {
          info.personal_auth_id_real_photo = 'http://p3tm0tvs2.bkt.clouddn.com/' + imageResult.key;
        }
        userLogic.update_personal_auth_info(req.user, info, function (err, result) {
          if (err) {
            return res.send(err);
          }
          return res.send(result);
        })
      });
    });
  });
}





