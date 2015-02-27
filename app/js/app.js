//'use strict';

var nglibs = [
  'ngCookies',
  'ngResource',
  'ngSanitize',
//  'ngRoute',
//  'xeditable',
  'ui.router',
//  'ngTouch',
  'pasvaz.bindonce',
  'LocalStorageModule'
];

var App = angular.module('App', nglibs);

App.filter('questionFilter', function () {
    return function (list, order) {
        for (var l in list) {
          console.log(list[l].order);
          if (list[l].order == order) {
              console.log(list[l])
              return [list[l]];
          }
        }
    };
});

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");
    localStorageServiceProvider.setPrefix('Whirlpool');

    $stateProvider
      .state('main', {
        templateUrl: 'views/main.html',
        controller: "MainCtrl"
      })
      .state('main.questions', {
        url : "/questions/",
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .state('main.results', {
        url : "/results",
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      });

  }]);

App.run(['$rootScope', '$state', "$resource", function ($rootScope, $state, $resource) {
    $resource("config/brand.json").get({}, function (res, headers) {
          $rootScope.brandData = res;
          console.log($rootScope.brandData);
          $state.go('main.questions');
    });
  }]);

angular.bootstrap(document, ["App"]);
