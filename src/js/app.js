// some globals.
var _APP_         = 'rangerdanger'
  , _CONTROLLERS_ = _APP_ + '.controllers'
  , _DIRECTIVES_  = _APP_ + '.directives'
  , _FILTERS_     = _APP_ + '.filters'
  , _MODULES_     = _APP_ + '.modules'
  , _SERVICES_    = _APP_ + '.services';

// top-level module
angular.module(_APP_, [
  // Your application's namespaced modules
   // so they won't conflict with other
   // modules. You shouldn't have to touch
   // these unless you want to.
  _CONTROLLERS_,
  _DIRECTIVES_,
  _FILTERS_,
  _MODULES_,
  _SERVICES_,


  // add additional modules here, such as ngAnimate
  // ngTouch, ngResource, or your own custom modules.
  // ngTouch and ngRoute are included here by default
  // installed via Bower. Don't forget to add the module
  // to your Gruntfile's bower components if you want
  // to use it!
  'ui.router',
  'ngTouch',
  'ngSanitize',
  'ngAnimate',
  'ngResource',
  'ionic',
  'ionic.service.platform',
  'ionic.ui.content',
  'ionic.ui.list',
  'ionic.service.loading',
  'leaflet-directive'
  //'angularLocalStorage',
  //'btford.socket-io',
  //'ngSails',

]);

angular.module(_APP_).run([
  '$rootScope', 'Geolocation', 'Utilities',
  function($rootScope, Geolocation, Utilities) {


    /*
       Get Location
    */
   Geolocation.watchLocation().then(
    function(position){
        Utilities.setStorageItem('current_location', {
            'updated': new Date().getTime(),
            'lat':position.coords.latitude,
            'lng':position.coords.longitude
        });
        $rootScope.current_location = Utilities.getStorageItem('current_location');
        console.log(Utilities.getStorageItem('current_location'));
     },
     function(err){
      console.log("Geolocation error: "+err);
     });

    /*
       If settings have been customized, use them. Otherwise use defaults.
       Settings are not persisted until changed from default.
    */
    var settings = Utilities.getStorageItem('settings') || {
        'alert_on': 'On',
        'alert_distance': 3,
        'alert_freshness': 60
    };
    $rootScope.settings = settings;
    console.log("Settings loaded");

    /* Get alert data from service and store in localstorage */


  }
]);






// Create global modules. You shouldn't have to
// touch these.
angular.module(_CONTROLLERS_, []);
angular.module(_DIRECTIVES_, []);
angular.module(_FILTERS_, []);
angular.module(_MODULES_, []);
angular.module(_SERVICES_, []);
