angular.module('DelayedCalculator', [])
  .service('DelayedAddition', function ($timeout) {
    return function addition(a, b) {
      return $timeout(function () {
        return a + b;
      }, 1000);
    }
  });
