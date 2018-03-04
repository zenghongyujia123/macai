'use strict';

var cSite = angular.module('chaoQianSite', [
  'ui.router',
  //   'LocalStorageModule',
  //   'base64',
  'ngMaterial',
  'textAngular'
]);

cSite.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange')
    .warnPalette('red');
});

cSite.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/c_backend/site_admin/templates/home.client.view.html',
      controller: 'HomeController'
    })
    .state('user_list', {
      url: '/user_list',
      templateUrl: '/c_backend/site_admin/templates/user_list.client.view.html',
      controller: 'UserListController'
    })
    .state('user_detail', {
      url: '/user_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/user_detail.client.view.html',
      controller: 'UserDetailController'
    })
    .state('purchases_list', {
      url: '/purchases_list',
      templateUrl: '/c_backend/site_admin/templates/purchases_list.client.view.html',
      controller: 'PurchasesListController'
    })
    .state('purchases_detail', {
      url: '/purchases_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/purchases_detail.client.view.html',
      controller: 'PurchasesDetailController'
    })
    .state('supply_list', {
      url: '/supply_list',
      templateUrl: '/c_backend/site_admin/templates/supply_list.client.view.html',
      controller: 'SupplyListController'
    })
    .state('supply_detail', {
      url: '/supply_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/supply_detail.client.view.html',
      controller: 'SupplyDetailController'
    })
    .state('market_supply_list', {
      url: '/market_supply_list',
      templateUrl: '/c_backend/site_admin/templates/market_supply_list.client.view.html',
      controller: 'MarketSupplyListController'
    })
    .state('market_supply_detail', {
      url: '/market_supply_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_supply_detail.client.view.html',
      controller: 'MarketSupplyDetailController'
    })

    .state('market_purchases_list', {
      url: '/market_purchases_list',
      templateUrl: '/c_backend/site_admin/templates/market_purchases_list.client.view.html',
      controller: 'MarketPurchasesListController'
    })
    .state('market_purchases_detail', {
      url: '/market_purchases_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_purchases_detail.client.view.html',
      controller: 'MarketPurchasesDetailController'
    })
    .state('market_day_info_list', {
      url: '/market_day_info_list',
      templateUrl: '/c_backend/site_admin/templates/market_day_info_list.client.view.html',
      controller: 'MarketDayInfoListController'
    })
    .state('market_day_info_detail', {
      url: '/market_day_info_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/market_day_info_detail.client.view.html',
      controller: 'MarketDayInfoDetailController'
    })
    .state('auth_list', {
      url: '/auth_list',
      templateUrl: '/c_backend/site_admin/templates/auth_list.client.view.html',
      controller: 'AuthListController'
    })
    .state('auth_detail', {
      url: '/auth_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/auth_detail.client.view.html',
      controller: 'AuthDetailController'
    })
    .state('payment_list', {
      url: '/payment_list',
      templateUrl: '/c_backend/site_admin/templates/payment_list.client.view.html',
      controller: 'PaymentListController'
    })
    .state('payment_detail', {
      url: '/payment_detail/:detail_id',
      templateUrl: '/c_backend/site_admin/templates/payment_detail.client.view.html',
      controller: 'PaymentDetailController'
    });
  $urlRouterProvider.otherwise('/user_list');
}]);

