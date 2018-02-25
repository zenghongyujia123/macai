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
                newData.market = row[tableHeaderList[10]];
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
