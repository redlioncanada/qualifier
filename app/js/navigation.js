'use strict';

angular.module('App')
  .controller('NavigationCtrl', function ($scope, $state, $rootScope, $filter, $location, $window, $timeout) {
    $scope.atResultsPage = false;

    $scope.$on('$locationChangeSuccess', function(event) {
        if ( ($location.path()).toString().indexOf("results") != -1) {
          $scope.atResultsPage = true;
        } else {
          $scope.atResultsPage = false;
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
      $scope.menuState = false;
      $scope.menuButtonHeight = $(element).find('.results-menu-heading').height();
      $scope.menuOffset = parseInt($(element).css('top'));

      $scope.menuIsOpen = function() {
        return $scope.menuState;
      }

      $scope.toggleMenu = function() {
        if ($scope.menuState) {
          $scope.closeMenu();
        } else {
          $scope.openMenu();
        }
      }

      $scope.openMenu = function() {
        if ($scope.menuState) return;
        $(element).animate({
          'top': ($(element).find('div').eq(0).height() - $scope.menuButtonHeight)*-1 + $scope.menuOffset
        });
        $scope.menuState = true;
      }

      $scope.closeMenu = function() {
        if (!$scope.menuState) return;
        $(element).animate({
          'top': $scope.menuOffset
        });
         $scope.menuState = false;
      }
    }
  }
}]);