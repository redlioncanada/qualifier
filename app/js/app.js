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
    var getNext = function (q) {
      var r = false
      angular.forEach(q.text[0].answers, function (item, k) {
        if ('next' in item && item.answer == true) {
          r = item
        }
      })
      return r
    }
    var nextQuestions = []
    var t = null
    var l = $rootScope.objSize($rootScope.questionsData.scoringQuestions)
    angular.forEach($rootScope.questionsData.scoringQuestions, function (item, k) {
      if (item.order == l) {
        t = item
      }
    })
    while (!!t) {
      var nn = null
      if ('next' in t) {
        nn = t.next
      } 
      else if (!!getNext(t)) {
        nn = getNext(t).next
      } 
      else {
        t = null
      }
      if (!!t) {
        nextQuestions.push($rootScope.questionsData.questions[nn])          
        t = $rootScope.questionsData.questions[nn]
      }
    }
    return nextQuestions

  };
});

App.filter('byPrice', function() {
  return function(items, price) {
    var filtered = [];
    var range = price.split(";")
    angular.forEach(items, function(appliance) {
        var p =appliance.price
        if (p >= parseFloat(range[0]) && p <= parseFloat(range[1])) {
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
                    } else if ($rootScope.appliances[key].appliance == "Dishwashers") {
                      $rootScope.appliances[key]["placeSettings"+$rootScope.appliances[key].placeSettings.toString()] = true
                      $rootScope.appliances[key].quiet = false
                      if (parseFloat($rootScope.appliances[key].decibels) <= 47) {
                        $rootScope.appliances[key].quiet = true
                      }
                    } else if ($rootScope.appliances[key].appliance == "Fridges") {
                      $rootScope.appliances[key]["height"+$rootScope.appliances[key].height.toString()] = true
                      $rootScope.appliances[key]["width"+$rootScope.appliances[key].width.toString()] = true
                    } else if ($rootScope.appliances[key].appliance == "Cooking") {
                      if ($rootScope.appliances[key].type == "Ovens") {
                        $rootScope.appliances[key].width = 27
                        $rootScope.appliances[key]["width"+$rootScope.appliances[key].width.toString()] = true
                      } 
                      else if ($rootScope.appliances[key].type == "Ranges") {
                        if (parseFloat($rootScope.appliances[key].capacity) >= 6.7) {
                          $rootScope.appliances[key].largestCapacity = true
                        } 
                        if (parseFloat($rootScope.appliances[key].capacity) >= 6.4) {
                          $rootScope.appliances[key].largerCapacity = true
                        }
                        if (parseFloat($rootScope.appliances[key].capacity) >= 6.2) {
                          $rootScope.appliances[key].largeCapacity = true
                        }
                        if (parseFloat($rootScope.appliances[key].capacity) >= 5.8) {
                          $rootScope.appliances[key].mediumCapacity = true
                        }                    
                      }
                    } else if ($rootScope.appliances[key].appliance == "Laundry") {
                        if (parseFloat($rootScope.appliances[key].capacity) >= 6.1) {
                          $rootScope.appliances[key].largestCapacity = true
                        } 
                        if (parseFloat($rootScope.appliances[key].capacity) >= 5.2) {
                          $rootScope.appliances[key].largerCapacity = true
                        }
                        if (parseFloat($rootScope.appliances[key].capacity) >= 5) {
                          $rootScope.appliances[key].largeCapacity = true
                        }
                        if (parseFloat($rootScope.appliances[key].capacity) >= 4.8) {
                          $rootScope.appliances[key].mediumCapacity = true
                        }                    
                        if (parseFloat($rootScope.appliances[key].capacity) >= 4.2) {
                          $rootScope.appliances[key].smallCapacity = true
                        }
                    }
                })
                $state.go('main.questions');
          });
    });
  }]);

//angular.bootstrap(document, ["App"]);
