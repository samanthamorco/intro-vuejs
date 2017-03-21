document.addEventListener("DOMContentLoaded", function(event) { 
  var data = {tasks: [],
              newTaskName: "",
              newTaskDescription: "",
              errors: [],
              nameFilter: "",
              descriptionFilter: "",
              orderAttribute: "name",
              orderAscending: true,
              hover: "You loaded this page on " + new Date()
             }
  var app = new Vue({
    el: '#app',
    data: data,
    mounted: function() {
      $.get("/api/v1/tasks.json", function(result) {
        this.tasks = result;
      }.bind(this))
    },
    methods: {
      addTask: function() {
        this.errors = [];
        var params = {
          name: this.newTaskName,
          description: this.newTaskDescription
        };
        $.post('/api/v1/tasks.json', params, function(result) {
          this.tasks.push(result);
          this.newTaskName = '';
          this.newTaskDescription = '';
        }.bind(this)).fail(function(response) {
          this.errors = response.responseJSON.errors;
        }.bind(this));
      },
      deleteTask: function(inputTask) {
        var index = this.tasks.indexOf(inputTask);
        this.tasks.splice(index, 1);
      },
      markComplete: function(inputTask) {
        inputTask.complete = true
      },
      setOrderAttribute: function(inputAttribute) {
        if (inputAttribute !== this.orderAttribute) {
          this.orderAscending = true;
        } else {
          this.orderAscending = !this.orderAscending;
        }
        this.orderAttribute = inputAttribute;
      }
    },
    computed: {
      filteredTasks: function() {
        var filtered = this.tasks.filter(function(task) {
          return task.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1 && task.description.toLowerCase().indexOf(this.descriptionFilter.toLowerCase()) !== -1;
        }.bind(this));
        var sorted = filtered.sort(function(a, b) {
          if (this.orderAscending) {
            return a[this.orderAttribute] > b[this.orderAttribute]
          } else {
          return a[this.orderAttribute] < b[this.orderAttribute]
          }
        }.bind(this));
        return filtered;
      }
    }
  });

  Vue.component('todo-item', {
    props: ["todo"],
    template: '<li>{{ todo.description }}</li>'
  })
});
