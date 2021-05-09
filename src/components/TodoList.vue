<template>
  <div>
      <transition-group name="list" tag="ul">
          <li v-for="(todo, index) in this.getTodoList" v-bind:key="todo.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todo.completed}" v-on:click="toggleComplete({todo, index})"></i>
              <span v-bind:class="{textCompleted: todo.completed}">{{ todo.item }}</span>
              <span class="removeBtn" v-on:click="removeTodo({todo, index})">
                  <i class="fas fa-trash-alt"></i>
              </span>
          </li>
      </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({
            removeTodo: 'removeOneTodo', // 인자를 넘기고 있음 (removeOneTodo{todoItem, index})
            toggleComplete: 'toggleOneTodo'
        })
    },
    computed: {
        ...mapGetters(['getTodoList'])
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

/* list transition eff */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>