'use strict';

angular.module('movieSyncApp')
  .controller('MainCtrl', function ($scope, $http, socket, tmdb, osmFactory, Auth) {
    $scope.movieList = [];
    $scope.movieData = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.distances = [
      {label: "10 Miles", value: 10},
      {label: "20 Miles", value: 20},
      {label: "50 Miles", value: 50},
      {label: "100 Miles", value: 100},
      {label: "200 Miles", value: 200},
      {label: "500 Miles", value: 500},
      {label: "All Movies", value: 10000}
    ]
    $scope.distanceSelect = $scope.distances[0];
    $scope.search = 'barrow';
    $scope.displayInfo = false;

    $http.get('/api/movies').success(function(awesomeThings) {
      $scope.movieList = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.searchToBorrow = function() {
      if($scope.searchInput === '') {
        return;
      }
      osmFactory.getGeolocation($scope.searchInput).then(function(location){
        updateMovieList({lon: location[0].lon, lat: location[0].lat});
      })
    };

    $scope.moreInfo = function(movieID, id){
      $scope.movieData = {};
      tmdb.movieData(movieID).then(function(data){
        console.log(data);
        $scope.movieData = data;
        if(id){
          $scope.movieData.barrowID = id
        }
      });
      $scope.displayInfo = true;

    };

    $scope.barrow = function(){
      $http.patch('/api/movies/req', {movie: $scope.movieData.barrowID}).success(function(res){
        console.log(res)
      })
    };
    $scope.geolocationToBorrow = function(){
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function(location){
            updateMovieList({lon: location.coords.longitude ,lat: location.coords.latitude});
        },function(err){
            console.log(err);
        },{maximumAge: 10 * 60 * 1000, timeout: 10 * 1000})
      } else {
        console.log('This dont work')
      }
    }

    $scope.addMovie = function(){
      console.log($scope.currentUser)
      var newMovie = {
        title: $scope.movieData.title,
        poster_path: $scope.movieData.poster_path,
        backdrop_path: $scope.movieData.backdrop_path,
        status: {
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

    $scope.searchForAll = function() {
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

    var updateMovieList = function(location){
      $http.get('/api/movies/list?long=' + location.lon + '&lat=' + location.lat + '&distance=' + ($scope.distanceSelect.value/69)).success(function(list){
        $scope.movieList = list;
      })
    }
  });
