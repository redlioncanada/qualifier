'use strict';

angular.module('App')
  .controller('SliderCtrl', function ($scope, $rootScope) {
  	// jslider-value
  	$scope.$on("slideEnded", function() {
  		for (var i in $rootScope.questionsData.question.show.answers) {
  			if ($rootScope.questionsData.question.show.answers[i].value == $rootScope.questionsData.question.show.answer) {
  				$rootScope.questionsData.question.show.answers[i].answer = true
          $rootScope.controls.questionHasAnswer = true
  			} else {
  				$rootScope.questionsData.question.show.answers[i].answer = false
  			}
  		}
  	})

    $scope.translate = function (value) {
      for (var i in $rootScope.questionsData.question.show.answers) {
        console.log($rootScope.questionsData.question.show.answers[i].value)
        if ($rootScope.questionsData.question.show.answers[i].value == value && !!$rootScope.questionsData.question.show.answers[i].text) {
            return $rootScope.questionsData.question.show.answers[i].text
        }
      }
      return ""
    }
});
