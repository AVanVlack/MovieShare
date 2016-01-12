'use strict';

angular.module('movieSyncApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.own = [];
    $scope.barrowing = [];
    $scope.currentUser = Auth.getCurrentUser()


    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
    $scope.deleteMovie = function(movieID){
      $http.delete('/api/movies/' + movieID).success(function(){
        _.remove($scope.own, {_id: movieID})
      })
    };
    $scope.approve = function(movieID){
      $http.patch('/api/movies/approve/', {movie: movieID}).success(function(){
        var index = _.find($scope.own, {_id: movieID})
        index.status.checkedOut = 'true';
      });
    }
    $scope.deny = function(movieID){
      $http.patch('/api/movies/deny/', {movie: movieID}).success(function(){
        var index = _.find($scope.own, {_id: movieID})
        index.status.checkedOut = 'false';
      });
    }
    $scope.returnMovie = function(movieID){
      $http.patch('/api/movies/return/', {movie: movieID}).success(function(){
        var index = _.find($scope.own, {_id: movieID})
        index.status.checkedOut = 'false';
      });
    }

    $http.get('/api/movies/user').success(function(data){
      console.table(data)
      data.forEach(function(item){
        if(item.owner === $scope.currentUser._id){
          $scope.own.push(item);
        } else {$scope.barrowing.push(item)}

      })
    })
  });
