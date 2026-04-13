import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
import { useDesktopNavStore } from "./desktopNav"
import { useMobileNavStore } from "./mobileNav"
import { useFiltersStore } from "./filters"

export const useOverlayStore = defineStore("overlay", () => {
  const desktopNavStore = useDesktopNavStore()
  const mobileNavStore = useMobileNavStore()
  const filtersStore = useFiltersStore()

  const stack = ref<string[]>([])

  const isActive = computed(() => stack.value.length > 0)

  function open(id: string) {
    if (!stack.value.includes(id)) {
      stack.value.push(id)
    }
  }

  function close(id?: string) {
    if (!id) {
      // close everything
      stack.value = []
    } else {
      stack.value = stack.value.filter((item) => item !== id)
    }

    // clean up the UI when the stack is empty
    if (stack.value.length === 0) {
      if (desktopNavStore.activeDropdown) desktopNavStore.closeAll()
      if (mobileNavStore.activeDropdown) mobileNavStore.closeAll()
      if (filtersStore.sidebarVisible) filtersStore.close()
    }
  }

  function isTop(id: string) {
    return stack.value[stack.value.length - 1] === id
  }

  // Disable body scroll when overlay is active
  watch(
    isActive,
    (val) => {
      if (val) {
        document.body.style.top = `-${window.scrollY}px`
        document.body.style.position = "fixed"
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

  return { stack, isActive, open, close, isTop }
})
