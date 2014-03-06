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

    /* Bootstrap angular on an element in the body, not the document */
    angular.bootstrap(window.document.getElementById("container"), [_APP_]);

    /* Set device info in LocalStorage */
    /*Utilities.setStorageItem('device', {
      'cordova': device.cordova,
      'model': device.model,
      'platform': device.platform,
      'uuid': device.uuid,
      'os_version': device.version
    });*/
    //console.log(device.platform);

    // The `offline` event fires when a previously connected device loses a network connection
    // so that an application can no longer access the Internet
    //window.addEventListener("offline", Utilities.onOffline, false);
    //console.log("window.addEventListener('offLine') added");

    // The `online` event fires when a previously unconnected device receives
    // a network connection to allow an application access to the Internet.
    //window.addEventListener("online", Utilities.onOnline, false);
    //console.log("window.addEventListener('onLine') added");

    // set localstorage listener
    //window.addEventListener("storage", Utilities.handle_storage, false);
    //console.log("window.addEventListener('storage') added");

  }
};

