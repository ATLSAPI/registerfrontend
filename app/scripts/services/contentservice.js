'use strict';
// global: moment
/**
 * @ngdoc service
 * @name backendApp.contentService
 * @description
 * # contentService
 * Service in the backendApp.
 */
angular.module('backendApp')
  .service('contentService', function($q) {
    var service = {};

    service.parse = parse;

    return service;

    function parse(data) {
      var now = moment(); // jshint ignore: line
      var utcNow = now.utc().format();
      var dayId = now.dayOfYear() + '' + now.year();
      var dataArray = getDataArray(data);
      var action = {
        timestamp: utcNow,
        dayId : dayId
      };

      action.userId = dataArray[0];
      action.deviceId = dataArray[1];
      action.uuid = action.userId + '|' + action.deviceId;

      return $q.resolve(action);
    }

    function getDataArray(data) {
      return data.split('|');
    }
  });
