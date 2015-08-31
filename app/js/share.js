'use strict';
angular.module('App')
  .controller('ShareCtrl', function ($scope, $rootScope) {		
  }).directive('share', function() {
    return {
      restrict: 'E',
      
      link: function(scope, element, attrs) {
        element.on('mouseover', function(e) {
          e.preventDefault();
          console.log('mouseover');
          var popout = $(element).find('.share-popout');
          $(popout).stop(true).animate({'left': -$(popout).width()}, 500);
        });

        element.on('mouseout', function(e) {
          console.log('mouseout');
          var popout = $(element).find('.share-popout');
          $(popout).stop(true).animate({'left': 0}, 500);
        });
      }
    }
  });
