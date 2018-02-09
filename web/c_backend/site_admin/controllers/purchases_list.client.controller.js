/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('PurchasesListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork) {
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
        '收货地址',
        '收货地址',
        '电话',
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
          ]
        ];
        ExcelService.saveExcelFile('采购导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
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
                newData.market = row[tableHeaderList[0]];
                newData.main_goods = row[tableHeaderList[1]];
                newData.price = row[tableHeaderList[2]];
                newData.day = row[tableHeaderList[3]];
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
