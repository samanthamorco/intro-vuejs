document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [
      { 
        name: 'Exercise',
        difficulty: 10,
        complete: false 
      },
      { 
        name: 'Learn Vue.js',
        difficulty: 7,
        complete: false 
      },
      { 
        name: 'bad things',
        difficulty: 1,
        complete: true 
      },
      { 
        name: 'Good things',
        difficulty: 2,
        complete: false 
      }
      ],
      newTask: ""
    },
    methods: {
      addTask: function() {
        if (this.newTask) {
          this.tasks.push({ name: this.newTask, difficulty:1, complete: false });
          this.newTask = "";
        }
      },
      deleteTask: function(inputTask) {
        var index = this.tasks.indexOf(inputTask);
        this.tasks.splice(index, 1);
      },
      markComplete: function(inputTask) {
        inputTask.complete = true
      }
      // isPositive: function(inputTask) {
      //   return inputTask.indexOf('bad') === -1;
      // }
    }
  });
});
