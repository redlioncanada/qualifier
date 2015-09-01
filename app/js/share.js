'use strict';
angular.module('App')
  .controller('ShareCtrl', function ($scope, $rootScope) {		
  }).directive('share', function() {
    return {
      restrict: 'E',
      
      link: function(scope, element, attrs) {
        $(element).find('.icon-share').on('click', function(e) {
          popout(e);
        });
        $(element).find('.share-popout span').on('click', function(e) {
          popin(e);
        });
        element.on('mouseover', function(e) {
          popout(e);
        });
        element.on('mouseout', function(e) {
          popin(e);
        });

        function popout(e) {
          e.preventDefault();

          var popout = $(element).find('.share-popout');
          $(popout).stop(true).animate({
            'left': -$(popout).width()
          }, 500);
        }
        function popin(e) {
          var popout = $(element).find('.share-popout');
          $(popout).stop(true).animate({'left': 0}, 500);
        }
      }
    }
  });
