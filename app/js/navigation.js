'use strict';

angular.module('App')
  .controller('NavigationCtrl', function ($scope, $state, $rootScope, $filter, $location, $window) {
  	$scope.setType = function (q,a) {
  		if (!!q) {
	  		if (!a.thumbnail_type) {
	  			return q.thumbnail_type
	  		} 
	  		return a.thumbnail_type
	  	}
  	} 

  	$scope.navToQuestions = function (q) {
  		if (!!$rootScope.questionsData.question) {
  			if ($rootScope.questionsData.question.order < q.order) {
  				$rootScope.controls.controlClicked = 'next';
  			} else {
  				$rootScope.controls.controlClicked = 'previous';
  			}
  		} else {
  			$rootScope.controls.controlClicked = 'previous';
  		}
  		$rootScope.questionsData.question=q;
  		$state.go('main.questions')
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
});