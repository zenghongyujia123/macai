/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('BannerDetailController', [
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
      delete_photo: function (photo) {
        var index = pageConfig.detail.photos.indexOf(photo);
        if (index !== -1) {
          pageConfig.detail.photos.splice(index, 1);
        }
      },
      get_detail: function () {
        if (!pageConfig.detail_id) {
          return;
        }
        UserNetwork.market_detail($scope, { model_string: 'Banner', detail_id: pageConfig.detail_id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            pageConfig.detail = data || {};
          }
        });
      },
      create_banner: function () {
        pageConfig.detail.photos = pageConfig.detail.photos || [];
        if (pageConfig.detail.photos.length < 2) {
          return CommonHelper.showConfirm($scope, null, '广告最少2张图片', function () {
          }, null, null, event);
        }
        UserNetwork.create_banner($scope, pageConfig.detail).then(function (data) {
          console.log(data);
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('banner_detail', null, { reload: true });
            }, null, null, event);
          }
        });
      }
    };
    $scope.pageConfig = pageConfig;
    pageConfig.get_detail();
  }]);
