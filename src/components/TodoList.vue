<template>
  <div>
      <ul>
          <li v-for="(todo, index) in todoList" v-bind:key="todo.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todo.completed}" v-on:click="toggleComplete(todo, index)"></i>
              <span v-bind:class="{textCompleted: todo.completed}">{{ todo.item }}</span>
              <span class="removeBtn" v-on:click="removeTodo(todo, index)">
                  <i class="fas fa-trash-alt"></i>
              </span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            todoList: []
        }
    },
    methods: {
        removeTodo: function(todo, index)
        {
            localStorage.removeItem(todo);
            this.todoList.splice(index, 1);
        },
        toggleComplete: function(todo, index)
        {
            todo.completed = !todo.completed;
            localStorage.removeItem(todo.item);
            localStorage.setItem(todo.item, JSON.stringify(todo));
        }
    },
    created: function() {
        if (localStorage.length > 0)
        {
            for (var i = 0; i < localStorage.length; i++)
            {
                if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue;

                this.todoList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.removeBtn {
    margin-left: auto;
    color: #de4343;
}
.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}
.checkBtnCompleted {
    color: #b3adad;
}
.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>