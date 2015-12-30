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
    $http.get('/api/movies/user').success(function(data){
      console.table(data)
      data.forEach(function(item){
        if(item.owner === $scope.currentUser._id){
          $scope.own.push(item);
        } else {$scope.barrowing.push(item)}

      })
    })
  });
