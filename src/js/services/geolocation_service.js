angular.module(_SERVICES_)
	.factory("Geolocation", function ($q) {
		return {

			getLocation: function() {
				var q = $q.defer();

				navigator.geolocation.getCurrentPosition(
					function(position){
						q.resolve(position);
					},
					/* if user rejected permission(code 1), or position not available (code 2), or timeout (code 3) */
					function(error){
						q.reject(error);
						console.log("GeoLocation Error code: "+error.code);
						console.log("GeoLocation Error message: "+error.message);
					},
					/* options */
					{ maximumAge: 75000 }
				);
				return q.promise;
			},
			watchLocation: function() {
				var q = $q.defer();
				watchID = navigator.geolocation.watchPosition(
					function(position){
						q.resolve(position);
					},
					/* if user rejected permission(code 1), or position not available (code 2), or timeout (code 3) */
					function(error){
						q.reject(error);
						console.log("GeoLocation Error code: "+error.code);
						console.log("GeoLocation Error message: "+error.message);
					},
					/* options */
					{ enableHighAccuracy: true }
				);
				return q.promise;
			},
			stopWatching: function() {
				navigator.geolocation.clearWatch(watchID);
			}
		};
});