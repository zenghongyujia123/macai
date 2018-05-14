'use strict';

var cSite = angular.module('chaoQianSite', [
  'ui.router',
  //   'LocalStorageModule',
  //   'base64',
  'ngMaterial',
  // 'textAngular'
]);

cSite.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .warnPalette('red');
});

cSite.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
      controller: 'HomeController'
    })
    .state('user_list', {
      url: '/user_list',
      templateUrl: '/c_backend/site_admin/templates/user_list.client.view.html',
      controller: 'UserListController'
    })
    .state('user_detail', {
      url: '/user_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/user_detail.client.view.html',
      controller: 'UserDetailController'
    })
    .state('purchases_list', {
      url: '/purchases_list',
      templateUrl: '/c_backend/site_admin/templates/purchases_list.client.view.html',
      controller: 'PurchasesListController'
    })
    .state('purchases_detail', {
      url: '/purchases_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/purchases_detail.client.view.html',
      controller: 'PurchasesDetailController'
    })
    .state('supply_list', {
      url: '/supply_list',
      templateUrl: '/c_backend/site_admin/templates/supply_list.client.view.html',
      controller: 'SupplyListController'
    })
    .state('supply_detail', {
      url: '/supply_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/supply_detail.client.view.html',
      controller: 'SupplyDetailController'
    })
    .state('market_supply_list', {
      url: '/market_supply_list',
      templateUrl: '/c_backend/site_admin/templates/market_supply_list.client.view.html',
      controller: 'MarketSupplyListController'
    })
    .state('market_supply_detail', {
      url: '/market_supply_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_supply_detail.client.view.html',
      controller: 'MarketSupplyDetailController'
    })

    .state('market_purchases_list', {
      url: '/market_purchases_list',
      templateUrl: '/c_backend/site_admin/templates/market_purchases_list.client.view.html',
      controller: 'MarketPurchasesListController'
    })
    .state('market_purchases_detail', {
      url: '/market_purchases_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_purchases_detail.client.view.html',
      controller: 'MarketPurchasesDetailController'
    })
    .state('market_day_info_list', {
      url: '/market_day_info_list',
      templateUrl: '/c_backend/site_admin/templates/market_day_info_list.client.view.html',
      controller: 'MarketDayInfoListController'
    })
    .state('market_day_info_detail', {
      url: '/market_day_info_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_day_info_detail.client.view.html',
      controller: 'MarketDayInfoDetailController'
    })
    .state('auth_list', {
      url: '/auth_list',
      templateUrl: '/c_backend/site_admin/templates/auth_list.client.view.html',
      controller: 'AuthListController'
    })
    .state('auth_detail', {
      url: '/auth_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/auth_detail.client.view.html',
      controller: 'AuthDetailController'
    })

    .state('banner_list', {
      url: '/banner_list',
      templateUrl: '/c_backend/site_admin/templates/banner_list.client.view.html',
      controller: 'BannerListController'
    })
    .state('banner_detail', {
      url: '/banner_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/banner_detail.client.view.html',
      controller: 'BannerDetailController'
    })

    .state('payment_list', {
      url: '/payment_list',
      templateUrl: '/c_backend/site_admin/templates/payment_list.client.view.html',
      controller: 'PaymentListController'
    })
    .state('payment_detail', {
      url: '/payment_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/payment_detail.client.view.html',
      controller: 'PaymentDetailController'
    });
  $urlRouterProvider.otherwise('/user_list');
}]);


'use strict';

cSite.constant('GlobalEvent', {
  onBodyClick: 'onBodyClick',
  onUserUpdated: 'onUserUpdated',//用户信息更新,

  onShowLoading: 'onShowLoading',
  onShowAlert: 'onShowAlert', //提示窗口
  onShowAlertExtend: 'onShowAlertExtend', //扩展提示窗口,内容分两部分，概要和详细
  onShowAlertConfirm: 'onShowAlertConfirm', //confirm窗口
  onShowSelectDialog: 'onShowSelectDialog', //打开选择框消息,
  onShowMultiSelectDialog: 'onShowMultiSelectDialog', //打开多选择的选择框消息,
  onMultiSelectDialogUpdate: 'onMultiSelectDialogUpdate', //多选择的选项内容更新消息,
  onShowInputDialog: 'onShowInputDialog', //打开输入框消息,
  onShowExcelUploadDialog: 'onShowExcelUploadDialog', //打开excel导入对话框,
  onShowPhotoBrowser: 'onShowPhotoBrowser', //显示照片浏览,
  onScrollBottom: 'onScrollBottom', //滚动到底部

  onShowProgressBar: 'onShowProgressBar',//显示进度条
  onHideProgressBar: 'onHideProgressBar',//隐藏进度条
  onChangeProgressBar: 'onChangeProgressBar',//改变进度条数值
  onShowVideoDialog:'onShowVideoDialog',//播放视频
  onShowPhotoViewer:'onShowPhotoViewer',//显示图片查看
  onShowSideNavFloat: 'onShowSideNavFloat',
  onShowDialogPoiEdit: 'onShowDialogPoiEdit', //显示poi编辑框
  
  
  onShowMaterialMapLocationDialog:'onShowMaterialMapLocationDialog',
  onShowMaterialReviewMapDialog:'onShowMaterialReviewMapDialog'
});

