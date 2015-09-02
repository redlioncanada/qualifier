'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope, $state, $location, $timeout) {


    $scope.$on('$locationChangeSuccess', function(event) {
    		console.log(($location.path()).toString());
    		if ( ($location.path()).toString().search("question") != -1) {
    			var q = ($location.path()).toString().replace("/question/","");
		  		$rootScope.controls.controlClicked = 'previous';
		  		
		  		$timeout(function() {
		  			$state.go('main.questions')
					$rootScope.moveToQuestion(q)
				}, 100)
		  	}
    });


      $rootScope.resultsTouched = true;
      $rootScope.resultsOptions = {
        "from": 0,
        "to": 3000,
        "step": 250,
        "smooth" : false,
        //"threshold" : 250,
        "dimension": ''
      }
      console.log($rootScope.appliances);

               $scope.setPriceRange = function () {
                       var minPrice = null, maxPrice = null
                       for (var a in $rootScope.appliances) {
                               var appliance = $rootScope.appliances[a]
          if (appliance.score !=null) {
            for (var c in appliance.colours) {
              var p = parseFloat(appliance.colours[c].prices.CAD)
                               if (minPrice == null) {
                                       minPrice = p; maxPrice = p
                               } else if (p < minPrice) {
                                       minPrice = p
                               } else if (p > maxPrice) {
                                       maxPrice = p
                               }
            }
          }
                       }
                       $rootScope.resultsOptions.from = minPrice
        $rootScope.resultsOptions.to = maxPrice
                       $rootScope.controls.price = minPrice.toString() + ";" + maxPrice.toString()
               }

      $scope.expandPriceRange = function (price) {
        var range = $rootScope.controls.price.split(";")
        price = parseFloat(price)
        range[0] = parseFloat(range[0])
        range[1] = parseFloat(range[1])
        if (price<range[0]) {
          range[0] = price
        } else if (price>range[1]) {
          range[1] = price
        }
        $rootScope.controls.price = range[0].toString() + ";" + range[1].toString()


      }

      $scope.constructPageTitle = function() {
        return $rootScope.brandData.apptext.oneLastStep + " " + $rootScope.applianceType;
      }

      if ($rootScope.questionsData.currentCount > 0) {
               $scope.setPriceRange()
      }
});