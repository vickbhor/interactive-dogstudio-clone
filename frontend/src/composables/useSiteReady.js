import { ref } from 'vue'

export const siteReady = ref(false)

export function markSiteReady() {
  siteReady.value = true
}
