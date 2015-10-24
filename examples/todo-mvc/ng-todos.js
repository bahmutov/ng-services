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
  .service('Todos', function (uuid) {
    return {
      all: [],
      add: function (what) {
        this.all.push({
          what: what,
          done: false,
          id: uuid()
        });
      },
      mark: function (id, isDone) {
        this.all.forEach(function (todo) {
          if (todo.id === id) {
            todo.done = isDone;
          }
        });
      }
    };
  })
  .service('TodosExtras', function (Todos) {
    var extras = Object.create(Todos);

    // add a couple of utility methods
    extras.countRemaining = function countRemaining() {
      return Todos.all.reduce(function (sum, todo) {
        return sum + (todo.done ? 0 : 1);
      }, 0);
    };

    extras.clearCompleted = function clearCompleted() {
      Todos.all = Todos.all.filter(function (todo) {
        return !todo.done;
      });
    };

    return extras;
  });