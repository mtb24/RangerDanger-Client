
var app = angular.module('rangerdanger', [
	'ionic',
	'ionic.ui.content',
	'ionic.service.loading',
	'leaflet-directive',
	'rangerdanger.services'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('tabs', {
				url: "/tab",
				abstract: true,
				templateUrl: "tabs.html"
			})
			.state('tabs.home', {
				url: "/home",
				views: {
					'home-tab': {
						templateUrl: "home.html",
						controller:  'homeController',
						resolve: {
							'alertData': ['$http', function($http){
								return $http.jsonp('http://rangerdanger.herokuapp.com/alert?callback=JSON_CALLBACK')
								.success(function(data){ return data; })
								.error(function(data, status, header, config){ console.log("Data: "+data+"\nStatus: "+status+"\nHeader: "+header+"\nConfig: "+config); });
							}]
						}
					}
				}
			})
			.state('tabs.map', {
				url: "/map",
				views: {
					'map-tab': {
						templateUrl: "map.html",
						controller:  'mapController',
						resolve: {
							'alertData': ['$http', function($http){
								return $http.jsonp('http://rangerdanger.herokuapp.com/alert?callback=JSON_CALLBACK')
								.success(function(data){ return data; })
								.error(function(data, status, header, config){ console.log("Data: "+data+"\nStatus: "+status+"\nHeader: "+header+"\nConfig: "+config); });
							}]
						}
					}
				}
			})
			.state('tabs.preferences', {
				url: "/preferences",
				views: {
					'preferences-tab': {
						templateUrl: "preferences.html",
						controller:  'prefController'
					}
				}
			});

			$urlRouterProvider.otherwise("/tab/home");
});

app.run(function($rootScope, Utilities){
	/* Setup some event listeners */

    document.addEventListener("deviceready", Utilities.onDeviceReady, false);

    if (window.addEventListener) {
		// The `offline` event fires when a previously connected device loses a network connection
		// so that an application can no longer access the Internet
		window.addEventListener("offline", Utilities.onOffline, false);
		console.log("window.addEventListener('offLine') added");

		// The `online` event fires when a previously unconnected device receives
		// a network connection to allow an application access to the Internet.
		window.addEventListener("online", Utilities.onOnline, false);
		console.log("window.addEventListener('onLine') added");


		// set localstorage listener
		//$rootScope.$apply( window.addEventListener("storage", Utilities.handle_storage, false) );
		console.log("window.addEventListener('storage') added");
	} else {
		//$rootScope.$apply( window.attachEvent("onstorage", Utilities.handle_storage) );
		console.log("window.attachEvent('onstorage') added");
	};

    /* If no user preferences are defined, set some defaults */
    if( !Utilities.getStorageItem('settings') ){

		Utilities.setStorageItem('settings', {
	    	'alert_on': 'On',
			'alert_distance': 3,
			'alert_freshness': 60
		});
		console.log("Default settings loaded in LocalStorage");
    }

});

app.controller('homeController', ['$scope', '$ionicModal', '$ionicLoading', 'leafletEvents', 'alertData', 'Utilities', 'Alerts', function($scope, $ionicModal, $ionicLoading, leafletEvents, alertData, Utilities, Alerts){

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
	        alerts: alertData.data,
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
	                  console.log(Utilities.getStorageItem('current_location'));
	                  //$scope.alerts.$add(Utilities.getStorageItem('current_location'));
	                  Alerts.save( Utilities.getStorageItem('current_location') );
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
				$scope.loading = $ionicLoading.show({
					content: 'Loading',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 500
				});

				// Hide the loading indicator once map is loaded
				$scope.$on('leafletDirectiveMap.load', function(event) {
					 $scope.loading.hide();
				});
		    },
		    saveModal: function(){
			    Alerts.save({
			    	"createdAt": $scope.marker.date,
			    	"lat":       $scope.marker.lat,
			        "lng":       $scope.marker.lng,
			        'message':   $scope.marker.message,
			        'focus':     $scope.marker.focus,
			        'draggable': $scope.marker.draggable
			    });

		    	// close modal window
		    	$scope.modal.hide();
		    },
	    });

	    // Modal map window for dropping location marker
	    $ionicModal.fromTemplateUrl('modal.html', function(modal){
	    	$scope.modal = modal;
	    },
	    {
	    	scope: $scope,
	    	animation: 'slide-in-up'
	    });

		// when user clicks map in modal window, get the coordinates
		$scope.$on('leafletDirectiveMap.click', function(event, coords) {

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

app.controller('mapController', ['$scope', '$ionicLoading', 'alertData', function($scope, $ionicLoading, alertData) {

		// show loading overlay
		$scope.loading = $ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 500
		});

		// Hide the loading indicator when map is loaded
		$scope.$on('leafletDirectiveMap.load', function(event) {
			$scope.loading.hide();
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

app.controller('prefController', ['$scope', 'Utilities', function($scope, Utilities) {

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