'use strict';

describe('Controller: TradeCtrl', function () {

  // load the controller's module
  beforeEach(module('movieSyncApp'));

  var TradeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TradeCtrl = $controller('TradeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
