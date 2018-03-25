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
