/* pg.js
 * This file is run from index.html, 
 * and is the intial phase in the run-cycle.
 * Use this file to do things before the
 * mobile device / PhoneGap's API methods
 * are ready to be used. It is also used to 
 * bootstrap angularjs.
 */

var pg = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {

      // bind deviceready callback for phonegap devices
      document.addEventListener('deviceready', this.onDeviceReady, true);

    } else {

      // running on desktop, just call device ready immediately
      this.onDeviceReady();

    }
  },
  onDeviceReady: function() {

    var _this = this;

    /*
       Device info
    */
    /*window.localStorage.setItem('device',
      '"cordova":' + device.cordova +
      ',"model":'  + device.model +
      ',"platform":' + device.platform +
      ',"uuid":' + device.uuid +
      ',"os_version":' + device.version
    );
    console.log(device.platform);*/

/*    window.addEventListener("offline", localStorage.setItem('connection', "{'status': 'Offline'}"), false);
    console.log("window.addEventListener('offLine') added");

    window.addEventListener("online", localStorage.setItem('connection', "{'status': 'Online'}"), false);
    console.log("window.addEventListener('onLine') added");
*/



    /* Bootstrap angular on an element in the body, not the document */
    angular.bootstrap(window.document.getElementById("container"), [_APP_]);


  }
};

