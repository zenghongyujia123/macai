/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('GoodsListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', 'UserNetwork', 'ExcelService', 'CommonHelper',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, UserNetwork, ExcelService, CommonHelper) {
    var pageConfig = {
      count: 0,
      title: '品类规格',
      import_text: '导入品类规格',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      list: [],
      keyword: '',
      table_header: [
        '大品类',
        '品类',
        '品种',
        '品种首字母',
        '规格名称',
        '规格详情',
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
          ['蔬菜', '白菜', '白菜品种1', 'B', '单颗重', '50-80g|80-90g|200g以上']
        ];
        ExcelService.saveExcelFile('品类导入模版.xlsx', [{ data: rows, name: 'sheet1' }]);
      },
      market_update_status: function (status, detail_id) {
        UserNetwork.market_update_status($scope, {
          model_string: 'Goods',
          detail_id: detail_id,
          status:status
        }).then(function (data) {
          // UserNetwork.market_save_photos($scope, { model_string: 'Supply', detail_id: pageConfig.detail_id, photos: photos }).then(function (data) {
          if (!data.err) {
            CommonHelper.showConfirm($scope, null, '操作成功', function () {
              $state.go('goods_list', null, { reload: true });
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
        UserNetwork.market_list($scope, {
          next: next,
          last_item: pageConfig.last_item,
          model_string: 'Goods',
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
        UserNetwork.goods_import($scope, { list: list }).then(function (data) {
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
                newData.first_pinyin = row[tableHeaderList[3]];
                newData.goods_specs_title = row[tableHeaderList[4]];
                newData.goods_specs_string = row[tableHeaderList[5]];
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
