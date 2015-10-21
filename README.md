# ng-services

> Angular data services for apps that don't want Angular

Loads list of Angular services from a bundle to run inside another framework.
For example, let us load an async addition service that we have implemented in
Angular from some other application

```html
<!-- if Angular is not loaded, it will be automatically -->
<script src="ng-services.js"></script>
```

```js
// ng-async-addition.js
angular.module('AsyncCalculator', [])
  .service('AsyncAddition', function ($q) {
    return function addition(a, b) {
      return $q.when(a + b);
    }
  });
```

```js
// your application code
ngServices({
  src: 'ng-async-addition.js',
  module: 'AsyncCalculator'
}).then(function (AsyncAddition) {
  AsyncAddition(2, 3)
    .then(function (sum) {
      console.log('async 2 + 3 =', sum);
    });
});
```

You can list services to be injected explicitly to avoid minification problems

```j
ngServices({
  src: 'ng-async-addition.js',
  module: 'AsyncCalculator',
  inject: ['AsyncAddition']
}).then(function (injected) {
  injected.AsyncAddition(2, 3)
    .then(function (sum) {
      console.log('async 2 + 3 =', sum);
    });
});
```

## Examples

* [single injected value](examples/single-value/index.html)
* [async service using $q](examples/async-value/index.html)
* [multiple services at once](examples/multiple-services/index.html)
* [rendering using virtual-dom](examples/use-from-virtual-dom/index.html)
* [dependency names shortcut](examples/inject-shortcut/index.html)

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/ng-services/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.