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
      goods_category: '水果',
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
      goods_category: '蔬菜',
      goods_name_list: [
        {
          first_pinyin: 'B',
          items: ['包谷菌', '白灵菇', '白菌', '白菜', '菠菜']
        },
        {
          first_pinyin: 'C',
          items: ['茶树菇', '葱仔', '慈菇', '菜苔']
        },
        {
          first_pinyin: 'D',
          items: ['地皮菜', '刀豆', '豆角', '冬瓜', '豆瓣菜']
        },
        {
          first_pinyin: 'E',
          items: ['鹅蛋菌', '儿菜']
        },
        {
          first_pinyin: 'F',
          items: ['凤尾菇', '发菜']
        },
        {
          first_pinyin: 'G',
          items: ['干巴菌', '贡菜']
        },
        {
          first_pinyin: 'H',
          items: ['海鲜菇', '黄金菇', '红薯叶', '葫芦', '黄花菜', '花菜', '胡萝卜', '红薯', '黄心菜']
        },
        {
          first_pinyin: 'J',
          items: ['鸡腿菇', '金针菇', '韭黄', '韭菜', '荠菜']
        },
        {
          first_pinyin: 'K',
          items: ['苦瓜', '空心菜']
        },
        {
          first_pinyin: 'L',
          items: ['灵芝菇', '鹿茸菇', '龙须菜', '辣椒', '莲藕', '萝卜', '凉薯', '萝卜菜']
        },
        {
          first_pinyin: 'M',
          items: ['木耳', '蘑菇', '迷迭香', '毛豆', '魔芋', '木薯', '木耳菜']
        },
        {
          first_pinyin: 'N',
          items: ['牛肝菌']
        },
        {
          first_pinyin: 'P',
          items: ['平菇', '盘菜']
        },
        {
          first_pinyin: 'Q',
          items: ['茄子', '秋葵', '芹菜']
        },
        {
          first_pinyin: 'S',
          items: ['松茸', '山野菜', '四季豆', '生姜', '蒜苔', '丝瓜', '山药']
        },
        {
          first_pinyin: 'T',
          items: ['土豆', '甜菜', '茼蒿']
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
  var dic = {
    '包谷菌': ['包谷菌', '其它品种'],
    '白灵菇': ['白灵菇', '其它品种'],
    '白菌': ['白菌', '其它品种'],
    '白菜': ['白菜', '其它品种'],
    '菠菜': ['菠菜', '其它品种'],
    '茶树菇': ['茶树菇', '其它品种'],
    '葱仔': ['葱仔', '其它品种'],
    '慈菇': ['慈菇', '其它品种'],
    '菜苔': ['菜苔', '其它品种'],
    '地皮菜': ['地皮菜', '其它品种'],
    '刀豆': ['刀豆', '其它品种'],
    '豆角': ['豆角', '其它品种'],
    '冬瓜': ['冬瓜', '其它品种'],
    '豆瓣菜': ['豆瓣菜', '其它品种'],
    '鹅蛋菌': ['鹅蛋菌', '其它品种'],
    '儿菜': ['儿菜', '其它品种'],
    '凤尾菇': ['凤尾菇', '其它品种'],
    '发菜': ['发菜', '其它品种'],
    '干巴菌': ['干巴菌', '其它品种'],
    '贡菜': ['贡菜', '其它品种'],
    '海鲜菇': ['海鲜菇', '其它品种'],
    '黄金菇': ['黄金菇', '其它品种'],
    '红薯叶': ['红薯叶', '其它品种'],
    '葫芦': ['葫芦', '其它品种'],
    '黄花菜': ['黄花菜', '其它品种'],
    '花菜': ['花菜', '其它品种'],
    '胡萝卜': ['胡萝卜', '其它品种'],
    '红薯': ['红薯', '其它品种'],
    '黄心菜': ['黄心菜', '其它品种'],
    '鸡腿菇': ['鸡腿菇', '其它品种'],
    '金针菇': ['金针菇', '其它品种'],
    '韭黄': ['韭黄', '其它品种'],
    '韭菜': ['韭菜', '其它品种'],
    '荠菜': ['荠菜', '其它品种'],
    '苦瓜': ['苦瓜', '其它品种'],
    '空心菜': ['空心菜', '其它品种'],
    '灵芝菇': ['灵芝菇', '其它品种'],
    '鹿茸菇': ['鹿茸菇', '其它品种'],
    '龙须菜': ['龙须菜', '其它品种'],
    '辣椒': ['辣椒', '其它品种'],
    '莲藕': ['莲藕', '其它品种'],
    '萝卜': ['萝卜', '其它品种'],
    '凉薯': ['凉薯', '其它品种'],
    '萝卜菜': ['萝卜菜', '其它品种'],
    '木耳': ['木耳', '其它品种'],
    '蘑菇': ['蘑菇', '其它品种'],
    '迷迭香': ['迷迭香', '其它品种'],
    '毛豆': ['毛豆', '其它品种'],
    '魔芋': ['魔芋', '其它品种'],
    '木薯': ['木薯', '其它品种'],
    '木耳菜': ['木耳菜', '其它品种'],
    '牛肝菌': ['牛肝菌', '其它品种'],
    '平菇': ['平菇', '其它品种'],
    '盘菜': ['盘菜', '其它品种'],
    '茄子': ['茄子', '其它品种'],
    '秋葵': ['秋葵', '其它品种'],
    '芹菜': ['芹菜', '其它品种'],
    '松茸': ['松茸', '其它品种'],
    '山野菜': ['山野菜', '其它品种'],
    '四季豆': ['四季豆', '其它品种'],
    '生姜': ['生姜', '其它品种'],
    '蒜苔': ['蒜苔', '其它品种'],
    '丝瓜': ['丝瓜', '其它品种'],
    '山药': ['山药', '其它品种'],
    '土豆': ['土豆', '其它品种'],
    '甜菜': ['甜菜', '其它品种'],
    '茼蒿': ['茼蒿', '其它品种'],

  }

  return
  res.send(dic[req.body.category]);
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





