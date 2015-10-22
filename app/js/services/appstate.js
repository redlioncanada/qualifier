var appstateModule = angular.module('AppstateService', ['LocalStorageModule', 'base64']);

appstateModule.factory('$appstate', ['$state', '$rootScope', 'localStorageService', '$location', '$log', '$base64', function($state, $rootScope, localStorageService, $location, $log, $base64) {
	var appstate = {};

	appstate.store = function(print) {
		localStorageService.set('appstate', JSON.stringify(_enumerateAnswers()));
	}

	appstate.restore = function() {
		$rootScope.hasanswers = {};
	 	$rootScope.controls = {}
		$rootScope.controls.questionHasAnswer = false
	  	$rootScope.questionsData = {}
	  	$rootScope.questionsData.scoringQuestions = {};
	  	$rootScope.questionsData.currentCount = null;
	  	$rootScope.questionsData.questions = angular.copy($rootScope.brandData.questions)

        //get session data, and if it exists, apply it to the app state
        var session = _getSession();
        if (session) {
        	console.log(session);

        	//change app view based on session.restore
        	switch(session.restore) {
        		case 'print':
        			$state.go('print',session);
        			return;
        			break;
        		default:
        			//restoring a specific question
        			$rootScope.hasanswers = session.answers;
        			$rootScope.restore = session.restore;
        			break;
        	}
        }

        var count = 0
        //fill app question data
	  	if (!$rootScope.questionsData.question) {
		  	for(var q in $rootScope.hasanswers) {

		  		if (!!$rootScope.hasanswers[q]) {
		  			var ans = $rootScope.hasanswers[q].split(";");

		  			for (var t in $rootScope.questionsData.questions[q].text) {
			  			for (var a in $rootScope.questionsData.questions[q].text[t].answers) {
			  				$rootScope.questionsData.questions[q].text[t].answers[a].answer = false;
			  				if ($rootScope.questionsData.questions[q].text[t].type != "rank") {
				  				if (ans.indexOf($rootScope.questionsData.questions[q].text[t].answers[a].value.toString()) != -1 ) {
				  					// console.log($rootScope.questionsData.questions[q].text[t].answers[a]);
				  					switch ($rootScope.questionsData.questions[q].text[t].type) {
				  						case "slider-multiple":
				  							if (t > 0) break;
				  							$rootScope.questionsData.questions[q].text[0].answer = $rootScope.questionsData.questions[q].text[0].answers[a].value;
				  							$rootScope.questionsData.questions[q].text[1].answer = parseInt(ans[1]);
				  							$rootScope.questionsData.questions[q].text[1].answers[parseInt(ans[1])].answer = true;
				  							break;
				  						case "slider":
				  							$rootScope.questionsData.questions[q].text[t].answer = $rootScope.questionsData.questions[q].text[t].answers[a].value;
				  							$rootScope.questionsData.questions[q].text[t].answers[a].answer = true;
				  							break;
				  						default:
				  							$rootScope.questionsData.questions[q].text[t].answers[a].answer = true;
				  							break;
				  					}
				  					$rootScope.questionsData.questions[q].text[t].answers[a].answer = true;
				  				}
				  			} else {
				  				$rootScope.questionsData.questions[q].text[t].answers[a].answer = ans.indexOf($rootScope.questionsData.questions[q].text[t].answers[a].value)
				  			}
			  			}
			  		}
		  		} 
		  		if ($rootScope.questionsData.questions[q]) {
			  		$rootScope.questionsData.questions[q].show =  $rootScope.questionsData.questions[q].text[0]
					$rootScope.questionsData.questions[q].order = count
			  		$rootScope.questionsData.scoringQuestions[q] = $rootScope.questionsData.questions[q]
		  		}

		  		count++
		  	}
	  	}

	  	$state.go('main.questions');
    }

	appstate.clear = function() {
		// localStorageService.clearAll();
		localStorageService.remove('appstate');
	}

	appstate.generateURL = function() {
	      return _generateURL(JSON.stringify(_enumerateAnswers()));
	}

	appstate.generatePrintURL = function(sku) {
	      return '?' + $base64.encode(JSON.stringify({restore:'print',sku:sku}));
	}

	function _getSession() {
		var session = false;

		//check for a valid state in the URL
        var hash = $location.$$absUrl.split("?");
        if (1 in hash) {
          //if there is one, clear localstorage
          appstate.clear();

          session = JSON.parse($base64.decode(hash[1]));
          if (!session) {
          	console.log('couldn\'t parse session from url');
          	return false;
          }
        } else {
        	console.log('no url storage');
        	//if there isn't one, check for one in localstorage
        	var session = localStorageService.get('appstate');

        	if (!!session && session.length) {
        		session = JSON.parse(session);

        		//backfill empty questions in the stored path
        		var lastQuestion = session.restore;
        		var cnt=0;
    			while (true) {
					var next = $rootScope.questionsData.questions[lastQuestion].next;
					if (!next || typeof next !== 'string' || cnt++ > 100) break;
    				session.answers[next] = undefined;
    				lastQuestion = next;
    			}
        	} else {
        		console.log('no session storage');
        		return false;
        	}
        }

        return session;
	}

	function _generateURL(str) {
		return $location.host() + '/?' + $base64.encode(str);
	}

	function _enumerateAnswers() {
		var temp = {};
      for (var sq in $rootScope.questionsData.scoringQuestions) {
        var answer = [];
        for (var t in $rootScope.questionsData.scoringQuestions[sq].text) {
          if (typeof $rootScope.questionsData.scoringQuestions[sq].text[t].answer !== 'undefined' && $rootScope.questionsData.scoringQuestions[sq].text[t].type == 'slider') {
            answer.push($rootScope.questionsData.scoringQuestions[sq].text[t].answer);
            continue;
          }
          for (var ans in $rootScope.questionsData.scoringQuestions[sq].text[t].answers) {
            if ($rootScope.questionsData.scoringQuestions[sq].text[t].answers[ans].answer == true) {
              answer.push($rootScope.questionsData.scoringQuestions[sq].text[t].answers[ans].value)
            }
            else if (!isNaN($rootScope.questionsData.scoringQuestions[sq].text[t].answers[ans].answer)) {
              answer[$rootScope.questionsData.scoringQuestions[sq].text[t].answers[ans].answer] = $rootScope.questionsData.scoringQuestions[sq].text[t].answers[ans].value
            }
          }
        }
        temp[sq] = answer.join(";");
      }

      var lastQuestion = /[^/]*$/.exec($location.path())[0];
      return {restore:lastQuestion, answers:temp};
	}

	return appstate;
}]);