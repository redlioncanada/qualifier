var appstateModule = angular.module('AppstateService', []);

appstateModule.factory('$appstate', ['$cookies', '$log', function($rootScope, $cookies, $log) {
	var appstate = {};

	appstate.store = function(obj) {
		console.log(obj);
	}

	appstate.restore = function() {

	}

	appstate.clear = function() {
		
	}

	return appstate;

	// $cookies.put(JSON.stringify($rootScope.questionsData, 'questionsData'));
		  		// var test = JSON.parse($cookies.get('questionsData'));
}]);