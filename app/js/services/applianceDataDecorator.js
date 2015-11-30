var applianceDataDecorator = angular.module('ApplianceDataDecoratorService', []);

applianceDataDecorator.factory('$dataDecorator', ['$filter', function($filter) {
	return function(data) {
		// console.log(data);

		 var relcodes = {
          'M1' : 'DC',
          'WH' : 'DW'
        }
        angular.forEach( data, function (item, key) { 
            item.price = parseFloat(item.colours[0].prices.CAD);

            if (item.width) {
              item["width"+Math.round(item.width)] = true;
            }

            if (item.height) {
              item["height"+Math.round(item.height)] = true;
            }

              if (item.appliance == "Washers") {

                for (var i in item.colours) {
                  for (var j in item.dryers[0].colours) {
                    if (item.dryers[0].colours[j].colourCode == item.colours[i].colourCode) {
                      item.colours[i].dryersku = item.dryers[0].colours[j].sku;
                    }
                  }
                }

                  if (parseFloat(item.capacity) >= 6.1) {
                    item.largestCapacity = true
                  } 
                  if (parseFloat(item.capacity) >= 5.2) {
                    item.largerCapacity = true
                  }
                  if (parseFloat(item.capacity) >= 5) {
                    item.largeCapacity = true
                  }
                  if (parseFloat(item.capacity) >= 4.8) {
                    item.mediumCapacity = true
                  }                    
                  if (parseFloat(item.capacity) >= 4.2) {
                    item.smallCapacity = true
                  }

              } else if (item.appliance == "Dishwashers") {
                item["placeSettings"+item.placeSettings.toString()] = true
                item.quiet = false
                if (parseFloat(item.decibels) <= 47) {
                  item.quiet = true
                }
              } else if (item.appliance == "Fridges") {
                if (item.capacity <= 20) {
                  item["smallCapacity"] = true
                } else if (item.capacity <= 22) {
                  item["mediumCapacity"] = true
                } else if (item.capacity > 22) {
                  item["largeCapacity"] = true
                }
              } else if (item.appliance == "Cooking") {
                  //no custom props
                } 
                else if (item.type == "Ranges") {
                  if (parseFloat(item.capacity) >= 6.7) {
                    item.largestCapacity = true
                  } 
                  if (parseFloat(item.capacity) >= 6.4) {
                    item.largerCapacity = true
                  }
                  if (parseFloat(item.capacity) >= 6.2) {
                    item.largeCapacity = true
                  }
                  if (parseFloat(item.capacity) >= 5.8) {
                    item.mediumCapacity = true
                  }                    
                }
              } 
        })
		  return $filter('orderBy')(data, '-price');
	};
}]);