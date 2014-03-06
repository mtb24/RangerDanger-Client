angular.module('rangerdanger.alert.directives', [])

.directive('map', function($timeout) {

	return {
		restrict: 'E',
		template: '<leaflet id="alertmap" center="center" width="640" height="400"></leaflet>',
		link: function(scope, element, attr) {
			console.log('Map compiling');
			return function($scope, $element, $attr) {

				// delay so we are in the DOM and can calculate size
				$timeout(function() {
					var windowHeight = window.innerHeight;
					var thisHeight = $element[0].offsetHeight;
					var headerHeight = document.querySelector('#header').offsetHeight;
					$element[0].style.paddingTop = (windowHeight - thisHeight) + 'px';
					angular.element(document.querySelector('.content')).css('-webkit-overflow-scrolling', 'auto');
					$timeout(function() {
						angular.element(document.querySelector('.content')).css('-webkit-overflow-scrolling', 'touch');
					}, 50);
				});
				//var map = L.mapbox.map('alertmap', 'mtb24.h644ggpj')
				//                  .setView([$scope.lat, $scope.lng], 6);
				//$scope.map = map;
			}
		}
	};
})
;