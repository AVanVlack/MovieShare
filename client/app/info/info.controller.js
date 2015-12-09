'use strict';

angular.module('movieSyncApp')
  .controller('InfoCtrl', function ($scope, $routeParams, tmdb, $http, Auth) {
    $scope.movieData = ''
    $scope.currentUser = Auth.getCurrentUser();

    tmdb.movieData($routeParams.id).then(function(data){
      console.log(data);
      $scope.movieData = data;

    })
    $scope.addMovie = function(){
      var newMovie = {
        owner: $scope.currentUser._id,
        title: $scope.movieData.title,
        poster_path: $scope.movieData.poster_path,
        backdrop_path: $scope.movieData.backdrop_path,
        status: {
          borrower: '',
          checkedOut: 'false' //request, true, false
        },
        tmdb_id: $scope.movieData.id,
        release_date: $scope.movieData.release_date,
        tagline: $scope.movieData.tagline,
        overview: $scope.movieData.overview,
        loc: $scope.currentUser.location.coords
      }
      $http.post('/api/movies', newMovie).success(function(res){
        console.log("movie added!");
      })
    }
  });
