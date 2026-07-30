<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref(null)
const activeSlug = ref(null)

let renderer, scene, camera, clock, mixer
let animationId
let dogMaterial
const matcaps = {}

const CASE_MATCAP = {
  tomorrowland: 19,
  'navy-pier': 8,
  'msi-chicago': 9,
  phone: 12,
  kikk: 10,
  kennedy: 8,
  opera: 13,
}
const DEFAULT_MATCAP = 2

const CASE_BG = {
  tomorrowland: { img: '/tommorowland.png', color: 'rgb(4, 7, 24)' },
  'navy-pier': { img: '/navy-pier.png', color: 'rgb(4, 7, 24)' },
  'msi-chicago': { img: '/msi-chicago.png', color: 'rgb(4, 7, 24)' },
  phone: { img: '/phone.png', color: 'rgb(4, 7, 24)' },
  kikk: { img: '/kikk.png', color: 'rgba(1, 15, 92, 0.679)' },
  kennedy: { img: '/kennedy.png', color: 'rgb(4, 7, 24)' },
  opera: { img: '/opera.png', color: 'rgb(176, 4, 4)' },
}

const uProgressState = { value: 1.0 }
let uMatcap1Ref, uMatcap2Ref

function loadTextures() {
  const loader = new THREE.TextureLoader()
  const dogNormal = loader.load('/dog_normals.jpg')
  dogNormal.flipY = false
  dogNormal.colorSpace = THREE.SRGBColorSpace

  const branchMap = loader.load('/branches_diffuse.jpeg')
  branchMap.colorSpace = THREE.SRGBColorSpace
  const branchNormal = loader.load('/branches_normals.jpeg')
  branchNormal.colorSpace = THREE.SRGBColorSpace

  for (let i = 1; i <= 20; i++) {
    const tex = loader.load(`/matcap/mat-${i}.png`)
    tex.colorSpace = THREE.SRGBColorSpace
    matcaps[i] = tex
  }

  return { dogNormal, branchMap, branchNormal }
}

function buildMaterials({ dogNormal, branchMap, branchNormal }) {
  uMatcap1Ref = { value: matcaps[19] }
  uMatcap2Ref = { value: matcaps[DEFAULT_MATCAP] }

  dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: dogNormal,
    matcap: matcaps[DEFAULT_MATCAP],
  })

  dogMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uMatcapTexture1 = uMatcap1Ref
    shader.uniforms.uMatcapTexture2 = uMatcap2Ref
    shader.uniforms.uProgress = uProgressState

    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      `
      uniform sampler2D uMatcapTexture1;
      uniform sampler2D uMatcapTexture2;
      uniform float uProgress;

      void main() {
      `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4 matcapColor = texture2D( matcap, uv );',
      `
      vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
      vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
      float transitionFactor = 0.2;
      float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);
      vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
      `
    )
  }

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormal,
    map: branchMap,
  })

  return { dogMaterial, branchMaterial }
}

function setupScrollTimeline(dogGroup) {
  const section1 = document.getElementById('section-1')
  const section3 = document.getElementById('section-3')
  if (!section1 || !section3) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#section-1',
      endTrigger: '#section-3',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  })

  tl
    .to(dogGroup.position, { z: '-=0.75', y: '+=0.1' })
    .to(dogGroup.rotation, { x: `+=${Math.PI / 15}` })
    .to(dogGroup.rotation, { y: `-=${Math.PI}` }, 'third')
    .to(dogGroup.position, { x: '-=0.5', z: '+=0.6', y: '-=0.05' }, 'third')
}

function setupHoverDelegation() {
  document.addEventListener('mouseover', (e) => {
    const titleEl = e.target.closest('.title[img-title]')
    if (!titleEl) return
    const slug = titleEl.getAttribute('img-title')
    if (slug === activeSlug.value) return
    activeSlug.value = slug

    const matIndex = CASE_MATCAP[slug] || DEFAULT_MATCAP
    uMatcap1Ref.value = matcaps[matIndex]
    gsap.to(uProgressState, {
      value: 0.0,
      duration: 0.3,
      onComplete: () => {
        uMatcap2Ref.value = uMatcap1Ref.value
        uProgressState.value = 1.0
      },
    })
  })

  document.addEventListener('mouseover', (e) => {
    const stillInTitles = e.target.closest('.titles')
    if (stillInTitles) return
    if (activeSlug.value === null) return
    activeSlug.value = null

    uMatcap1Ref.value = matcaps[DEFAULT_MATCAP]
    gsap.to(uProgressState, {
      value: 0.0,
      duration: 0.3,
      onComplete: () => {
        uMatcap2Ref.value = uMatcap1Ref.value
        uProgressState.value = 1.0
      },
    })
  })
}

function loadModel() {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  const textures = loadTextures()
  const { dogMaterial: dogMat, branchMaterial } = buildMaterials(textures)

  loader.load(
    '/models/dog.drc.glb',
    (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) console.log('Mesh name: ',child.name)
        {
          child.material = child.name.includes('DOG') ? dogMat : branchMaterial
        }
      })

      gltf.scene.position.set(0.25,-0.55, 0)
      gltf.scene.rotation.set(0, Math.PI / 3.9, 0)
      scene.add(gltf.scene)
      console.log(gltf.scene)

      if (gltf.animations?.length) {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const clip = THREE.AnimationClip.findByName(gltf.animations, 'Take 001') || gltf.animations[0]
        mixer.clipAction(clip).play()
      }

      setupScrollTimeline(gltf.scene)
    },
    undefined,
    (error) => {
      console.warn('Model failed to load — check /models/dog.drc.glb exists:', error)
    }
  )
}

function animate() {
  animationId = requestAnimationFrame(animate)
  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)
  renderer.render(scene, camera)
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  clock = new THREE.Clock()
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 0.55) 
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const keyLight = new THREE.DirectionalLight(0xffffff, 10) 
  keyLight.position.set(0, 5, 5)
  scene.add(keyLight)

  loadModel()
  setupHoverDelegation()

  window.addEventListener('resize', onResize)
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  ScrollTrigger.getAll().forEach(t => t.kill())
  renderer?.dispose()
})
</script>

<template>
  <div class="dog-scene">
    <div
      class="dog-scene-backdrop"
      :style="{
        backgroundImage: activeSlug ? `url(${CASE_BG[activeSlug].img})` : 'url(/background-l.png)',
        backgroundColor: activeSlug ? CASE_BG[activeSlug].color : 'transparent',
      }"
    ></div>
    <canvas ref="canvasRef" class="dog-scene-canvas"></canvas>
  </div>
</template>

<style scoped>
.dog-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}

.dog-scene-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s linear;
}

.dog-scene-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
