import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

export const useFiltersStore = defineStore("filters", () => {
  const STORE_ID = "filters"

  const overlayStore = useOverlayStore()
  const sidebarVisible = ref(false)

  function toggleSidebar() {
    if (sidebarVisible.value) {
      overlayStore.close(STORE_ID)
    } else {
      overlayStore.setZIndex(100)
      overlayStore.open(STORE_ID)
    }

    sidebarVisible.value = !sidebarVisible.value
  }

  function close() {
    sidebarVisible.value = false
    overlayStore.close(STORE_ID)
  }

  return { sidebarVisible, toggleSidebar, close }
})
