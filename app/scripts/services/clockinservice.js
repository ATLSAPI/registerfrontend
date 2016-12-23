'use strict';

/**
 * @ngdoc service
 * @name backendApp.clockInService
 * @description
 * # clockInService
 * Service in the backendApp.
 */
angular.module('backendApp')
  .service('clockInService', function(appSettings, firebaseService, contentService, userService) {

    var service = {
      processAction: processAction
    };

    return service;

    function processAction(data) {
      return contentService.parse(data)
        .then(save);
    }

    function save(action) {
      var clockins = firebaseService.initialize(appSettings.firebase.entityKey);
      return firebaseService.create(action, clockins)
        .then(function(id) {
          //alert(id);
        })
        .then(function () {
          userService.createOrUpdateUser(action);
        });
    }


  });
