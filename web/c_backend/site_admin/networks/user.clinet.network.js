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
        market_supply_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_supply_import', params);
        },
        market_purchases_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_purchases_import', params);
        },
        market_day_info_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_day_info_import', params);
        },
      };
    }]);
