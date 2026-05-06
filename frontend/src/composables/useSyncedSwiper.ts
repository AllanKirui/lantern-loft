import { ref, watch } from "vue"
import type { ViewerContext } from "@/types/image-viewer"

// export function useSyncedSwiper(currentIndex: Ref<number>) {
export function useSyncedSwiper(viewer: ViewerContext) {
  const swiperInstance = ref<any | null>(null)

  function setSwiper(swiper: any) {
    swiperInstance.value = swiper
  }

  // sync Swiper with viewer
  function onSlideChange(swiper: any) {
    if (viewer.currentIndex.value !== swiper.activeIndex) {
      viewer.currentIndex.value = swiper.activeIndex

      if (viewer.isOpen.value && viewer.scale.value > 1) {
        viewer.resetZoom()
      }
    }
  }

  // also sync Swiper when viewer index changes
  watch(
    () => viewer.currentIndex.value,
    (i) => {
      const swiper = swiperInstance.value
      if (!swiper || swiper.destroyed) return

      if (swiper.activeIndex !== i) {
        swiper.slideTo(i)
      }
    }
  )

  return {
    swiperInstance,
    setSwiper,
    onSlideChange
  }
}
