/**
 * Created by lance on 2016/11/17.
 */
'use strict';

cSite.controller('UserListController', [
  '$rootScope', '$scope', '$state', '$stateParams', '$mdSidenav', '$timeout', '$window', 'ExcelService', 'UserNetwork',
  function ($rootScope, $scope, $state, $stateParams, $mdSidenav, $timeout, $window, ExcelService, UserNetwork) {
    var pageConfig = {
      count: 0,
      title: '用户列表',
      import_text: '导入采购信息',
      last_item: {},
      current_page: 0,
      prev_last_item: {},
      personal_auth_stauts: '',
      authing_count: 0,
      keyword: '',
      list: [],
      goal: '',
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
          pageConfig.authing_count = data.count || 0;
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
        var data = {
          next: pageConfig.next,
          last_item: pageConfig.last_item,
          personal_auth_stauts: pageConfig.personal_auth_stauts,
          keyword: pageConfig.keyword,
          goal: pageConfig.goal
        }
        $window.localStorage['local_user_list_params'] = JSON.stringify(data);
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
      change_goal: function (goal) {
        pageConfig.goal = goal;
        pageConfig.last_item = {};
        pageConfig.current_page = 0;
        pageConfig.list = [];
        pageConfig.get_list();
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
        pageConfig.next = next;
        if ($window.localStorage['local_user_list_params']) {
          var local = JSON.parse($window.localStorage['local_user_list_params']);
          pageConfig.next = local.next;
          pageConfig.last_item = local.last_item;
          pageConfig.personal_auth_stauts = local.personal_auth_stauts;
          pageConfig.keyword = local.keyword;
          pageConfig.goal = local.goal;
          $window.localStorage['local_user_list_params'] = '';
        }

        UserNetwork.market_list($scope, {
          next: pageConfig.next,
          last_item: pageConfig.last_item,
          model_string: 'User',
          personal_auth_stauts: pageConfig.personal_auth_stauts,
          keyword: pageConfig.keyword,
          goal: pageConfig.goal
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
