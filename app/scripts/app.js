'use strict';

/**
 * @ngdoc overview
 * @name backendApp
 * @description
 * # backendApp
 *
 * Main module of the application.
 */
angular
  .module('backendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'qrScanner'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $timeout, appSettings, firebase) {
    firebase.initializeApp(appSettings.firebase);
  });
