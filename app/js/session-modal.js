'use strict';

angular.module('App')
  .controller('SessionModalCtrl', ['$modalInstance', '$scope', '$timeout', '$appstate', function ($modalInstance, $scope, $timeout, $appstate) {
    $appstate.storeLastSessionPrompt();
    
    $scope.reload = function() {
      $appstate.reload();
    }

    $scope.close = function() {
      $modalInstance.dismiss('cancel');
    }

}]).directive('stopEvent', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.on(attr.stopEvent, function (e) {
          e.stopPropagation();
        });
      }
    };
  });