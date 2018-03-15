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
      if (!info.wechat_server_ids || info.wechat_server_ids.length === 0) {
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
  });
}



exports.create_supply = function (req, res, next) {
  var info = req.body || {};
  info.photos = info.photos || [];
  async.auto({
    getImages: function (autoCallback) {
      if (!info.wechat_server_ids || info.wechat_server_ids.length === 0) {
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

  var goods_list = [
    { goods_category: '水果', first_pinyin: 'D', item: '吊瓜' },
    { goods_category: '水果', first_pinyin: 'D', item: '蛋黄果' },
    { goods_category: '水果', first_pinyin: 'D', item: '地稍瓜' },
    { goods_category: '水果', first_pinyin: 'F', item: '番石榴' },
    { goods_category: '水果', first_pinyin: 'G', item: '甘蔗' },
    { goods_category: '水果', first_pinyin: 'G', item: '橄榄' },
    { goods_category: '水果', first_pinyin: 'G', item: '姑娘果' },
    { goods_category: '水果', first_pinyin: 'G', item: '拐枣' },
    { goods_category: '水果', first_pinyin: 'G', item: '构桃' },
    { goods_category: '水果', first_pinyin: 'G', item: '钙果' },
    { goods_category: '水果', first_pinyin: 'G', item: '柑桔' },
    { goods_category: '水果', first_pinyin: 'H', item: '哈密瓜' },
    { goods_category: '水果', first_pinyin: 'H', item: '火龙果' },
    { goods_category: '水果', first_pinyin: 'H', item: '黑莓' },
    { goods_category: '水果', first_pinyin: 'H', item: '黄桃' },
    { goods_category: '水果', first_pinyin: 'H', item: '黄皮果' },
    { goods_category: '水果', first_pinyin: 'H', item: '红毛丹' },
    { goods_category: '水果', first_pinyin: 'H', item: '黑老虎' },
    { goods_category: '水果', first_pinyin: 'H', item: '火参果' },
    { goods_category: '水果', first_pinyin: 'H', item: '海红果' },
    { goods_category: '水果', first_pinyin: 'J', item: '金刺梨' },
    { goods_category: '水果', first_pinyin: 'J', item: '金桔' },
    { goods_category: '水果', first_pinyin: 'J', item: '九月瓜' },
    { goods_category: '水果', first_pinyin: 'L', item: '荔枝' },
    { goods_category: '水果', first_pinyin: 'L', item: '龙眼' },
    { goods_category: '水果', first_pinyin: 'L', item: '榴莲' },
    { goods_category: '水果', first_pinyin: 'L', item: '莲雾' },
    { goods_category: '水果', first_pinyin: 'L', item: '榴莲蜜' },
    { goods_category: '水果', first_pinyin: 'L', item: '蓝莓' },
    { goods_category: '水果', first_pinyin: 'L', item: '蓝靛果' },
    { goods_category: '水果', first_pinyin: 'L', item: '梨' },
    { goods_category: '水果', first_pinyin: 'L', item: '李子' },
    { goods_category: '水果', first_pinyin: 'L', item: '罗汉果' },
    { goods_category: '水果', first_pinyin: 'M', item: '芒果' },
    { goods_category: '水果', first_pinyin: 'M', item: '木瓜' },
    { goods_category: '水果', first_pinyin: 'M', item: '猕猴桃' },
    { goods_category: '水果', first_pinyin: 'M', item: '马蹄' },
    { goods_category: '水果', first_pinyin: 'M', item: '毛桃' },
    { goods_category: '水果', first_pinyin: 'M', item: '美藤果' },
    { goods_category: '水果', first_pinyin: 'N', item: '牛油果' },
    { goods_category: '水果', first_pinyin: 'N', item: '柠檬' },
    { goods_category: '水果', first_pinyin: 'N', item: '诺丽果' },
    { goods_category: '水果', first_pinyin: 'N', item: '牛奶果' },
    { goods_category: '水果', first_pinyin: 'P', item: '葡萄' },
    { goods_category: '水果', first_pinyin: 'P', item: '苹果' },
    { goods_category: '水果', first_pinyin: 'P', item: '蟠桃' },
    { goods_category: '水果', first_pinyin: 'P', item: '枇杷' },
    { goods_category: '水果', first_pinyin: 'Q', item: '青梅' },
    { goods_category: '水果', first_pinyin: 'R', item: '人心果' },
    { goods_category: '水果', first_pinyin: 'R', item: '人参果' },
    { goods_category: '水果', first_pinyin: 'S', item: '山竹' },
    { goods_category: '水果', first_pinyin: 'S', item: '树莓' },
    { goods_category: '水果', first_pinyin: 'S', item: '圣女果' },
    { goods_category: '水果', first_pinyin: 'S', item: '桑葚' },
    { goods_category: '水果', first_pinyin: 'S', item: '柿子' },
    { goods_category: '水果', first_pinyin: 'S', item: '树葡萄' },
    { goods_category: '水果', first_pinyin: 'S', item: '酸角' },
    { goods_category: '水果', first_pinyin: 'S', item: '沙棘果' },
    { goods_category: '水果', first_pinyin: 'S', item: '山楂' },
    { goods_category: '水果', first_pinyin: 'S', item: '沙果' },
    { goods_category: '水果', first_pinyin: 'S', item: '蛇果' },
    { goods_category: '水果', first_pinyin: 'S', item: '石榴' },
    { goods_category: '水果', first_pinyin: 'S', item: '释迦果' },
    { goods_category: '水果', first_pinyin: 'T', item: '甜瓜' },
    { goods_category: '水果', first_pinyin: 'T', item: '桃' },
    { goods_category: '水果', first_pinyin: 'W', item: '无花果' },
    { goods_category: '水果', first_pinyin: 'W', item: '乌梅' },
    { goods_category: '水果', first_pinyin: 'X', item: '西瓜' },
    { goods_category: '水果', first_pinyin: 'X', item: '香蕉' },
    { goods_category: '水果', first_pinyin: 'X', item: '香如蜜' },
    { goods_category: '水果', first_pinyin: 'X', item: '鲜枣' },
    { goods_category: '水果', first_pinyin: 'X', item: '杏' },
    { goods_category: '水果', first_pinyin: 'X', item: '雪莲果' },
    { goods_category: '水果', first_pinyin: 'X', item: '西梅' },
    { goods_category: '水果', first_pinyin: 'Y', item: '椰子' },
    { goods_category: '水果', first_pinyin: 'Y', item: '杨桃' },
    { goods_category: '水果', first_pinyin: 'Y', item: '余甘果' },
    { goods_category: '水果', first_pinyin: 'Y', item: '杨梅' },
    { goods_category: '水果', first_pinyin: 'Y', item: '油桃' },
    { goods_category: '水果', first_pinyin: 'Y', item: '樱桃' },
    { goods_category: '水果', first_pinyin: 'Y', item: '柚子' },
  ]


  var arr = [];

  var dic = {};
  goods_list.forEach(function (goods) {
    if (!dic[goods.goods_category]) {
      dic[goods.goods_category] = {};
    }

    if (!dic[goods.goods_category][goods.first_pinyin]) {
      dic[goods.goods_category][goods.first_pinyin] = [];
    }

    if (dic[goods.goods_category][goods.first_pinyin].indexOf(goods.item) === -1) {
      dic[goods.goods_category][goods.first_pinyin].push(goods.item)
    }
  });

  for (var proCategory in dic) {
    var category = { goods_category: proCategory, goods_name_list: [] };
    for (var pinyin in dic[proCategory]) {
      category.goods_name_list.push({
        first_pinyin: pinyin,
        items: dic[proCategory][pinyin]
      })
    }
    arr.push(category);
  }

  return res.send(arr);

//    {
  //     goods_category: '水果',
  //     goods_name_list: [
  //       {
  //         first_pinyin: 'B',
  //         items: ['八月瓜', '菠萝', '菠萝蜜', '百香果']
  //       },
  //       {
  //         first_pinyin: 'C',
  //         items: ['草莓', '橙子', '橙子']
  //       }
  //    ]
  //}


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

    '八月瓜': ['八月瓜', '其它水果'],
    '菠萝': ['菠萝', '其它水果'],
    '菠萝蜜': ['菠萝蜜', '其它水果'],
    '百香果': ['百香果', '其它水果'],
    '草莓': ['草莓', '其它水果'],
    '橙子': ['橙子', '其它水果'],
    '吊瓜': ['吊瓜', '其它水果'],
    '蛋黄果': ['蛋黄果', '其它水果'],
    '甘蔗': ['甘蔗', '其它水果'],
    '橄榄': ['橄榄', '其它水果'],
    '姑娘果': ['姑娘果', '其它水果'],
    '哈密瓜': ['哈密瓜', '其它水果'],
    '火龙果': ['火龙果', '其它水果'],
    '黑莓': ['黑莓', '其它水果'],
    '黄桃': ['黄桃', '其它水果'],
    '荔枝': ['荔枝', '其它水果'],
    '龙眼': ['龙眼', '其它水果'],
    '榴莲': ['榴莲', '其它水果'],
    '蓝莓': ['蓝莓', '其它水果'],
    '芒果': ['芒果', '其它水果'],
    '木瓜': ['木瓜', '其它水果'],
    '猕猴桃': ['猕猴桃', '其它水果'],
    '毛桃': ['毛桃', '其它水果'],
    '牛油果': ['牛油果', '其它水果'],
    '柠檬': ['柠檬', '其它水果'],
    '牛奶果': ['牛奶果', '其它水果'],
    '诺丽果': ['诺丽果', '其它水果'],
    '葡萄': ['葡萄', '其它水果'],
    '苹果': ['苹果', '其它水果'],
    '蟠桃': ['蟠桃', '其它水果'],
    '枇杷': ['枇杷', '其它水果'],
    '青梅': ['青梅', '其它水果'],
    '人心果': ['人心果', '其它水果'],
    '人参果': ['人参果', '其它水果'],
    '牛油果': ['牛油果', '其它水果'],
    '柠檬': ['柠檬', '其它水果'],
    '牛奶果': ['牛奶果', '其它水果'],
    '诺丽果': ['诺丽果', '其它水果'],
    '无花果': ['无花果', '其它水果'],
    '乌梅': ['乌梅', '其它水果'],
    '西瓜': ['西瓜', '其它水果'],
    '香蕉': ['香蕉', '其它水果'],
    '椰子': ['椰子', '其它水果'],
    '杨桃': ['杨桃', '其它水果'],
    '柚子': ['柚子', '其它水果'],
  }


  return res.send(dic[req.body.category]);
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

