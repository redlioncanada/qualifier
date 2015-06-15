'use strict';

angular.module('App')
  .controller('RankCtrl', function ($scope, $rootScope) {
	$scope.sortable = {}
	$scope.sortable.dragControlListeners = {
    	orderChanged: function(event) {
    		for (var i in $rootScope.questionsData.question.show.answers) {
    			$rootScope.questionsData.question.show.answers[i].answer = i
    		}
    	},
	    containment: '.answers-main-content'
	};
});