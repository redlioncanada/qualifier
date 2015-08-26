'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope) {

      $rootScope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 250,
        "smooth" : false,
        "threshold" : 250,
        "dimension": ''
      }

  		$scope.setPriceRange = function () {
  			var minPrice = null, maxPrice = null
  			for (var a in $rootScope.appliances) {
  				var appliance = $rootScope.appliances[a]
          if (appliance.score !=null) {
            var p = appliance.price
    				if (minPrice == null) {
    					minPrice = p; maxPrice = p
    				} else if (p < minPrice) {
    					minPrice = p
    				} else if (p > maxPrice) {
    					maxPrice = p
    				}
          }
  			}
  			$rootScope.resultsOptions.from = minPrice
        $rootScope.resultsOptions.to = maxPrice
  			$rootScope.controls.price = minPrice.toString() + ";" + maxPrice.toString()
  		}
      if ($rootScope.questionsData.currentCount > 0) {
    		$scope.setPriceRange()
      }

});