/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork) {
    var pageConfig = {
      detail_id: $stateParams.detail_id,
      detail: {},
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
