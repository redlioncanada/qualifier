'use strict';

angular.module('App')
  .controller('SliderCtrl', function ($scope) {
  	// jslider-value
  	$scope.setAnswer = function () {
  		for (var i in $scope.question.show.answers) {
  			if ($scope.question.show.answers[i].value == $scope.question.show.answer) {
  				$scope.question.show.answers[i].answer = true
  			} else {
  				$scope.question.show.answers[i].answer = false
  			}
  		}
  	}
});
