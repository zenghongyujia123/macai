$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,//可选选项，自动滑动
  });

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
            return $.toptip(data.err.message, 'warning');
          }
          tab1.append_my_list(data);
          if (data.length > 0) {
            tab1.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
            tab1.container.destroyInfinite();
            tab1.laodmore.remove();
          }
        }
      });
    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          '<a class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__hd">' +
          '    <img class="weui-media-box__thumb" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516813447292&di=5f4eaade66c430dd3a958c2cfac95425&imgtype=0&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140821%2F0006019010973602_b.jpg">' +
          '  </div>' +
          '  <div class="weui-media-box__bd">' +
          '    <div class="title1">' + item.goods_name +
          '    </div>' +
          '    <div class="title2">' + item.send_address + ' 张先生</div>' +
          '    <span class="tag blue">实地认证</span>' +
          '    <span class="tag orange">企业</span>' +
          '    <div class="item-bottom">' +
          '      <div class="price">' + item.price +
          '        <span class="price-unit">' + item.price_unit + '</span>' +
          '      </div>' +
          '      <div class="time">' +
          '        ' + (new Date(item.create_time).getMonth() + 1) + '月' + new Date(item.create_time).getDate() + '日' +
          '      </div>' +
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
      // $("#my-purchases-status").select({
      //   title: "选择状态",
      //   items: ["采购中", "已停止", "被驳回"]
      // });

      // $("#my-purchases-status").picker({
      //   title: "选择状态",
      //   cols: [
      //     {
      //       textAlign: 'center',
      //       values: ["采购中", "已停止", "被驳回"]
      //     }
      //   ]
      // });
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
            return $.toptip(data.err.message, 'warning');
          }
          tab2.append_my_list(data);
          if (data.length > 0) {
            tab2.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
            tab2.container.destroyInfinite();
            tab2.laodmore.remove();
          }


        }
      });
    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          ' <a href="/page_wechat/page_purchases_detail?purchases_id=' + item._id + '"' + ' class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title1">' + item.goods_name +
          '     </div>' +
          '     <div class="title2">品种：' + item.goods_brand + '</div>' +
          '     <div class="title2">浏览次数：' + (item.browse_count || 0) + '次</div>' +
          '     <div class="item-bottom">' +
          '       <div class="price">' + item.expect_price +
          '         <span class="price-unit">' + item.expect_price_unit + '</span>' +
          '       </div>' +
          '       <div class="stop">' +
          '         停止采购' +
          '       </div>' +
          '     </div>' +
          '   </div>' +
          ' </a>');
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
            return $.toptip(data.err.message, 'warning');
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

