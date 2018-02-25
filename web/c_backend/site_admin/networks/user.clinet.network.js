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
      };
    }]);
