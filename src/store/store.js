import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0)
        {
            for (let i = 0; i < localStorage.length; i++)
            {
                if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue;
    
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }

        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoList: storage.fetch()
    },
    getters: {
        getTodoList(state) {
            return state.todoList;
        }
    },
    mutations: {
        addOneTodo(state, todo) {
            const obj = { completed: false, item: todo };
            localStorage.setItem(todo, JSON.stringify(obj));
            state.todoList.push(obj);
        },
        removeOneTodo(state, payload) {
            localStorage.removeItem(payload.todo.item);
            state.todoList.splice(payload.index, 1);
        },
        toggleOneTodo(state, payload) {
            //todo.completed = !todo.completed;
            // 위와 동일하나, 위는 아래로 왔다 갔다온 데이터로 갱신 / 아래는 곧바로 현재 todoList 갱신
            state.todoList[payload.index].completed = !state.todoList[payload.index].completed;
            
            localStorage.removeItem(payload.todo.item);
            localStorage.setItem(payload.todo.item, JSON.stringify(payload.todo));
        },
        clearAllTodo(state) {
            localStorage.clear();
            state.todoList = [];
        }
    }
});