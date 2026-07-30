<script setup>
const jobs = [
  { title: 'Senior Creative Developer', location: 'Chicago' },
  { title: 'Digital Producer', location: 'Amsterdam' },
]
</script>

<template>
  <main role="main" class="page-careers" data-router-view="careers">
    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title">Careers</h1>
        <p class="lead">Join a team that builds things worth talking about.</p>
      </header>

      <ul class="jobs-list" v-reveal="{ stagger: true }">
        <li v-for="(job, index) in jobs" :key="index">
          <a href="#">
            <span class="job-title">{{ job.title }}</span>
            <span class="job-location">{{ job.location }}</span>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.page-careers {
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
  margin-bottom: 30px;
}
.lead {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  max-width: 700px;
}
.jobs-list li {
  border-top: 1px solid rgba(255,255,255,0.1);
}
.jobs-list a {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  transition: color 0.3s;
}
.jobs-list a:hover {
  color: var(--accent-color);
}
.job-title {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 900;
  text-transform: uppercase;
}
.job-location {
  font-size: 14px;
  color: #888;
}
</style>
