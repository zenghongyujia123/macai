/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, CommonHelper) {
    var pageConfig = {
      detail_id: $stateParams.detail_id,
      detail: {},
      update_personal_auth_info: function () {
        UserNetwork.update_personal_auth_info($scope, { personal_auth_stauts: 'authed', user_id: pageConfig.detail_id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('user_detail', null, { reload: true });
            }, null, null, event);
          }
        });
      },
      get_detail: function () {
        UserNetwork.market_detail($scope, { model_string: 'User', detail_id: pageConfig.detail_id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            pageConfig.detail = data || {};
          }
        });
      }
    };
    $scope.pageConfig = pageConfig;
    pageConfig.get_detail();
  }]);
