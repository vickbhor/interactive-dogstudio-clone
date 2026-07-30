import gsap from 'gsap'

let el = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ensureElement() {
  if (el) return el
  el = document.createElement('div')
  el.className = 'page-transition-curtain'
  document.body.appendChild(el)
  return el
}

export function coverTransition() {
  const node = ensureElement()
  if (prefersReducedMotion()) return Promise.resolve()

  return new Promise((resolve) => {
    gsap.set(node, { transformOrigin: 'bottom' })
    gsap.to(node, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: resolve,
    })
  })
}

export function revealTransition() {
  const node = ensureElement()
  if (prefersReducedMotion()) return Promise.resolve()

  return new Promise((resolve) => {
    gsap.set(node, { transformOrigin: 'top' })
    gsap.to(node, {
      scaleY: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      delay: 0.05,
      onComplete: resolve,
    })
  })
}
