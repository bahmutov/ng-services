angular.module('AsyncCalculator', [])
  .service('AsyncAddition', function ($q) {
    return function addition(a, b) {
      return $q.when(a + b);
    }
  });
