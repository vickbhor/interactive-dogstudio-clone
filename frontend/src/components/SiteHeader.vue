<script setup>
import { RouterLink } from 'vue-router'
import { ref, onBeforeUnmount } from 'vue'
import { menuOpen, toggleMenu, closeMenu } from '../composables/useMenuState'

const soundOn = ref(false)

let audioCtx = null
let noiseSource = null
let masterGain = null
let chirpTimer = null

function createNoiseBuffer(ctx) {
  const length = ctx.sampleRate * 2 
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

function playChirp(ctx, destination) {
  const now = ctx.currentTime
  const baseFreq = 1800 + Math.random() * 1400
  const length = 0.09 + Math.random() * 0.12

  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(baseFreq, now)
  osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.3 + Math.random() * 0.6), now + length * 0.5)
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + length)

  const chirpGain = ctx.createGain()
  chirpGain.gain.setValueAtTime(0, now)
  chirpGain.gain.linearRampToValueAtTime(0.2, now + length * 0.15)
  chirpGain.gain.linearRampToValueAtTime(0, now + length)

  osc.connect(chirpGain)
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner()
    panner.pan.value = Math.random() * 2 - 1
    chirpGain.connect(panner)
    panner.connect(destination)
  } else {
    chirpGain.connect(destination)
  }

  osc.start(now)
  osc.stop(now + length + 0.05)

  if (Math.random() < 0.4) {
    setTimeout(() => playChirp(ctx, destination), (length + 0.06) * 1000)
  }
}

function scheduleChirps(ctx, destination) {
  const nextIn = 700 + Math.random() * 2600
  chirpTimer = setTimeout(() => {
    playChirp(ctx, destination)
    scheduleChirps(ctx, destination)
  }, nextIn)
}

function startAmbientSound() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }

  masterGain = audioCtx.createGain()
  masterGain.gain.value = 0
  masterGain.connect(audioCtx.destination)

  noiseSource = audioCtx.createBufferSource()
  noiseSource.buffer = createNoiseBuffer(audioCtx)
  noiseSource.loop = true

  const noiseFilter = audioCtx.createBiquadFilter()
  noiseFilter.type = 'lowpass'
  noiseFilter.frequency.value = 900
  noiseFilter.Q.value = 0.6

  const noiseGain = audioCtx.createGain()
  noiseGain.gain.value = 0.5

  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(masterGain)
  noiseSource.start()

  scheduleChirps(audioCtx, masterGain)

  masterGain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 1.5)
}

function stopAmbientSound() {
  if (!audioCtx) return
  const ctx = audioCtx
  const gain = masterGain
  const source = noiseSource
  clearTimeout(chirpTimer)
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
  setTimeout(() => {
    source.stop()
    ctx.close()
  }, 900)
  audioCtx = null
}

const toggleSound = () => {
  soundOn.value = !soundOn.value
  if (soundOn.value) {
    startAmbientSound()
  } else {
    stopAmbientSound()
  }
}

onBeforeUnmount(() => {
  if (audioCtx) stopAmbientSound()
})
</script>

