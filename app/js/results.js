'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope) {

      $scope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 100,
        "smooth" : false,
        "dimension": ""  
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
  			$scope.resultsOptions.from = minPrice
        $scope.resultsOptions.to = maxPrice
  			$scope.controls.price = minPrice.toString() + ";" + maxPrice.toString()
  		}
      if ($rootScope.questionsData.currentCount > 0) {
    		$scope.setPriceRange()
      }

});