'use strict';

/**
 * @ngdoc function
 * @name backendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendApp
 */
angular.module('backendApp')
  .controller('MainCtrl', function($timeout, appSettings, clockInService, userService, firebaseService) {

    var vm = this;
    var shouldProcess = true;
    vm.success = false;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // load();




    // function load() {
    //   var list = firebaseService.initialize(appSettings.firebase.entityKey);
    //   list.$loaded()
    //     .then(function(data) {
    //       firebaseService.findDevice(data, '27194')
    //         .then(function(blob) {
    //           console.log(blob);
    //         });
    //     });
    //
    //   list.$watch(function(event) {
    //     console.log(event);
    //   });
    // }


    vm.onSuccess = function(data) {
      console.log(data);
      vm.message = "Signed In Successfully";


      if (shouldProcess) {
        shouldProcess = false;
        clockInService.processAction(data)
          .then(function() {
            vm.success = true;
            console.log('done');
            $timeout(function() {
              vm.success = false;
              shouldProcess = true;
            }, 2000);
          });
      }
    };

    vm.onError = function(error) {
      // console.log(error);
    };
    vm.onVideoError = function(error) {
      // console.log(error);
    };
  });
