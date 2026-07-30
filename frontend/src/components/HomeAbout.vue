<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="home-about" id="section-3">
    <div class="center">
      <header class="home-about-header" v-reveal>
        <p class="home-about-headline">This is how we do it</p>
        <p class="home-about-title">
          We're crafting emotional experiences aimed at improving results
        </p>
      </header>

      <div class="home-about-content" v-reveal="{ delay: 0.15 }">
        <div class="home-about-text">
          <p>Dogstudio is a design & technology firm working globally from our offices based in Belgium and Chicago. Our strong focus on producing high quality & emotional brandings, digital products and experiences became a signature.</p>
          <p>We're passionate about moving people and solving problems for the likes of Microsoft, The Museum of Science And Industry Of Chicago, The Kennedy Center of Washington, Dragone, Quanta Magazine, and many more.</p>
        </div>

        <RouterLink to="/values" class="home-about-link">
          <span class="link-label">Discover our values</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-about {
  padding: 150px 0;
  position: relative;
  z-index: 2;
}

.home-about-headline {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: var(--accent-color);
}

.home-about-title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  max-width: 900px;
  margin-bottom: 80px;
}

.home-about-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 50px;
}

.home-about-text {
  max-width: 600px;
  font-size: 18px;
  line-height: 1.6;
}

.home-about-text p {
  margin-bottom: 20px;
}

.home-about-link {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-color);
  align-self: flex-start;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.home-about-link:hover {
  border-color: var(--accent-color);
}
</style>
