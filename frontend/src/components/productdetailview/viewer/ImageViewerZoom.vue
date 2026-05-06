<script setup lang="ts">
import { inject, ref, computed } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import type { ViewerContext } from "@/types/image-viewer"
import BaseCarouselNavButton from "@/components/base/BaseCarouselNavButton.vue"
import ImageAnchoredInfo from "@/components/common/ImageAnchoredInfo.vue"

defineProps<{ imgSrc: string }>()

const CAROUSEL_TYPE = "viewer"

// inject the viewer instance coming from ProductDetailHero.vue
const viewer = inject<ViewerContext>("viewer")!

const imageCount = computed(
  () => `${viewer.currentIndex.value + 1}/${viewer.images.value.length}`
)

// Pan logic
const isPanning = ref(false)
let startX = 0
let startY = 0

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.2 : 0.2
  viewer.scale.value = Math.min(Math.max(viewer.scale.value + delta, 1), 4)
}

function startPan(e: MouseEvent) {
  if (e.button !== 0) return
  if (viewer.scale.value === 1) return

  e.preventDefault()
  e.stopPropagation() // allow panning when zoomed

  isPanning.value = true
  startX = e.clientX - viewer.offsetX.value
  startY = e.clientY - viewer.offsetY.value
}

function movePan(e: MouseEvent) {
  if (!isPanning.value) return

  e.preventDefault()
  e.stopPropagation() // allow panning when zoomed

  viewer.offsetX.value = e.clientX - startX
  viewer.offsetY.value = e.clientY - startY
}

function stopPan() {
  isPanning.value = false
}
</script>

<template>
  <div class="sm_plus:mt-3 w-full">
    <div class="flex items-center justify-between overflow-hidden">
      <!-- Previous image button -->
      <div class="hidden sm_plus:flex">
        <BaseCarouselNavButton
          :carousel-type="CAROUSEL_TYPE"
          direction="left"
          class="bg-cream w-10 h-10"
        />
      </div>

      <!-- Gallery container -->
      <div class="relative w-full sm_plus:w-auto">
        <ImageAnchoredInfo x-position="right" y-position="top" class="px-1.5">
          <div class="flex items-center gap-1">
            <BaseIcon name="photo" class="w-3.5 h-3.5" />
            <span>{{ imageCount }}</span>
          </div>
        </ImageAnchoredInfo>

        <Swiper
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
          :allow-touch-move="viewer.scale.value === 1"
          :no-swiping="viewer.scale.value > 1"
          :no-swiping-class="'swiper-no-swiping'"
          class="sm_plus:max-w-sm"
        >
          <SwiperSlide
            v-for="(_, index) in 5"
            :key="index"
            class=""
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div :class="{ 'swiper-no-swiping': viewer.scale.value > 1 }">
              <figure class="aspect-square bg-cream overflow-hidden">
                <!-- TODO use dynamic image data, src and alt -->
                <img
                  src="@/assets/img/storefront/products/4-recopyright.png"
                  alt="img.alt || product.name + ' image ' + (idx + 1)"
                  class="w-full h-auto object-contain select-none"
                  :style="{
                    transform: `translate(${viewer.offsetX.value}px, ${viewer.offsetY.value}px) scale(${viewer.scale.value})`,
                    cursor:
                      viewer.scale.value > 1
                        ? isPanning
                          ? 'grabbing'
                          : 'grab'
                        : 'default'
                  }"
                  draggable="false"
                  @wheel="onWheel"
                  @mousedown="startPan"
                  @mousemove="movePan"
                  @mouseup="stopPan"
                  @mouseleave="stopPan"
                />
              </figure>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Next image button -->
      <div class="hidden sm_plus:flex">
        <BaseCarouselNavButton
          :carousel-type="CAROUSEL_TYPE"
          direction="right"
          class="bg-cream w-10 h-10"
        />
      </div>
    </div>
  </div>
</template>
