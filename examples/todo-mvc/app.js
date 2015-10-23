(function app() {
  'use strict';

  var h = virtualDom.h;

  function renderHeader() {
    return h('header', {className: 'header'}, [
      h('h1',{}, ['todos']),
      h('input', {
        className: 'new-todo', 
        placeholder: 'What needs to be done?',
        autofocus: true
      }, [])
    ]);
  }

  function renderToggleAndTodos(todos) {
    todos = todos || [];
    
    function toDom(todo) {
      return h('li', [
        h('div', {className: 'view'}, [
          h('input', {className: 'toggle', type: 'checkbox'}),
          h('label', todo.what)
        ])
      ]);
    }

    return h('section', {className: 'main'}, [
      h('input', {className: 'toggle-all', type: 'checkbox'}, []),
      h('label', {htmlFor: 'toggle-all'}, ['Mark all as complete']),
      h('ul', {className: 'todo-list'}, todos.map(toDom))
    ]);
  }

  function renderFooter() {
    return h('footer', {className: 'footer'}, [
      h('span', {className: 'todo-count'}),
      h('ul', {className: 'filters'}, [
        h('li', [
          h('a', {className: 'selected', href: '#/'}, 'All')
        ]),
        h('li', [
          h('a', {href: '#/active'}, 'Active')
        ]),
        h('li', [
          h('a', {href: '#/completed'}, 'Completed')
        ])
      ]),
      h('button', {className: 'clear-completed'}, 'Clear completed')
    ]);
  }

  function render(todos) {
    la(check.maybe.array(todos), 'missing list of todos to render', todos);
    return h('section', {className: 'todoapp'}, [
      renderHeader(),
      renderToggleAndTodos(todos),
      renderFooter()
    ]);
  }

  function initRender() {
    var view, rootNode;

    view = render();
    rootNode = virtualDom.create(view);
    document.querySelector('#app').appendChild(rootNode);

    function renderApp(todos) {
      var newView = render(todos);
      var patches = virtualDom.diff(view, newView);
      rootNode = virtualDom.patch(rootNode, patches);
      view = newView;
    }

    return renderApp;
  }

  var renderApp = initRender();
  ngServices({
    src: 'ng-todos.js',
    module: 'Todos',
  }).then(function (Todos) {
    renderApp(Todos.all);
    Todos.add('learn Italian');
    renderApp(Todos.all);
  });

}());