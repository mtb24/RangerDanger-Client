/*
 * config/router.js
 *
 * Defines the routes for the application.
 *
 */
angular.module(_APP_).config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

      /* HTML5 mode on */
      //$locationProvider.html5Mode(true);

      .state("tabs", {
        url: "/tab",
        abstract: true
        //templateUrl: "tabs.html"
      })

      .state("home", {
        url: "/home",
        views: {
          'home-tab': {
            templateUrl: "html/partials/home/home.html",
            controller:  'homeController'
          }
        }
      })


      .state('map', {
        url: "/map",
        views: {
          'map-tab': {
            templateUrl: "html/partials/map/map.html",
            controller:  'mapController'
          }
        }
      })

      .state('preferences', {
        url: "/preferences",
        views: {
          'preferences-tab': {
            templateUrl: "html/partials/preferences/preferences.html",
            controller:  'prefController'
          }
        }
      });

      /* Default Route */
      $urlRouterProvider.otherwise("/home");



  }
]);
