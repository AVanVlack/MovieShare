'use strict';

angular.module('movieSyncApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trade', {
        templateUrl: 'app/account/trade/trade.html',
        controller: 'TradeCtrl'
      });
  });
