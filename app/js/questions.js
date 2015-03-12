'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter, $state) {
  	$rootScope.scoringQuestions = {};
  	$scope.filter = {	
  		cooking: {
  			"range" : 0,
  			"wall oven" : 0,
  			"cooktop" : 0,
			"induction" : 0,
			"gas" : 0,
			"electric" : 0,
			"convection" : 0,
			"true_convection" : 0,
			"double" : 0,
			"single" : 0,
			"combination" : 0,
			"capacity" : 0,
			"aqua_lift" : 0  			
  		}

	}

	$scope.hasAnswer = function (question) {
		if ('answers' in question.show) {
			for (var a in question.show.answers) {
				console.log(question.show.answers[a]);
				if (question.show.answers[a].answer != null) {
					return question.show.answers[a];
				}
			}
		}
		return false;
	}

	$scope.recalculateResults = function () {
		$scope.currentScore = {	
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
			"aquaLift" : 0  			
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
							console.log(s, (s == null),  (typeof s == "string"), (!isNaN(s) && $scope.currentScore[scores] != null))
							if (s == null) {
								$scope.currentScore[scores] = null
							} else if (typeof s == "string") {
								$scope.currentScore[scores] = s
							} else if (!isNaN(s) && $scope.currentScore[scores] != null) {
								$scope.currentScore[scores] = $scope.currentScore[scores] + s
							}
						}
					}
				}
			}
		}
		console.log("CURRENT SCORE")
		console.log($scope.currentScore);
		for (var appliance in $rootScope.appliances) {
			var a = $rootScope.appliances[appliance]
			a.score = 0;
			for (var score in $scope.currentScore) {
				var s = $scope.currentScore[score]
				//console.log("currentScore", a, score, a[score], s)
				if (s == null || (typeof s == "string" && s != a[score])) {
					a.score = null;
					break;
				} else if (a[score] == true && !isNaN(s)) {
					a.score = a.score + s;
				}
			}
		}
		console.log($rootScope.appliances)
	}

	$scope.show = function () {
	  	if ($scope.question.text.length > 1) {
			var ref = Math.floor((Math.random() * $scope.question.text.length))			
		} else {
			var ref = 0;
		}
		$scope.question.show = $scope.question.text[ref];	 
	}

  	$scope.next = function () {
  		// Make sure there is an answer
  		var hasAnswer = $scope.hasAnswer($scope.question)
  		if (!!hasAnswer) {
  			$rootScope.scoringQuestions[$scope.question.name] = $scope.question;
  			$scope.recalculateResults();
 
	  		if ("next" in $scope.question) {
	  			var name = $scope.question.next
	  			$scope.question = $scope.questions[$scope.question.next]
	  		}
	  		else if ("next" in hasAnswer) {
	  			var name = hasAnswer.next
	  			$scope.question = $scope.questions[hasAnswer.next]
	  		}

	  		if ($scope.question != null) {
	  			$scope.question.name = name
				$scope.show(); 	
			} else {
				$state.go('main.results');
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