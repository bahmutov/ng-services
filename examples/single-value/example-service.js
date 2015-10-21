angular.module('ExampleService', [])
  .value('Addition', function addition(a, b) {
    return a + b;
  });