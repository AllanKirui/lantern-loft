import { ref, computed, watch } from "vue"
import { useModalStore } from "@/stores/modal"

type Image = { src: string; alt: string }

export function useImageViewer() {
  const modalStore = useModalStore()

  const isOpen = computed(() => modalStore.activeModal === "imageViewer")
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

  // Swiper instances
  const gallerySwiper = ref<any | null>(null)
  const zoomSwiper = ref<any | null>(null)

  function registerGallerySwiper(swiper: any) {
    gallerySwiper.value = swiper
    syncKeyboardControl()
  }

  function registerZoomSwiper(swiper: any) {
    zoomSwiper.value = swiper
    syncKeyboardControl()
  }

  function unregisterGallerySwiper() {
    gallerySwiper.value = null
  }

  function unregisterZoomSwiper() {
    zoomSwiper.value = null
  }

  function isValidSwiper(swiper: any) {
    return swiper && !swiper.destroyed
  }

  function syncKeyboardControl() {
    if (isValidSwiper(gallerySwiper.value)) {
      if (isOpen.value) {
        gallerySwiper.value.keyboard.disable()
      } else {
        gallerySwiper.value.keyboard.enable()
      }
    }

    if (isValidSwiper(zoomSwiper.value)) {
      if (isOpen.value) {
        zoomSwiper.value.keyboard.enable()
      } else {
        zoomSwiper.value.keyboard.disable()
      }
    }
  }

  watch(isOpen, () => {
    syncKeyboardControl()
  })

  return {
    isOpen,
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
    resetZoom,
    registerGallerySwiper,
    registerZoomSwiper,
    unregisterGallerySwiper,
    unregisterZoomSwiper
  }
}