'use strict';

cSite.constant('AddressConstant', {
  server: window.location.protocol + '//' + window.location.host,
  //server: 'https://zhuzhu1688.com',
  //server: 'https://agilepops.com',
  login: window.location.protocol + '//' + window.location.host,
  qiniuServerAddress: 'https://dn-agilepops.qbox.me/',
  uploadImageUrl: 'https://up.qbox.me/putb64/-1',
  qiniuUploadFileUrl: 'https://up.qbox.me'
});

'use strict';

cSite.factory('Http',
  ['$rootScope', '$http', '$q', 'AddressConstant', 'GlobalEvent', 'CommonHelper',
    function ($rootScope, $http, $q, AddressConstant, GlobalEvent, CommonHelper) {

      function get(address, params) {
        var q = $q.defer();
        address = AddressConstant.server + address;

        $http.get(address, { params: params })
          .then(function (data) {
            q.resolve(data);
          }, function (err) {
            q.reject(err);
          });

        return q.promise;
      }

      function post(address, params) {
        var q = $q.defer();
        address = AddressConstant.server + address;

        $http.post(address, params)
          .then(function (data) {
            q.resolve(data);
          }, function (err) {
            q.reject(err);
          })

        return q.promise;
      }

      function request(scope, address, params, isCheck, withoutLoading, fn) {
        scope = scope || $rootScope;

        var q = $q.defer();
        if (!withoutLoading) {
          scope.$emit(GlobalEvent.onShowLoading, true);
        }

        fn(address, params).then(function (result) {
          var data = result.data;
          if (!withoutLoading) {
            scope.$emit(GlobalEvent.onShowLoading, false);
          }
          //   if ((!data || (CommonHelper.isObject(data) && !CommonHelper.getObjectLength(data))) && isCheck) {
          //     CommonHelper.showAlert(scope, RootService.getGlobalLanguageTextByName('noDataFromServer'));
          //     return q.reject({message: RootService.getGlobalLanguageTextByName('noDataFromServer')});
          //   }
          //   if (data && data.err && (data.err.type === FirmUserError.invalid_access_token.type || data.err.type === FirmUserError.not_a_firm_user.type)) {
          //     Auth.logout();
          //   }

          if (data && data.err && isCheck) {
            if ($rootScope.languageCode !== 'en') {
              CommonHelper.showAlert(scope, data.err.zh_message || data.err.message);
            }
            else {
              CommonHelper.showAlert(scope, data.err.message);
            }
          }

          q.resolve(data);

        }, function (err) {
          if (!withoutLoading) {
            scope.$emit(GlobalEvent.onShowLoading, false);
          }
          q.reject(err);
        });

        return q.promise;
      }

      return {
        getRequestWithCheck: function (scope, address, params) {
          return request(scope, address, params, true, false, get);
        },
        postRequestWithCheck: function (scope, address, params) {
          return request(scope, address, params, true, false, post);
        },
        getRequest: function (scope, address, params) {
          return request(scope, address, params, false, false, get);
        },
        postRequest: function (scope, address, params) {
          return request(scope, address, params, false, false, post);
        },
        getRequestWithoutLoading: function (scope, address, params) {
          return request(scope, address, params, true, true, get);
        },
        postRequestWithoutLoading: function (scope, address, params) {
          return request(scope, address, params, true, true, post);
        }
      };

    }]);

'use strict';
cSite.factory('UserNetwork',
  ['Http', 'CommonHelper',
    function (Http, CommonHelper) {
      return {
        user_list: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/user_list', params);
        },
        market_list: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_list', params);
        },
        market_detail: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_detail', params);
        },
        market_save_photos: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_save_photos', params);
        },
        market_supply_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_supply_import', params);
        },
        market_purchases_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_purchases_import', params);
        },
        market_day_info_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_day_info_import', params);
        },
        supply_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/supply_import', params);
        },
        purchases_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/purchases_import', params);
        },
        update_personal_auth_info: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/update_personal_auth_info', params);
        },
        market_make_top: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_make_top', params);
        },
        market_update_status: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_update_status', params);
        },
        create_banner: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/create_banner', params);
        },
        offer_price_list: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/offer_price_list', params);
        },
        user_count_by_status: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/user_count_by_status', params);
        },
      };
    }]);

'use strict';

