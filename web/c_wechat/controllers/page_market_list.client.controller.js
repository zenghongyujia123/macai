$(function () {
  // var vip_user = 

  // var mySwiper = new Swiper('.swiper-container', {
  //   autoplay: 5000,//可选选项，自动滑动
  // });

  var tab1 = {
    nav: $('#nav1'),
    container: $('#tab1'),
    laodmore: $('#tab1').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
    my_list: function (callback) {
      $.ajax({
        url: '/api_backend/market_list',
        data: {
          model_string: 'MarketPurchases',
          last_item: tab1.last_item
        },
        method: 'post',
        success: function (data) {
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
              onBridgeReady()
            },
            onCancel: function () {
            }
          });
        });
        obj.insertBefore(tab1.laodmore);
      }
    },
    init: function () {
    }
  };

  tab1.nav.click(function () {
    if (tab1.is_init) {
      return;
    }
    tab1.is_init = true;
    tab1.init();
    tab1.container.infinite().on("infinite", function () {
      if (tab1.loading) return;
      tab1.loading = true;
      tab1.my_list(function (last) {
        tab1.loading = false;
      });
    });
    tab1.my_list();
  });

  tab1.nav.click();

  var tab2 = {
    nav: $('#nav2'),
    container: $('#tab2'),
    laodmore: $('#tab2').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
    my_list: function (callback) {
      $.ajax({
        url: '/api_backend/market_list',
        data: {
          model_string: 'MarketSupply',
          last_item: tab2.last_item
        },
        method: 'post',
        success: function (data) {
          console.log(data);
          if (!data || data.err) {
            if (data.err.type === 'user_not_exist') {
              window.location = '/page_wechat/page_signin';
            }
            $.toptip(data.err.message, 'warning')
            return callback();
          }
          tab2.append_my_list(data.list);
          if (data.list.length > 0) {
            tab2.last_item = data.list[data.list.length - 1];
          }
          if (data.list.length < 10) {
            tab2.container.destroyInfinite();
            tab2.laodmore.remove();
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
          '    <div class="title1">' + item.name +
          '    </div>' +
          '    <div class="title2">' + item.main_goods + '</div>' +
          '    <div class="title2">' + item.province + item.city + '</div>' +
          '    <div class="item-bottom">' +
          '    </div>' +
          '  </div>' +
          '</a>');
        obj.insertBefore(tab2.laodmore);
      }
    },
    init: function () {
      $("#my-purchases-status").select({
        title: "选择状态",
        items: ["采购中", "已停止", "被驳回"]
      });

      $("#my-purchases-status").picker({
        title: "选择状态",
        cols: [
          {
            textAlign: 'center',
            values: ["采购中", "已停止", "被驳回"]
          }
        ]
      });
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

  var tab3 = {
    nav: $('#nav3'),
    container: $('#tab3'),
    laodmore: $('#tab3').find('.weui-loadmore'),
    last_item: {},
    loading: false,
    is_init: false,
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

