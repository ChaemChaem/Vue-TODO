<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodo" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
        <i class="far fa-plus-square addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            newTodo: ""
        }
    },
    methods: {
        addTodo: function() {
            if (this.newTodo !== '') {
                var obj = { completed: false, item: this.newTodo };
                localStorage.setItem(this.newTodo, JSON.stringify(obj));
                this.clearInput();
            }
        },
        clearInput: function() {
            this.newTodo = '';
        }
    }
}
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
</style>