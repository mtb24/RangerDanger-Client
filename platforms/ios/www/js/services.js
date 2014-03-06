var services = angular.module('rangerdanger.services', []);

services.factory("Geo", function ($q) {
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
/*
services.factory('alertService', function alertService($firebase){
	var _url = 'https://vivid-fire-7529.firebaseio.com',
	    _ref = new Firebase(_url);

	return {
		setListToScope: function(scope, localScopeVarName){
			$firebase(_ref, scope, localScopeVarName);
		},
		addAlert: function(alert){
			_ref.push(alert);
		},
		removeAll: function(){
			_ref.remove();
		},
		deleteAlert: function(alertId){
			var alertRef = new Firebase(_url + '/' + alertId);
			alertRef.remove();
		}
	};
});
*/

services.factory('Alerts', ['$http', '$q', function Alerts($http, $q){
	var _url = 'http://rangerdanger.herokuapp.com/alert?callback=JSON_CALLBACK';
	var alerts = $http({ method: 'JSONP',
						 url: _url });
	return {
		query: function( what ){
			var deferred = $q.defer();
			deferred.resolve(alerts);
			return deferred.promise;
		},
		save: function(alert){
			// save data
			console.log("Saved current location: "+alert);
		}
	};


}]);

services.factory('Utilities', function utilities(){

	return {

		/* Event methods */
	    onOffline: function(e) {
	        // Handle the offline event
	        console.log("Offline event fired");
	    },
	    onOnline: function(e) {
	        // Handle the online event
	        console.log("Online event fired");
	    },
	    handle_storage: function(e) {
	    	// Handle LocalStorage event
	    	var key = e.key,
	    	    oldValue = e.oldValue,
	    	    newValue = e.newValue;
	    	console.log("Storage event fired: \n Key: "+key+"\n oldValue: "+oldValue+"\n newValue: "+newValue);
	    },

	    /* Functions for getting/setting values as JSON in localStorage */
	    getStorageItem: function(key) {
			return JSON.parse(localStorage.getItem(key));
		},
		setStorageItem: function(key, object) {
			try {
				localStorage.setItem(key, JSON.stringify(object));
			} catch(domException) {
				if (domException.name === 'QuotaExceededError' ||
					domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
					alert("LocalStorage quota exceeded!");
				}
			}
		},

		/* this should be in a directive */
		updateSlider: function(element){
			switch(element.value) {
			  case "<3":
			      element.classList.add('range-assertive');
			      break;
			  case "4":
			  case "5":
			      element.classList.add('range-energized');
			      break;
			  case ">6":
			      element.classList.add('range-balanced');
			      break;
			  default:
			      element.classList.add('range-assertive');
			      break;
			}
		},

	};


});