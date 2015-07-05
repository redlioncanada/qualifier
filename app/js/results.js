'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope) {

      $scope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 100,
        "dimension": ""  
      }

  		$scope.setPriceRange = function () {
  			var minPrice = null, maxPrice = null
  			for (var a in $rootScope.appliances) {
  				var appliance = $rootScope.appliances[a]
          console.log(appliance, appliance.price)
          if (appliance.score !=null) {
    				//var p = parseFloat((appliance.price.match(/[\.]?[0-9]/g)).join(""))
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
  			$scope.price = minPrice.toString() + ";" + maxPrice.toString()
  		}
  		$scope.setPriceRange()

});