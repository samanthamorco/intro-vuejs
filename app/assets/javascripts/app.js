document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [],
      newTaskName: "",
      newTaskDescription: "",
      errors: [],
      nameFilter: ""
    },
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
      }
    },
    computed: {
      filteredTasks: function() {
        var filtered = this.tasks.filter(function(task) {
          return task.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
        }.bind(this));
        return filtered;
      }
    }
  });
});
