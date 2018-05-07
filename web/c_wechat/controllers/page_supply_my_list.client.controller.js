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
        url: '/api_wechat/supply/my_supply_list',
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
    bind_event: function (obj, price, detail_id) {
      obj.find('.refresh').click(function (e) {
        stopBubble(e);
        $.prompt({
          title: '刷新价格',
          text: '请输入需要刷新的价格',
          input: price,
          empty: false, // 是否允许为空
          onOK: function (input) {
            refreshGoods(detail_id, input, 'Supply', function (data) {
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
      obj.find('.delete').click(function (e) {
        stopBubble(e);
        $.confirm("确定删除该供应吗", function () {
          deteleSupply(detail_id, function () {
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
          '<a href="/page_wechat/page_supply_detail?supply_id=' + item._id + '" class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__hd">' +
          '    <img class="weui-media-box__thumb" src="' + item.photos[0] + '">' +
          '  </div>' +
          '  <div class="weui-media-box__bd">' +
          '    <div class="title1">' + item.goods_name +
          '    </div>' +
          '    <div class="title2">' + item.send_address + '</div>' +
          '    <div class="title2 refresh-time">' + m_get_date_diff(new Date(item.create_time)) + '刷新' + ' </div>' +
          '    <div class="item-bottom">' +
          '      <div class="price"><span class="price-text">'+  item.price +'</span>' +
          '        <span class="price-unit">' + item.price_unit + '</span>' +
          '      </div>' +
          '       <div class="footer-right">' +
          '     <div class="refresh">' +
          '         刷新价格' +
          '       </div>' +
          '         <div class="delete">' +
          '           删除' +
          '         </div>' +
          '       </div>' +
          '    </div>' +
          '  </div>' +
          '</a>');
        tab2.bind_event(obj, item.price, item._id);
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

  tab2.nav.click();
});

