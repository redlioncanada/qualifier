'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter) {
  	$rootScope.scoringQuestions = {};
  	$rootScope.applianceCategory = "cooking";
  	$scope.order = 1;
  	$scope.filter = {	
  		cooking: {
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
  		console.log(!!hasAnswer)
  		if (!!hasAnswer) {
  			$rootScope.scoringQuestions[$scope.question.name] = $scope.question;
  			$scope.recalculateResults();

	  		if ("next" in $scope.question) {
	  			console.log($scope.question.next);
	  			console.log($scope.questions[$scope.question.next])
	  			$scope.question = $scope.questions[$scope.question.next]
	  		}
	  		else if ("next" in hasAnswer) {
	  			console.log(hasAnswer);
	  			console.log(hasAnswer.next)
	  			console.log($scope.questions[hasAnswer.next])
	  			$scope.question = $scope.questions[hasAnswer.next]
	  		}
			$scope.show(); 		
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