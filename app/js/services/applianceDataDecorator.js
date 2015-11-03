var applianceDataDecorator = angular.module('ApplianceDataDecoratorService', []);

applianceDataDecorator.factory('$dataDecorator', function() {
	return function(data) {
		// console.log(data);

		 var relcodes = {
          'M1' : 'DC',
          'WH' : 'DW'
        }
        angular.forEach( data, function (item, key) { 

              if (item.appliance == "Washers") {

                for (var i in item.colours) {
                  for (var j in item.dryers[0].colours) {
                    if (item.dryers[0].colours[j].colourCode == item.colours[i].colourCode) {
                      item.colours[i].dryersku = item.dryers[0].colours[j].sku;
                    }
                  }
                }

                item.price = parseFloat(item.colours[0].prices.CAD);

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
                if (item.height <= 66) {
                  item["height66"] = true
                } else if (item.height <= 67) {
                  item["height67"] = true
                } else if (item.height <= 68) {
                  item["height68"] = true
                } else if (item.height <= 69) {
                  item["height69"] = true
                } else if (item.height <= 70) {
                  item["height70"] = true
                } else if (item.height <= 71) {
                  item["height71"] = true
                }

                
                if (item.width <= 30) {
                  item["width30"] = true
                } else if (item.width <= 31) {
                  item["width31"] = true
                } else if (item.width <= 32) {
                  item["width32"] = true
                } else if (item.width <= 33) {
                  item["width33"] = true
                } else if (item.width <= 34) {
                  item["width34"] = true
                } else if (item.width <= 35) {
                  item["width35"] = true
                } else if (item.width <= 36) {
                  item["width36"] = true
                }
              } else if (item.appliance == "Cooking") {
                if (item.type == "Ovens") {
                  if (item.width <= 27) {
                    item["width27"] = true
                  } else if (item.width <= 30) {
                    item["width30"] = true
                  } 
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

              if (!!item.salesFeatures && typeof item.salesFeatures == 'object') {
				for (var a in item.salesFeatures) {
					var appliance = item.salesFeatures[a];
					if (!!appliance.featureKey && appliance.featureKey != null || appliance.featureKey != "null") {
						if (appliance.headline.indexOf('Temperature Refrigerated Drawer') !== -1 || appliance.headline.indexOf('r\u00e9frig\u00e9r\u00e9 \u00e0 temp\u00e9rature r\u00e9glable') !== -1) {
							appliance.featureKey = "tempReferDrawer";
						}
					}
				}
			}
        })
		return data;
	};
});