<template>
  <header class="site-header">
    <div class="site-header-title">
      <RouterLink to="/" class="site-header-logo">
        <span class="logo-text">DOGSTUDIO</span>
      </RouterLink>
    </div>

    <nav class="site-header-utility">
      <RouterLink to="/news" class="utility-link">All our news</RouterLink>
      <RouterLink to="/cases" class="utility-link">All our cases</RouterLink>
    </nav>

    <div class="site-header-actions">
      <button
        type="button"
        class="site-header-button"
        :class="{ 'is-active': menuOpen }"
        title="Toggle menu"
        @click="toggleMenu"
      >
        <span class="button-bar"></span>
        <span class="button-bar"></span>
        <span class="button-bar"></span>
      </button>
    </div>

    <!-- Full overlay menu — a translucent gradient rather than a solid block,
         so the dog scene stays visible on the right, matching the real site -->
    <div class="site-menu" v-if="menuOpen">
      <nav class="site-menu-nav">
        <RouterLink to="/studio" class="site-menu-item" @click="closeMenu">
          <span class="site-menu-index">01</span>
          <span class="site-menu-label font-display">The Studio</span>
        </RouterLink>
        <RouterLink to="/cases" class="site-menu-item" @click="closeMenu">
          <span class="site-menu-index">02</span>
          <span class="site-menu-label font-display">Our Cases</span>
        </RouterLink>
        <RouterLink to="/careers" class="site-menu-item" @click="closeMenu">
          <span class="site-menu-index">03</span>
          <span class="site-menu-label font-display">Careers</span>
        </RouterLink>
        <RouterLink to="/values" class="site-menu-item" @click="closeMenu">
          <span class="site-menu-index">04</span>
          <span class="site-menu-label font-display">Our Values</span>
        </RouterLink>
        <RouterLink to="/contact" class="site-menu-item" @click="closeMenu">
          <span class="site-menu-index">05</span>
          <span class="site-menu-label font-display">Contact</span>
        </RouterLink>
      </nav>

      <a href="https://vimeo.com/836218697" target="_blank" rel="noopener" class="site-menu-showreel">
        <span class="showreel-arrow">&rsaquo;</span> Watch our Showreel
      </a>

      <p class="site-menu-wordmark font-display">We<br>Make<br>Good<br>Shit</p>

      <ul class="site-menu-social">
        <li><a href="https://www.facebook.com/dogstudio" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="https://www.instagram.com/dogstudio.co" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://dribbble.com/dogstudio" target="_blank" rel="noopener">Dribbble</a></li>
        <li><a href="https://twitter.com/Dogstudio" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="#">Newsletter</a></li>
      </ul>
    </div>
  </header>

  <button
    type="button"
    class="sound-fab"
    :class="{ 'is-on': soundOn, 'is-hidden': menuOpen }"
    :title="soundOn ? 'Mute ambient sound' : 'Play ambient sound'"
    @click="toggleSound"
  >
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
      <template v-if="soundOn">
        <path d="M16.2 8.8a5 5 0 0 1 0 6.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        <path d="M18.6 6.2a8.5 8.5 0 0 1 0 11.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </template>
      <path v-else d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  mix-blend-mode: difference;
}

.logo-text {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 2px;
}

.site-header-utility {
  display: flex;
  gap: 30px;
}
@media (max-width: 900px) {
  .site-header-utility { display: none; }
}
.utility-link {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.utility-link:hover {
  color: var(--accent-color);
}

.site-header-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.sound-fab {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 90;
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
}
.sound-fab.is-hidden {
  opacity: 0;
  pointer-events: none;
}
.sound-fab:hover {
  transform: scale(1.08);
  border-color: rgba(255, 255, 255, 0.4);
}
.sound-fab.is-on {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
@media (max-width: 700px) {
  .sound-fab {
    right: 20px;
    bottom: 20px;
    width: 42px;
    height: 42px;
  }
}

.site-header-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 101;
}

.button-bar {
  width: 30px;
  height: 2px;
  background-color: var(--text-color);
  transition: 0.3s;
}

.site-header-button.is-active .button-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.site-header-button.is-active .button-bar:nth-child(2) {
  opacity: 0;
}
.site-header-button.is-active .button-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.site-menu {
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
  /* Opaque on the left for legible nav text, fading away on the right
     so the dog scene (and rest of the page) stays visible underneath. */
  background: linear-gradient(
    to right,
    rgba(5, 5, 5, 0.97) 0%,
    rgba(5, 5, 5, 0.92) 30%,
    rgba(5, 5, 5, 0.55) 55%,
    rgba(5, 5, 5, 0) 80%
  );
}

.site-menu-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-menu-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.site-menu-index {
  margin-top: 20px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

.site-menu-label {
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.site-menu-item:hover .site-menu-label,
.site-menu-item.router-link-active .site-menu-label {
  color: var(--text-color);
}

.site-menu-showreel {
  position: absolute;
  left: 5vw;
  bottom: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.showreel-arrow {
  color: var(--accent-color);
  font-size: 20px;
  line-height: 1;
}

.site-menu-wordmark {
  position: absolute;
  right: 5vw;
  bottom: 110px;
  text-align: right;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  mix-blend-mode: difference;
}

.site-menu-social {
  position: absolute;
  right: 5vw;
  bottom: 30px;
  display: flex;
  gap: 15px;
}
.site-menu-social a {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.site-menu-social a:hover {
  color: var(--accent-color);
}

@media (max-width: 700px) {
  .site-menu-wordmark,
  .site-menu-social {
    display: none;
  }
  .site-menu-showreel {
    position: static;
    margin-top: 40px;
  }
  .site-menu {
    background: rgba(5, 5, 5, 0.97);
  }
}
</style>
