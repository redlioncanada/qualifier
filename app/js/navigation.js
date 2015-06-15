'use strict';

angular.module('App')
  .controller('NavigationCtrl', function ($scope, $state) {
  	$scope.setType = function (q,a) {
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
	          if (qtype == "radio" || qtype == "boxes" || qtype == "boxes-picture" || qtype == "boxes-picture-carousel" || qtype == "checkbox") {
	            if (a.answer == true) {
	              return a
	            }
	          } else if (qtype == "rank") {
	            if (a.answer == 1) {
	              return a
	            }              
	          } else if (qtype == "slider") {
	            if (a.answer == 1) {
	              return a
	            }       
	          }
	        }
	    }
    	return false;
  	}
});