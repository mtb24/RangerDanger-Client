angular.module(_CONTROLLERS_)
	.controller('prefController', ['$rootScope', 'Utilities', function($rootScope, Utilities) {


		/* Store any changes to preferences */
		$rootScope.$watch('settings.alert_on', function(newVal, oldVal){
			if(newVal !== oldVal){
				Utilities.setStorageItem('settings', $rootScope.settings);
				console.log("New alert_on change detected: "+newVal);
			}
		});
		$rootScope.$watch('settings.alert_distance', function(newVal, oldVal){
			if(newVal !== oldVal){
				Utilities.setStorageItem('settings', $rootScope.settings);
				console.log("New alert_distance change detected: "+newVal);
			}
		});
		$rootScope.$watch('settings.alert_freshness', function(newVal, oldVal){
			if(newVal !== oldVal){
				Utilities.setStorageItem('settings', $rootScope.settings);
				console.log("New alert_freshness change detected: "+newVal);
			}
		});
}]);