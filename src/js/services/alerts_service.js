angular.module(_SERVICES_)
	.factory('Alerts', ['$http', '$q', function Alerts($http, $q){
		var _url = 'http://rangerdanger.herokuapp.com/alert?callback=JSON_CALLBACK';
		var alerts = $http({ method: 'JSONP',
							 url: _url });
		return {
			getAll: function(){
				var deferred = $q.defer();
				deferred.resolve(alerts);
				return deferred.promise;
			},
			query: function( what ){
				var deferred = $q.defer();
				deferred.resolve(/* what */);
				return deferred.promise;
			},
			save: function(alert){
				// save data
				console.log("Saved current location: "+alert);
			}
		};
}]);