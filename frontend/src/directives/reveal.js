import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vReveal = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const opts = binding.value || {}
    const targets = opts.stagger ? Array.from(el.children) : el
    if (opts.stagger && targets.length === 0) return

    gsap.set(targets, { y: 40, opacity: 0 })

    const trigger = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: opts.stagger ? 0.08 : 0,
      delay: opts.delay || 0,
      clearProps: 'opacity',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    el._revealTween = trigger
  },
  unmounted(el) {
    if (el._revealTween?.scrollTrigger) {
      el._revealTween.scrollTrigger.kill()
    }
    el._revealTween?.kill()
  },
}
