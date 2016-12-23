'use strict';

/**
 * @ngdoc service
 * @name backendApp.userService
 * @description
 * # userService
 * Service in the backendApp.
 */
angular.module('backendApp')
  .service('userService', function(appSettings, dateService, firebaseService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};
    var users = [];

    service.createOrUpdateUser = createOrUpdateUser;

    return service;

    function createOrUpdateUser(user) {
      var userId = user.userId + '|' + user.deviceId;
      var newUser = {
        userId: userId,
        createdAt: dateService.getUtcNow()
      };


      var users = firebaseService.initialize(appSettings.firebase.usersKey);
      users.$loaded()
        .then(function(data) {
          users = data;
          firebaseService.findKey('userId', newUser.userId, data)
            .then(function(user) {
              console.log(user);
            })
            .catch(function() {
              firebaseService.create(newUser, users);
            });
        });
    }

  });
