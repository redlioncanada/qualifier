'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter, $state, localStorageService) {
  	$rootScope.questionsData = {}
  	$rootScope.questionsData.scoringQuestions = {};
  	$rootScope.questionsData.currentCount = null;

	$scope.hasAnswer = function (question) {
		if ('answers' in question.show) {
			for (var a in question.show.answers) {
				if (!!question.show.answers[a].answer) {
					return question.show.answers[a];
				}
			}
		}
		return false;
	}

	$scope.recalculateResults = function () {
		$rootScope.questionsData.currentCount = 0;
		$rootScope.questionsData.currentScore = {	
  			"type" : false,
  			"size" : false,
  			"width" : false,
  			"category" : false,
			"induction" : 0,
			"gas" : 0,
			"electric" : 0,
			"convection" : 0,
			"trueConvection" : 0,
			"double" : 0,
			"single" : 0,
			"combination" : 0,
			"capacity" : 0,
			"aquaLift" : 0 ,
			"frenchDoor" : 0 ,
			"sideBySide" : 0 ,
			"topFreezer" : 0 ,
			"bottomFreezer" : 0 , 
			"filtered" : 0 ,
			"inDoor" : 0 ,
			"counterDepth" : 0 ,
			"ethyleneFilter" : 0 ,
			"decibels" : 0 ,
			"stainlessTub" : 0 ,
			"2Racks" : 0 ,
			"3Racks" : 0 ,
			"culinaryCaddy" : 0 ,
			"proWash" : 0 ,
			"sensorCycle" : 0 ,
			"anyWare" : 0 ,
			"controls" : 0 ,
			"frontLoad" : 0 ,
			"topLoad" : 0 ,
			"moreCycles" : 0 ,
			"easeOfUse" : 0 ,
			"digitalDial" : 0 ,
			"knobDial" : 0 ,
			"energyEfficiency" : 0 ,
			"quiet" : 0 ,
			"lowVibration" : 0 ,
			"sensorDry" : 0 ,
			"steam" : 0 ,
			"powerWash" : 0 			
		}
		for (var question in $rootScope.questionsData.scoringQuestions) {
			var q = $rootScope.questionsData.scoringQuestions[question]
			for (var answers in q.show.answers) {
				var a = q.show.answers[answers]
				// If answer isn't null, use it for scoring
				if (a.answer != false) {
					// If it is true, simply apply scoring
					if (a.answer == true) {
						for (var scores in a.scoring) {
							var s = a.scoring[scores]
							// scores is type, s is 'range'
							if (s == null) {
								$rootScope.questionsData.currentScore[scores] = null
							} else if (typeof s == "string") {
								$rootScope.questionsData.currentScore[scores] = s
							} else if (!isNaN(s) && $rootScope.questionsData.currentScore[scores] != null) {
								$rootScope.questionsData.currentScore[scores] = $rootScope.questionsData.currentScore[scores] + s
							}
						}
					}
				}
			}
		}

		for (var appliance in $rootScope.appliances) {
			var a = $rootScope.appliances[appliance]
			a.score = 0;
			for (var score in $rootScope.questionsData.currentScore) {
				var s = $rootScope.questionsData.currentScore[score]
				if (s == null || (typeof s == "string" && s != a[score])) {
					a.score = null;
					break;
				} else if (a[score] == true && !isNaN(s)) {
					a.score = a.score + s;
				}
			}
			if (a.score != null) {
				$rootScope.questionsData.currentCount++
			}
		}
	}

	$rootScope.rcResults = function () {
		$scope.recalculateResults()
	}

	$scope.show = function () {
	  	if ($rootScope.questionsData.question.text.length > 1) {
			var ref = Math.floor((Math.random() * $rootScope.questionsData.question.text.length))			
		} else {
			var ref = 0;
		}
		$rootScope.questionsData.question.show = $rootScope.questionsData.question.text[ref];	 
	}

	$rootScope.controls = {}
	$rootScope.controls.questionHasAnswer = true
  	$rootScope.next = function () {
  		// Make sure there is an answer
  		var hasAnswer = $scope.hasAnswer($rootScope.questionsData.question)
  		if (!hasAnswer) {
  			// apply class to all answers
  			$rootScope.controls.questionHasAnswer = false 
  		}
  		if (!!hasAnswer) {
  			$rootScope.controls.questionHasAnswer = true
  			// Is the question already in the answered questions queue
  			if (!($rootScope.questionsData.question.name in $rootScope.questionsData.scoringQuestions)) {
	  			$rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name] = $rootScope.questionsData.question;
	  			$rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name].order = $rootScope.objSize($rootScope.questionsData.scoringQuestions);  				
  			} else {
  				// if this question doesn't set next, then its fine
  				// if this question does, then delete everything after
  				var hasNext = false
  				angular.forEach($rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name].answers, function (item, k) {
  					if ('next' in item) 
  						hasNext = true
  				})
  				if ( hasNext.length > 0 ) {
	  				angular.forEach($rootScope.questionsData.scoringQuestions, function (item, k) {
	  					if (item.order > $rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name]) {
	  						delete $rootScope.questionsData.scoringQuestions[item.name]
	  					}
	  				})  					
  				}
  			}
  			localStorageService.set($rootScope.questionsData.question.name, JSON.stringify($rootScope.questionsData.question));

  			$scope.recalculateResults();
	  		if ("next" in $rootScope.questionsData.question) {
	  			var name = $rootScope.questionsData.question.next
	  			if (!!name) {
	  				var hasStoredAnswer = localStorageService.get($rootScope.questionsData.question.next)
		  			if (!!hasStoredAnswer) {
		  				$rootScope.questionsData.question = hasStoredAnswer
		  			} else {
		  				$rootScope.questionsData.question = $rootScope.questionsData.questions[$rootScope.questionsData.question.next]
		  			}
	  			} else {
	  				$rootScope.questionsData.question = null;
	  			}
	  		}
	  		else if ("next" in hasAnswer) {
	  			var name = hasAnswer.next
	  			var hasStoredAnswer = localStorageService.get(hasAnswer.next)
	  			if (!!hasStoredAnswer) {
	  				$rootScope.questionsData.question = hasStoredAnswer
	  			} else {
	  				$rootScope.questionsData.question = $rootScope.questionsData.questions[hasAnswer.next]	  				
	  		} 
	  		}
	  		if (!!$rootScope.questionsData.question) {
	  			$rootScope.controls.questionHasAnswer = false
	  			$rootScope.questionsData.question.name = name
				$scope.show(); 	
			} else {
				$state.go('main.results')
			}
  		} 
  	}
   	$rootScope.previous = function () {
  		if ("previous" in $rootScope.questionsData.question) {
	  		$rootScope.questionsData.question = $rootScope.questionsData.questions[$rootScope.questionsData.question.previous]
	  	}
  	}
  	//set questions to head
  	$rootScope.questionsData.questions = $rootScope.brandData.questions
  	$rootScope.questionsData.question = $rootScope.questionsData.questions["Appliance"]
  	$rootScope.questionsData.question.name = "Appliance"
  	$scope.show();

});