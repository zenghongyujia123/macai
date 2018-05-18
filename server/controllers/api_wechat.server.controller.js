/**
 * Created by zenghong on 2017/8/8.
 */
var path = require('path');
var goodsLogic = require('../logics/goods');
var purchasesLogic = require('../logics/purchases');
var messageLogic = require('../logics/message');

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
  var nickname = req.body.nickname;

  console.log('cookie.wechat_info', cookie.wechat_info);
  var wechat_info = JSON.parse(decodeURIComponent(cookie.wechat_info || '{}'));
  userLogic.signin({ openid: openid, username: username, nickname: nickname, role: role, wechat_info: wechat_info }, function (err, user) {
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

exports.has_supply = function (req, res, next) {
  supplyLogic.has_supply(req.user, { goods_category: req.body.goods_category }, function (err, result) {
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
  // var goods_list = 


  var arr = [];
  goodsLogic.get_choose_categorys(function(err,goods_list){
    var dic = {};
    goods_list.forEach(function (goods) {
      if (!dic[goods.goods_class]) {
        dic[goods.goods_class] = {};
      }
  
      if (!dic[goods.goods_class][goods.first_pinyin]) {
        dic[goods.goods_class][goods.first_pinyin] = [];
      }
  
      if (dic[goods.goods_class][goods.first_pinyin].indexOf(goods.goods_category) === -1) {
        dic[goods.goods_class][goods.first_pinyin].push(goods.goods_category)
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
  })


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
  goodsLogic.get_choose_specs(req.body.category,function(err,list){
    list = list.length!==0?list:[
      {
        title: '单果重',
        list: ['60g以下']
      },
      {
        title: '种植方式',
        list: ['野生', '种植']
      },
      {
        title: '外皮颜色',
        list: ['黄色', '红色', '紫色', '黄麻',]
      }
    ];
    return res.send(list)
  })
};
exports.get_choose_brand = function (req, res, next) {
  var brands = 
  goodsLogic.get_choose_brand(req.body.category,function(err,brands){
    var dic = {};
    brands.forEach(function (brand) {
      if (!dic[brand.goods_category]) {
        dic[brand.goods_category] = [];
      }
  
      if (dic[brand.goods_category].indexOf(brand.brand) === -1) {
        dic[brand.goods_category].push(brand.brand);
      }
    });
  
    return res.send(dic[req.body.category]);
  })

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

exports.purchases_offer_price = function (req, res, next) {
  purchasesLogic.purchases_offer_price(req.user, req.supply, req.purchases, req.body, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result)
  })
}


exports.un_read_offer_price_count = function (req, res, next) {
  purchasesLogic.un_read_offer_price_count(req.user, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send({ count: result })
  })
}

exports.delete_purchases = function (req, res, next) {
  purchasesLogic.delete_purchases(req.user, req.purchases, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send({ count: result })
  })
}

exports.delete_supply = function (req, res, next) {
  supplyLogic.delete_supply(req.user, req.supply, function (err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send({ count: result })
  })
}

exports.message_list = function (req, res, next) {
  messageLogic.message_list(req.user, {user_id:req.user._id.toString()}, function (err, results) {
    if (err) {
      return res.send(err);
    }
    return res.send(results);
  });
}













































































































































































































