module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      '../../node_modules/lazy-ass/index.js',
      '../../node_modules/check-more-types/check-more-types.js',
      '../../node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/ng-describe/dist/ng-describe.js',
      'ng-*.js'
    ],
    port: 9876,
    browsers: ['Chrome'],
    singleRun: true
  });
};