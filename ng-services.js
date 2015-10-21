;(function initNgServices() {
  
  function isAngularPresent() {
    return typeof angular === 'object';
  }

  function addFakeElement() {
    var node = document.createElement('div');
    document.body.appendChild(node);
    return node;
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
  
  function hasListedInjections(options) {
    return options &&
      (options.inject || options.services);
  }

  function ngService(options) {
    console.log('starting ng service', options);
    var url = options.src || 
      options.url || 
      options.href || 
      options.script;

    var modules = options.modules || options.module;
    if (typeof modules === 'string') {
      modules = [modules];
    }

    function bootstrapAngular() {
      console.log('bootstrapping injector for', modules);
      var node = addFakeElement();
      var $injector = angular.bootstrap(node, modules);
      return $injector;
    }

    var inject = options.inject || options.services;
    if (typeof inject === 'string') {
      inject = [inject];
    }
    function returnInjected($injector) {
      var injected = {};
      inject.forEach(function (name) {
        injected[name] = $injector.get(name);
      });
      return injected;
    }

    var servicer = loadScript(url)
      .then(function (loadedUrl) {
        console.log('loaded service from', loadedUrl);
      })
      .then(bootstrapAngular);

    if (hasListedInjections(options)) {
      return servicer.then(returnInjected);
    }
    return servicer;
  }

  function ngServices(options) {
    var startNgService = 
      initialized.then(function () {
        return ngService(options);
      });

    if (hasListedInjections(options)) {
      return startNgService;
    } else {
      // fake promise where we can DI into `then(callback)`
      return {
        then: function (callback) {
          return startNgService.then(function ($injector) {
            return $injector.invoke(callback);
          });
        }
      };
    }
  }

  // register ngServices in the environment(s)
  if (typeof window === 'object') {
    window.ngServices = ngServices;
  }
  if (typeof module === 'object') {
    module.exports = ngServices;
  }

}());