import { defineStore } from "pinia"
import { ref } from "vue"
import { useOverlayStore } from "./overlay"

export const useModalStore = defineStore("modal", () => {
  const STORE_ID = "modal"

  const overlayStore = useOverlayStore()
  const activeModal = ref<string | null>(null)

  function open(name: string) {
    activeModal.value = name
    overlayStore.setZIndex(100)
    overlayStore.open(STORE_ID)
  }

  function close() {
    activeModal.value = null
    overlayStore.close(STORE_ID)
  }

  return { activeModal, open, close }
})
