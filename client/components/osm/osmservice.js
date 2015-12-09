angular.module('movieSyncApp')
  .factory('osmFactory', function($http, $q){
    var service = {};
    service.getGeolocation = function(query){
      var defer = $q.defer();
      var url = 'http://nominatim.openstreetmap.org/search/' + query + '?format=json&addressdetails=1&limit=1'
      $http.get(url).success(function(location){
          defer.resolve(location)
      }).error(function(err){
        defer.reject(err);
      });
      return defer.promise;
    }
    return service
  })
