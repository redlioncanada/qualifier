'use strict';

angular.module('App')
  .controller('SliderMultipleCtrl', function ($scope, $rootScope) {
  	// jslider-value
  	$scope.$on("slideEnded", function() {
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
  	})

    $scope.translate = function (value) {
      console.log("translate")
      console.log(value)
      for (var t in $rootScope.questionsData.question.text) {
        for (var i in $rootScope.questionsData.question.text[t].answers) {
          console.log($rootScope.questionsData.question.text[t].answers[i].value)
          if ($rootScope.questionsData.question.text[t].answers[i].value == value && !!$rootScope.questionsData.question.text[t].answers[i].text) {
              return $rootScope.questionsData.question.text[t].answers[i].text
          }
        }
      }
      return ""
    }

});
