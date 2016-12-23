'use strict';

describe('Service: clockInService', function () {

  // load the service's module
  beforeEach(module('backendApp'));

  // instantiate service
  var clockInService;
  beforeEach(inject(function (_clockInService_) {
    clockInService = _clockInService_;
  }));

  it('should do something', function () {
    expect(!!clockInService).toBe(true);
  });

});
