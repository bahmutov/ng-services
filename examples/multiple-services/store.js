angular.module('Store', [])
  .service('Store', function () {
    var value;
    return {
      get: function () { return value; },
      set: function (val) { value = val; }
    };
  });
