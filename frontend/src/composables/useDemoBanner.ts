import { ref } from "vue"

const STORAGE_KEY = "lantern-loft-demo-banner-dismissed"

const isVisible = ref(sessionStorage.getItem(STORAGE_KEY) !== "true")

function dismiss() {
  sessionStorage.setItem(STORAGE_KEY, "true")
  isVisible.value = false
}

export function useDemoBanner() {
  return {
    isVisible,
    dismiss
  }
}
