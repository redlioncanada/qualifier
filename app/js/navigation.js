'use strict';

angular.module('App')
  .controller('NavigationCtrl', function ($scope, $state, $rootScope, $filter, $location, $window, $timeout) {

    $scope.atResultsPage = false;

    $scope.$on('$locationChangeSuccess', function(event) {
        if ( ($location.path()).toString().indexOf("results") != -1) {
          $scope.atResultsPage = true;
        }
    });

    //On Constructor, check and set icontype
    if (window.innerWidth < 1125){
            $scope.useMobileIcons = true;
        }else{
            $scope.useMobileIcons = false;
        }
    //

  	$scope.setType = function (q,a) {
  		if (!!q) {
	  		if (!a.thumbnail_type) {
	  			return q.thumbnail_type
	  		} 
	  		return a.thumbnail_type
	  	}
  	}

  	$scope.navToQuestions = function (q) {
      console.log($scope.path);
  		if (!!$rootScope.questionsData.question) {
  			if ($rootScope.questionsData.question.order < q.order) {
  				$rootScope.controls.controlClicked = 'next';
  			} else {
  				$rootScope.controls.controlClicked = 'previous';
  			}
  		} else {
  			$rootScope.controls.controlClicked = 'previous';
  		}
      $timeout(function() {
    		//$rootScope.questionsData.question=q;

    		$state.go('main.questions')
        $rootScope.moveToQuestion(q.name)
      }, 100) 
  	}

  	$scope.byName = function(q) {
  		if (!!q) {
	    	return 'name' in q
		}
		return false
	};

	$scope.startOver = function () {
		//$rootScope.scoringQuestions = {}
		//$rootScope.questionsData.questions = angular.copy($rootScope.brandData.questions)
		//$rootScope.questionsData.question = $rootScope.questionsData.questions["Appliance"]
		//$rootScope.show()
		//$scope.navToQuestions();
		$location.path('/');
    $rootScope.resultsTouched = false;
    $window.location.reload();
	}
})
.directive('resultsmenu', ['$timeout', '$rootScope', '$location', function($timeout, $rootScope, $location) {
  return {
    restrict: 'E',
    templateUrl: 'views/result-templates/results-menu.html',
    link: function($scope, element) {
      $scope.openMenu = function() {
        console.log('open menu');
      }

      $scope.closeMenu = function() {
        console.log('close menu');
      }
    }
  }
}]);