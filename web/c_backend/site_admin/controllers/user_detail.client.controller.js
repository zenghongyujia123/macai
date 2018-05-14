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
      get_date: function (date) {
        return moment(date).format('YYYY-MM-DD');
      },
      refuse: function (event) {
        CommonHelper.showMaterialSingleInput($scope, event, {
          input_params: {
            title: '提示',
            input_label: '请输入拒绝理由',
            input_value: '',
            confirm_label: '确定'
          }
        }, function (des) {
          pageConfig.update_personal_auth_info('unauth', des);
        });
      },
      update_personal_auth_info: function (status, des) {
        UserNetwork.update_personal_auth_info($scope, { personal_auth_stauts: status, personal_auth_stauts_description: des, user_id: pageConfig.detail_id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('user_detail', null, { reload: true });
            }, null, null, event);
          }
        });
      },
      get_user_status_text: function (status) {
        var text = '';
        switch (status) {
          case 'unauth':
            text = '未认证';
            break;
          case 'authing':
            text = '认证中';
            break;
          case 'authed':
            text = '已认证';
            break;
        }
        return text;
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

    $scope.photoConfig = {
      curPhotoList: [],
      showPhotoScan: false,
      imgIndex: 0
    };

    $scope.showPhotos = function (path) {
      $scope.photoConfig.curPhotoList = [{
        url: path
      }];
      $scope.photoConfig.showPhotoScan = true;
    };
  }]);
