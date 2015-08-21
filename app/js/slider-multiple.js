'use strict';

angular.module('App')
  .controller('SliderMultipleCtrl', function ($scope, $rootScope) {
  	// jslider-value
  	$scope.setAnswer = function () {
      for (var t in $rootScope.questionsData.question.text) {
    		for (var i in $rootScope.questionsData.question.text[t].answers) {
    			if ($rootScope.questionsData.question.text[t].answers[i].value == $rootScope.questionsData.question.text[t].answer) {
    				$rootScope.questionsData.question.text[t].answers[i].answer = true
            $rootScope.controls.questionHasAnswer = true
    			} else {
    				$rootScope.questionsData.question.text[t].answers[i].answer = false
    			}
    		}
      }
  	}
    $scope.setLast = function (qs) {
      for (var t in qs.text) {      
        for (var i in qs.text[t].answers) {
          qs.text[t].last = qs.text[t].answers[i].value
        }
      }
    }

});
