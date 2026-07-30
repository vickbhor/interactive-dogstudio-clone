<script setup>
import HomeHero from '../components/HomeHero.vue'
import HomeCases from '../components/HomeCases.vue'
import HomeAbout from '../components/HomeAbout.vue'
</script>

<template>
  <main role="main" data-router-view="home">
    <h1 class="u-visually-hidden">Dogstudio</h1>
    <HomeHero />
    <HomeCases />
    <HomeAbout />
  </main>
</template>
