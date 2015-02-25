'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter) {
  	$scope.order = 1;
  	$scope.next = function () {
  		$scope.order++;
  	}
   	$scope.previous = function () {
  		$scope.order--;
  	}
});