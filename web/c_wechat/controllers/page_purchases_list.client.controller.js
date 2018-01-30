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
    my_purchases_list: function (callback) {
      $.ajax({
        url: '/api_wechat/purchases/my_purchases_list',
        data: {
          last_item: tab2.last_item
        },
        method: 'post',
        success: function (data) {
          console.log(data);
          if (!data || data.err) {
            return $.toptip(data.err.message, 'warning');
          }
          tab2.append_my_purchases_list(data);
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
    append_my_purchases_list: function (data) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = $(
          ' <a href="/page_wechat/page_purchases_detail?purchases_id=' + item._id + '"' + ' class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '   <div class="weui-media-box__bd">' +
          '     <div class="title1">' + item.goods_name +
          '     </div>' +
          '     <div class="title2">品种：' + item.goods_brand + '</div>' +
          '     <div class="title2">浏览次数：111次</div>' +
          '     <div class="item-bottom">' +
          '       <div class="price">12.00' +
          '         <span class="price-unit">元／斤</span>' +
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
      tab2.my_purchases_list(function (last) {
        tab2.loading = false;
      });
    });
    tab2.my_purchases_list();
  });
});

