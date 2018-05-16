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
        goods_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/goods_import', params);
        },
        purchases_import: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/purchases_import', params);
        },
        update_personal_auth_info: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/update_personal_auth_info', params);
        },
        market_make_top: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_make_top', params);
        },
        market_update_status: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/market_update_status', params);
        },
        create_banner: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/create_banner', params);
        },
        offer_price_list: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/offer_price_list', params);
        },
        user_count_by_status: function (scope, params) {
          return Http.postRequestWithCheck(scope, '/api_backend/user_count_by_status', params);
        },
      };
    }]);
