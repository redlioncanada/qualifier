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
  'rzModule'
];

var App = angular.module('App', nglibs);

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");
    localStorageServiceProvider.setPrefix("MaytagQualifier_");

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

App.filter('nextQuestions', function($rootScope, $filter) {
  return function(items) {
    var nextQuestions = []
    var t = null
    var l = $rootScope.objSize($rootScope.questionsData.scoringQuestions)
    angular.forEach($rootScope.questionsData.scoringQuestions, function (item, k) {
      if (item.order == l) {
        t = item
      }
    })
    if (!!t > 0) { 
      var n = $rootScope.objSize($filter('filter')(t.text[0].answers, function(item) { return 'next' in item }))
      while ('next' in t || n > 0) {
        if ('next' in t) {
          nextQuestions.push($rootScope.questionsData.questions[t.next])          
          t = $rootScope.questionsData.questions[t.next]
        } else {
          var n = $filter('filter')(t.text[0].answers, function(item) { return item.answer == true })
          if ($rootScope.objSize(n) > 0) {
            var next = $rootScope.getFirstObjectProperty(n).next
            nextQuestions.push($rootScope.questionsData.questions[next])
            t = $rootScope.questionsData.questions[next]            
          } else {
            t = null
          }

        }

        if (!!t) {
          var n = $rootScope.objSize($filter('filter')(t.text[0].answers, function(item) { return 'next' in item }))
        } else {
          break;
        }
      }
      return nextQuestions
    }
  };
});

App.filter('byPrice', function() {
  return function(items, minprice, maxprice) {
    var filtered = [];
        console.log(minprice,maxprice)
    angular.forEach(items, function(appliance) {
        var p =appliance.price
        if (p >= minprice && p <= maxprice) {
          filtered.push(appliance)
        }
    });
    return filtered;
  };
});

App.run(['$rootScope', '$state', "$resource", function ($rootScope, $state, $resource) {
  console.log("Run");
    $rootScope.objSize = function (obj) {
      if (!!obj) {
        return Object.keys(obj).length;
      } else {
        return 0;
      }
    }
    $rootScope.getFirstObjectProperty = function (obj) {
      for (var p in obj) {
        return obj[p]
      }
    }
    $rootScope.log = function (log) {
      console.log(log);
    }

    $resource("config/brand.json").get({}, function (res, headers) {
          $rootScope.locale = "en_CA"
          $rootScope.brandData = res;

          angular.forEach( $rootScope.brandData.questions, function (item, key) { 
              $rootScope.brandData.questions[key].name = key
          })

          $resource("http://mymaytag.wpc-stage.com/api_test/public/wpq/product-list/index/brand/"+$rootScope.brandData.brand+"/locale/"+$rootScope.locale).get({}, function (res, headers) {
                $rootScope.appliances = res.products;
                // fake the prices for now, change when we build in colour picker
                angular.forEach( $rootScope.appliances, function (item, key) { 
                      if (item.appliance == "Laundry") {
                        $rootScope.appliances[key].price = parseFloat(item.washerColours[0].prices.CAD) + parseFloat(item.dryerColours[0].prices.CAD)
                      } else {
                        $rootScope.appliances[key].price = parseFloat(item.colours[0].prices.CAD)
                      }
                    
                    // also fake gas, electric for laundry
                    if ($rootScope.appliances[key].appliance == "Laundry") {
                        $rootScope.appliances[key].gas = Math.floor((Math.random() * 2)) == 0 ? true : false
                        $rootScope.appliances[key].electric = Math.floor((Math.random() * 2)) == 0 ? true : false
                    }
                })
                console.log($rootScope.appliances)
                $state.go('main.questions');
          });
    });
  }]);

//angular.bootstrap(document, ["App"]);
