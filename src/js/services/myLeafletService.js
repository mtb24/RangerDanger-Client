angular.module(_SERVICES_)
	.factory('myLeaflet', ['leaflet', 'Utilities', function(leaflet, Utilities){
/*



 */

		var location = new Array();
		location.push(
			Utilities.getStorageItem('current_location').lat,
			Utilities.getStorageItem('current_location').lng );

		var map = L.map('map', {
			crs: L.CRS.Simple,
		})
		.setView(
			[0, 0], /* lat/lng */
			    0   /* zoom */ )
		.locate({
			watch: true,
			setView: false,
			timeout: 10000, /* milliseconds */
			maximumAge: 5000, /* milliseconds */
			enableHighAccuracy: false/* Maximum age of detected location. If less than this amount of milliseconds passed since last geolocation response, locate will return a cached location.*/
		});

		map.on('locationerror', function(e){
			console.log("Map "+ e.type +" error: "+e.message);
			/* resort to cached location */
			map.setView( location );
			console.log("Using cache for map location");
		});

		L.circle([
			location, /* geo location */
			2000, /* radius in meters */
			{
				stroke: true,
				color: "#03f",
				weight: 5,
				opacity: 0.5,
				fill: false, /* fill color on? */
				fillColor: '#03f',
				fillOpacity: 0.2,
				className: '' /* add custom classname */

			}
		]).addTo(map);


		L.marker([-200, -200]).addTo(map);
		L.marker([200, -200]).addTo(map);
		L.marker([200, 200]).addTo(map);
		L.marker([-200, 200]).addTo(map);

		L.marker([0, 0]).addTo(map);

		L.imageOverlay('http://leafletjs.com/docs/images/logo.png', [[0, 0], [73, 220]]).addTo(map);
	}]);