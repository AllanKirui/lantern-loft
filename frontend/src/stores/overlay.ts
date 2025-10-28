import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useOverlayStore = defineStore("overlay", () => {
  const isActive = ref(false)

  function open() {
    isActive.value = true
  }

  function close() {
    isActive.value = false
  }

  function toggle() {
    isActive.value = !isActive.value
  }

  // Disable body scroll when overlay is active
  watch(
    isActive,
    (val) => {
      document.body.style.overflow = val ? "hidden" : ""
    },
    { immediate: true }
  )

  return { isActive, open, close, toggle }
})
