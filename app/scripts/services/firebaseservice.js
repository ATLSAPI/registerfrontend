'use strict';

/**
 * @ngdoc service
 * @name backendApp.firebaseService
 * @description
 * # firebaseService
 * Service in the backendApp.
 */
angular.module('backendApp')
  .service('firebaseService', function(appSettings, $q, $firebaseArray) {
    var objectArray = [];
    var service = {};

    service.initialize = initialize;
    service.getAll = getAll;
    service.create = create;
    service.getById = getById;
    service.findDevice = findDevice;
    service.findKey = findKey;

    return service;

    function initialize(objectName) {
      return getDataArray(objectName);
    }

    function getAll(objectName) {
      return objectArray;
    }

    function getById(id, array) {
      return array.$getRecord(id);
    }

    function create(object, array) {
      return array.$add(object)
        .then(function(data) {
          return data.key;
        });
    }

    function update(object, array) {
      return array.$save(object);
    }

    function getDataArray(objectName) {
      var ref = firebase.database().ref().child(objectName); //jshint ignore:line
      return $firebaseArray(ref);
    }

    function findDevice(array, deviceId) {
      var deferred = $q.defer();
      array.$ref().orderByChild("deviceId").equalTo(deviceId)
        .once("value", function(dataSnapshot) {
          var clockin = dataSnapshot.val();
          if (clockin) {
            deferred.resolve(clockin);
          } else {
            deferred.reject(false);
          }
        });

      return deferred.promise;
    }

    function findKey(key, value, array) {
      var deferred = $q.defer();
      array.$ref().orderByChild(key).equalTo(value)
        .once("value", function(dataSnapshot) {
          var objectFound = dataSnapshot.val();
          if (objectFound) {
            deferred.resolve(objectFound);
          } else {
            deferred.reject(false);
          }
        });

      return deferred.promise;
    }
  });
