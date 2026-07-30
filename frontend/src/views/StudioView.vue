<script setup>
</script>

<template>
  <main role="main" class="page-studio" data-router-view="studio">
    <div class="center">
      <header class="page-header" v-reveal>
        <h1 class="title">Studio</h1>
        <p class="lead">
          We're a multidisciplinary creative studio at the intersection of art, design and technology.
        </p>
      </header>

      <section class="page-section" v-reveal>
        <p>
          Founded with a passion for building experiences that move people, our team blends design, engineering,
          and strategy to deliver work that stands out. We work globally from our offices, partnering with brands,
          cultural institutions, and entertainment companies to build things worth talking about.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.page-studio {
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
  line-height: 1.5;
}
.page-section p {
  max-width: 700px;
  font-size: 18px;
  line-height: 1.6;
}
</style>
