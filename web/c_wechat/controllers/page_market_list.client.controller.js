$(function () {
  var markets = [];
  $('.citys-choose-input-row').click(function () {
    $("#citys-choose").popup();
    get_choose_citys(function (city) {
      $('#citys-choose-input').val(city);
      get_choose_markets(city, function (data) {
        markets = [];
        data.forEach(function (market) {
          markets.push(market.name);
        });
        $("#markets-choose-input").select('update', {
          items: markets
        });
      })
      $.closePopup();
    })
  });

  $('.markets-choose-input-row').click(function () {
    $("#markets-choose-input").select('open');
  });

  $("#markets-choose-input").select({
    title: "选择市场",
    items: markets,
    onClose: function () {
      tab1.market = $("#markets-choose-input").val();
      tab1.clear_list();
      tab1.my_list();
    }
  });
  getUserJsApiTicket(window.location.href, function (data) {
  });

  var tab1 = {
    nav: $('#nav1'),
    container: $('#tab1'),
    laodmore: $('#tab1').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
    city: '',
    market: '',
    goods_category: '',
    clear_list: function () {
      tab1.container.find('.purchases-list-item').remove();
    },
    my_list: function (callback) {
      if (tab1.loading)
        return;
      tab1.loading = true;
      $.ajax({
        url: '/api_backend/market_list',
        data: {
          model_string: 'MarketPurchases',
          last_item: tab1.last_item,
          goods_category: tab1.goods_category,
          city: tab1.city,
          market: tab1.market
        },
        method: 'post',
        success: function (data) {
          tab1.loading = false;
          console.log(data);
          if (!data || data.err) {
            $.toptip(data.err.message, 'warning')
            return callback();
          }
          tab1.append_my_list(data.list);
          if (data.list.length > 0) {
            tab1.last_item = data.list[data.list.length - 1];
          }
          if (data.list.length < 10) {
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
          '  <a class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__bd">' +
          '    <div class="title1">' + item.name + '</div>' +
          '    <div class="title2">市场：' + item.province + item.city + item.market + '</div>' +
          '    <div class="title2">品类：' + item.main_goods + '</div>' +
          '    <div class="item-bottom">' +
          '    </div>' +
          '  </div>' +
          '</a>'
        );
        obj.click(function () {
          $.confirm({
            title: '提示',
            text: '你还不是vip,成为vip获取更多服务',
            onOK: function () {
              get_pre_pay_id(function () {

              })
            },
            onCancel: function () {
            }
          });
        });
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
        tab1.my_list(function () {
        });
      });
      tab1.my_list(function () {
      });
    }
  };

  tab1.nav.click(function () {
    tab1.init();
  });

  tab1.nav.click();


  var tab3 = {
    nav: $('#nav3'),
    container: $('#tab3'),
    laodmore: $('#tab3').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
    market: '',
    my_list: function (callback) {
      $.ajax({
        url: '/api_backend/market_list',
        data: {
          model_string: 'MarketDayInfo',
          last_item: tab3.last_item
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
          tab3.append_my_list(data.list);
          if (data.list.length > 0) {
            tab3.last_item = data.list[data.list.length - 1];
          }
          if (data.list.length < 10) {
            tab3.container.destroyInfinite();
            tab3.laodmore.remove();
          }
          if (callback) {
            return callback();
          }

        }
      });
    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          ' <a class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title1">' + item.market +
          '     </div>' +
          '     <div class="title2">品种：' + item.main_goods + '</div>' +
          '     <div class="item-bottom">' +
          '       <div class="price">' + item.price +
          '       </div>' +
          '     </div>' +
          '   </div>' +
          ' </a>');
        obj.click(function () {
          $.confirm({
            title: '提示',
            text: '你还不是vip,成为vip获取更多服务',
            onOK: function () {
              get_pre_pay_id(function () {

              })
            },
            onCancel: function () {
            }
          });
        });
        obj.insertBefore(tab3.laodmore);
      }
    },
    init: function () {

    }
  };

  tab3.nav.click(function () {
    if (tab3.is_init) {
      return;
    }
    tab3.is_init = true;
    tab3.init();
    tab3.container.infinite().on("infinite", function () {
      if (tab3.loading) return;
      tab3.loading = true;
      tab3.my_list(function (last) {
        tab3.loading = false;
      });
    });
    tab3.my_list();
  });
});

