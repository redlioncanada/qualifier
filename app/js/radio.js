'use strict';
angular.module('App')
  .controller('RadioCtrl', function ($scope, $rootScope) {
  		$scope.toggle = function (answers, answer) {
        if (answer.value == "nothing") {
          $rootScope.controls.questionHasAnswer=false
          for (var a in answers) {
              answers[a].answer = false
          }
        } else {
          for (var a in answers) {
            if (answers[a].value == answer.value) {
              answers[a].answer=!answers[a].answer
            }
            else {
              answers[a].answer = false
            }
          }
          $rootScope.controls.questionHasAnswer=false
          for (var a in answers) {
            if (answers[a].answer == true) {
              $rootScope.controls.questionHasAnswer=true
              break;
            }
          }
        }
        if ($rootScope.controls.questionHasAnswer == true) {
            $rootScope.next();
        }
      }
      $scope.setAppliance = function(appliance) {
        $rootScope.applianceType = appliance;
      }		
});
