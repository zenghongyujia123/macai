function get_choose_markets(city, model_string, callback) {
  $.ajax({
    url: '/api_backend/market_get_market',
    data: {
      city: city,
      model_string: model_string
    },
    method: 'post',
    success: function (data) {
      return callback(data);
      console.log(data);
    }
  });
}

function get_choose_citys(callback) {
  $.ajax({
    url: '/api_backend/market_get_city',
    data: {
      model_string: 'MarketPurchases'
    },
    method: 'post',
    success: function (data) {
      getCitysPage(data, callback);
      console.log(data);
    }
  });
}

function getCitysPage(data, callback) {
  var container = $('.weui-popup__modal')
  container.removeClass()
    .addClass('citys-choose-container')
    .addClass('weui-popup__modal');
  container
    .children()
    .remove();
  var left = $('<div class="left"></div>');
  var right = $('<div class="right"></div>');
  var list = [];
  for (var i = 0; i < data.length; i++) {
    left.append(getProvinceObj(data[i], right, callback));
  }
  container.append(left);
  container.append(right);
  left.children(0).click();
}

function getProvinceObj(item, right, callback) {
  var province = $('<div class="weui-flex__item">' +
    '<div class="item">' + item.province + '</div>' +
    '</div>');

  province.click(function () {
    $(this).addClass('select');
    $(this).siblings().removeClass('select');
    right.children().remove();
    right.append(getCityObj(item, right, callback));
  });
  return province;
}

function getCityObj(item, right, callback) {
  var itemObj = $(' <div class="weui-flex__item"></div>');
  var rowIndex = item.citys.length / 3;

  for (var i = 0; i < rowIndex; i++) {
    var rowObj = $(
      ' <div class="weui-flex">' +
      '   <div class="weui-flex__item item">' + (item.citys[i * 3 + 0] || '') + '</div>' +
      '   <div class="weui-flex__item item">' + (item.citys[i * 3 + 1] || '') + '</div>' +
      '   <div class="weui-flex__item item">' + (item.citys[i * 3 + 2] || '') + '</div>' +
      ' </div>'
    );
    rowObj.children().click(function () {
      callback($(this).text());
    });;
    itemObj.append(rowObj);
  }
  return itemObj;
}

function get_choose_categorys(callback) {
  $.ajax({
    url: '/api_wechat/get_choose_categorys',
    data: {},
    method: 'post',
    success: function (data) {
      getCategorysPage(data, callback);
      console.log(data);
    }
  });
}

function get_choose_brand(category, callback) {
  $.ajax({
    url: '/api_wechat/get_choose_brand',
    data: { category: category },
    method: 'post',
    success: function (data) {
      getBrandPage(data, callback);
      console.log(data);
    }
  });
}

function get_choose_specs(category, callback) {
  $.ajax({
    url: '/api_wechat/get_choose_specs',
    data: { category: category || '' },
    method: 'post',
    success: function (data) {
      getSpecsPage(data, callback);
      console.log(data);
    }
  });
}

function getCategorysPage(data, callback) {
  var container = $('.weui-popup__modal')
  container.removeClass()
    .addClass('goods-choose-container')
    .addClass('weui-popup__modal');
  container
    .children()
    .remove();
  var left = $('<div class="left"></div>');
  var right = $('<div class="right"></div>');
  var list = [];
  for (var i = 0; i < data.length; i++) {
    left.append(getCategoryObj(data[i], right, callback));
  }
  container.append(left);
  container.append(right);
  left.children(0).click();
}


function getCategoryObj(item, right, callback) {
  var category = $('<div class="weui-flex__item">' +
    '<div class="item">' + item.goods_category + '</div>' +
    '</div>');



  category.click(function () {
    $(this).addClass('select');
    $(this).siblings().removeClass('select');
    right.children().remove();
    for (var i = 0; i < item.goods_name_list.length; i++) {
      getCategoryBrandObj(item.goods_name_list[i], right, callback)
    }
  });
  return category;
}

