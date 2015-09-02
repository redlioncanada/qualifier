'use strict';

angular.module('App')
  .controller('SliderCtrl', function ($scope, $rootScope) {
  	// jslider-value
  	$scope.setAnswer = function () {
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
      qs.text[0].options.round = 5
      var last = null
      for (var a in qs.text[0].answers) {
        if (!!last) {
          qs.text[0].options.halfway = (qs.text[0].answers[a].value-last.value) / 2 
          break
        } else {
            last = qs.text[0].answers[a]
        }
      }

      qs.text[0].options.modelLabels = angular.copy(function (value) {
        if (!!$rootScope.questionsData.question) {
          if (qs.name == $rootScope.questionsData.question.name) {  
              $rootScope.questionsData.question.text[0].roundedAnswer = value.toFixed(0)
              console.log($rootScope.questionsData.question.text[0].roundedAnswer)
              $rootScope.safeApply()
              return value.toFixed(0)
          }
        }
      })

      qs.text[0].options.callback = angular.copy(function(value, released) {  
        if (!!$rootScope.questionsData.question) {
          if (qs.name == $rootScope.questionsData.question.name) {    
            if (!!released) {
              for (var a in $rootScope.questionsData.question.text[0].answers) {
                    //console.log( $rootScope.questionsData.question.text[0].answer , $rootScope.questionsData.question.text[0].options.halfway,  parseFloat($rootScope.questionsData.question.text[0].answers[a].value)- $rootScope.questionsData.question.text[0].options.halfway , parseFloat($rootScope.questionsData.question.text[0].answers[a].value)+$rootScope.questionsData.question.text[0].options.halfway   )
                    if ($rootScope.questionsData.question.text[0].answer > (parseFloat($rootScope.questionsData.question.text[0].answers[a].value)- $rootScope.questionsData.question.text[0].options.halfway) &&  $rootScope.questionsData.question.text[0].answer < (parseFloat($rootScope.questionsData.question.text[0].answers[a].value)+$rootScope.questionsData.question.text[0].options.halfway)) {
                      $rootScope.questionsData.question.text[0].answer = $rootScope.questionsData.question.text[0].answers[a].value
                      break
                    }
              }
              $rootScope.safeApply();
            } 
          }
        }
      })

      for (var i in qs.text[0].answers) {
        qs.text[0].last = qs.text[0].answers[i].value
      }
    }
});
