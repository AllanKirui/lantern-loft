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
      if (val) {
        document.body.style.position = "fixed"
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.width = "100%"
      } else {
        const scrollY = document.body.style.top
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    },
    { immediate: true }
  )

  return { isActive, open, close, toggle }
})
