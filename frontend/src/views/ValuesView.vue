<script setup>
const values = [
  { title: 'Craft', desc: 'We obsess over the details others skip.' },
  { title: 'Curiosity', desc: 'We stay hungry to learn and experiment.' },
  { title: 'Impact', desc: 'We build for outcomes, not just outputs.' },
]
</script>

<template>
  <main role="main" class="page-values" data-router-view="values">
    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title">Values</h1>
      </header>

      <ul class="values-list" v-reveal="{ stagger: true }">
        <li v-for="(v, index) in values" :key="index">
          <h2>{{ v.title }}</h2>
          <p>{{ v.desc }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.page-values {
  padding-top: 180px;
  padding-bottom: 150px;
  min-height: 100vh;
}
.page-header {
  margin-bottom: 80px;
}
.title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}
.values-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px;
}
.values-list h2 {
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 15px;
  color: var(--accent-color);
}
.values-list p {
  font-size: 16px;
  line-height: 1.6;
}
</style>