cSite.factory('CommonHelper', ['$rootScope', '$timeout', 'GlobalEvent', 'AddressConstant', '$mdDialog',
    function ($rootScope, $timeout, GlobalEvent, AddressConstant, $mdDialog) {
        // showMaterialReviewMap: function (scope, targetEvent, params, callback) {
        //   $mdDialog.show({
        //     controller: 'MaterialDialogReviewMapController',
        //     templateUrl: '/site_common/dialog/review_map/review_map.client.view.html',
        //     contentElement: document.querySelector('#myStaticDialog'),
        //     parent: angular.element(document.body),
        //     targetEvent: targetEvent,
        //     locals: params || {},
        //     scope: params.scope,
        //     preserveScope: true,
        //     clickOutsideToClose: false,
        //     fullscreen: scope.customFullscreen // Only for -xs, -sm breakpoints.
        //   }).then(callback);
        var commonHelper = {
            showLoading: function (scope, isShow) {
                $timeout(function () {
                    return scope.$emit(GlobalEvent.onShowLoading, isShow);
                }, 0);
            },
            showAlert: function (scope, text, callback, ev, delayTime) {
                var isFinished = false;
        
                var promise = $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('消息')
                    .textContent(text)
                    .ariaLabel('Alert Dialog')
                    .ok('确定')
                    .targetEvent(ev)
                )
                  .finally(function () {
                    isFinished = true;
                    callback && callback();
                  });
        
                if (delayTime) {
                  $timeout(function () {
                    if (!isFinished) {
                      $mdDialog.cancel(promise);
                    }
                  }, delayTime);
                }
              },
              showConfirm: function (scope, title, text, sureCallback, cancelCallback, cancelLabel, ev) {
                $mdDialog.show(
                  $mdDialog.confirm()
                    .title(title || '提示')
                    .textContent(text)
                    .ariaLabel('Confirm')
                    .targetEvent(ev)
                    .ok('确定')
                    .cancel(cancelLabel ||'取消')
                ).then(function () {
                  if (sureCallback) {
                    sureCallback();
                  }
                }, function () {
                  if (cancelCallback) {
                    cancelCallback();
                  }
                });
              },
        };
        return commonHelper;
    }]);

/**
 * Created by louisha on 15/11/30.
 */

