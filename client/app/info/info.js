'use strict';

angular.module('movieSyncApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/info/:id', {
        templateUrl: 'app/info/info.html',
        controller: 'InfoCtrl'
      });
  });
