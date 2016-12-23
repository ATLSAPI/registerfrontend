'use strict';

/**
 * @ngdoc function
 * @name backendApp.constant:appSettings
 * @description
 * # appSettings
 * Constant of the backendApp
 */
angular.module('backendApp')
  .constant('appSettings', {
    firebase: {
      apiKey: "AIzaSyAuDjUfXcS056IJnyP6qyqSbCFADEE6IWw",
      authDomain: "intechnica-register.firebaseapp.com",
      databaseURL: "https://intechnica-register.firebaseio.com",
      storageBucket: "intechnica-register.appspot.com",
      messagingSenderId: "783060087254",
      entityKey: "clockins",
      usersKey: "users"
    }
  });