'use strict';
cSite.factory('ExcelService',
  [function () {

    function to_json(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    }

    function checkIsOurTemplate(sheet, sheetColumn, callback) {
      if (!sheet) {
        return callback(false);
      }
      for (var index = 0; index < sheetColumn.length; index++) {
        var column = sheetColumn[index].key;

        if (column) {
          var columnName = sheet[column].v;
          if (columnName !== sheetColumn[index].value) {
            return callback(false);
          }
        }
        else {
          return callback(false);
        }
      }

      return callback(true);
    }

    function generateData(workbook, callback, sheetName) {
      var jsonResult = to_json(workbook);
      var xlsSheetArray = jsonResult[sheetName || workbook.SheetNames[0]];
      //var jsonResultString = JSON.stringify(xlsSheetArray);
      if (xlsSheetArray && xlsSheetArray.length > 0) {
        xlsSheetArray.forEach(function (item) {
          for (var prop in item) {
            if (typeof item[prop] === 'string') {
              item[prop] = item[prop].trim();
            }
          }
        });
        return callback(null, xlsSheetArray);
      }
      else {
        return callback('无数据', null);
      }
    }

    function saveExcelFile(fileName, sheets) {
      var workBook = new Workbook();
      workBook.SheetNames = sheets.map(function (item) {
        return item.name;
      });

      for (var i = 0, l = sheets.length; i < l; i++) {
        workBook.Sheets[sheets[i].name] = sheet_from_array_of_arrays(sheets[i].data);
      }

      var outBinaryData = XLSX.write(workBook, { bookType: 'xlsx', bookSST: false, type: 'binary' });
      saveAs(new Blob([s2ab(outBinaryData)], { type: 'application/octet-stream' }), fileName);
    }

    function ExcelColumnConfig() {
      this.col_index = 0;
      this.getNextColumnName = function () {
        this.col_index++;
        return this.getCurrentColumnName();
      };
      this.getCurrentColumnName = function () {
        var s = '', col = this.col_index;
        for (++col; col; col = Math.floor((col - 1) / 26)) {
          s = String.fromCharCode(((col - 1) % 26) + 65) + s;
        }
        return s;
      };
      this.reset = function () {
        this.col_index = 0;
      };
      this.setCodeString = function (codeString) {
        var codeArr = (codeString || '').toString().split('');
        if (codeArr.length === 0) {
          return this.reset();
        }
        var num = 0;
        for (var i = 0; i < codeArr.length; i++) {
          num += (codeArr[i].charCodeAt() - 65 + 1) * Math.pow(26, codeArr.length - i - 1);
        }
        this.col_index = num - 1;
      };
    }


    return {
      generateDataByExcelFile: function (file, sheetOrder, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          var workbook = XLSX.read(data, { type: 'binary' });
          if (workbook.SheetNames.length <= 0) {
            return callback('无数据');
          }
          if (sheetOrder) {
            checkIsOurTemplate(workbook.Sheets[workbook.SheetNames[0]], sheetOrder, function (isTrue) {
              if (!isTrue) {
                return callback('请使用正确的模版');
              }
              else {
                generateData(workbook, function (err, data) {
                  return callback(err, data);
                });
              }

            });
          }
          else {
            generateData(workbook, function (err, data) {
              return callback(err, data);
            });
          }
        };

        reader.readAsBinaryString(file);
      },
      readExcel: function (file, callback) {
        if (!file || !file.name) {
          return callback('请选择文件');
        }

        var suffix_file = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if (suffix_file !== 'xls' && suffix_file !== 'xlsx') {
          return callback('请选择文件');
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          var workbook = XLSX.read(data, { type: 'binary' });
          if (workbook.SheetNames.length <= 0) {
            return callback('没有数据');
          }

          return callback(null, workbook);
        };

        reader.readAsBinaryString(file);
      },
      getExcelHeader: function (workbook, callback, sheetName) {
        var sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
        if (!sheet) {
          return callback('请使用正确的模版');
        }

        var header = [];
        var letterRegex = /[A-Z]+/;
        for (var prop in sheet) {
          if (prop.slice(-1) === '1') {
            var letterCode = prop.substr(-2, 1);
            if (letterRegex.test(letterCode)) {
              header.push(sheet[prop].v);
            }
          }
        }
        return callback(null, header);
      },
      getExcelData: function (workbook, callback, sheetName) {
        return generateData(workbook, callback, sheetName);
      },
      saveExcelFile: saveExcelFile,
      ExcelColumnConfig: ExcelColumnConfig
    };

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.factory('QiniuService', [
  function () {
    function createUploader(btnId, callback) {
      var Qiniu = new QiniuJsSDK();
      var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',      // 上传模式，依次退化
        browse_button: btnId,         // 上传选择的点选按钮，必需
        // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
        // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
        // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
        // uptoken : '<Your upload token>', // uptoken是上传凭证，由其他程序生成
        uptoken_url: '/api_token/qiniu/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        // uptoken_func: function (data) {    // 在需要获取uptoken时，该方法会被调用
        //     // do something
        //     return uptoken;
        // },
        get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
        // downtoken_url: '/downtoken',
        // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
        unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
        // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
        domain: 'chaoqian',     // bucket域名，下载资源时用到，必需
        container: 'qiniu-upload-test-container',             // 上传区域DOM ID，默认是browser_button的父元素
        max_file_size: '100mb',             // 最大文件体积限制
        max_retries: 3,                     // 上传失败最大重试次数
        // dragdrop: true,                     // 开启可拖曳上传
        drop_element: 'qiniu-upload-test-container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                  // 分块上传时，每块的体积
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        //x_vars : {
        //    查看自定义变量
        //    'time' : function(up,file) {
        //        var time = (new Date()).getTime();
        // do something with 'time'
        //        return time;
        //    },
        //    'size' : function(up,file) {
        //        var size = file.size;
        // do something with 'size'
        //        return size;
        //    }
        //},
        init: {
          'FilesAdded': function (up, files) {
            plupload.each(files, function (file) {
              console.log(file);
              // 文件添加进队列后，处理相关的事情
            });
          },
          'BeforeUpload': function (up, file) {
            // 每个文件上传前，处理相关的事情
          },
          'UploadProgress': function (up, file) {
            // 每个文件上传时，处理相关的事情
          },
          'FileUploaded': function (up, file, info) {
            if (info.response) {
              console.log(btnId);
              callback(JSON.parse(info.response));
            }
            else {
              callback('upload error');
            }
            // 每个文件上传成功后，处理相关的事情
            // 其中info是文件上传成功后，服务端返回的json，形式如：
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 查看简单反馈
            // var domain = up.getOption('domain');
            // var res = parseJSON(info);
            // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
          },
          'Error': function (up, err, errTip) {
            console.log(up);
            console.log(err);
            console.log(errTip);
            //上传出错时，处理相关的事情
          },
          'UploadComplete': function () {
            //队列文件处理完毕后，处理相关的事情
          },
          // 'Key': function(up, file) {
          //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          //     // 该配置必须要在unique_names: false，save_key: false时才生效
          //     var key = "";
          //     // do something with key here
          //     return key
          // }
        }
      });

    }
    return {
      createUploader: createUploader,
      getQiniuImageSrc: function (key) {
        return 'http://p3tm0tvs2.bkt.clouddn.com/' + key;
      }
    }

  }]);

