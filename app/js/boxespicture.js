'use strict';
console.log("loaded")
angular.module('App')
  .controller('BoxesPictureCtrl', function ($scope, $rootScope) {
  		// $scope.boxWidth= Math.min(Math.floor(12/$rootScope.questionsData.question.show.answers.length), 1)
  		$scope.toggle = function (answers, answer) {
  			for (var a in answers) {
  				if (answers[a].value == answer.value) {
  					answers[a].answer=!answers[a].answer
  				}
  				else {
  					answers[a].answer = false
  				}
  			}
  			for (var a in answers) {
  				if (answers[a].answer == true) {
  					$rootScope.controls.questionHasAnswer=true
  					break;
  				}
  			}
  		}
});
