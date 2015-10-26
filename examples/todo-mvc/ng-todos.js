angular.module('Todos', [])
  .constant('uuid', function () {
    // from http://jsfiddle.net/briguy37/2mvfd/
    var d = new Date().getTime();
    var uuidFormat = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    var uuid = uuidFormat.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  })
  .service('LocalStorage', function () {
    return {
      get: function get(name) {
        return JSON.parse(localStorage.getItem(name))
      },
      set: function set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
      }
    };
  })
  .factory('Todos', function (uuid, LocalStorage) {
    var initialTodos = LocalStorage.get('todos');

    function isFirstLoad() {
      return !initialTodos;
    }

    var Todos = {
      all: initialTodos || [],
      add: function add(what) {
        this.all.push({
          what: what,
          done: false,
          id: uuid()
        });
        LocalStorage.set('todos', this.all);
      },
      filter: function filter(cb) {
        this.all = this.all.filter(cb);
        LocalStorage.set('todos', this.all);
      },
      remove: function remove(todo) {
        this.filter(function (t) {
          return t !== todo;
        });
      },
      mark: function mark(id, isDone) {
        function specific(todo) {
          return todo.id === id;
        }
        function any() { return true; }
        var markAll = arguments.length === 1;
        var whichTodos = markAll ? any : specific;
        var done = markAll ? id : isDone;
        this.all.filter(whichTodos).forEach(function (todo) {
          todo.done = done;
        });
        LocalStorage.set('todos', this.all);
      }
    };

    if (isFirstLoad()) {
      Todos.add('learn Italian');
      Todos.add('clean my room');
    }

    return Todos;
  })
  .factory('TodosExtras', function (Todos) {
    var extras = Object.create(Todos);

    // add a couple of utility methods
    extras.countRemaining = function countRemaining() {
      return this.all.reduce(function (sum, todo) {
        return sum + (todo.done ? 0 : 1);
      }, 0);
    };

    extras.clearCompleted = function clearCompleted() {
      this.filter(function (todo) {
        return !todo.done;
      });
    };

    extras.hasCompleted = function hasCompleted() {
      return this.all.some(function (todo) {
        return todo.done;
      });
    };

    return extras;
  });
