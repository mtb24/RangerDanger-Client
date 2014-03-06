angular.module(_CONTROLLERS_)
	.controller('homeController', ['$scope', '$ionicModal', '$ionicLoading', 'Utilities', 'leafletEvents', function($scope, $ionicModal, $ionicLoading, Utilities, leafletEvents){

        // map defaults
        angular.extend($scope, {
            center: {
                autoDiscover: true,
                zoom: 16
            },
            defaults: {
	        	//icon: '',
	        	clickable: true,
	        	draggable: false
	        },
	        events: {
	        	map: {
	        		enable: ['click'],
	        		logic: 'emit'
	        	}
	        },
	        marker: {},
	        alerts: {}, //alertData.data,
	        tagLocation: function() {
		        navigator.geolocation.getCurrentPosition(
	                function(position){
	                  Utilities.setStorageItem('current_location', {
	                  	'createdAt': new Date(),
			            'lat':position.coords.latitude,
			            'lng':position.coords.longitude,
			            'message': '',
			            'focus': 'false',
			            'draggable': 'false'
					  });
	                  console.log( Utilities.getStorageItem('current_location') );
	                  //$scope.alerts.$add(Utilities.getStorageItem('current_location'));
	                  //Alerts.save( Utilities.getStorageItem('current_location') );
	                  alert("Alert Added!");
	                },
	                function(error){
	                  console.log(error);
	                  alert(error.message);
	                }
                );
		    },
		    closeModal: function(){
		    	$scope.modal.hide();
		    },
		    openModal: function(){

		    	$scope.modal.show();

				// show loading overlay
				/*$scope.loading = $ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 500
				});*/

				// Hide the loading indicator once map is loaded
				$scope.$on('leafletDirectiveMap.load', function(event) {
					 console.log("leafletDirectiveMap.load event fired");
					 //$scope.loading.hide();
				});
		    },
		    saveModal: function(){
			    /*Alerts.save({
			    	"createdAt": $scope.marker.date,
			    	"lat":       $scope.marker.lat,
			        "lng":       $scope.marker.lng,
			        'message':   $scope.marker.message,
			        'focus':     $scope.marker.focus,
			        'draggable': $scope.marker.draggable
			    });*/

		    	// close modal window
		    	$scope.modal.hide();
		    },
	    });

	    // Modal map window for dropping location marker
	    $ionicModal.fromTemplateUrl('html/partials/home/modal.html', function(modal){
	    	$scope.modal = modal;
	    },
	    {
	    	scope: $scope,
	    	animation: 'slide-in-up'
	    });

		// when user clicks map in modal window, get the coordinates
		$scope.$on('leafletDirectiveMap.click', function(event, coords) {

			console.log("leafletDirectiveMap.load event fired");
			$scope.marker.date = new Date();
	    	$scope.marker.lat  = coords.leafletEvent.latlng.lat;
	    	$scope.marker.lng  = coords.leafletEvent.latlng.lng;
	    	$scope.marker.message = $scope.marker.date;
	    	$scope.marker.focus = "false";
	    	$scope.marker.draggable = "false";

	    	// show marker on map
	    	$scope.marker[$scope.marker.date] = {
	    		                  	"lat": $scope.marker.lat,
	    		                  	"lng": $scope.marker.lng,
	    		                  	"message": '"'+$scope.marker.date+'"'
            };
			console.log("Marker LatLng: "+$scope.marker.lat+", "+$scope.marker.lng+", Date: "+$scope.marker.date);
		});
}]);
