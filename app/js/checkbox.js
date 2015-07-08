'use strict';
console.log("loaded")
angular.module('App')
  .controller('CheckboxCtrl', function ($scope, $rootScope) {
  		$scope.toggle = function (answers, answer) {
  			answer.answer = !answer.answer
        $rootScope.controls.questionHasAnswer=false
  			for (var a in answers) {
  				if (answers[a].answer == true) {
  					$rootScope.controls.questionHasAnswer=true
  					break;
  				}
  			}
  		}
});
