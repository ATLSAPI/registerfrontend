'use strict';

/**
 * @ngdoc function
 * @name backendApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the backendApp
 */
angular.module('backendApp')
  .controller('RegisterCtrl', function(appSettings, firebaseService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var register = this;
    register.register = '';
    var clockins = firebaseService.initialize(appSettings.firebase.entityKey);

    activate();

    clockins.$watch(function(event) {
      activate();
    });

    function activate() {
      clockins.$loaded()
        .then(function(data) {
          register.register = JSON.stringify(data, null, "\t");
        });
    }
  });
