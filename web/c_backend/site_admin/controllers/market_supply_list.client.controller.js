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
