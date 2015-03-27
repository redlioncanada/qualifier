'use strict';
console.log("loaded")
angular.module('App')
  .controller('BoxesPictureCtrl', function ($scope) {
  		$scope.boxWidth= Math.min(Math.floor(12/$scope.question.show.answers.length), 1)
  		$scope.clear = function (answers) {
  			for (var a in answers) {
  				answers[a].answer = false
  			}
  		}
});
