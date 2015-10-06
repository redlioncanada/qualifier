'use strict';

angular.module('App')
  .controller('PrintCtrl', function ($scope, $rootScope, $state, $filter, $stateParams) {
  	$('footer.maytag-desktop, footer.maytag-mobile, header.header-desktop, header.header-mobile').css('display', 'none');
      if (!!$stateParams.sku) {
      	var a = $filter('filter')($rootScope.appliances, { "sku" : $stateParams.sku});
      	if (typeof a !== 'undefined') {
      		$scope.a = $filter('filter')($rootScope.appliances, { "sku" : $stateParams.sku})[0]
      	} else {
      		$state.go("main.questions");
      	}
      } else {
      	$state.go("main.questions");
      }
});
