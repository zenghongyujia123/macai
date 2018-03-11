$(function () {
  var markets = [];
  $('.citys-choose-input-row').click(function () {
    $("#citys-choose").popup();
    get_choose_citys(function (city) {
      $('#citys-choose-input').val(city);
      get_choose_markets(city, 'MarketPurchases', function (data) {
        markets = [];
        data.forEach(function (market) {
          markets.push(market.name);
        });
        $("#markets-choose-input").select('update', {
          items: markets
        });
      })
      $("#markets-choose-input").val('');
      $.closePopup();
    })
  });

  $('.markets-choose-input-row').click(function () {
    $("#markets-choose-input").select('open');
  });

  $('.price-markets-choose-input-row').click(function () {
    $("#price-markets-choose-input").select('open');
  });

  get_choose_markets(market_for_search, 'MarketDayInfo', function (data) {
    var markets = [];
    data.forEach(function (market) {
      markets.push(market.name);
    });
    $("#price-markets-choose-input").select({
      title: "选择市场",
      items: markets,
      onClose: function () {
        tab3.market = $("#price-markets-choose-input").val();
        tab3.is_init = false;
        tab3.init();
      }
    });
  })

  $("#markets-choose-input").select({
    title: "选择市场",
    items: markets,
    onClose: function () {
      tab1.market = $("#markets-choose-input").val();
      tab1.is_init = false;
      tab1.init();
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
      tab1.last_item = {};
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
          // '    <div class="title2"></div>' +
          '    <div class="item-bottom">' +
          '      <div class="price">品类：' + item.main_goods + '</div>' +
          '      <div class="stop green">联系方式</div>' +
          '    </div>' +
          '  </div>' +
          '</a>'
        );
        obj.click(function () {
          if (is_vip === 'true') {

          }
          else {
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
          }
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
    clear_list: function () {
      tab3.last_item = {};
      tab3.container.find('.purchases-list-item').remove();
    },
    my_list: function (callback) {
      if (tab3.loading)
        return;
      tab3.loading = true;
      $.ajax({
        url: '/api_backend/market_day_info_list',
        data: {
          last_item: tab3.last_item,
          market: tab3.market
        },
        method: 'post',
        success: function (data) {
          tab3.loading = false;
          console.log(data);
          if (!data || data.err) {
            if (data.err.type === 'user_not_exist') {
              window.location = '/page_wechat/page_signin';
            }
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab3.append_my_list(data);
          if (data.length > 0) {
            tab3.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
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

        var str =
          ' <a class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title-market">' +
          '     <div>' + item.market + '</div>' +
          '     <div class="phone">联系方式</div>' +
          '     </div>' +
          '     <div class="item-bottom has-bottom-border">' +
          '       <div>品类</div>' +
          '       <div>昨日价格</div>' +
          '       <div>今日价格</div> ' +
          '     </div>';
        // '     <div class="title2">' + item.main_goods + '</div>';
        item.list.forEach(function (o) {
          str += '<div class="item-bottom has-bottom-border">' +
            '       <div class="brand">' + o.main_goods + '</div>' +
            '       <div class="last-day-price">' + o.last_day_price + '</div>' +
            '       <div class="today-price">' + o.price + '</div>' +
            '     </div>';
        });
        str +=
          '   </div>' +
          ' </a>';
        var obj = $(
          str
        );
        obj.click(function () {
          if (is_vip === 'true') {

          }
          else {
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
          }
        });
        obj.insertBefore(tab3.laodmore);
      }
    },
    init: function () {
      if (tab3.is_init) {
        return;
      }
      tab3.is_init = true;
      if (tab3.laodmore.remove) {
        tab3.container.destroyInfinite();
        tab3.laodmore.remove();
      }
      tab3.clear_list();
      tab3.laodmore = $(
        '<div class="weui-loadmore">' +
        '  <i class="weui-loading"></i>' +
        '  <span class="weui-loadmore__tips">正在加载</span>' +
        '</div>  '
      );
      tab3.container.append(tab3.laodmore);
      tab3.container.infinite().on("infinite", function () {
        tab3.my_list(function () {
        });
      });
      tab3.my_list(function () {
      });
    }
  };

  tab3.nav.click(function () {
    tab3.init();
  });
});

