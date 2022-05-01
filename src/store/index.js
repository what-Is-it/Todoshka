import {createStore} from 'vuex'

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos
    },
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await fetch('http://fa-todo.herokuapp.com/task/')
        this.state.todos = await response.json()
        for (let i = 0; i < this.state.todos.length; i++) {
          this.state.todos[i].completed =
            localStorage.getItem(`${this.state.todos[i].id}_check`) || false
        }
        console.log(this.state.todos)
      } catch (e) {
        console.log(e)
      }
    },
    async createTodo(_, data) {
      try {
        const response = await fetch('http://fa-todo.herokuapp.com/task/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        })
        const json = await response.json()
        console.log('POST Успех:', JSON.stringify(json))
      } catch (error) {
        console.error('Ошибка:', error)
      }
    },
    async deleteTodo(_, todo) {
      console.log(todo)
      try {
        const response = await fetch(
          `http://fa-todo.herokuapp.com/task/${todo.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        console.log('Успех')
      } catch (error) {
        console.error('Ошибка', error)
      }
    },
    async updateTodo({dispatch}, toUpdate) {
      try {
        const response = await fetch(
          `http://fa-todo.herokuapp.com/task/${toUpdate.id}`,
          {
            method: 'PUT',
            body: JSON.stringify(toUpdate),
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        await dispatch('fetchTodos')
        console.log('Update Успех:')
      } catch (error) {
        console.error('Ошибка:', error)
      }
    },
  },
  getters: {
    getTodos: (state) => state.todos,
  },
  modules: {},
})
