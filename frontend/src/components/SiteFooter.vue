<script setup>
</script>

<template>
  <footer class="site-footer">
    <div class="center">
      <div class="site-footer-top">
        <div class="site-footer-block">
          <h3>Chicago <b>.</b></h3>
        </div>
        <div class="site-footer-block">
          <h3>Amsterdam <b>.</b></h3>
        </div>
        <div class="site-footer-block">
          <h3>Paris <b>.</b></h3>
        </div>
      </div>

      <div class="site-footer-contact">
        <a href="mailto:biz@dogstudio.be" class="footer-email">biz@dogstudio.be</a>

        <ul class="footer-social">
          <li><a href="https://www.facebook.com/dogstudio" target="_blank" rel="noopener">Fb</a></li>
          <li><a href="https://www.instagram.com/dogstudio.co" target="_blank" rel="noopener">Ins</a></li>
          <li><a href="https://dribbble.com/dogstudio" target="_blank" rel="noopener">Dri</a></li>
          <li><a href="https://twitter.com/Dogstudio" target="_blank" rel="noopener">Tw</a></li>
        </ul>
      </div>

      <div class="site-footer-bottom">
        <p>© {{ new Date().getFullYear() }} Dogstudio. All rights reserved.</p>
        <a href="#" class="privacy-link">Privacy Policy</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 100px 0 40px;
  position: relative;
  z-index: 2;
}

.site-footer-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.site-footer-block h3 {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
}

.site-footer-block h3 b {
  color: var(--accent-color);
}

.site-footer-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 40px;
  margin-bottom: 40px;
}

.footer-email {
  font-size: 18px;
  font-weight: 700;
}
.footer-email:hover {
  color: var(--accent-color);
}

.footer-social {
  display: flex;
  gap: 20px;
}
.footer-social a {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
}
.footer-social a:hover {
  color: var(--accent-color);
}

.site-footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 40px;
  font-size: 14px;
  color: #888;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.privacy-link:hover {
  color: var(--accent-color);
}
</style>
