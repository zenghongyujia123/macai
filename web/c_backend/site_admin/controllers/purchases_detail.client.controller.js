/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PurchasesDetailController', [
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
      price_list: [],
      get_date: function (date) {
        return moment(date).format('YYYY-MM-DD');
      },
      message_create: function () {
        if (!pageConfig.detail.user) {
          return alert('该货品非微信用户发布');
        }
        CommonHelper.showMaterialSingleInput($scope, event, {
          input_params: {
            title: '提示',
            input_label: '请输入信息',
            input_value: '',
            confirm_label: '确定'
          }
        }, function (content) {
          UserNetwork.message_create($scope, { user_id: pageConfig.detail.user, content: content }).then(function (data) {
            console.log(data);
            if (!data.err) {
              CommonHelper.showConfirm($scope, null, '操作成功', function () {
                $state.go('user_detail', null, { reload: true });
              }, null, null, event);
            }
          });
        });
      },
      market_update: function () {
        pageConfig.detail.model_string = 'Purchases';
        UserNetwork.market_update($scope, pageConfig.detail).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('purchases_detail');
            }, null, null, event);
          }
          console.log(data);
        });
      },
      offer_price_list: function () {
        UserNetwork.offer_price_list($scope, { purchases_id: pageConfig.detail_id }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            pageConfig.price_list = data;
          }
          console.log(data);
        });
      },
      market_update_status: function (status) {
        UserNetwork.market_update_status($scope, { model_string: 'Purchases', detail_id: pageConfig.detail_id, status: status }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('purchases_list');
            }, null, null, event);
          }
          console.log(data);
        });
      },
      save_photos: function () {
        UserNetwork.market_save_photos($scope, { model_string: 'Purchases', detail_id: pageConfig.detail_id, photos: pageConfig.detail.photos }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('purchases_detail', null, { reload: true });
            }, null, null, event);
          }
          console.log(data);
        });
      },
      market_make_top: function () {
        UserNetwork.market_make_top($scope, { is_top: pageConfig.detail.is_top ? false : true, model_string: 'Purchases', detail_id: pageConfig.detail_id }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('purchases_detail', null, { reload: true });
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
        UserNetwork.market_detail($scope, { model_string: 'Purchases', detail_id: pageConfig.detail_id }).then(function (data) {
          console.log(data);
          if (!data.err) {
            pageConfig.detail = data || {};
          }
        });
      }
    };
    $scope.pageConfig = pageConfig;
    pageConfig.get_detail();
    pageConfig.offer_price_list();
  }]);
