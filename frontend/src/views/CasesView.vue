<script setup>
import { ref } from 'vue'

const cases = [
  { year: '2020 - Ongoing', name: 'Tomorrowland', category: 'Web', desc: "A next-generation digital experience for the world's best-known music festival", img: '/tommorowland.png' },
  { year: '2018 - Today', name: 'Navy Pier', category: 'Strategy', desc: "A hopeful, story-driven look at Chicago's bond with Lake Michigan", img: '/navy-pier.png' },
  { year: '2015 - Today', name: 'MSI Chicago', category: 'Strategy', desc: "A full rethink of the website for one of Chicago's most-loved museums", img: '/msi-chicago.png' },
  { year: '2016', name: "This Was Louise's Phone", category: 'Design', desc: 'An interactive experience raising awareness about the impact of cyberbullying', img: '/phone.png' },
  { year: '2012 - Today', name: 'KIKK Festival 2018', category: 'Design', desc: "This year's identity refresh for the festival, themed around life beyond our own", img: '/kikk.png' },
  { year: '2017', name: 'The Kennedy Center', category: 'Design', desc: 'A tribute website honoring the life and legacy of an American icon', img: '/kennedy.png' },
  { year: '2016 - Ongoing', name: 'Royal Opera Of Wallonia', category: 'Design', desc: "A dreamlike visual world built to promote the opera house's new season", img: '/opera.png' },
]

const hoveredIndex = ref(null)
</script>

<template>
  <main role="main" class="page-cases" data-router-view="cases">
    <!-- Background image reveal, matching the same hover language as the homepage -->
    <div
      class="cases-backdrop"
      :class="{ 'is-visible': hoveredIndex !== null }"
      :style="hoveredIndex !== null ? { backgroundImage: `url(${cases[hoveredIndex].img})` } : {}"
    ></div>

    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title">Cases</h1>
      </header>

      <ul class="cases-list" v-reveal="{ stagger: true }">
        <li
          v-for="(item, index) in cases"
          :key="index"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <a href="#">
            <div class="case-top">
              <span class="year">{{ item.year }}</span>
              <span class="category">{{ item.category }}</span>
            </div>
            <span class="name">{{ item.name }}</span>
            <p class="desc">{{ item.desc }}</p>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.page-cases {
  padding-top: 180px;
  padding-bottom: 150px;
  min-height: 100vh;
  position: relative;
}

.cases-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  pointer-events: none;
}
.cases-backdrop.is-visible {
  opacity: 0.35;
}

.center {
  position: relative;
  z-index: 1;
}

.page-header {
  margin-bottom: 60px;
}
.title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}
.cases-list li {
  border-top: 1px solid rgba(255,255,255,0.1);
}
.cases-list a {
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  transition: color 0.3s;
}
.cases-list a:hover {
  color: var(--accent-color);
}
.case-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.year {
  font-size: 14px;
  color: #888;
}
.category {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-color);
}
.name {
  font-size: clamp(1.5rem, 3vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
}
.desc {
  font-size: 14px;
  color: #888;
  max-width: 500px;
  margin-top: 10px;
}
</style>
