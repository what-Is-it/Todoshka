<template>
  <div>
    <h2 class="title2">Добавить новое дело</h2>
    <form class="column_right" @submit.prevent="onSubmit">
      <label for="name">Название</label>
      <input
        type="text"
        class="task"
        :class="{invalid: v$.title.$dirty && !v$.title.required.$response}"
        name="name"
        id="name"
        v-model="title"
        placeholder="Введите название"
      />
      <div
        class="helper-text"
        v-if="v$.title.$dirty && !v$.title.required.$response"
      >Обязательное поле</div>
      <label class="note" for="com">Описание</label>
      <textarea
        placeholder="Введите описание"
        class="comment"
        name="comment"
        id="com"
        v-model="comm"
      ></textarea>
      <button class="add" type="submit">
        <span>Добавить дело</span>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      title: '',
      comm: '',
    }
  },
  validations() {
    return {
      title: {required},
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate()
      if (!result) {
        console.log('error')
        return
      } else {
        const newTodo = {
          /* id: this.id, */
          title: this.title,
          description: this.comm,
          completed: false,
        }
        this.$emit('add-todo', newTodo)
        await this.$store.dispatch('createTodo', newTodo)
        this.v$.$reset()
        this.title = ''
        this.comm = ''
      }
    },
  },
}
</script>
