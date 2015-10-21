angular.module('Clock', [])
  .service('Clock', function ($interval, $rootScope) {
    $interval(function () {
      $rootScope.$emit('tick', (new Date()).toLocaleTimeString());
    }, 1000);
    return $rootScope;
  });
