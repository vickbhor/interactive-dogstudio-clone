<script setup>
</script>

<template>
  <main role="main" class="page-news" data-router-view="news">
    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title font-display">News</h1>
        <p class="lead">Studio updates, press features, and announcements.</p>
      </header>
    </div>
  </main>
</template>

<style scoped>
.page-news {
  padding-top: 180px;
  padding-bottom: 150px;
  min-height: 100vh;
}
.title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 500;
  line-height: 1;
  margin-bottom: 30px;
}
.lead {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  max-width: 700px;
}
</style>
