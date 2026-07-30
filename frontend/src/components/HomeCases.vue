<script setup>
const cases = [
  { year: '2020 - Ongoing', name: 'Tomorrowland', slug: 'tomorrowland', category: 'Web', description: "A next-generation digital experience for the world's best-known music festival" },
  { year: '2018 - Today', name: 'Navy Pier', slug: 'navy-pier', category: 'Strategy', description: "A hopeful, story-driven look at Chicago's bond with Lake Michigan" },
  { year: '2015 - Today', name: 'MSI Chicago', slug: 'msi-chicago', category: 'Strategy', description: "A full rethink of the website for one of Chicago's most-loved museums" },
  { year: '2016', name: "This Was Louise's Phone", slug: 'phone', category: 'Design', description: 'An interactive experience raising awareness about the impact of cyberbullying' },
  { year: '2012 - Today', name: 'KIKK Festival 2018', slug: 'kikk', category: 'Design', description: "This year's identity refresh for the festival, themed around life beyond our own" },
  { year: '2017', name: 'The Kennedy Center', slug: 'kennedy', category: 'Design', description: 'A tribute website honoring the life and legacy of an American icon' },
  { year: '2016 - Ongoing', name: 'Royal Opera Of Wallonia', slug: 'opera', category: 'Design', description: "A dreamlike visual world built to promote the opera house's new season" },
]
</script>

<template>
  <section id="section-2" class="home-cases">
    <div class="center">
      <h2 class="home-cases-title" v-reveal>Featured projects</h2>

      <ul class="home-cases-list titles" v-reveal="{ stagger: true }">
        <li
          v-for="(item, index) in cases"
          :key="index"
          class="title"
          :img-title="item.slug"
        >
          <a href="#" class="title-link">
            <span class="title-main">
              <span class="year">{{ item.year }}</span>
              <span class="name">{{ item.name }}</span>
            </span>

            <span class="title-meta">
              <span class="category">{{ item.category }}</span>
              <span class="description">{{ item.description }}</span>
              <span class="discover">Discover<span class="discover-arrow">&rarr;</span></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.home-cases {
  padding: 100px 0;
  position: relative;
  z-index: 2;
}

.home-cases-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 40px;
  color: var(--accent-color);
}

.home-cases-list li {
  border-top: 1px solid rgba(255,255,255,0.1);
  opacity: 0.3;
  transition: opacity 0.3s linear;
}
.home-cases-list li:hover {
  opacity: 1;
}

.title-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 30px 0;
  transition: color 0.3s;
}

.title-main {
  display: flex;
  align-items: baseline;
  gap: 40px;
  flex-shrink: 0;
}

.title-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 0;
  text-align: right;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.title:hover .title-meta {
  opacity: 1;
  transform: translateX(0);
}

.category {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-color);
  flex-shrink: 0;
}

.description {
  font-size: 14px;
  line-height: 1.5;
  color: #ccc;
  max-width: 260px;
}

.discover {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  flex-shrink: 0;
}

.discover-arrow {
  display: inline-block;
  margin-left: 6px;
  transition: transform 0.3s ease;
}
.title:hover .discover-arrow {
  transform: translateX(4px);
}

.year {
  font-size: 14px;
  color: #888;
}

.name {
  font-size: clamp(1.5rem, 3vw, 3rem);
  font-weight: 900;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .title-meta {
    display: none;
  }
}
</style>
