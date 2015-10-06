'use strict';

angular.module('App')
  .controller('PrintCtrl', function ($scope, $rootScope, $state, $timeout, $interval, $filter, $stateParams) {
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

      var cnt = 0;
      var interval = 100;

      var print = $interval(function() {
      	if (parseInt($('.print-page-price span').text().replace('$', '')) > 0) {
      		$interval.cancel(print);
      		$timeout(function() {
      			window.print();
      		},300);
      	}
      	if (++cnt*interval >= 2000) $interval.cancel(print);
      },interval);
});
