'use strict';

angular.module('movieSyncApp')
  .controller('MainCtrl', function ($scope, $http, socket, tmdb) {
    $scope.movieList = [];

    $http.get('/api/movies').success(function(awesomeThings) {
      $scope.movieList = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.searchToBorrow = function() {
      if($scope.searchInput === '') {
        return;
      }
      $http.get('http://nominatim.openstreetmap.org/search/' + $scope.searchInput + '?format=json&addressdetails=1&limit=1').success(function(location){
        $http.get('/api/movies/list?long=' + location[0].lon + '&lat=' + location[0].lat).success(function(list){
          $scope.movieList = list;
        })
      })
      $scope.searchInput = '';
    };
    $scope.searchToAdd = function() {
      tmdb.searchMovies($scope.searchInput).then(function(search){
        console.log(search);
        $scope.movieList = search
      });
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
