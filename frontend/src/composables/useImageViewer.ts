import { ref, computed, watch } from "vue"
import { useModalStore } from "@/stores/modal"
import type { ProductImage } from "@/types/products"

export function useImageViewer() {
  const modalStore = useModalStore()

  const isOpen = computed(() => modalStore.activeModal === "imageViewer")
  const images = ref<ProductImage[]>([])
  const currentIndex = ref(0)

  // shared zoom state
  const scale = ref(1)
  const offsetX = ref(0)
  const offsetY = ref(0)

  function open(imgs: ProductImage[], index = 0) {
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

  function zoomToPoint(
    clientX: number,
    clientY: number,
    newScale: number,
    rect: DOMRect
  ) {
    const oldScale = scale.value

    // clamp scale
    newScale = clamp(newScale, 1, 4)

    // no-op
    if (newScale === oldScale) return

    // cursor position relative to container center
    const pointX = clientX - rect.left - rect.width / 2
    const pointY = clientY - rect.top - rect.height / 2

    // scale ratio
    const scaleRatio = newScale / oldScale

    // Recalculate offsets so the clicked point visually stays in the same place.
    const nextOffsetX = pointX - (pointX - offsetX.value) * scaleRatio
    const nextOffsetY = pointY - (pointY - offsetY.value) * scaleRatio

    scale.value = newScale

    // apply pan with resistance
    setPan(nextOffsetX, nextOffsetY)

    // prevent tiny gaps after zooming out
    clampPanToBounds()

    // fully reset when returning to scale 1
    if (newScale === 1) {
      resetPan()
    }
  }

  function resetPan() {
    offsetX.value = 0
    offsetY.value = 0
  }

  function resetZoom() {
    scale.value = 1
    resetPan()
  }

  const showZoomHud = ref(false)
  let zoomHudTimeout: number | null = null

  function triggerZoomHud() {
    showZoomHud.value = true

    if (zoomHudTimeout) {
      clearTimeout(zoomHudTimeout)
    }

    zoomHudTimeout = window.setTimeout(() => {
      showZoomHud.value = false
    }, 1000)
  }

  const zoomPercentage = computed(() => {
    return `${Math.round(scale.value * 100)}%`
  })

  // set pan boundaries to prevent zoomed image from drifting into empty space
  const containerWidth = ref(0)
  const containerHeight = ref(0)

  function setContainerSize(width: number, height: number) {
    containerWidth.value = width
    containerHeight.value = height
  }

  // calculate pan boundaries
  const maxOffsetX = computed(() => {
    return ((scale.value - 1) * containerWidth.value) / 2
  })

  const maxOffsetY = computed(() => {
    return ((scale.value - 1) * containerHeight.value) / 2
  })

  function setPan(x: number, y: number) {
    offsetX.value = applyResistance(x, -maxOffsetX.value, maxOffsetX.value)

    offsetY.value = applyResistance(y, -maxOffsetY.value, maxOffsetY.value)
  }

  // snap back to boundaries when image is panned past it's boundaries
  function clampPanToBounds() {
    offsetX.value = clamp(offsetX.value, -maxOffsetX.value, maxOffsetX.value)

    offsetY.value = clamp(offsetY.value, -maxOffsetY.value, maxOffsetY.value)
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
  }

  // elastic resistance when image is panned past it's boundary
  function applyResistance(
    value: number,
    min: number,
    max: number,
    resistance = 0.35
  ) {
    // inside bounds
    if (value >= min && value <= max) {
      return value
    }

    // overscrolling left/top
    if (value < min) {
      return min + (value - min) * resistance
    }

    // overscrolling right/bottom
    return max + (value - max) * resistance
  }

  // set new pan boundaries when zoom changes
  watch(scale, () => {
    triggerZoomHud()

    clampPanToBounds()

    if (scale.value === 1) {
      resetPan()
    }
  })

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
    maxOffsetX,
    maxOffsetY,
    showZoomHud,
    zoomPercentage,

    open,
    close,
    goTo,
    zoomIn,
    zoomOut,
    resetZoom,
    registerGallerySwiper,
    registerZoomSwiper,
    unregisterGallerySwiper,
    unregisterZoomSwiper,
    setContainerSize,
    setPan,
    clampPanToBounds,
    zoomToPoint,
    triggerZoomHud
  }
}
