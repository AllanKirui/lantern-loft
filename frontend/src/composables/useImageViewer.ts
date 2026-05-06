import { ref } from "vue"
import { useModalStore } from "@/stores/modal"

type Image = { src: string; alt: string }

export function useImageViewer() {
  const modalStore = useModalStore()

  const images = ref<Image[]>([])
  const currentIndex = ref(0)

  // shared zoom state
  const scale = ref(1)
  const offsetX = ref(0)
  const offsetY = ref(0)

  function open(imgs: Image[], index = 0) {
    images.value = imgs
    currentIndex.value = index
    resetZoom()
    modalStore.open("imageViewer")
  }

  function close() {
    modalStore.close()
  }

  function goTo(index: number) {
    if (index < 0) return

    currentIndex.value = index
    resetZoom()
  }

  function zoomIn() {
    scale.value = Math.min(scale.value + 0.5, 4)
  }

  function zoomOut() {
    scale.value = Math.max(scale.value - 0.5, 1)
    if (scale.value === 1) resetPan()
  }

  function resetPan() {
    offsetX.value = 0
    offsetY.value = 0
  }

  function resetZoom() {
    scale.value = 1
    resetPan()
  }

  return {
    images,
    currentIndex,

    scale,
    offsetX,
    offsetY,

    open,
    close,
    goTo,
    zoomIn,
    zoomOut,
    resetZoom
  }
}
