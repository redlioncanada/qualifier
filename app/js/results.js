'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope) {

      $scope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 100,
        "dimension": "$ "  
      }

  		$scope.setPriceRange = function () {
  			var minPrice = null, maxPrice = null
  			for (var a in $scope.appliances) {
  				var appliance = $scope.appliances[a]
          if (appliance.score !=null) {
    				var p = parseFloat((appliance.price.match(/[\.]?[0-9]/g)).join(""))
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
  			$scope.price = minPrice.toString() + ";" + maxPrice.toString()
  		}
  		$scope.setPriceRange()

});