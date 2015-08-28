'use strict';

angular.module('App')
  .controller('SliderCtrl', function ($scope, $rootScope) {
  	// jslider-value
    $rootScope.questionsData.question.show.touched = false;
  	$scope.setAnswer = function () {
      $rootScope.questionsData.question.show.touched = true;
  		for (var i in $rootScope.questionsData.question.show.answers) {
  			if ($rootScope.questionsData.question.show.answers[i].value == $rootScope.questionsData.question.show.answer) {
  				$rootScope.questionsData.question.show.answers[i].answer = true
          $rootScope.controls.questionHasAnswer = true
  			} else {
  				$rootScope.questionsData.question.show.answers[i].answer = false
  			}
  		}
  	}
    $scope.setLast = function (qs) {
      console.log("SET LAST");
      for (var i in qs.text[0].answers) {
        qs.text[0].last = qs.text[0].answers[i].value
      }
    }
});
