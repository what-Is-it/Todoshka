<template>
  <nav class="container flex">
    <router-link to="/" class="link">Todo application</router-link>
    <div class="date">{{date}}</div>
  </nav>
</template>

<script>
import dateFilter from '@/filters/date.filter'
export default {
    data() {
        return {
            date: new Date
        }
    },
    mounted() {
    this.interval = setInterval(()=>{
            this.date = dateFilter(new Date, ('datetime'))
        })
    },
}
</script>

<style lang="scss" scoped>
</style>