function getCategoryBrandObj(item, right, callback) {
  var itemObj = $(' <div class="weui-flex__item"><div class="title">' + item.first_pinyin + '</div></div>');
  var rowIndex = item.items.length / 3;

  for (var i = 0; i < rowIndex; i++) {
    var rowObj = $(
      ' <div class="weui-flex">' +
      '   <div class="weui-flex__item item">' + (item.items[i * 3 + 0] || '') + '</div>' +
      '   <div class="weui-flex__item item">' + (item.items[i * 3 + 1] || '') + '</div>' +
      '   <div class="weui-flex__item item">' + (item.items[i * 3 + 2] || '') + '</div>' +
      ' </div>'
    );
    rowObj.children().click(function () {
      callback($(this).text());
    });;
    itemObj.append(rowObj);
  }
  right.append(itemObj);
}

function getBrandPage(data, callback) {
  var container = $('.weui-popup__modal')
  container.removeClass()
    .addClass('weui-popup__modal')
    .addClass('specs-choose-container');
  container.children().remove();
  // var child = 

  var rowIndex = data.length / 3;
  for (var i = 0; i < rowIndex; i++) {
    var rowObj = $(
      ' <div class="weui-flex brand">' +
      '   <div class="weui-flex__item">' + (data[i * 3 + 0] || '') + '</div>' +
      '   <div class="weui-flex__item">' + (data[i * 3 + 1] || '') + '</div>' +
      '   <div class="weui-flex__item">' + (data[i * 3 + 2] || '') + '</div>' +
      ' </div>'
    );
    rowObj.children().click(function () {
      callback($(this).text());
    });;
    container.append(rowObj);
  }
}

function getSpecsPage(data, callback) {
  var result = [];
  var container = $('.weui-popup__modal')
  var submit = $('    <a style="margin:20px;" href="javascript:;" class="weui-btn weui-btn_primary submit">选好了</a>  ');
  var footer = $('<div class="weui-footer"><p class="weui-footer__text" style="margin-bottom:20px;">手动输入规格</p></div>');

  container.removeClass()
    .addClass('weui-popup__modal')
    .addClass('specs-choose-container');
  container.children().remove();
  // var child = 

  for (var i = 0; i < data.length; i++) {
    container.append(getSpecsItemObj(data[i], function (text, deleteText) {
      var deleteIndex = result.indexOf(deleteText);
      if (deleteIndex !== -1) {
        result.splice(deleteIndex, 1);
      }
      if (result.indexOf(text) === -1) {
        result.push(text);
      }
    }));
  }
  submit.click(function () {
    if (result.length !== data.length) {
      return;
    }
    callback(result.join(','));
  });

  footer.click(function () {
    $.login({
      title: '提示',
      text: '',
      username: '',  // 默认用户名
      password: '',  // 默认密码
      onOK: function (username, password) {
        //点击确认
        return callback(username + '|' + password);
      },
      onCancel: function () {
        //点击取消
      }
    });
    $('#weui-prompt-username').attr('placeholder', '请输入规格名');
    $('#weui-prompt-password').attr('placeholder', '请输入规格值');
    $('#weui-prompt-password').attr('type', 'text');

  });
  container.append(submit);
  container.append(footer);
}

function getSpecsItemObj(data, callback) {
  var rowIndex = data.list.length / 3;

  var item = $(
    '<div class="specs-container">' +
    '  <div class="specs-title">' + data.title + '</div>' +
    '</div>');
  for (var i = 0; i < rowIndex; i++) {
    var rowObj = $(
      ' <div class="weui-flex">' +
      '   <div class="weui-flex__item">' + (data.list[i * 3 + 0] || '') + '</div>' +
      '   <div class="weui-flex__item">' + (data.list[i * 3 + 1] || '') + '</div>' +
      '   <div class="weui-flex__item">' + (data.list[i * 3 + 2] || '') + '</div>' +
      ' </div>'
    );
    rowObj.children().click(function () {
      var deleteText = item.find('.select').text() || '';
      item.find('.weui-flex__item').removeClass('select');
      $(this).addClass('select')//.siblings().removeClass('select');
      callback([data.title, $(this).text()].join('|'), [data.title, deleteText].join('|'));
    });
    item.append(rowObj);
  }
  return item;
}

