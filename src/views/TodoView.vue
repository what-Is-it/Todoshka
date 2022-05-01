<template>
  <div>
    <NavBar />
    <div class="container flex">
      <TodoItems :todos="todos" :loading="loading" @remove-todo="removeTodo" />
      <AddTodo @add-todo="addTodo" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AddTodo from '@/components/AddTodo'
import TodoItems from '@/components/TodoItems'
export default {
  name: 'app',
  data() {
    return {
      todos: [],
      loading: true,
    }
  },
  async mounted() {
    if (!document.body.classList.contains('backgroundView')) {
      document.body.classList.add('backgroundView')
    }
    await this.$store.dispatch('fetchTodos')
    this.todos = this.$store.getters.getTodos
    this.loading = false
  },
  methods: {
    removeTodo(id) {
      this.$store.commit(
        'setTodos',
        this.todos.filter((el) => el.id !== id)
      )
    },
    addTodo(todo) {
      this.todos.push(todo)
    },
  },
  components: {
    TodoItems,
    AddTodo,
    NavBar,
  },
}
</script>
