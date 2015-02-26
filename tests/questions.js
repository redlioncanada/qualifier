//var jsdom = require('jsdom');
describe('QuestionsCtrl', function() {
  beforeEach(module('app'));
  var $controller;
  describe('$scope.order', function() {
    beforeEach(function() {
      $scope = {};
      controller = $controller('QuestionsCtrl', { $scope: $scope });
    });

    it('adds to order', function() {
      $scope.order = 1; 
      $scope.next();
      expect($scope.order).toEqual(2);
    });

    it('substracts from order', function() {
      $scope.order = 2; 
      $scope.previous();
      expect($scope.order).toEqual(1);
    });
  });
});