'use strict';

angular.module('App')
  .controller('PrintCtrl', function ($scope, $rootScope, $state, $filter, $stateParams) {
      if (!!$stateParams.sku) {
      	$scope.a = $filter('filter')($rootScope.appliances, { "sku" : $stateParams.sku})[0]
      } else {
      	$state.go("main.questions");
      }
});
