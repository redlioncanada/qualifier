//'use strict';

var nglibs = [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'ngTouch',
  'pasvaz.bindonce',
  'LocalStorageModule',
  'ui.bootstrap',
  'ui.sortable',
  'ngSlider'
];

var App = angular.module('App', nglibs);

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");
    localStorageServiceProvider.setPrefix('Whirlpool');

    $stateProvider
      .state('main', {
        templateUrl: 'views/main.html'
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

App.filter('orderByOrder', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered[parseInt(item.order)] = item;
    });
    return filtered;
  };
});

App.filter('byPrice', function() {
  return function(items, price) {
    var filtered = [];
    var range = price.split(";")
    angular.forEach(items, function(appliance) {
        var p = parseFloat((appliance.price.match(/[\.]?[0-9]/g)).join(""))
        if (p > range[0] && p < range[1]) {
          filtered.push(appliance)
        }
    });
    return filtered;
  };
});

App.run(['$rootScope', '$state', "$resource", function ($rootScope, $state, $resource) {
  console.log("Run");
    $rootScope.objSize = function (obj) {
      return Object.keys(obj).length;
    }
    $rootScope.log = function (log) {
      console.log(log);
    }

    $resource("config/brand.json").get({}, function (res, headers) {
          $rootScope.brandData = res;
          $resource("config/appliances.json").get({}, function (res, headers) {
                $rootScope.appliances = res.products;
                console.log($rootScope.appliances);
                $state.go('main.questions');
          });
    });
  }]);

//angular.bootstrap(document, ["App"]);
