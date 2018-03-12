$(function () {
  var markets = [];
  $('.price-markets-choose-input-row').click(function () {
    $("#price-markets-choose-input").select('open');
  });



  getUserJsApiTicket(window.location.href, function (data) {
  });

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
        url: '/api_backend/market_purchases_list',
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
          tab3.append_my_list(data.list);
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
          '<a class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__bd">' +
          // '     <div class="title-market">' +
          // '     <div>' + item.market + '</div>' +
          // '     <div class="phone">查看详情</div>' +
          // '     </div>' +
          '    <div class="title1">' + item.name + '</div>' +
          // '    <div class="title2">市场：' + item.province + item.city + item.market + '</div>' +
          '    <div class="title2"></div>' +
          '    <div class="item-bottom">' +
          '      <div class="price">主营品类：' + item.main_goods + '</div>' +
          '      <div class="price"></div>' +
          '      <div class="stop green">联系方式</div>' +
          '    </div>' +
          '  </div>' +
          '</a>';
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

  // tab3.nav.click(function () {
  //   tab3.init();
  // });

  tab3.market = market_for_search;
  tab3.is_init = false;
  tab3.init();
});

