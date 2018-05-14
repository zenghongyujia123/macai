$(function () {
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


        $.prompt({
          title: '刷新价格',
          text: '请输入需要刷新的价格',
          input: obj.find('.price-text').text(),
          empty: false, // 是否允许为空
          onOK: function (input) {
            refreshGoods(detail_id, input, 'Purchases', function (data) {
              if (data.err) {
                $.toast(data.err.message);
                return;
              }
              obj.find('.refresh-time').text('最后刷新：' + m_get_date_diff(new Date()));
              obj.find('.price-text').text(input);

              $.toast("操作成功");
            });
          },
          onCancel: function () {
            //点击取消
          }
        });
        return false;
      });
      obj.find('.check-price').click(function (e) {
        stopBubble(e);
        window.location = '/page_wechat/page_purchases_price_list?purchases_id=' + detail_id;
      });
      obj.find('.delete').click(function (e) {
        stopBubble(e);
        $.confirm("确定删除该采购吗", function () {
          detelePurchases(detail_id, function () {
            obj.remove();
          });
          //点击确认后的回调函数
        }, function () {
          //点击取消后的回调函数
        });
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
          '       <div class="price"><span class="price-text">' + item.expect_price+'</span>' +
          '         <span class="price-unit">' + item.expect_price_unit + '</span>' +
          '       </div>' +
          '       <div class="footer-right">' +
          '       <div class="refresh">' +
          '         刷新采购' +
          '       </div>' +
          '         <div class="check-price">' +
          '           查看报价' +
          '         </div>' +
          '         <div class="delete">' +
          '           删除' +
          '         </div>' +
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

  tab2.nav.click();
});

