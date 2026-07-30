<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { markSiteReady } from '../composables/useSiteReady'

const progress = ref(0)
const isHidden = ref(false)
const circleRef = ref(null)

const CIRCUMFERENCE = 2 * Math.PI * 67

function setProgress(value) {
  progress.value = Math.min(100, Math.max(0, value))
  if (circleRef.value) {
    const offset = CIRCUMFERENCE - (progress.value / 100) * CIRCUMFERENCE
    circleRef.value.style.strokeDashoffset = offset
  }
}

let fakeProgressInterval

onMounted(() => {
  fakeProgressInterval = setInterval(() => {
    if (progress.value < 90) {
      setProgress(progress.value + Math.random() * 15)
    }
  }, 200)

  window.addEventListener('load', () => {
    clearInterval(fakeProgressInterval)
    setProgress(100)
    setTimeout(() => {
      isHidden.value = true
      markSiteReady()
    }, 400)
  })
})

onBeforeUnmount(() => {
  clearInterval(fakeProgressInterval)
})
</script>

<template>
  <div class="site-loader" :class="{ 'is-hidden': isHidden }">
    <div class="site-loader-content">
      <div class="site-loader-dog">
        <svg viewBox="0 0 100 60" class="dog-silhouette" xmlns="http://www.w3.org/2000/svg">
          <path d="M15,45
                   Q10,45 8,38
                   Q6,32 12,30
                   L14,25
                   Q12,18 18,15
                   Q22,10 28,14
                   L32,18
                   L55,16
                   Q62,14 66,18
                   L70,15
                   Q76,16 75,22
                   L74,28
                   Q80,30 78,36
                   L72,45
                   L68,45
                   L66,36
                   L40,36
                   L38,45
                   L34,45
                   L33,37
                   L20,37
                   L18,45
                   Z" />
        </svg>
      </div>
      <div class="site-loader-progress">
        <svg>
          <circle r="67" cx="68" cy="68" class="site-loader-stroke"></circle>
          <circle r="67" cx="68" cy="68" class="site-loader-percent" ref="circleRef"></circle>
        </svg>
      </div>
      <div class="site-loader-percentage">{{ Math.round(progress) }}%</div>
    </div>
  </div>
</template>

<style scoped>
.site-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.site-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.site-loader-content {
  position: relative;
  width: 136px;
  height: 136px;
}

.site-loader-dog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 42px;
}

.dog-silhouette {
  width: 100%;
  height: 100%;
  animation: pulse 1.2s ease-in-out infinite;
}

.dog-silhouette path {
  fill: var(--text-color);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.08); opacity: 1; }
}

.site-loader-progress svg {
  width: 136px;
  height: 136px;
  transform: rotate(-90deg);
}

circle {
  fill: none;
  stroke-width: 2;
}

.site-loader-stroke {
  stroke: rgba(255,255,255,0.1);
}

.site-loader-percent {
  stroke: var(--accent-color);
  stroke-dasharray: 421;
  stroke-dashoffset: 421;
  transition: stroke-dashoffset 0.1s;
}

.site-loader-percentage {
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #888;
}
</style>
