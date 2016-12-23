'use strict';

/**
 * @ngdoc service
 * @name backendApp.dateService
 * @description
 * # dateService
 * Service in the backendApp.
 */
angular.module('backendApp')
  .service('dateService', function() {
    var service = {};

    var now = moment().utc(); // jshint ignore: line

    service.getUtcNow = getUtcNow;
    service.getUtcDayId = getUtcDayId;

    return service;

    function getUtcNow() {
      return now.utc().format();
    }

    function getUtcDayId() {
      var dayOfYear = now.dayOfYear();
      var year = now.year();
      return dayOfYear + '' + year;
    }
  });