'use strict';

cSite.directive('dialogLoadingBox', ['$rootScope', 'GlobalEvent', 'CommonHelper', function ($rootScope, GlobalEvent, CommonHelper) {
  return {
    restrict: 'E',
    templateUrl: '/c_backend/site_admin/directive/dialog_loading_box/dialog_loading_box.client.view.html',
    replace: true,
    scope: {},
    controller: function ($scope, $element) {
      $scope.dialogInfo = {
        isShow: false
      };

      $rootScope.$on(GlobalEvent.onShowLoading, function (event, isLoading) {
        $scope.dialogInfo.isShow = isLoading;
      });
    }
  };
}]);

/**
 * 货物照片预览
 * author: louisha
 * 参数：数组
 * 数组成员：图片对象
 * {
 *     order:'订单号'
 *     title:'照片信息 例：提货货物照片',
 *     warning:'需要突出显示的信息,字体会变成红色',
 *     url:'图片url地址',
 *     remark:'图片备注'}
 */

cSite.directive('mPhotoScan', ['$document', function ($document) {
  return {
    restrict: 'EA',
    template: '<div class="zz-photo-scan-mask" ng-show="show">' +
      '<div class="zz-photo-scan-top">' +
      '<span>{{photoShow.currentPhoto.order}}</span>' +
      '<span>{{photoShow.currentPhoto.title}}</span>' +
      '<span class="warning">{{photoShow.currentPhoto.warning}}</span>' +
      '</div>' +
      '<div class="row zz-photo-scan-wrap">' +
      '<div class="col-xs-12 container" ng-mouseover="showRemark(true)" ng-mouseleave="showRemark(false)">' +
      '<img ng-src="{{photoShow.currentPhoto.url}}" class="photo-info"/>' +
      '<div class="zz-photo-scan-remark" ng-show="photoShow.showRemark">' +
      '<div class="remark-info">{{photoShow.currentPhoto.remark}}</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="zz-photo-scan-close"  ng-click="close()">' +
      '<img src="c_backend/site_admin/images/global/close_white.png" />' +
      '</div>' +
      '<div class="zz-photo-scan-arrow-left-warp">' +
      '<div class="zz-photo-scan-arrow-left"  ng-class="{\'disable\':!photoShow.pre_enable}" ng-click="preClick()">' +
      '<img src="c_backend/site_admin/images/global/arrow_left.png" />' +
      '</div>' +
      '<div class="btn-mask" ng-show="!photoShow.pre_enable"></div>' +
      '</div>' +
      '<div class="zz-photo-scan-arrow-right-warp">' +
      '<div class="zz-photo-scan-arrow-right" ng-class="{\'disable\':!photoShow.next_enable}" ng-click="nextClick()">' +
      '<img src="c_backend/site_admin/images/global/arrow_right.png" />' +
      '</div> ' +
      '<div class="btn-mask" ng-show="!photoShow.next_enable"></div>' +
      '</div>' +
      '</div>',
    replace: true,
    scope: {
      photos: '=',
      show: '=',
      startIndex: '='
    },
    link: function (scope, element, attributes) {
      if (!scope.photos) {
        scope.photos = [];
      }
      if (!scope.show) {
        scope.show = false;
      }
      if (!scope.startIndex) {
        scope.startIndex = 0;
      }
      scope.photoShow = {
        currentPhoto: scope.photos.length > 0 ? scope.photos[scope.startIndex] : null,
        current_index: scope.startIndex,
        next_enable: true,
        pre_enable: false,
        showRemark: false
      };
      scope.preClick = function () {
        if (scope.photoShow.current_index == 0 || scope.photos.length == 0) {
          return;
        }
        scope.photoShow.current_index--;
        scope.photoShow.currentPhoto = scope.photos[scope.photoShow.current_index];
        initNavState();
      };
      scope.nextClick = function () {
        if (scope.photos.length == 0 || scope.photoShow.current_index == scope.photos.length - 1) {
          return;
        }
        scope.photoShow.current_index++;
        scope.photoShow.currentPhoto = scope.photos[scope.photoShow.current_index];
        initNavState();
      };
      scope.close = function () {
        scope.show = false;
      };

      scope.initShow = function () {
        scope.photoShow.current_index = scope.startIndex;
        scope.photoShow.currentPhoto = scope.photos[scope.photoShow.current_index];
        initNavState();
      };

      scope.showRemark = function (bo) {
        if (!scope.photoShow.currentPhoto.remark || scope.photoShow.currentPhoto.remark == '') {
          return;
        }
        scope.photoShow.showRemark = bo;
      };

      function initNavState() {
        scope.photoShow.pre_enable = scope.photoShow.current_index <= 0 ? false : true;
        scope.photoShow.next_enable = scope.photoShow.current_index >= scope.photos.length - 1 ? false : true
      }

      scope.$watch('show', function (newVal, oldVal) {
        scope.initShow();
      });
    }
  }
}]);
/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('AuthDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('AuthListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('HomeController', [
  '$rootScope', '$scope', '$state', '$stateParams',
  function ($rootScope, $scope, $state, $stateParams) {

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('IndexController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    $scope.goNav = function (nav) {
      $scope.toggleLeft();
      $state.go(nav);
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketDayInfoDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);


/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketDayInfoListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService, CommonHelper) {
    var pageConfig = {
      count: 0,
      title: '每日价格列表',
      import_text: '导入每日价格',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '批发市场',
        '品种',
        '今日价格',
        '昨日价格',
        '日期'
      ],
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          ['莫某批发市场', '白菜', '11-12元／斤', '10-20元／斤', '2018-02-03']
        ];
        ExcelService.saveExcelFile('每日行情价格导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      market_update_status: function (status, detail_id) {
        UserNetwork.market_update_status($scope, { model_string: 'MarketDayInfo', detail_id: detail_id, status: status }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('market_day_info_list', null, { reload: true });
            }, null, null, event);
          }
          console.log(data);
        });
      },
      get_list: function (next) {
        next = next || 'next';
        if (next === 'prev' && pageConfig.current_page === 2) {
          next = 'next';
          pageConfig.current_page = 0;
          pageConfig.last_item = {};
        }
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'MarketDayInfo' }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.market_day_info_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      next_page: function () {

      },
      prev_page: function () {

      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];

                // if (!row[tableHeaderList[0]]) {
                //   return showAlert(RootService.getGlobalLanguageTextByName('sameRowNotSet', i + 2, tableHeaderList[0]));
                // }
                // if (!row[tableHeaderList[1]]) {
                //   return showAlert(RootService.getGlobalLanguageTextByName('sameRowNotSet', i + 2, tableHeaderList[1]));
                // }

                var newData = {};
                newData.market = row[tableHeaderList[0]];
                newData.main_goods = row[tableHeaderList[1]];
                newData.price = row[tableHeaderList[2]];
                newData.last_day_price = row[tableHeaderList[3]];
                newData.day = row[tableHeaderList[4]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
              // uploadSkuList(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketPurchasesDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketPurchasesListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService, CommonHelper) {
    var pageConfig = {
      count: 0,
      title: '采购商',
      import_text: '导入采购商',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '采购商所在省',
        '采购商所在城市',
        '采购商所在市场',
        '商户名称',
        '主营品类',
        '身份',
        '联系电话',
        '每日销量',
        '采购商所在省拼音',
      ],
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          ['上海', '上海', '上海江桥', '为名蔬菜商行', '土豆', '代销', '17775338594', '200吨', 'shanghai']
        ];
        ExcelService.saveExcelFile('每日行情采购商导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      market_update_status: function (status, detail_id) {
        UserNetwork.market_update_status($scope, { model_string: 'MarketPurchases', detail_id: detail_id, status: status }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('market_purchases_list', null, { reload: true });
            }, null, null, event);
          }
          console.log(data);
        });
      },
      get_list: function (next) {
        next = next || 'next';
        if (next === 'prev' && pageConfig.current_page === 2) {
          next = 'next';
          pageConfig.current_page = 0;
          pageConfig.last_item = {};
        }
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'MarketPurchases' }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.market_purchases_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];
                var newData = {};
                newData.province = row[tableHeaderList[0]];
                newData.city = row[tableHeaderList[1]];
                newData.market = row[tableHeaderList[2]];
                newData.name = row[tableHeaderList[3]];
                newData.main_goods = row[tableHeaderList[4]];
                newData.identity = row[tableHeaderList[5]];
                newData.phone = row[tableHeaderList[6]];
                newData.day_sales = row[tableHeaderList[7]];
                newData.province_py = row[tableHeaderList[8]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketSupplyDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketSupplyListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService) {
    var pageConfig = {
      count: 0,
      title: '行情-供应商',
      import_text: '导入供应商',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '供应商名称',
        '供应商所在省',
        '供应商所在市',
        '供应商主营品类',
        '供应商商品上市时间',
        '供应商身份',
        '电话号码',
      ],
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          ['安徽大明蔬菜合作社', '安徽', '合肥', '土豆', '5-8月份', '合作社', '17775338594']
        ];
        ExcelService.saveExcelFile('每日行情供应商导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      get_list: function (next) {
        next = next || 'next';
        if (next === 'prev' && pageConfig.current_page === 2) {
          next = 'next';
          pageConfig.current_page = 0;
          pageConfig.last_item = {};
        }
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'MarketSupply' }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.market_supply_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];
                var newData = {};
                newData.name = row[tableHeaderList[0]];
                newData.province = row[tableHeaderList[1]];
                newData.city = row[tableHeaderList[2]];
                newData.main_goods = row[tableHeaderList[3]];
                newData.time = row[tableHeaderList[4]];
                newData.identity = row[tableHeaderList[5]];
                newData.phone = row[tableHeaderList[6]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PaymentDetailController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PaymentListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav) {

  }]);

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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PurchasesListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService) {
    var pageConfig = {
      count: 0,
      title: '采购信息列表',
      import_text: '导入采购信息',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '采购货品类型',
        '采购货品品类',
        '采购货品品种',
        '规格',
        '需求量',
        '需求量单位',
        '期望价格',
        '期望价格单位',
        '期望货源省',
        '期望货源市',
        '补充说明',
        '采购频率',
        '采购时长',
        '收货地址省',
        '收货地址市',
        '电话',
        '角色'
      ],
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          [
            '蔬菜',
            '大白菜',
            '北京新三号',
            '单颗重|4-6斤，株高|35-40cm',
            '40000',
            '斤',
            '0.25',
            '元/斤',
            '河南',
            '夏邑',
            '货好',
            '每周',
            '7天',
            '安徽',
            '合肥',
            '17775338594',
            '批发商'
          ]
        ];
        ExcelService.saveExcelFile('采购导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      go_detail: function (item) {
        $state.go('purchases_detail', { detail_id: item._id });
      },
      get_list: function (next) {
        next = next || 'next';
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'Purchases' }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.purchases_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];
                var newData = {};
                newData.goods_class = row[tableHeaderList[0]];
                newData.goods_category = row[tableHeaderList[1]];
                newData.goods_brand = row[tableHeaderList[2]];
                newData.goods_specs = row[tableHeaderList[3]];
                newData.need_number = row[tableHeaderList[4]];
                newData.need_unit = row[tableHeaderList[5]];
                newData.expect_price = row[tableHeaderList[6]];
                newData.expect_price_unit = row[tableHeaderList[7]];
                newData.expect_province = row[tableHeaderList[8]];
                newData.expect_city = row[tableHeaderList[9]];
                newData.remark = row[tableHeaderList[10]];
                newData.frequency = row[tableHeaderList[11]];
                newData.duration = row[tableHeaderList[12]];
                newData.receive_province = row[tableHeaderList[13]];
                newData.receive_city = row[tableHeaderList[14]];
                newData.mobile_phone = row[tableHeaderList[15]];
                newData.role = row[tableHeaderList[16]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);

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
      market_update_status: function (status) {
        UserNetwork.market_update_status($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, status: status }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('supply_list');
            }, null, null, event);
          }
          console.log(data);
        });
      },
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
      market_make_top: function () {
        UserNetwork.market_make_top($scope, { is_top: pageConfig.detail.is_top ? false : true, model_string: 'Supply', detail_id: pageConfig.detail_id }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('supply_detail', null, { reload: true });
            }, null, null, event);
          }
          console.log(data);
        });
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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('SupplyListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService) {
    var pageConfig = {
      count: 0,
      title: '供应信息列表',
      import_text: '导入供应信息',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      table_header: [
        '供应货品类型',
        '供应货品品类',
        '供应货品品种',
        '规格',
        '是否现货',
        '下架时间',
        '批发价',
        '批发价单位',
        '起批量',
        '发货地址省',
        '发货地址市',
        '货品描述',
        '服务方式',
        '电话',
        '角色',
        '角色名称'
      ],
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          ['蔬菜',
            '白菜',
            '秋白菜',
            '单颗重|一斤以下,株高|10～15cm',
            '现货',
            '2018/1/30',
            '0.23',
            '元/斤',
            '23',
            '四川',
            '成都',
            '货物说明',
            '基地直供|产地代办',
            '1333333333',
            '种植户',
            '角色名称'
          ]
        ];
        ExcelService.saveExcelFile('供应导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      go_detail: function (item) {
        $state.go('supply_detail', { detail_id: item._id });
      },
      get_list: function (next) {
        next = next || 'next';
        UserNetwork.market_list($scope, { next: next, last_item: pageConfig.last_item, model_string: 'Supply' }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.supply_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];
                var newData = {};
                newData.goods_class = row[tableHeaderList[0]];
                newData.goods_category = row[tableHeaderList[1]];
                newData.goods_brand = row[tableHeaderList[2]];
                newData.goods_specs = row[tableHeaderList[3]];
                newData.is_cash_goods = row[tableHeaderList[4]];
                newData.undercarriage_time = row[tableHeaderList[5]];
                newData.price = row[tableHeaderList[6]];
                newData.price_unit = row[tableHeaderList[7]];
                newData.min_count = row[tableHeaderList[8]];
                newData.send_province = row[tableHeaderList[9]];
                newData.send_city = row[tableHeaderList[10]];
                newData.remark = row[tableHeaderList[11]];
                newData.provide_services_string = row[tableHeaderList[12]];
                newData.mobile_phone = row[tableHeaderList[13]];
                newData.role = row[tableHeaderList[14]];
                newData.nickname = row[tableHeaderList[15]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
  }]);

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

