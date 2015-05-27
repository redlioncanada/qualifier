'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter, $state) {
  	$rootScope.scoringQuestions = {};
  	$rootScope.currentCount = null;

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

	

	$scope.getPartial = function (partial) {
		console.log('answers/'+partial+'.html');
      return 'answers/'+partial+'.html'
  }

	$scope.recalculateResults = function () {
		$rootScope.currentCount = 0;
		$rootScope.currentScore = {	
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
		for (var question in $rootScope.scoringQuestions) {
			var q = $rootScope.scoringQuestions[question]
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
								$rootScope.currentScore[scores] = null
							} else if (typeof s == "string") {
								$rootScope.currentScore[scores] = s
							} else if (!isNaN(s) && $rootScope.currentScore[scores] != null) {
								$rootScope.currentScore[scores] = $rootScope.currentScore[scores] + s
							}
						}
					}
				}
			}
		}

		for (var appliance in $rootScope.appliances) {
			var a = $rootScope.appliances[appliance]
			a.score = 0;
			for (var score in $rootScope.currentScore) {
				var s = $rootScope.currentScore[score]
				if (s == null || (typeof s == "string" && s != a[score])) {
					a.score = null;
					break;
				} else if (a[score] == true && !isNaN(s)) {
					a.score = a.score + s;
				}
			}
			if (a.score != null) {
				$rootScope.currentCount = $rootScope.currentCount +1
			}
		}
	}

	$scope.show = function () {
	  	if ($scope.question.text.length > 1) {
			var ref = Math.floor((Math.random() * $scope.question.text.length))			
		} else {
			var ref = 0;
		}
		$scope.question.show = $scope.question.text[ref];	 
	}
	$scope.controls = {}
	$scope.controls.questionHasAnswer = true
  	$scope.next = function () {
  		// Make sure there is an answer
  		var hasAnswer = $scope.hasAnswer($scope.question)
  		if (!hasAnswer) {
  			// apply class to all answers
  			$scope.controls.questionHasAnswer = false 
  		}
  		if (!!hasAnswer) {
  			$scope.controls.questionHasAnswer = true
  			$rootScope.scoringQuestions[$scope.question.name] = $scope.question;
  			$rootScope.scoringQuestions[$scope.question.name].order = $rootScope.objSize($rootScope.scoringQuestions);
  			$scope.recalculateResults();
	  		if ("next" in $scope.question) {
	  			var name = $scope.question.next
	  			if (!!name) {
	  				$scope.question = $scope.questions[$scope.question.next]
	  			} else {
	  				$scope.question = null;
	  			}
	  		}
	  		else if ("next" in hasAnswer) {
	  			var name = hasAnswer.next
	  			$scope.question = $scope.questions[hasAnswer.next]
	  		}
	  		if (!!$scope.question) {
	  			$scope.controls.questionHasAnswer = false
	  			$scope.question.name = name
				$scope.show(); 	
			} else {
				$state.go('main.results')
			}
  		} 
  	}
   	$scope.previous = function () {
  		if ("previous" in $scope.question) {
	  		$scope.question = $scope.questions[$scope.question.previous]
	  	}
  	}
  	//set questions to head
  	$scope.questions = $rootScope.brandData.questions
  	$scope.question = $scope.questions["Appliance"]
  	$scope.question.name = "Appliance"
  	$scope.show();

});