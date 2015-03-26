var jsdom = require('jsdom');
describe('QuestionsCtrl', function() {
  beforeEach(module('app'));
  var $controller;
  describe('$scope.order', function() {

    var randomQuestion = function (obj) {
        var count = 0;
        for (var i in obj) {
          count++
        }
        var ref = Math.floor((Math.random() * count))
        obj[ref].name = ref
        return obj[ref]
    }

    beforeEach(function() {
      $scope = {};
      controller = $controller('QuestionsCtrl', { $scope: $scope });
    });

    it('next with no answer', function() {
      // expect: set $scope.question equal to something random from $scope.questions, then assign no answer to question, then try to go next 
      $scope.question = randomQuestion($scope.questions)
      var currentName = angular.copy($scope.question.name)
      $scope.next()
      expect(currentName).toEqual($scope.question.name);
    });

    it('next with answer', function() {
      // expect: set $scope.question equal to something random from $scope.questions, then assign no answer to question, then try to go next 
      $scope.question = randomQuestion($scope.questions)
      var currentName = angular.copy($scope.question.name)
      
      $scope.next()
      expect(currentName).toNotEqual($scope.question.name)
    });

  });
}); 