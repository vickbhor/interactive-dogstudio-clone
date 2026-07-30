import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HomeView from '../views/HomeView.vue'
import { scrollToTop } from '../lib/smoothScroll'
import { coverTransition, revealTransition } from '../lib/pageTransition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Dogstudio. Multidisciplinary Creative Studio.' }
    },
    {
      path: '/studio',
      name: 'studio',
      component: () => import('../views/StudioView.vue'),
      meta: { title: 'The Studio - Dogstudio' }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      meta: { title: 'News - Dogstudio' }
    },
    {
      path: '/cases',
      name: 'cases',
      component: () => import('../views/CasesView.vue'),
      meta: { title: 'Cases - Dogstudio' }
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/CareersView.vue'),
      meta: { title: 'Careers - Dogstudio' }
    },
    {
      path: '/values',
      name: 'values',
      component: () => import('../views/ValuesView.vue'),
      meta: { title: 'Our Values - Dogstudio' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact - Dogstudio' }
    }
  ]
})

// `from.name` is undefined on the very first load, so this only fires on
// actual in-app navigations — the initial page load is handled by SiteLoader.
function isRealNavigation(to, from) {
  return Boolean(from.name) && to.path !== from.path
}

// Sweep the curtain over the screen before swapping the route, so whatever's
// unmounting/mounting underneath (including the scroll jump below) is hidden.
router.beforeEach(async (to, from) => {
  if (isRealNavigation(to, from)) {
    await coverTransition()
  }
})

// Update the tab title, reset scroll/ScrollTrigger for the new page (both of
// which App.vue/DogScene.vue depend on), then wipe the curtain away.
router.afterEach(async (to, from) => {
  document.title = to.meta.title || 'Dogstudio'

  if (isRealNavigation(to, from)) {
    await nextTick()
    scrollToTop()
    ScrollTrigger.refresh()
    revealTransition()
  }
})

export default router
