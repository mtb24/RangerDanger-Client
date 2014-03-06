angular.module(_CONTROLLERS_)
	.controller('mapController', ['$scope', '$ionicLoading', 'alertData', function($scope, $ionicLoading, alertData) {

		// show loading overlay
		/*$scope.loading = $ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 500
		});*/

		// Hide the loading indicator when map is loaded
		$scope.$on('leafletDirectiveMap.load', function(event) {
			//$scope.loading.hide();
		});

        // center map on users location
        angular.extend($scope, {
            center: {
                autoDiscover: true,
                zoom: 12
            },
            defaults: {
	        	//icon: '',
	        	//clickable: false,
	        	//draggable: false
	        },
	        //GeoLocation: Geo.getLocation(),
	        markers: alertData.data,
        });

		// Get alerts from service
		//alertService.setListToScope($scope, 'markers');
		console.log("Markers: "+$scope.markers);

}]);