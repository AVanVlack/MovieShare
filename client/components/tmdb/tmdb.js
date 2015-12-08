ApiKey =

angular.module("movieSyncApp")
  .factory("tmdb", function($http, $location, $q){
    return {
      imageList: function(movieID){
        //add: def or err for no movieID
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: "http://api.themoviedb.org/3/movie/" + movieID + "/images?callback=JSON_CALLBACK&api_key=877dc57757add90457764268f3582cbc"
        }).success(function(datame){
          defer.resolve({posters: datame.posters,backdrops: datame.backdrops});
        }).error(function(err){
          defer.reject(err);
        });
        return defer.promise;
      },
      movieData: function(movieID){
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: "http://api.themoviedb.org/3/movie/" + movieID + "?api_key=877dc57757add90457764268f3582cbc&callback=JSON_CALLBACK"
        }).success(function(datame){
          defer.resolve(datame);
        }).error(function(err){
          defer.reject(err);
        });
        return defer.promise;
      },
      discover: function(){
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: "http://api.themoviedb.org/3/discover/movie?callback=JSON_CALLBACK&api_key=877dc57757add90457764268f3582cbc"
        }).success(function(datame){
          defer.resolve(datame.results);
        }).error(function(err){
          defer.reject(err);
        });
        return defer.promise;
      },
      searchMovies: function(query){
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: "http://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=877dc57757add90457764268f3582cbc&callback=JSON_CALLBACK"
        }).success(function(datame){
          defer.resolve(datame.results);
        }).error(function(err){
          defer.reject(err)
        });
        return defer.promise;
      }
    }
  })
