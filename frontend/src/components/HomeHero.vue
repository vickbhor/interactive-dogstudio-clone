<script setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import { siteReady } from '../composables/useSiteReady'

const heroRef = ref(null)

onMounted(() => {
  const el = heroRef.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const words = el.querySelectorAll('.fx-word')
  const rest = el.querySelectorAll('.reveal-after-title')
  gsap.set(words, { yPercent: 100, opacity: 0 })
  gsap.set(rest, { y: 20, opacity: 0 })

  function playIntro() {
    gsap
      .timeline()
      .to(words, { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.08 })
      .to(rest, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, '-=0.6')
  }

  if (siteReady.value) {
    playIntro()
  } else {
    const unwatch = watch(siteReady, (ready) => {
      if (ready) {
        playIntro()
        unwatch()
      }
    })
  }
})
</script>

<template>
  <section id="section-1" class="home-hero" ref="heroRef">
    <div class="center">
      <h2 class="u-visually-hidden">We Make Good Shit</h2>

      <p class="home-hero-title font-display">
        <span class="fx-word-mask"><span class="fx-word">We</span></span>
        <span class="fx-word-mask"><span class="fx-word">Make</span></span>
        <span class="fx-word-mask"><span class="fx-word">Good</span></span>
        <span class="fx-word-mask"><span class="fx-word">Shit</span></span>
      </p>

      <a href="https://vimeo.com/836218697" target="_blank" rel="noopener" class="home-hero-showreel reveal-after-title">Watch Our Showreel</a>

      <div class="home-hero-content reveal-after-title">
        <p class="lead">
          Dogstudio is a multidisciplinary creative studio at the intersection of art, design and technology.
        </p>

        <p>
          Our goal is to deliver amazing experiences that make people talk, and build strategic value for brands, tech, entertainment, arts & culture.
        </p>

        <ul class="social-links">
          <li><a href="https://www.facebook.com/dogstudio" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="https://www.instagram.com/dogstudio.co" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://dribbble.com/dogstudio" target="_blank" rel="noopener">Dribbble</a></li>
          <li><a href="https://twitter.com/Dogstudio" target="_blank" rel="noopener">Twitter</a></li>
          <li><a href="#">Newsletter</a></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 150px;
}

.home-hero-title {
  font-size: clamp(3.5rem, 8vw, 5rem); /* 80px measured at their desktop breakpoint */
  font-weight: 700; /* measured exactly */
  line-height: 0.89; /* measured: 71.33px / 80px */
  letter-spacing: -0.05em; /* measured: -4px / 80px */
  margin-bottom: 2rem;
  mix-blend-mode: difference;
}

.fx-word-mask {
  display: block;
  overflow: hidden;
}

.fx-word {
  display: inline-block;
}

.home-hero-showreel {
  display: inline-block;
  margin-bottom: 4rem;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--accent-color);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}
.home-hero-showreel:hover {
  border-color: var(--accent-color);
}

.home-hero-content {
  max-width: 400px;
  font-size: 14px;
  line-height: 2.1; /* measured: 29.4px / 14px */
}

.lead {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.home-hero-content p {
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.social-links a {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.social-links a:hover {
  color: var(--accent-color);
}
</style>

