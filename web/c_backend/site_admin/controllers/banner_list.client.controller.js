/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('BannerListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService) {
    var pageConfig = {
      count: 0,
      title: '广告列表',
      import_text: '新建广告',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '标题'
      ],
      create_new: function () {
        $state.go('banner_detail', { detail_id: '' });
      },
      go_detail: function (item) {
        $state.go('banner_detail', { detail_id: item._id });
      },
      get_list: function (next) {
        next = next || 'next';
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'Banner' }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            if (data.list.length > 0) {
              pageConfig.count = data.count;
              pageConfig.list = data.list || [];
            }
          }

          if (data.list.length > 0) {
            if (next === 'next') {
              pageConfig.current_page++;
              pageConfig.last_item = data.list[data.list.length - 1];
            }
            else {
              pageConfig.current_page--;
              pageConfig.last_item = data.list[0];
            }
          }
        });
      },
      get_date: function (date) {
        return moment(date).format('YYYY-MM-DD');
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);
