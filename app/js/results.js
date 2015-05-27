'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope) {
  		$scope.price = "800;2000"
  		$scope.resultsOptions = {
			"from": 0,
		    "to": 3000,
		    "step": 100,
		    "dimension": "$ "  
  		}

});