/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', '$timeout', 'ExcelService', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, $timeout, ExcelService, UserNetwork) {
    var pageConfig = {
      count: 0,
      title: '用户列表',
      import_text: '导入采购信息',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      personal_auth_stauts: '',
      authing_count:0,
      username: '',
      list: [],
      table_header: [
        '头像',
        '用户名',
        '昵称',
        '角色',
        '买／卖',
        '身份',
        'vip状态',
        '认证状态',
      ],
      user_count_by_status: function (personal_auth_stauts) {
        UserNetwork.user_count_by_status($scope, {
          personal_auth_stauts: personal_auth_stauts || 'authing',
        }).then(function (data) {
          console.log(data);
          pageConfig.authing_count = data.count||0;
          $timeout(function () {
            pageConfig.user_count_by_status();
          }, 10000);
        });
      },
      download_template: function () {
        var rows = [
          pageConfig.table_header,
          [
            '蔬菜',
            '大白菜',
            '北京新三号',
            '单颗重|4-6斤，株高|35-40cm',
            '40000',
            '斤',
            '0.25',
            '元/斤',
            '河南',
            '夏邑',
            '货好',
            '每周',
            '7天',
            '安徽',
            '合肥',
            '17775338594',
            '批发商'
          ]
        ];
        ExcelService.saveExcelFile('采购导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      go_detail: function (item) {
        $state.go('user_detail', { detail_id: item._id });
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
      search: function () {
        pageConfig.last_item = {};
        pageConfig.current_page = 0;
        pageConfig.list = [];
        pageConfig.get_list();
      },
      change_auth_status: function (status) {
        pageConfig.personal_auth_stauts = status;
        pageConfig.last_item = {};
        pageConfig.current_page = 0;
        pageConfig.list = [];
        pageConfig.get_list();
      },
      get_list: function (next) {
        next = next || 'next';
        UserNetwork.market_list($scope, {
          next: next,
          last_item: pageConfig.last_item,
          model_string: 'User',
          personal_auth_stauts: pageConfig.personal_auth_stauts,
          username: pageConfig.username,
        }).then(function (data) {
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
      },
      import: function (list) {
        UserNetwork.purchases_import($scope, { list: list }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            pageConfig.last_item = {};
            pageConfig.get_list()
          }
        });
      },
      get_excel: function (element) {
        var that = this;
        var file = element.files[0];

        ExcelService.readExcel(file, function (err, workbook) {
          element.value = '';
          if (err) {
            return showAlert(err);
          }

          ExcelService.getExcelHeader(workbook, function (err, header) {
            if (err) {
              return showAlert(err);
            }
            var tableHeaderList = pageConfig.table_header;

            if (!header || header.toString().indexOf(tableHeaderList.toString()) === -1) {
              return showAlert(RootService.getGlobalLanguageTextByName('pleaseUseValidExcelTemplate'));
            }

            ExcelService.getExcelData(workbook, function (err, data) {
              if (err) {
                return showAlert(err);
              }

              var readList = [], row, existBarcodeList = [];

              for (var i = 0, l = data.length; i < l; i++) {
                row = data[i];
                var newData = {};
                newData.goods_class = row[tableHeaderList[0]];
                newData.goods_category = row[tableHeaderList[1]];
                newData.goods_brand = row[tableHeaderList[2]];
                newData.goods_specs = row[tableHeaderList[3]];
                newData.need_number = row[tableHeaderList[4]];
                newData.need_unit = row[tableHeaderList[5]];
                newData.expect_price = row[tableHeaderList[6]];
                newData.expect_price_unit = row[tableHeaderList[7]];
                newData.expect_province = row[tableHeaderList[8]];
                newData.expect_city = row[tableHeaderList[9]];
                newData.remark = row[tableHeaderList[10]];
                newData.frequency = row[tableHeaderList[11]];
                newData.duration = row[tableHeaderList[12]];
                newData.receive_province = row[tableHeaderList[13]];
                newData.receive_city = row[tableHeaderList[14]];
                newData.mobile_phone = row[tableHeaderList[15]];
                newData.role = row[tableHeaderList[16]];
                readList.push(newData);
              }
              console.log(readList);
              pageConfig.import(readList);
            });
          });
        });
      }
    }
    $scope.pageConfig = pageConfig;
    pageConfig.get_list();
    pageConfig.user_count_by_status();

  }]);
