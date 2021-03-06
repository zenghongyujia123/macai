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
        url: '/api_wechat/purchases/purchases_list',
        data: {
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
          ' <a href="/page_wechat/page_purchases_detail?purchases_id=' + item._id + '"' + ' class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title1">' + item.goods_category + ' ' + item.goods_brand +
          '       <div class="price">' + item.need_number +
          '         <span class="price-unit">' + item.need_unit + '</span>' +
          '       </div>' +
          '     </div>' +
          '     <div class="title2">品种：' + item.goods_brand + '</div>' +
          '     <div class="title2">所在地：' + item.expect_province + item.expect_province + item.expect_city + '</div>' +
          '     <div class="title2">最后刷新：' + m_get_date_diff(new Date(item.create_time)) + '</div>' +
          '     <div><span class="tag green">' + ((item.user ? item.user.role : item.role) || '') + '</span></div>' +
          '     <span class="tag orange">' + item.frequency + '</span>' +
          '   </div>' +
          ' </a>');
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
});

