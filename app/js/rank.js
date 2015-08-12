'use strict';

angular.module('App')
  .controller('RankCtrl', function ($scope, $rootScope) {
	$scope.sortable = {}
    $rootScope.questionsData.question.oneAnswer = false;
	$scope.sortable.dragControlListeners = {
    	orderChanged: function(event) {
            $rootScope.controls.questionHasAnswer = true
    		for (var i in $rootScope.questionsData.question.show.answers) {
    			$rootScope.questionsData.question.show.answers[i].answer = i
    		}
    	},
	    containment: '.answers-main-content'
	};
});