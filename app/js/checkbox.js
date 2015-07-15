'use strict';
console.log("loaded")
angular.module('App')
  .controller('CheckboxCtrl', function ($scope, $rootScope) {
  		$scope.toggle = function (answers, answer) {
  			answer.answer = !answer.answer
        $rootScope.controls.questionHasAnswer=false
        console.log(answer.value, answer.value == "nothing")
        if (answer.value == "nothing" && answer.answer == true) {
    			for (var a in answers) {
            if (answers[a].answer != "nothing") {
    				  answers[a].answer = false
            }
    			}
        } else {
          for (var a in answers) {
            if (answers[a].answer == true) {
              $rootScope.controls.questionHasAnswer=true
              break;
            }
          }          
        }
  		}
});
