angular.module(_CONTROLLERS_)
	.controller('prefController', ['$scope', 'Utilities', function($scope, Utilities) {

		// get the settings, if defined
		$scope.settings = Utilities.getStorageItem('settings') || {};

		$scope.$watch('settings.alert_on', function(newVal, oldVal){
			if(newVal !== oldVal){
				console.log("New alert_on change detected: "+newVal);
				$scope.settings.alert_on = newVal;
				Utilities.setStorageItem('settings', $scope.settings);
				//$scope.$digest();
			}
		});
		$scope.$watch('settings.alert_distance', function(newVal, oldVal){
			if(newVal !== oldVal){
				console.log("New alert_distance change detected: "+newVal);
				$scope.settings.alert_distance = parseInt(newVal);
				Utilities.setStorageItem('settings', $scope.settings);
				// $scope.$digest();
			}
		});
		$scope.$watch('settings.alert_freshness', function(newVal, oldVal){
			if(newVal !== oldVal){
				console.log("New alert_freshness change detected: "+newVal);
				$scope.settings.alert_freshness = parseInt(newVal);
				Utilities.setStorageItem('settings', $scope.settings);
				// $scope.$digest();
			}
		});
}]);