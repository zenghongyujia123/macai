
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