function get_is_cash_goods(callback) {
  var container = $('.weui-popup__modal');
  var submit = $('    <a style="margin:20px;" href="javascript:;" class="weui-btn weui-btn_primary submit">选好了</a>  ');
  container.removeClass()
    .addClass('weui-popup__modal')
    .addClass('specs-choose-container');
  container.children().remove();
  var obj = $(
    '  <div class="weui-cells weui-cells_checkbox">' +
    '  <label class="weui-cell weui-check__label cash_goods" for="s11">' +
    '    <div class="weui-cell__hd">' +
    '      <input type="radio" class="weui-check" name="checkbox1" id="s11" checked="checked">' +
    '      <i class="weui-icon-checked"></i>' +
    '    </div>' +
    '    <div class="weui-cell__bd">' +
    '      <p>现货（供应充足）</p>' +
    '    </div>' +
    '  </label>' +
    '  <label class="weui-cell weui-check__label un_cash_goods" for="s12">' +
    '    <div class="weui-cell__hd">' +
    '      <input type="radio" name="checkbox1" class="weui-check" id="s12">' +
    '      <i class="weui-icon-checked"></i>' +
    '    </div>' +
    '    <div class="weui-cell__bd">' +
    '      <p>预售（即将有货）</p>' +
    '    </div>' +
    '  </label>' +
    // '  <div class="weui-cell weui-cell_access" href="javascript:;">' +
    // '    <div class="weui-cell__bd">' +
    // '      <p>下架时间</p>' +
    // '    </div>' +
    // '    <div class="weui-cell__bd">' +
    // '      <input class="weui-input undercarriage_time" type="text">' +
    // '    </div>' +
    // '    <div class="weui-cell__ft">' +
    // '    </div>' +
    // '  </div>' +
    '  <div class="weui-cell weui-cell_access grounding_time_row" href="javascript:;" style="display:none;">' +
    '    <div class="weui-cell__bd">' +
    '      <p>供货时间</p>' +
    '    </div>' +
    '    <div class="weui-cell__bd">' +
    '      <input class="weui-input grounding_time" type="text">' +
    '    </div>' +
    '    <div class="weui-cell__ft">' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );

  // obj.find('.undercarriage_time').calendar();
  obj.find('.grounding_time').calendar();

  obj.find('.un_cash_goods').click(function () {
    obj.find(".grounding_time_row").show();
  });
  obj.find('.cash_goods').click(function () {
    obj.find(".grounding_time_row").hide();
  });
  submit.click(function () {
    var grounding_time = obj.find('.grounding_time').val();
    var is_cash_goods = $('#s11')[0].checked;
    return callback({
      // undercarriage_time: undercarriage_time,
      grounding_time: grounding_time,
      is_cash_goods: is_cash_goods
    });
  })
  container.append(obj);
  container.append(submit);
}

function get_price(callback) {
  var container = $('.weui-popup__modal');
  var submit = $('    <a style="margin:20px;" href="javascript:;" class="weui-btn weui-btn_primary submit">选好了</a>  ');
  container.removeClass()
    .addClass('weui-popup__modal')
    .addClass('specs-choose-container');
  container.children().remove();
}

function refreshGoods(detail_id,price, model_string, callback) {
  $.ajax({
    url: '/api_backend/market_refresh_time',
    method: 'post',
    data: {
      detail_id: detail_id,
      model_string: model_string,
      price:price
    },
    success: function (data) {
      return callback(data);
    }
  });
}
function detelePurchases(purchases_id, callback) {
  deleteGoods({ purchases_id: purchases_id }, '/api_wechat/purchases/delete_purchases', callback);
}

function deteleSupply(supply_id, callback) {
  deleteGoods({ supply_id: supply_id }, '/api_wechat/supply/delete_supply', callback);
}

function deleteGoods(data, url, callback) {
  $.ajax({
    url: url,
    method: 'post',
    data: data,
    success: function (data) {
      console.log(data);
      return callback(data);
    }
  });
}

function stopBubble(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  return;
}




