/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('SupplyDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', '$timeout', 'UserNetwork', 'QiniuService', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, $timeout, UserNetwork, QiniuService, CommonHelper) {
    var photos = [];
    var qiniu = QiniuService.createUploader('qiniu-upload-test-button', function (info) {
      $timeout(function () {
        $scope.pageConfig.detail.photos = $scope.pageConfig.detail.photos || [];
        $scope.pageConfig.detail.photos.push(QiniuService.getQiniuImageSrc(info.key))
      });
      console.log('upload successs : ---- ', info);
    });
    var pageConfig = {
      detail_id: $stateParams.detail_id,
      detail: {},
      save_photos: function () {
        UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: pageConfig.detail.photos }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('supply_detail', null, { reload: true });
            }, null, null, event);
          }
          console.log(data);
        });
      },
      delete_photo: function (photo) {
        var index = pageConfig.detail.photos.indexOf(photo);
        if (index !== -1) {
          pageConfig.detail.photos.splice(index, 1);
        }
      },
      get_detail: function () {
        UserNetwork.market_detail($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id }).then(function (data) {
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
