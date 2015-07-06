'use strict';

angular.module('App')
  .controller('NavigationCtrl', function ($scope, $state, $rootScope, $filter) {
  	$scope.setType = function (q,a) {
  		console.log(a.thumbnail_type);
  		if (!!q) {
	  		if (!a.thumbnail_type) {
	  			return q.thumbnail_type
	  		} 
	  		return a.thumbnail_type
	  	}
  	} 

  	$scope.navToQuestions = function () {
  		$state.go('main.questions')
  	}

  	$scope.byName = function(q) {
  		if (!!q) {
	    	return 'name' in q
		}
		return false
	};

  	$scope.setAnswer = function (q) {
  		if (!!q) {
	  		var qtype = q.show.type;
	        for (var ans in q.show.answers ) {
	          var a = q.show.answers[ans]
	          if (qtype == "rank") {
	            if (a.answer == 1) {
	              return a
	            }              
	          } else if (qtype == "slider" || qtype == "slider-people") {
	            if (a.answer == 1) {
	              return a
	            }       
	          } else {
	            if (a.answer == true) {
	              return a
	            }	          	
	          }
	        }
	    }
    	return false;
  	}
});