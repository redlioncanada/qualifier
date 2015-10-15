'use strict';

angular.module('App')
  .controller('SliderButtonsCtrl', function ($scope, $rootScope) {
  	// jslider-value
  	$scope.setAnswer = function () {
      $rootScope.showTooltip = false;
      $rootScope.controls.questionHasAnswer = false;
      for (var t in $rootScope.questionsData.question.text) {
    		for (var i in $rootScope.questionsData.question.text[t].answers) {
    			if ($rootScope.questionsData.question.text[t].answers[i].value == $rootScope.questionsData.question.text[t].answer) {
    				$rootScope.questionsData.question.text[t].answers[i].answer = true
            if (t == 1) $rootScope.controls.questionHasAnswer = true
    			} else {
    				$rootScope.questionsData.question.text[t].answers[i].answer = false
    			}
    		}
      }
  	}

    $scope.setButtonAnswer = function(answer) {
        $rootScope.questionsData.question.text[1].answer = answer.value;
        $scope.setAnswer();
    }

    $scope.setLast = function (qs,isVertical) {
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
          qs.text[0].options.realtime = true;
          qs.text[0].verticalOptions = angular.copy(qs.text[0].options);
          qs.text[0].verticalOptions.vertical = true;
          qs.text[0].options.modelLabels = angular.copy(function (value) {
            //if (!!$rootScope.questionsData.question) {
              //if (qs.name == $rootScope.questionsData.question.name) {  
                  //$rootScope.questionsData.question.text[0].roundedAnswer = value.toFixed(0)
                  //console.log($rootScope.questionsData.question.text[0].roundedAnswer)
                  //$rootScope.safeApply()
                  return value.toFixed(0);
              //}
            //}
          })
          qs.text[0].options.answers = qs.text[0].answers
          qs.text[0].options.iterator = t
          qs.text[0].options.callback = angular.copy(function(value, released) {  
            console.log(this)
            if (!!$rootScope.questionsData.question) {
              if (qs.name == $rootScope.questionsData.question.name) {    
                if (!!released) {
                  for (var a in this.answers) {
                        //console.log( $rootScope.questionsData.question.text[0].answer , $rootScope.questionsData.question.text[0].options.halfway,  parseFloat($rootScope.questionsData.question.text[0].answers[a].value)- $rootScope.questionsData.question.text[0].options.halfway , parseFloat($rootScope.questionsData.question.text[0].answers[a].value)+$rootScope.questionsData.question.text[0].options.halfway   )
                        //console.log($rootScope.questionsData.question.text[0].answer , (parseFloat(this.answers[a].value)- this.halfway), (parseFloat(this.answers[a].value)+this.halfway))
                        if ($rootScope.questionsData.question.text[0].answer > (parseFloat(this.answers[a].value)- this.halfway) &&  $rootScope.questionsData.question.text[0].answer < (parseFloat(this.answers[a].value)+this.halfway)) {
                          $rootScope.questionsData.question.text[0].answer = this.answers[a].value
                          break
                        }
                  }
                  $rootScope.safeApply();
                } 

                $scope.toggleButtons(qs.text[1],$rootScope.questionsData.question.show.answer);
              }
            }
          })



        for (var i in qs.text[0].answers) {
          qs.text[0].last = qs.text[0].answers[i].value;
          qs.text[1].last = qs.text[0].last;
        }

        for (var t in qs.text) {        
          for (var i in qs.text[0].answers) {
            if (qs.text[0].answers[i].value == qs.text[0].answer) {
              qs.text[0].answers[i].answer = true
            } else {
              qs.text[0].answers[i].answer = false
            }
          }
        }

    }

    $scope.toggleButtons = function(qs,sliderVal) {
      sliderVal = Math.round(parseFloat(sliderVal));

      var match = false;
      for (var t in qs.answers) {
        for (var e in qs.answers[t].enabledWhen) {
          if (qs.answers[t].enabledWhen[e] == sliderVal) {
            match = true;
            break;
          }
        }

        if (match) {
          qs.answers[t].enabled = true;
        } 
        else {
          qs.answers[t].enabled = false;
          qs.answers[t].answer = false;

          //answer has been invalidated by button being disabled
          if (qs.answers[t].value == $rootScope.questionsData.question.text[1].answer) {
            $rootScope.questionsData.question.text[1].answer = false;
          }
        }
        match = false;
      }
      console.log(qs.answers);
    }
});