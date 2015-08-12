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
  'ngSlider',
  'ngAnimate'
];

var App = angular.module('App', nglibs);

App.animation('.slidey', function ($window) {
    return {
//        addClass: function (element, className, done) {
//            
//            if (className == 'ng-hide') {
//                console.log("HIDE");
//                console.log(-$window.innerWidth);
//                TweenMax.to(element, 3, {left: -$window.innerWidth, onComplete: done });
//            }
//            else {
//                done();
//            }
//        }//,
//        removeClass: function (element, className, done) {
//
//            if (className == 'ng-hide') {
//                console.log("UNHIDE");
//                element.removeClass('ng-hide');
//
//                TweenMax.set(element, { left: $window.innerWidth });
//                TweenMax.to(element, 3, {left: 0, onComplete: done });
//            }
//            else {
//                done();
//            }
//        }
    };
});


App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', 'localStorageServiceProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");
    localStorageServiceProvider.setPrefix("MaytagQualifier_");

    $stateProvider
      .state('loading', {
        templateUrl: 'views/loading.html'
      }) 
      .state('main', {
        templateUrl: 'views/main.html'
      }) 
      .state('main.questions', {
        url : "/questions/",
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .state('main.questions.makedata', {
        url : "/questions/data",
        templateUrl: 'views/questionsdata.html',
        controller: 'QuestionsDataCtrl'
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

App.filter('rearrange', function() {
  return function(items, num) {
      var temp = items[0];
      items[0] = items[1];
      items[1] = temp;     
      return items;
  };
});

App.filter('after', function() {
  return function(items, num) {  
      items.splice(0,num)
      return items
  };
});

App.filter('assignScore', function() {
  return function(items, appliance) {
      angular.forEach(items, function(item) {
        if (item.featureKey in appliance) {
          if (!!appliance[item.featureKey]) {
            item.score = 2;
          } else if (!!item.top3) {
            item.score = 1;
          }
        } else if (!!item.top3) {
          item.score = 1;
        } else {
          item.score = 0;
        }
      });          
      return items;
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
    console.log("score")
      angular.forEach(items, function (item) {
        console.log(item.score)
      })
    var inside = [];
    var outside = [];
    var range = price.split(";")
    angular.forEach(items, function(appliance) {
        var p =appliance.price
        if (p >= parseFloat(range[0]) && p <= parseFloat(range[1])) {
          inside.push(appliance)
        } else {
          outside.push(appliance)
        }
    });
    return inside.concat(outside);
  };
});

// New byPrice works by re-ranking the results, prices within the range are ranked, then prices without

App.run(['$rootScope', '$state', "$resource", function ($rootScope, $state, $resource) {
  console.log("Run");
  $state.go('loading');
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
          var manifest = [
            "img/slider-pointer.png"
          ];

          $resource("http://mymaytag.wpc-stage.com/api/public/wpq/product-list/index/brand/"+$rootScope.brandData.brand+"/locale/"+$rootScope.locale).get({}, function (res, headers) {
                $rootScope.appliances = res.products;
                angular.forEach( $rootScope.appliances, function (item, key) { 
                    if ($rootScope.appliances[key].appliance == "Laundry") {
                      for (var i in item.colours) {
                        //$rootScope.appliances[key].colours[i].image = setColourURL($rootScope.appliances[key].appliance,$rootScope.appliances[key].image, $rootScope.appliances[key].colours[i].colourCode);
                        $rootScope.appliances[key].colours[i].prices = {}
                        $rootScope.appliances[key].colours[i].prices.CAD = parseFloat(item.colours[0].dryerPrices.CAD) + parseFloat(item.colours[0].washerPrices.CAD)
                      }
                      $rootScope.appliances[key].price = parseFloat(item.colours[0].dryerPrices.CAD) + parseFloat(item.colours[0].washerPrices.CAD)
                    } else {
                      $rootScope.appliances[key].price = parseFloat(item.colours[0].prices.CAD)
                    }


                    if ($rootScope.appliances[key].appliance == "Laundry") {
                        $rootScope.appliances[key].capacity = Math.min($rootScope.appliances[key].washerCapacity,$rootScope.appliances[key].dryerCapacity)
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

                    } else if ($rootScope.appliances[key].appliance == "Dishwashers") {
                      $rootScope.appliances[key]["placeSettings"+$rootScope.appliances[key].placeSettings.toString()] = true
                      $rootScope.appliances[key].quiet = false
                      if (parseFloat($rootScope.appliances[key].decibels) <= 47) {
                        $rootScope.appliances[key].quiet = true
                      }
                    } else if ($rootScope.appliances[key].appliance == "Fridges") {
                      if ($rootScope.appliances[key].height <= 66) {
                        $rootScope.appliances[key]["height66"] = true
                      } else if ($rootScope.appliances[key].height <= 67) {
                        $rootScope.appliances[key]["height67"] = true
                      } else if ($rootScope.appliances[key].height <= 68) {
                        $rootScope.appliances[key]["height68"] = true
                      } else if ($rootScope.appliances[key].height <= 69) {
                        $rootScope.appliances[key]["height69"] = true
                      } else if ($rootScope.appliances[key].height <= 70) {
                        $rootScope.appliances[key]["height70"] = true
                      } else if ($rootScope.appliances[key].height <= 71) {
                        $rootScope.appliances[key]["height71"] = true
                      }
                      if ($rootScope.appliances[key].width <= 30) {
                        $rootScope.appliances[key]["width30"] = true
                      } else if ($rootScope.appliances[key].width <= 31) {
                        $rootScope.appliances[key]["width31"] = true
                      } else if ($rootScope.appliances[key].width <= 32) {
                        $rootScope.appliances[key]["width32"] = true
                      } else if ($rootScope.appliances[key].width <= 33) {
                        $rootScope.appliances[key]["width33"] = true
                      } else if ($rootScope.appliances[key].width <= 34) {
                        $rootScope.appliances[key]["width34"] = true
                      } else if ($rootScope.appliances[key].width <= 35) {
                        $rootScope.appliances[key]["width35"] = true
                      } else if ($rootScope.appliances[key].width <= 36) {
                        $rootScope.appliances[key]["width36"] = true
                      }
                    } else if ($rootScope.appliances[key].appliance == "Cooking") {
                      if ($rootScope.appliances[key].type == "Ovens") {
                        if ($rootScope.appliances[key].width <= 27) {
                          $rootScope.appliances[key]["width27"] = true
                        } else if ($rootScope.appliances[key].width <= 30) {
                          $rootScope.appliances[key]["width30"] = true
                        } 
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
                    } 
                })
                $state.go('main.questions');
          }, function () {
              $rootScope.errorMessage = "We're having connectivity issues. Please reload."
          });
    }, function () {
      $rootScope.errorMessage = "We're having connectivity issues. Please reload."
    });
  }]);

//angular.bootstrap(document, ["App"]);
