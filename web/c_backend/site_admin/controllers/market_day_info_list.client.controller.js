
/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('MarketDayInfoListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService) {
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
        '价格',
        '日期'
      ],
      download_template: function () {
        var rows = [
          ['批发市场', '品种', '价格', '日期'],
          ['莫某批发市场', '白菜', '10-20元／斤', '2018-02-03']
        ];
        ExcelService.saveExcelFile('每日行情价格导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      get_list: function (next) {
        next = next || 'next';
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
                newData.day = row[tableHeaderList[3]];
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
