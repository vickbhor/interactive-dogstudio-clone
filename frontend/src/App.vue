<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteLoader from './components/SiteLoader.vue'
import DogScene from './components/DogScene.vue'
import SiteFooter from './components/SiteFooter.vue'
import { initSmoothScroll } from './lib/smoothScroll'
import { menuOpen } from './composables/useMenuState'

onMounted(() => {
  initSmoothScroll()
})
</script>

<template>
  <SiteLoader />

  <div class="site-wrapper">
    <SiteHeader />
    <DogScene />

    <div class="site-container" :class="{ 'is-hidden': menuOpen }" data-router-wrapper>
      <RouterView />
    </div>

    <SiteFooter :class="{ 'is-hidden': menuOpen }" />
  </div>
</template>

<style>
.site-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.site-container {
  position: relative;
  z-index: 10;
}
.site-container,
.site-footer {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.site-container.is-hidden,
.site-footer.is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
</style>
