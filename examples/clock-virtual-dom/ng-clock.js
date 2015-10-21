angular.module('Clock', [])
  .service('Clock', function ($interval, $rootScope, $filter) {
    var date = $filter('date');
    $interval(function () {
      $rootScope.$emit('tick', date(new Date(), 'mediumTime'));
    }, 1000);
    return $rootScope;
  });
