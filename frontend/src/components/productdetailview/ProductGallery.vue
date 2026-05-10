<script setup lang="ts">
import { inject, ref, computed } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import { useSyncedSwiper } from "@/composables/useSyncedSwiper"
import type { ViewerContext } from "@/types/image-viewer"
import BaseCarouselNavButton from "@/components/base/BaseCarouselNavButton.vue"
import ImageAnchoredInfo from "@/components/common/ImageAnchoredInfo.vue"
import ProductThumbnailList from "./ProductThumbnailList.vue"

const CAROUSEL_TYPE = "detail"

const mainSwiperRef = ref<any | null>(null)

function onGrabStart() {
  const el = mainSwiperRef.value.$el
  el.classList.add("cursor-grabbing")
  el.classList.remove("cursor-grab")
}

function onGrabEnd() {
  const el = mainSwiperRef.value.$el
  el.classList.add("cursor-grab")
  el.classList.remove("cursor-grabbing")
}

// inject the viewer instance coming from parent (ProductDetailHero.vue)
const viewer = inject<ViewerContext>("viewer")!

// TODO replace with real API data that should come from useProductDetail composable
const images = [
  { src: "/images/lamps/aurora-1.jpg", alt: "Aurora front" },
  { src: "/images/lamps/aurora-2.jpg", alt: "Aurora side" },
  { src: "/images/lamps/aurora-3.jpg", alt: "Aurora close up" },
  { src: "/images/lamps/aurora-4.jpg", alt: "Aurora in room" },
  { src: "/images/lamps/aurora-5.jpg", alt: "Aurora packaging" }
]

const imageCount = computed(
  () => `${viewer.currentIndex.value + 1}/${images.length}`
)

function openViewer(i: number) {
  viewer.open(images, i)
}

// keep Swiper and viewer in sync
const { setSwiper, onSlideChange } = useSyncedSwiper(viewer)

function onSwiper(swiper: any) {
  setSwiper(swiper)
  viewer.registerGallerySwiper(swiper)
}
</script>

<template>
  <div class="flex items-center gap-4 overflow-hidden">
    <!-- Previous image button -->
    <div class="hidden sm_plus:flex">
      <BaseCarouselNavButton
        :carousel-type="CAROUSEL_TYPE"
        direction="left"
        class="bg-cream w-9 h-9"
      />
    </div>

    <!-- Gallery container -->
    <div class="overflow-hidden">
      <div class="relative">
        <ImageAnchoredInfo x-position="right" y-position="top" class="px-1.5">
          <div class="flex items-center gap-1">
            <BaseIcon name="photo" class="w-3.5 h-3.5" />
            <span>{{ imageCount }}</span>
          </div>
        </ImageAnchoredInfo>

        <Swiper
          ref="mainSwiperRef"
          :modules="[Navigation, Keyboard]"
          :initial-slide="viewer.currentIndex.value"
          :navigation="{
            prevEl: `.${CAROUSEL_TYPE}-prev`,
            nextEl: `.${CAROUSEL_TYPE}-next`
          }"
          :keyboard="{
            enabled: true,
            onlyInViewport: true
          }"
          :slides-per-view="1"
          :space-between="10"
          @touchStart="onGrabStart"
          @touchEnd="onGrabEnd"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          class="md:max-w-lg rounded-lg cursor-grab"
        >
          <!-- TODO use dynamic image data, src and alt -->
          <SwiperSlide
            v-for="(_, index) in 5"
            :key="index"
            class="animate-fade-in-down"
          >
            <span
              class="absolute top-0 left-0 w-full h-full z-10"
              @click="openViewer(index)"
            ></span>
            <figure class="aspect-square bg-cream rounded-lg overflow-hidden">
              <img
                src="@/assets/img/storefront/products/4-recopyright.png"
                alt="img.alt || product.name + ' image ' + (idx + 1)"
                class="w-full md:max-w-lg h-auto object-contain"
              />
            </figure>
          </SwiperSlide>
        </Swiper>
      </div>

      <small class="hidden md:block italic text-center mt-2"
        >Click on image to open a zoomable view</small
      >

      <!-- Thumbnails container for medium screens -->
      <div class="hidden md:flex gap-3 mt-2 lg:hidden">
        <ProductThumbnailList />
      </div>
    </div>

    <!-- Next image button -->
    <div class="hidden sm_plus:flex">
      <BaseCarouselNavButton
        :carousel-type="CAROUSEL_TYPE"
        direction="right"
        class="bg-cream w-9 h-9"
      />
    </div>
  </div>
</template>
