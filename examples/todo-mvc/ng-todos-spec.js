ngDescribe({
  name: 'local storage wrapper',
  module: 'Todos',
  inject: 'LocalStorage',
  tests: function (deps) {
    it('is an object', function () {
      la(check.object(deps.LocalStorage));
    });
  }
});

ngDescribe({
  name: 'Todos list',
  module: 'Todos',
  inject: 'Todos',
  tests: function (deps) {
    it('is injected', function () {
      la(check.object(deps.Todos), 'object Todos injected');
    });

    it('has list of todo items', function () {
      la(check.array(deps.Todos.all));
    });

    it('adds one item', function () {
      la(check.empty(deps.Todos.all));
      deps.Todos.add('foo');
      la(deps.Todos.all.length === 1);
    });

    it('sets new items to incomplete', function () {
      deps.Todos.add('foo');
      la(!deps.Todos.all[0].done);
    });
  }
});
