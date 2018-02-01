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
      url: '/user_detail',
      templateUrl: '/c_backend/site_admin/templates/user_detail.client.view.html',
      controller: 'UserDetailController'
    })
    .state('purchases_list', {
      url: '/purchases_list',
      templateUrl: '/c_backend/site_admin/templates/purchases_list.client.view.html',
      controller: 'PurchasesListController'
    })
    .state('purchases_detail', {
      url: '/purchases_detail',
      templateUrl: '/c_backend/site_admin/templates/purchases_detail.client.view.html',
      controller: 'PurchasesDetailController'
    })
    .state('supply_list', {
      url: '/supply_list',
      templateUrl: '/c_backend/site_admin/templates/supply_list.client.view.html',
      controller: 'SupplyListController'
    })
    .state('supply_detail', {
      url: '/supply_detail',
      templateUrl: '/c_backend/site_admin/templates/supply_detail.client.view.html',
      controller: 'SupplyDetailController'
    })
    .state('market_list', {
      url: '/market_list',
      templateUrl: '/c_backend/site_admin/templates/market_list.client.view.html',
      controller: 'MarketListController'
    })
    .state('market_detail', {
      url: '/market_detail',
      templateUrl: '/c_backend/site_admin/templates/market_detail.client.view.html',
      controller: 'MarketDetailController'
    })
    .state('payment_list', {
      url: '/payment_list',
      templateUrl: '/c_backend/site_admin/templates/payment_list.client.view.html',
      controller: 'PaymentListController'
    })
    .state('payment_detail', {
      url: '/payment_detail',
      templateUrl: '/c_backend/site_admin/templates/payment_detail.client.view.html',
      controller: 'PaymentDetailController'
    });
  $urlRouterProvider.otherwise('/home');
}]);

