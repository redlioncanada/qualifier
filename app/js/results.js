'use strict';

angular.module('App')
  .controller('ResultsCtrl', function ($scope, $rootScope, $state, $location, $timeout) {

    $scope.useMobileTemplates = false;

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
        "fakestep": 250,
        "smooth" : false,
        "step" : 1,
        "threshold" : 250,
        "dimension": '',
        "callback" : function(value, released) {  

          if (!!released) {
            console.log("ok")
            var range = value.split(";")

            for (var r in range) {
              var m = range[r] % $rootScope.resultsOptions.fakestep
              if (m != 0) {
                  //console.log(m, Math.floor(range[r] / $rootScope.resultsOptions.fakestep), Math.floor(range[r] / $rootScope.resultsOptions.fakestep)+1, ((Math.floor(range[r] / $rootScope.resultsOptions.fakestep)+1)*$rootScope.resultsOptions.fakestep)-range[r])
                  if (m < ((Math.floor(range[r] / $rootScope.resultsOptions.fakestep)+1)*$rootScope.resultsOptions.fakestep)-range[r]) {
                      range[r] = (Math.floor(range[r] / $rootScope.resultsOptions.fakestep))*$rootScope.resultsOptions.fakestep
                  } else {
                      range[r] = (Math.floor(range[r] / $rootScope.resultsOptions.fakestep)+1)*$rootScope.resultsOptions.fakestep
                  }
              }
            }

            $rootScope.controls.price = range.join(";")
            console.log($rootScope.controls.price)
            $rootScope.safeApply()
          } 

        } 

      }


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
        var suffix = typeof $rootScope.applianceType !== 'undefined' ? $rootScope.applianceType : '';
        return ($rootScope.brandData.apptext.oneLastStep + " " + suffix).trim();
      }

      if ($rootScope.questionsData.currentCount > 0) {
               $scope.setPriceRange()
      }
})
.directive('desktopResults', function(){
    return {
        restrict: "EA",
        scope: false,
        templateUrl: 'views/result-templates/desktop-results.html',
        controller: function(){
            //this.lrgBtn = $( "#large-button" );
        }
   }
})
.directive('mobileResults', function(){
    return {
        restrict: "EA",
        scope: false,
        templateUrl: 'views/result-templates/mobile-results.html',
        controller: function(){
            $scope.selectorClick = (function (e){
                console.log("clicked");
                //$( "#"+e.target.id +"" ).css("background-color", "#004595");
                //$( "#"+e.target.id +"" ).css("color","#FFF");
            });
        }
   }
});