function get_choose_categorys(callback) {
  $.ajax({
    url: '/api_wechat/get_choose_categorys',
    data: {},
    method: 'post',
    success: function (data) {
      getCategorysPage(data);
      console.log(data);
    }
  });
}

function getCategorysPage(data) {
  var container = $('.goods-choose-container');
  container.children().remove();
  var left = $('<div class="left"></div>');
  var right = $('<div class="right"></div>');
  var list = [];
  for (var i = 0; i < data.length; i++) {
    left.append(getCategoryObj(data[i], right));
  }
  container.append(left);
  container.append(right);
  left.children(0).click();
}


function getCategoryObj(item, right) {
  var category = $('<div class="weui-flex__item">' +
    '<div class="item">' + item.goods_category + '</div>' +
    '</div>');



  category.click(function () {
    $(this).addClass('select');
    $(this).siblings().removeClass('select');
    right.children().remove();
    for (var i = 0; i < item.goods_name_list.length; i++) {
      getCategoryBrandObj(item.goods_name_list[i], right)
    }
  });
  return category;
}

function getCategoryBrandObj(item, right) {

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
    itemObj.append(rowObj);
  }
  right.append(itemObj);
}


