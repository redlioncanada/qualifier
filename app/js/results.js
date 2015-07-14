'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope) {

      $scope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 100,
        "dimension": ""  
      }


    $scope.translate = function (value) {
      return "$" + (value).toString()
    }


  		$scope.setPriceRange = function () {
  			$scope.minPrice = null, $scope.maxPrice = null
  			for (var a in $rootScope.appliances) {
  				var appliance = $rootScope.appliances[a]
          if (appliance.score !=null) {
            var p = appliance.price
    				if ($scope.minPrice == null) {
    					$scope.minPrice = p; $scope.maxPrice = p
    				} else if (p < $scope.minPrice) {
    					$scope.minPrice = p
    				} else if (p > $scope.maxPrice) {
    					$scope.maxPrice = p
    				}
          }
  			}
  			$scope.resultsOptions.from = $scope.minPrice
        $scope.resultsOptions.to = $scope.maxPrice
  		}
      if ($rootScope.questionsData.currentCount > 0) {
    		$scope.setPriceRange()
      }

});