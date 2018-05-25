
$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,//可选选项，自动滑动
  });
  var tab1 = {
    nav: $('#nav1'),
    container: $('#tab1'),
    laodmore: $('#tab1').find('.weui-loadmore'),
    last_item: {},
    goods_category: '',
    loading: false,
    is_init: false,
    top_ids: [],
    clear_list: function () {
      tab1.container.find('.purchases-list-item').remove();
    },
    my_top_list: function (callback) {
      if (tab1.loading) return;
      tab1.loading = true;
      $.ajax({
        url: '/api_backend/market_get_top',
        data: {
          model_string: 'Supply',
          goods_category: tab1.goods_category
        },
        method: 'post',
        success: function (data) {
          tab1.loading = false;
          console.log(data);
          if (!data || data.err) {
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab1.top_ids = data.map(function (item) {
            return item._id;
          });
          tab1.append_my_list(data);
          return callback();
        }
      });
    },
    my_list: function (callback) {
      if (tab1.loading) return;
      tab1.loading = true;
      $.ajax({
        url: '/api_wechat/supply/supply_list',
        data: {
          last_item: tab1.last_item,
          goods_category: tab1.goods_category
        },
        method: 'post',
        success: function (data) {
          tab1.loading = false;
          console.log(data);
          if (!data || data.err) {
            $.toptip(data.err.message, 'warning');
            return callback();
          }
          tab1.append_my_list(data);
          if (data.length > 0) {
            tab1.last_item = data[data.length - 1];
          }
          if (data.length < 10) {
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
          '<a href="/page_wechat/page_supply_detail?supply_id=' + item._id + '" class="weui-media-box weui-media-box_appmsg purchases-list-item">' +
          '  <div class="weui-media-box__hd">' +
          '    <img class="weui-media-box__thumb" src="' + (item.photos[0] || 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4266570088,1527054841&fm=200&gp=0.jpg') + '">' +
          '  </div>' +
          '  <div class="weui-media-box__bd">' +
          '    <div class="title1">' +
          '<span>' + (item.goods_class || '') + item.goods_category + item.goods_brand + '</span>' +
          (item.is_top ? '<span class="tag orange">置顶</span>' : '') +
          '    </div>' +
          '    <div class="title2">' + item.send_province + item.send_city + ' ' + (item.nickname || '-') + ' 浏览量:' + (item.browse_count || 0) + '</div>' +
          ((item.user && item.user.personal_auth_stauts === 'authed') ? '<span class="tag blue">实名认证</span>' : '<span class="tag">未认证用户</span>') +
          ((item.user && item.user.vip_user) ? '<span class="tag orange">vip用户</span>' : '') +
          '    <div class="item-bottom">' +
          '      <div class="price">' + item.price +
          '        <span class="price-unit">' + item.price_unit + '</span>' +
          '      </div>' +
          '      <div class="time">' +
          '        最后刷新：' + m_get_date_diff(new Date(item.create_time)) +
          '      </div>' +
          '    </div>' +
          '  </div>' +
          '</a>'
        );
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
        tab1.my_list(function (last) {
        });
      });
      tab1.my_top_list(function () {
        tab1.my_list(function () { });
      });
      // tab1.my_list(function () { });
    }
  };

  tab1.nav.click(function () {
    tab1.init();
  });

  tab1.nav.click();

  $('.c-filter-btn').click(function () {
    $("#goods-choose").popup();
    get_choose_categorys(function (category) {
      tab1.is_init = false;
      tab1.goods_category = category;
      tab1.last_item = {};
      tab1.init();
      $.closePopup();
    });
  });


});

