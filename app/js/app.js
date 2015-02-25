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

  }])
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    //$resource();
    //$rootScope.go = "x"
    console.log("Run");
    $state.go('main');
  }]);

angular.bootstrap(document, ["App"]);
