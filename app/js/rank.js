'use strict';

angular.module('App')
  .controller('RankCtrl', function ($scope) {
	$scope.sortable = {}
	$scope.sortable.dragControlListeners = {
    	orderChanged: function(event) {
    		for (var i in $scope.question.show.answers) {
    			$scope.question.show.answers[i].answer = i
    		}
    	},
	    containment: '.answers-main-content'
	};
});