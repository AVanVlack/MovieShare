'use strict';

angular.module('movieSyncApp')
  .controller('InfoCtrl', function ($scope, $routeParams, tmdb, $http) {
    $scope.movieData = ''
    tmdb.movieData($routeParams.id).then(function(data){
      console.log(data);
      $scope.movieData = data;
    })
  });
