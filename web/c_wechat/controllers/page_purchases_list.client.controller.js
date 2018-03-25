$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,//可选选项，自动滑动
  });

  var tab2 = {
    nav: $('#nav2'),
    container: $('#tab2'),
    laodmore: $('#tab2').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
    my_list: function (callback) {
      $.ajax({
        url: '/api_wechat/purchases/my_purchases_list',
        data: {
          last_item: tab2.last_item
        },
        method: 'post',
        success: function (data) {
          console.log(data);
          if (!data || data.err) {
            if (data.err.type === 'user_not_exist') {
              window.location = '/page_wechat/page_signin';
            }
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab2.append_my_list(data);
          if (data.length > 0) {
            tab2.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
            tab2.container.destroyInfinite();
            tab2.laodmore.remove();
          }
          if (callback)
            return callback();
        }
      });
    },
    bind_event: function (obj, detail_id) {
      obj.find('.refresh').click(function (e) {
        stopBubble(e);
        refreshGoods(detail_id, 'Purchases', function (data) {
          if (data.err) {
            return;
          }
          obj.find('.refresh-time').text('最后刷新：' + m_get_date_diff(new Date()));
          $.toast("操作成功");
        });
        return false;
      });
    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          ' <a href="/page_wechat/page_purchases_detail?purchases_id=' + item._id + '" class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title1">' + item.goods_name +
          '     </div>' +
          '     <div class="title2">品种：' + item.goods_brand + '</div>' +
          '     <div class="title2">浏览次数：' + (item.browse_count || 0) + '次</div>' +
          '     <div class="title2 refresh-time">最后刷新：' + m_get_date_diff(new Date(item.create_time)) + '</div>' +
          '     <div class="item-bottom">' +
          '       <div class="price">' + item.expect_price +
          '         <span class="price-unit">' + item.expect_price_unit + '</span>' +
          '       </div>' +
          '       <div class="refresh">' +
          '         刷新采购' +
          '       </div>' +
          '     </div>' +
          '   </div>' +
          ' </a');
        tab2.bind_event(obj, item._id);
        obj.insertBefore(tab2.laodmore);
      }
    },
    init: function () {

    }
  };

  tab2.nav.click(function () {
    if (tab2.is_init) {
      return;
    }
    tab2.is_init = true;
    tab2.init();
    tab2.container.infinite().on("infinite", function () {
      if (tab2.loading) return;
      tab2.loading = true;
      tab2.my_list(function (last) {
        tab2.loading = false;
      });
    });
    tab2.my_list();
  });

  var tab1 = {
    nav: $('#nav1'),
    container: $('#tab1'),
    laodmore: $('#tab1').find('.weui-loadmore'),
    last_item: {},
    goods_category: '',
    loading: false,
    is_init: false,
    clear_list: function () {
      tab1.container.find('.purchases-list-item').remove();
    },
    my_top_list: function (callback) {
      if (tab1.loading) return;
      tab1.loading = true;
      $.ajax({
        url: '/api_backend/market_get_top',
        data: {
          model_string: 'Supply'
        },
        method: 'post',
        success: function (data) {
          tab1.loading = false;
          console.log(data);
          if (!data || data.err) {
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab1.append_my_list(data);
          return callback();
        }
      });
    },
    my_list: function (callback) {
      if (tab1.loading) return;
      tab1.loading = true;
      $.ajax({
        url: '/api_wechat/supply/supply_list',
        data: {
          last_item: tab1.last_item,
          goods_category: tab1.goods_category
        },
        method: 'post',
        success: function (data) {
          tab1.loading = false;
          console.log(data);
          if (!data || data.err) {
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab1.append_my_list(data);
          if (data.length > 0) {
            tab1.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
            tab1.container.destroyInfinite();
            tab1.laodmore.remove();
          }
          return callback();
        }
      });
    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          '<a href="/page_wechat/page_supply_detail?supply_id=' + item._id + '" class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__hd">' +
          '    <img class="weui-media-box__thumb" src="' + (item.photos[0] || 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4266570088,1527054841&fm=200&gp=0.jpg') + '">' +
          '  </div>' +
          '  <div class="weui-media-box__bd">' +
          '    <div class="title1">' +
          '<span>' + (item.goods_class || '') + item.goods_category + item.goods_brand + '</span>' +
          (item.is_top ? '<span class="tag orange">置顶</span>' : '') +
          '    </div>' +
          '    <div class="title2">' + item.send_province + item.send_city + ' ' + (item.nickname || '-') + ' 浏览量:' + (item.browse_count || 0) + '</div>' +
          ((item.user && item.user.personal_auth_stauts === 'authed') ? '<span class="tag blue">实名认证</span>' : '<span class="tag">未认证用户</span>') +
          ((item.user && item.user.vip_user) ? '<span class="tag orange">vip用户</span>' : '') +
          '    <div class="item-bottom">' +
          '      <div class="price">' + item.price +
          '        <span class="price-unit">' + item.price_unit + '</span>' +
          '      </div>' +
          '      <div class="time">' +
          '        最后刷新：' + m_get_date_diff(new Date(item.create_time)) +
          '      </div>' +
          '    </div>' +
          '  </div>' +
          '</a>'
        );
        obj.insertBefore(tab1.laodmore);
      }
    },
    init: function () {
      if (tab1.is_init) {
        return;
      }
      tab1.is_init = true;
      if (tab1.laodmore.remove) {
        tab1.container.destroyInfinite();
        tab1.laodmore.remove();
      }
      tab1.clear_list();
      tab1.laodmore = $(
        '<div class="weui-loadmore">' +
        '  <i class="weui-loading"></i>' +
        '  <span class="weui-loadmore__tips">正在加载</span>' +
        '</div>  '
      );
      tab1.container.append(tab1.laodmore);
      tab1.container.infinite().on("infinite", function () {
        tab1.my_list(function (last) {
        });
      });
      tab1.my_top_list(function () {
        tab1.my_list(function () { });
      });
      // tab1.my_list(function () { });
    }
  };

  tab1.nav.click(function () {
    tab1.init();
  });

  tab1.nav.click();

  $('.c-filter-btn').click(function () {
    $("#goods-choose").popup();
    get_choose_categorys(function (category) {
      tab1.is_init = false;
      tab1.goods_category = category;
      tab1.last_item = {};
      tab1.init();
      $.closePopup();
    });
  });


});

