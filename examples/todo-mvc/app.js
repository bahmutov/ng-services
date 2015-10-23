(function app() {
  'use strict';

  var h = virtualDom.h; // to save characters
  var renderApp; // will be initialized later

  function renderHeader(Todos) {
    function isEnter(e) {
      return e.keyCode === 13;
    }
    function onKey(e) {
      if (isEnter(e)) {
        Todos.add(e.target.value);
        e.target.value = '';
        renderApp();
      }
    }

    return h('header', {className: 'header'}, [
      h('h1',{}, 'todos'),
      h('input', {
        className: 'new-todo', 
        placeholder: 'What needs to be done?',
        autofocus: true,
        onkeyup: onKey
      }, [])
    ]);
  }

  function hashFragment() {
    return window.location.hash.split('/')[1];
  }

  function filterAll(todo) {
    return todo;
  }

  function filterCompleted(todo) {
    return todo.done;
  }

  function filterActive(todo) {
    return !todo.done;
  }

  function pickTodosToShow(items) {
    la(check.array(items), 'invalid todo items', items);
    var filters = {
      active: filterActive,
      completed: filterCompleted
    };
    var route = hashFragment();
    var filter = filters[route] || filterAll;
    return items.filter(filter);
  }

  function renderToggleAndTodos(Todos) {
    var items = Todos ? Todos.all : [];
    var filtered = pickTodosToShow(items);

    function toDom(todo) {
      return h('li', {className: todo.done ? 'completed' : '', key: todo.id}, [
        h('div', {className: 'view'}, [
          h('input', {
            className: 'toggle', 
            type: 'checkbox', 
            checked: todo.done,
            onchange: function (e) {
              Todos.mark(todo.id, e.target.checked);
              renderApp();
            }
          }),
          h('label', todo.what)
        ])
      ]);
    }

    return h('section', {className: 'main'}, [
      h('input', {className: 'toggle-all', type: 'checkbox'}),
      h('label', {htmlFor: 'toggle-all'}, 'Mark all as complete'),
      h('ul', {className: 'todo-list'}, filtered.map(toDom))
    ]);
  }

  function renderFooter(todos) {
    var remaining = todos ? todos.countRemaining() : 0;
    var route = hashFragment();

    return h('footer', {className: 'footer'}, [
      h('span', {className: 'todo-count'}, [
        h('strong', {}, String(remaining)),
        ' items left'
      ]),
      h('ul', {className: 'filters'}, [
        h('li', [
          h('a', {
            className: route === '' ? 'selected' : '', 
            href: '#/'
          }, 'All')
        ]),
        h('li', [
          h('a', {
            className: route === 'active' ? 'selected' : '',
            href: '#/active'
          }, 'Active')
        ]),
        h('li', [
          h('a', {
            className: route === 'completed' ? 'selected' : '',
            href: '#/completed'
          }, 'Completed')
        ])
      ]),
      h('button', {
        className: 'clear-completed',
        onclick: function () {
          todos && todos.clearCompleted();
          renderApp();
        }
      }, 'Clear completed')
    ]);
  }

  function render(todos) {
    return h('section', {className: 'todoapp'}, [
      renderHeader(todos),
      renderToggleAndTodos(todos),
      renderFooter(todos)
    ]);
  }

  function initRender() {
    var view = render();
    var rootNode = virtualDom.create(view);
    document.querySelector('#app').appendChild(rootNode);

    function renderApp(Todos) {
      var newView = render(Todos);
      var patches = virtualDom.diff(view, newView);
      rootNode = virtualDom.patch(rootNode, patches);
      view = newView;
    }

    return renderApp;
  }

  ngServices({
    src: 'ng-todos.js',
    module: 'Todos',
  }).then(function (TodosExtras) {
    renderApp = initRender().bind(null, TodosExtras);

    window.addEventListener('hashchange', renderApp);

    TodosExtras.add('learn Italian');
    TodosExtras.add('clean my room');
    renderApp();
  });

}());