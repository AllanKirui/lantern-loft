<script setup lang="ts">
import { onMounted, onBeforeUnmount, inject, ref, computed, watch } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import { useSyncedSwiper } from "@/composables/useSyncedSwiper"
import { assetUrl } from "@/utils/assetUrl"
import type { ViewerContext } from "@/types/image-viewer"
import BaseCarouselNavButton from "@/components/base/BaseCarouselNavButton.vue"
import ImageAnchoredInfo from "@/components/common/ImageAnchoredInfo.vue"
import ProductImage from "@/components/common/ProductImage.vue"

const CAROUSEL_TYPE = "viewer"

// inject the viewer instance coming from ProductDetailHero.vue
const viewer = inject<ViewerContext>("viewer")!

const imageCount = computed(
  () => `${viewer.currentIndex.value + 1}/${viewer.images.value.length}`
)

// Tracks which full-size images have finished loading.
// Key = image index, Value = whether the image has been loaded.
const loadedImages = ref<Record<number, boolean>>({})

// Called when a full-size image finishes loading.
// Once marked as loaded, the image can immediately fade in
// without showing its LQIP placeholder again.
function markLoaded(index: number) {
  loadedImages.value[index] = true
}

// Returns whether the full-size image at the given index
// has already finished loading.
function isLoaded(index: number) {
  return !!loadedImages.value[index]
}

// Tracks which images have been requested at least once.
// This allows images to remain eligible for rendering after
// they have been visited, preventing unnecessary mount/unmount cycles.
const requestedImages = ref<Record<number, boolean>>({})

// Whenever the active slide changes, mark the current image
// and its immediate neighbors as requested. This creates a
// small preload window so adjacent images are ready before
// the user navigates to them.
watch(
  () => viewer.currentIndex.value,
  (current) => {
    requestedImages.value[current] = true

    if (current > 0) {
      requestedImages.value[current - 1] = true
    }

    if (current < viewer.images.value.length - 1) {
      requestedImages.value[current + 1] = true
    }
  },
  { immediate: true }
)

function hasRequested(index: number) {
  return !!requestedImages.value[index]
}

// Pan logic
const isPanning = ref(false)
let startX = 0
let startY = 0

function onWheel(e: WheelEvent) {
  e.preventDefault()

  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  const delta = e.deltaY > 0 ? -0.2 : 0.2

  viewer.zoomToPoint(e.clientX, e.clientY, viewer.scale.value + delta, rect)
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

  viewer.setPan(e.clientX - startX, e.clientY - startY)
}

function stopPan() {
  isPanning.value = false

  // trigger snap back when user stops panning
  viewer.clampPanToBounds()
}

function onDoubleClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  const nextScale = viewer.scale.value > 1 ? 1 : 2.5

  viewer.zoomToPoint(e.clientX, e.clientY, nextScale, rect)
}

// keep Swiper and viewer in sync
const { setSwiper, getSwiper, onSlideChange } = useSyncedSwiper(viewer)

function onSwiper(swiper: any) {
  setSwiper(swiper)
  viewer.registerZoomSwiper(swiper)

  updateContainerSize(swiper)
}

function handleSlideChange(swiper: any) {
  onSlideChange(swiper)
  updateContainerSize(swiper)
}

function updateContainerSize(swiper?: any) {
  const activeSwiper = swiper || getSwiper()
  if (!activeSwiper || activeSwiper.destroyed) return

  const activeSlide = activeSwiper.slides[activeSwiper.activeIndex]
  if (!activeSlide) return

  const figure = activeSlide.querySelector("figure")
  if (!figure) return

  const rect = figure.getBoundingClientRect()
  viewer.setContainerSize(rect.width, rect.height)
}

// update container size on resize
// throttle the resize listener
let resizeFrame: number | null = null

function handleResize() {
  if (resizeFrame) cancelAnimationFrame(resizeFrame)

  resizeFrame = requestAnimationFrame(() => {
    updateContainerSize()
  })
}

onMounted(() => {
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
})

// Recalculate container dimensions after the full-size image loads.
//
// Swiper may initialize before the image has reached its final
// rendered dimensions, which can lead to incorrect zoom and
// pan boundaries on the initial viewer open.
function handleImageLoad(index: number) {
  markLoaded(index)

  requestAnimationFrame(() => {
    updateContainerSize()
  })
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

        <transition name="zoom-hud">
          <ImageAnchoredInfo
            v-if="viewer.showZoomHud.value"
            x-position="left"
            y-position="top"
            class="px-1.5"
          >
            <div class="pointer-events-none backdrop-blur-sm">
              {{ viewer.zoomPercentage.value }}
            </div>
          </ImageAnchoredInfo>
        </transition>

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
          @swiper="onSwiper"
          @slideChange="handleSlideChange"
          class="sm_plus:max-w-sm xl:max-w-md"
        >
          <SwiperSlide
            v-for="(img, index) in viewer.images.value"
            :key="index"
            class=""
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div :class="{ 'swiper-no-swiping': viewer.scale.value > 1 }">
              <!-- Load the full image if this slide is the current one
              or one of its neighbors -->
              <ProductImage
                :image="img"
                :use-slot="true"
                :image-loaded="isLoaded(index)"
                :belongs-to-viewer="true"
                :load-full-image="
                  Math.abs(index - viewer.currentIndex.value) <= 1
                "
              >
                <div
                  :style="{
                    transform: `translate(${viewer.offsetX.value}px, ${viewer.offsetY.value}px)`,
                    transition: isPanning
                      ? 'none'
                      : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)'
                  }"
                  class="w-full h-full"
                  @wheel="onWheel"
                  @mousedown="startPan"
                  @mousemove="movePan"
                  @mouseup="stopPan"
                  @mouseleave="stopPan"
                  @dblclick.prevent="onDoubleClick"
                >
                  <picture v-if="hasRequested(index)">
                    <source :srcset="assetUrl(img.webp)" type="image/webp" />

                    <img
                      :src="assetUrl(img.png)"
                      :alt="img.alt"
                      class="w-full h-auto object-contain select-none"
                      :class="isLoaded(index) ? 'opacity-100' : 'opacity-0'"
                      :style="{
                        transform: `scale(${viewer.scale.value})`,
                        transition: isPanning
                          ? 'none'
                          : 'transform 250ms ease, opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor:
                          viewer.scale.value > 1
                            ? isPanning
                              ? 'grabbing'
                              : 'grab'
                            : 'default'
                      }"
                      loading="lazy"
                      draggable="false"
                      @load="handleImageLoad(index)"
                    />
                  </picture>
                </div>
              </ProductImage>
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

<style scoped>
.zoom-hud-enter-active,
.zoom-hud-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.zoom-hud-enter-from,
.zoom-hud-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
