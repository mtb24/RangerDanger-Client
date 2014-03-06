/**
*  Module
*
* Description
*/
var base = angular.module('myFirebaseService', ['Firebase']);

base.factory('alertService', function alertService($firebase){
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