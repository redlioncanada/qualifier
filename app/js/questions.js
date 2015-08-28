'use strict';

angular.module('App')
  .controller('QuestionsCtrl', function ($scope, $rootScope, $filter, $state, localStorageService, $timeout, $location, $route, $stateParams) {

    $scope.$on('$locationChangeSuccess', function(event) {

    		console.log($state,$stateParams);
            // Want to prevent re-loading when going from /dataEntry/1 to some other dataEntry path
            //if ($route && $route.current && $route.current.$route.templateUrl.indexOf('questions') > 0) {
                //$route.current = lastRoute; //Does the actual prevention of routing
            //}
    });
  	$rootScope.hasAnswer = function (q) {
  		if (!!q) {
	  		var qtype = q.show.type;
	        for (var ans in q.show.answers ) {
	          var a = q.show.answers[ans]
	          if (qtype == "rank") {
	            if (a.answer == 1) {
	              return a
	              break;
	            }              
	          } else if (qtype == "slider" || qtype == "slider-people" || qtype == "slider-multiple") {
	            if (a.value == q.show.answer) {
	              return a
	              break;
	            }       
	          } else {
	            if (a.answer == true) {
	              return a
	              break;
	            }	          	
	          }
	        }
	    }
    	return false
  	}


  	$rootScope.questionHasAnswer = function (q) {
  		if (!!q) {
	  		var qtype = q.show.type;
	        for (var ans in q.show.answers ) {
	          var a = q.show.answers[ans]
	          if (qtype == "rank") {
	            if (a.answer == 1) {
	              return true
	              break;
	            }              
	          } else if (qtype == "slider" || qtype == "slider-people" || qtype == "slider-multiple") {
	            if (a.value == q.show.answer) {
	              return true
	              break;
	            }       
	          } else {
	            if (a.answer == true) {
	              return true
	              break;
	            }	          	
	          }
	        }
	    }
    	return false
  	}


	$scope.recalculateResults = function () {
		$rootScope.questionsData.currentCount = 0;
		$rootScope.questionsData.currentScore = {	
  			"type" : false,
			"width" : 0,
			"height" : 0,
			"capacity" : 0,
			"single" : false,
			"double" : false,
			"combination" : false,
			"trueConvection" : false,
			"soundGuard" : false,
			"vibrationControl" : false,
			"audioLevel" : false,
			"frontLoad" : false,
			"topLoad" : false,
			"stacked" : false,
			"rapidWash" : false,
			"rapidDry" : false,
			"cycleOptions" : false,
			"sensorDry" : false,
			"wrinkleControl" : false,
			"steamEnhanced" : false,
			"placeSettings13" : 0,
			"placeSettings14" : 0,
			"placeSettings15" : 0,
			"decibels" : 0,
			"quiet" : 0,
			"premiumAdjusters" : false,
			"fid" : false,
			"console" : false,
			"powerCold" : false,
			"topMount" : false,
			"bottomMount" : false,
			"frenchDoor" : false,
			"indoorDispenser" : false,
			"counterDepth" : false,
			"freshFlow" : false,
			"tempControlPantry" : false,
			"dualCool" : false,
			"gas" : false,
			"maxCapacity" : false,
			"warmingDrawer" : false,
			"electric" : false,
			"powerBurner" : false,
			"powerPreheat" : false,
			"mediumCapacity" : 0,
			"largeCapacity" : 0,
			"largerCapacity" : 0,
			"largestCapacity" : 0,
			"width27" : 0,
			"width30" : 0,
			"width31" : 0,
			"width32" : 0,
			"width33" : 0,
			"width34" : 0,			
			"width35" : 0,
			"width36" : 0,
			"height66" : 0,
			"height67" : 0,
			"height68" : 0,
			"height69" : 0,
			"height70" : 0,
			"height71" : 0

		}


		for (var question in $rootScope.questionsData.scoringQuestions) {
			var q = $rootScope.questionsData.scoringQuestions[question]
			if (q.show.type != "slider-multiple") {
				for (var answers in q.show.answers) {
					var a = q.show.answers[answers]
					// If answer isn't null, use it for scoring
					if (a.answer !== false) {
						// If it is true, simply apply scoring
						if (a.answer === true) {
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
						} else if (isNaN(parseInt(a.answer)) == false) {
							var rankscoring = {
								"0" : 3,
								"1" : 2,
								"2" : 1
							}
							var getScore = function (ranking) {
								if (ranking.toString() in rankscoring) {
									return rankscoring[ranking.toString()]
								}
								return 0
							}
							for (var scores in a.scoring) {
								var s = a.scoring[scores]
								var t = getScore(a.answer)
								if (s == null) {
									$rootScope.questionsData.currentScore[scores] = null
								} else if (typeof s == "string") {
									$rootScope.questionsData.currentScore[scores] = s * t
								} else if (!isNaN(s) && $rootScope.questionsData.currentScore[scores] != null) {
									$rootScope.questionsData.currentScore[scores] = $rootScope.questionsData.currentScore[scores] + (s * t)
								}
							}									
						}
					} else {
					}
				}
			} else {
				for (var t in q.text) {
					for (var answers in q.text[t].answers) {
						var a = q.text[t].answers[answers]
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
			}
		}

		for (var appliance in $rootScope.appliances) {
			var a = $rootScope.appliances[appliance]
			a.score = 0;
			for (var score in $rootScope.questionsData.currentScore) {
				var s = $rootScope.questionsData.currentScore[score]
				if ((s == null && a[score] == true) || (typeof s == "string" && s != a[score])) {
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

	$rootScope.show = function () {
		var ref = 0;
	  	//if ($rootScope.questionsData.question.text.length > 1 && $rootScope.questionsData.question.text[0].type == "slider-multiple") {
		//	var ref = Math.floor((Math.random() * $rootScope.questionsData.question.text.length))			
		//} else {
		//	var ref = 0;
		//}
		$rootScope.questionsData.question.show = $rootScope.questionsData.question.text[ref];	 
	}

	$scope.freshQuestion = function (q) {
		var newq = angular.copy(q)
		newq.$$hashKey = null
		return newq
	}

	$rootScope.moveToQuestion = function (name, done) {
		// Start - Make sure to delete future questions if this answer has changed the path
  		// if this question doesn't set next, then its fine
  		// if this question does, then delete everything after
  		// this should happen when stuff moves
  		var hasNext = false
  		if (!!$rootScope.questionsData.question) {
	  		angular.forEach($rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name].show.answers, function (item, k) {
	  			if ('next' in item) 
	  				hasNext = true
	  		})
	  		if ( !!hasNext ) {
		  		angular.forEach($rootScope.questionsData.scoringQuestions, function (item, k) {
		  			if (item.order > $rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name].order) {
		  				delete $rootScope.questionsData.scoringQuestions[item.name]
		  			}
		  		})  					
	  		}
	  	}
		// End - Make sure to delete future questions if this answer has changed the path
		$scope.recalculateResults();
		if (!!name && !done) {
			var hasStoredAnswer = localStorageService.get(name)
			if (!!hasStoredAnswer) {
				$rootScope.questionsData.question = hasStoredAnswer
				$rootScope.controls.questionHasAnswer = true
			} else {
				//console.log($location.replace("/question/"+name));
				//$location.path("/question/"+name).replace() //.replace().path(normalized);
				$rootScope.questionsData.question = $rootScope.questionsData.questions[name]						  				
			} 
		} else {
  			$rootScope.questionsData.question = null;
  		}

  		if (!!$rootScope.questionsData.question) {
			$scope.show(); 	
			$rootScope.controls.questionHasAnswer = !!$rootScope.hasAnswer($rootScope.questionsData.question)
  			// Is the question already in the answered questions queue
  			if (!($rootScope.questionsData.question.name in $rootScope.questionsData.scoringQuestions)) {
	  			$rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name] = $rootScope.questionsData.question;
	  			$rootScope.questionsData.scoringQuestions[$rootScope.questionsData.question.name].order = $rootScope.objSize($rootScope.questionsData.scoringQuestions);  				
  			}
  			$location.path("/question/"+name).replace()
  			console.log($location)
		} else {
			$state.go('main.results')
		}	
	}

  	$rootScope.next = function (done) {
  		$rootScope.controls.controlClicked = 'next';

        // $timeout is a hacky way to make sure the above assignment propagates before
        // any animation takes place.
  		$timeout(function() {
	  		// Make sure there is an answer
	  		if (!!$rootScope.controls.questionHasAnswer || !!done) {
	  			var hasAnswer = $scope.hasAnswer($rootScope.questionsData.question)
		  		if ("next" in $rootScope.questionsData.question) {
		  			var name = $rootScope.questionsData.question.next
		  		}
		  		else if ("next" in hasAnswer) {
		  			var name = hasAnswer.next
		  		}
		  		$rootScope.moveToQuestion(name, done)
	  		} 
  		}, 100);

  	} 
  	



   	$rootScope.previous = function () {
  		$rootScope.controls.controlClicked = 'previous';

        // $timeout is a hacky way to make sure the above assignment propagates before
        // any animation takes place.
  		$timeout(function() {
	   		var name = null
	   		if (!!$rootScope.questionsData.question) {
		  		if ("previous" in $rootScope.questionsData.question) {
			  		name = $rootScope.questionsData.question.previous
			  	}
			} else {
				$state.go("main.questions")
			    var l = $rootScope.objSize($rootScope.questionsData.scoringQuestions)
			    angular.forEach($rootScope.questionsData.scoringQuestions, function (item, k) {
			      if (item.order == l) {
			      	name = item.name
			      }
			    })			
			}
			$rootScope.moveToQuestion(name)
	  	}, 100);

  	}

  	//set questions to head
  	if (!$rootScope.questionsData) {
	 	$rootScope.controls = {}
		$rootScope.controls.questionHasAnswer = false
	  	$rootScope.questionsData = {}
	  	$rootScope.questionsData.scoringQuestions = {};
	  	$rootScope.questionsData.currentCount = null;
	  	$rootScope.questionsData.questions = angular.copy($rootScope.brandData.questions)
	  	$rootScope.moveToQuestion("Appliance")
	  	//$rootScope.questionsData.question = $rootScope.questionsData.questions["Appliance"]
	  	//$rootScope.show()
  	}

});