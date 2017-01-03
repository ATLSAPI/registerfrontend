'use strict';

/**
 * @ngdoc function
 * @name backendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the backendApp
 */
angular.module('backendApp')
  .controller('ListCtrl', ListCtrl);


function ListCtrl(appSettings, userService, firebaseService, dateService) {
    var vm = this;

    init();

    function init() {
        var firebase = firebaseService.initialize(appSettings.firebase.entityKey);
        firebase.$loaded()
            .then(function (list) {
                firebaseService.findKey('dayId', dateService.getUtcDayId(), list)
                    .then(function (data) {
                        vm.userList = [];

                        for (var ref in data) {
                            if (data.hasOwnProperty(ref)) {
                                var user = data[ref];
                                var indexOf = vm.userList.map(function(value) { return value.userId; }).indexOf(user.userId);

                                if (indexOf > 0) {
                                    vm.userList[indexOf].hits += 1;
                                } else {
                                    var userFb = firebaseService.initialize(appSettings.firebase.usersKey);
                                    userFb.$loaded()
                                        .then(function (userList) {
                                            var id = user.userId + '|' + user.deviceId;
                                            userFb.findKey('userId', id, userList)
                                                .then(function (userObj) {
                                                    user.firstName = userObj.firstName;
                                                    user.surname = userObj.surname;
                                                    user.hits = 1;

                                                    vm.userList.push(user);
                                                });
                                        });
                                }
                            }
                        }
                        // TODO Sort by first checkin
                        //vm.userList.sort
                        vm.json = JSON.stringify(vm.userList);
                    });
            });
    }
}