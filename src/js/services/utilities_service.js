angular.module(_SERVICES_)
	.factory('Utilities', function utilities(){

		return {

			/* Event methods */
		    onOffline: function(e) {
		        Utilities.setStorageItem('device', {
		        	'status': 'Offline'
		        });
		        console.log("Offline event fired");
		    },
		    onOnline: function(e) {
		        Utilities.setStorageItem('device', {
		        	'status': 'Online'
		        });
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
			beep: function(times){
				/* Cordova dialogs plugin */
				navigator.notification.beep(times);
			},

		};
});