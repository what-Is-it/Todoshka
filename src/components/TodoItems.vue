<template>
  <div>
    <div class="column_left">
      <h2 class="title1">Список дел:</h2>
      <Loader v-if="loading" />
      <div v-else-if="this.todos.length">
        <select v-model="filter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
        <div v-if="!filtTodos.length" class="task_empty">Список дел пуст</div>
        <ul class="window">
          <li v-for="(todo, i) of filtTodos" v-bind:key="todo.id" v-bind:index="i">
            <div class="new_task">
              <div class="task_head">
                <div class="task_title">
                  <input
                    type="checkbox"
                    class="check"
                    v-on:change="updateStatus(todo)"
                    :checked="todo.completed"
                  />
                  <strong class="id_number">{{ i + 1 }}</strong>&nbsp;
                  <strong>{{ todo.title }}</strong>
                  <button class="delete" title="Удалить" v-on:click="del(todo)">&times;</button>
                  <p
                    class="task_complete"
                    :class="!todo.completed ? 'green' : 'red'"
                  >{{ !todo.completed ? 'В работе' : 'Завершено' }}</p>
                  <button
                    class="arrow"
                    title="Свернуть"
                    v-on:click="todo.active = !todo.active"
                  >&or;</button>
                  <button
                    class="change"
                    title="Редактировать"
                    :disabled="todo.completed"
                    v-on:click="fadeInForm(todo)"
                  >&#9998;</button>
                </div>
                <div
                  id="toggle_com"
                  class="com"
                  v-bind:class="{toggle: todo.active}"
                >{{ todo.description }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="edit_form" id="edit_form">
      <form class="form_container" @submit.prevent="update">
        <button class="exit_form" type="button" id="exit_button" @click="fadeOutForm">Закрыть</button>
        <input
          class="form_title"
          type="text"
          name="Title"
          placeholder="Введите новый заголовок"
          v-model="todoTitle"
        />
        <input
          class="form_description"
          type="text"
          name="Description"
          placeholder="Введите новое описание"
          v-model="todoDescription"
        />
        <button class="form_button" type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  props: ['todos', 'loading'],
  components: {
    Loader,
  },
  data() {
    return {
      filter: 'all',
      todoTitle: '',
      todoDescription: '',
      upTodo: null,
    }
  },
  mounted() {
    
  },
  methods: {
    fadeInForm(todo) {
      const form = document.getElementById('edit_form')
      form.style.display = 'block'
      document.body.style.overflow = 'hidden'
      this.upTodo = todo
      console.log(this.upTodo)
    },
    fadeOutForm() {
      const form = document.getElementById('edit_form')
      if (form.style.display === 'block') {
        form.style.display = 'none'
      }
      (this.todoTitle = ''), (this.todoDescription = ''), (this.upTodo = null)
      document.body.style.overflow = 'visible'
    },
    async del(todo) {
      console.log(todo.id)
      await this.$store.dispatch('deleteTodo', todo)
      this.$emit('remove-todo', todo.id)
    },
    async update() {
      const toUpdate = {
        ...this.upTodo,
        title: this.todoTitle,
        description: this.todoDescription,
      }
      await this.$store.dispatch('updateTodo', toUpdate)
      (this.todoTitle = ''), (this.todoDescription = ''), (this.upTodo = null)
      const form = document.getElementById('edit_form')
      if (form.style.display === 'block') {
        form.style.display = 'none'
      }
      document.body.style.overflow = 'visible'
    },
    updateStatus(todo) {
      this.upTodo = todo
      todo.completed = !todo.completed
      localStorage.setItem(`${todo.id}_check`, todo.completed)
      console.log(this.upTodo, todo.completed)
      /* const toUpdate = {...this.upTodo, is_active: todo.completed}
      await this.$store.dispatch('updateTodo', toUpdate) */
      this.upTodo = null
    },
  },
  computed: {
    filtTodos: function () {
      if (this.filter === 'all') {
        return this.$store.getters.getTodos
      }
      if (this.filter === 'completed') {
        return this.$store.getters.getTodos.filter((el) => el.completed)
      }
      if (this.filter === 'not-completed') {
        return this.$store.getters.getTodos.filter((el) => !el.completed)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.delete {
  font-size: 15px;
  background-color: #ff8282;
  color: #fff;
  border: none;
  width: 22px;
  border-radius: 50%;
  margin-left: 10px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
  transition: all 0.5s ease;
}
.toggle {
  height: 0;
  padding: 0;
  opacity: 0;
}
</style>
