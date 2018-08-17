/**
 * Created by lance on 2016/11/17.
 */
'use strict';
cSite.controller('SupplyListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', '$window', 'UserNetwork', 'ExcelService',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, $window, UserNetwork, ExcelService) {
    var pageConfig = {
      count: 0,
      title: '供应信息列表',
      import_text: '导入供应信息',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      keyword: '',
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
      search: function () {
        pageConfig.last_item = {};
        pageConfig.current_page = 0;
        pageConfig.list = [];
        pageConfig.get_list();
      },
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
        $window.localStorage[$window.location.host + 'local_supply_list_params'] = JSON.stringify(pageConfig);
        $state.go('supply_detail', { detail_id: item._id });
      },
      get_list: function (next) {
        next = next || 'next';
        UserNetwork.market_list($scope, {
          next: next,
          last_item: pageConfig.last_item,
          model_string: 'Supply',
          keyword: pageConfig.keyword
        }).then(function (data) {
          console.log(data);
          if (data && !data.err) {
            if (data.list.length > 0) {
              pageConfig.count = data.count;
              pageConfig.list = data.list || [];
            }
          }

          if (data.list.length > 0) {
            if (pageConfig.next === 'next') {
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
    if ($window.localStorage[$window.location.host + 'local_supply_list_params']) {
      var local = JSON.parse($window.localStorage[$window.location.host + 'local_supply_list_params']);
      for (var prop in local) {
        pageConfig[prop] = local[prop];
      }
      $window.localStorage[$window.location.host + 'local_supply_list_params'] = '';
    }
    else {
      pageConfig.get_list();
    }
    // pageConfig.get_list();
  }]);
