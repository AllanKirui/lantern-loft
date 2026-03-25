import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

export const useFiltersStore = defineStore("filters", () => {
  const overlayStore = useOverlayStore()
  const sidebarVisible = ref(false)

  function toggleSidebar() {
    overlayStore[sidebarVisible.value ? "close" : "open"]()
    sidebarVisible.value = !sidebarVisible.value
  }

  function close() {
    sidebarVisible.value = false
    overlayStore.close()
  }

  return { sidebarVisible, toggleSidebar, close }
})
