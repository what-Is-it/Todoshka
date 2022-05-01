<template>
  <div class="home">
    <header class="home__header">
      <h1 class="home__logo">Amazing todo application</h1>
    </header>
    <section class="home__section">
      <img src="../assets/bird1.png" alt="bird" id="bird1" />
      <img src="../assets/bird2.png" alt="bird" id="bird2" />
      <img src="../assets/forest.png" alt="bird" />
      <img src="../assets/rocks.png" alt="bird" id="rocks" />
      <img src="../assets/water.png" alt="bird" />
      <button @click="toApp" class="home__link">Welcome</button>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    toApp() {
      const bird1 = document.getElementById("bird1");
      const bird2 = document.getElementById("bird2");
      const rocks = document.getElementById("rocks");

      bird1.classList.add("bird1");
      bird2.classList.add("bird2");
      rocks.classList.add("rocks");

      setTimeout(() => {
        bird1.classList.remove("bird1");
        bird2.classList.remove("bird2");
        rocks.classList.remove("rocks");
        this.$router.push("/todos");
      }, 2900);
    },
  },
  mounted() {
    if(document.body.classList.contains('backgroundView')) {document.body.classList.remove('backgroundView')}
  }
};
</script>
