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

function getCategorysPage(data, callback) {
  var container = $('.weui-popup__modal')
  container.removeClass('specs-choose-container').addClass('goods-choose-container');
  container.children().remove();
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
  container.removeClass('goods-choose-container').addClass('specs-choose-container');
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


