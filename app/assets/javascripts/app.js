document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [],
      newTaskName: "",
      newTaskDescription: ""
    },
    mounted: function() {
      $.get("/api/v1/tasks.json", function(result) {
        this.tasks = result;
      }.bind(this))
    },
    methods: {
      addTask: function() {
        var params = {
          name: this.newTaskName,
          description: this.newTaskDescription
        };
        $.post("/api/v1/tasks.json", params, function(result) {
          this.tasks.push(result);
          this.newTaskName = '';
          this.newTaskDescription = '';
        }.bind(this));
      },
      deleteTask: function(inputTask) {
        var index = this.tasks.indexOf(inputTask);
        this.tasks.splice(index, 1);
      },
      markComplete: function(inputTask) {
        inputTask.complete = true
      }
    }
  });
});
