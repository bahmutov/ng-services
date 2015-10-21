;(function initNgServices() {
  
  function isAngularPresent() {
    return typeof angular === 'object';
  }

  function loadScript(url) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = url;
      s.onload = function onload() {
        resolve(url);
      };
      var x = document.getElementsByTagName('head')[0];
      x.appendChild(s);
    });
  }

  function angularCdn(version, minified) {
    var loadVersion = version ? version : '1.4.7';
    var base = 'https://ajax.googleapis.com/ajax/libs/angularjs/';
    var url = base + loadVersion;
    return minified ? url + '/angular.min.js' : url + '/angular.js';
  }

  function angularIsReady() {
    if (isAngularPresent()) {
      return Promise.resolve();
    }
    // TODO load Angular library
    var url = angularCdn();
    return loadScript(url);
  }

  var initialized = 
    angularIsReady()
      .then(function () {
        console.log('has angular', angular.version.full);
      });
  
  function ngService(options) {
    console.log('starting ng service', options);
  }

  function ngServices(options) {
    return initialized
      .then(function () {
        return ngService(options);
      });
  }

  // register ngServices in the environment(s)
  if (typeof window === 'object') {
    window.ngServices = ngServices;
  }
  if (typeof module === 'object') {
    module.exports = ngServices;
  }

}());