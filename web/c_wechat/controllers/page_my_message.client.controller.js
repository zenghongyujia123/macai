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
        url: '/api_wechat/message_list',
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

    },
    append_my_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          '<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">' +
          '  <div class="weui-media-box__bd">' +
          '    <h4 class="weui-media-box__title">系统消息</h4>' +
          '    <p class="weui-media-box__desc" style="margin-top:5px;">' + item.content +
          '    <p class="weui-media-box__desc" style="text-align: right;margin-top: 5px;">' + m_get_date_diff(new Date(item.create_time)) + '</p>' +
          '  </div>' +
          '</a>'
        );
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

