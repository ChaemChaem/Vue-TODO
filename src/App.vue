<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoEvent="addOneTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoList"
              v-on:removeTodoEvent="removeOneTodo"
              v-on:toggleTodoEvent="toggleOneTodo"></TodoList>
    <TodoFooter v-on:clearAllEvent="clearAllTodo"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
      return {
          todoList: []
      }
  },
  methods: {
    addOneTodo: function(todo) {
      var obj = { completed: false, item: todo };
      localStorage.setItem(todo, JSON.stringify(obj));
      this.todoList.push(obj);
    },
    removeOneTodo: function(todo, index) {
      localStorage.removeItem(todo.item);
      this.todoList.splice(index, 1);
    },
    toggleOneTodo: function(todo, index) {
      //todo.completed = !todo.completed;
      // 위와 동일하나, 위는 아래로 왔다 갔다온 데이터로 갱신 / 아래는 곧바로 현재 todoList 갱신
      this.todoList[index].completed = !this.todoList[index].completed;
      
      localStorage.removeItem(todo.item);
      localStorage.setItem(todo.item, JSON.stringify(todo));
    },
    clearAllTodo: function() {
      localStorage.clear();
      this.todoList = [];
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
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
