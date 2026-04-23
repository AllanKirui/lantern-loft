<script setup lang="ts">
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import BaseCarouselNavButton from "@/components/base/BaseCarouselNavButton.vue"
import ImageAnchoredInfo from "@/components/common/ImageAnchoredInfo.vue"

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
</script>

<template>
  <div class="flex items-center gap-4 overflow-hidden">
    <!-- Previous image button -->
    <div class="hidden sm_plus:flex">
      <BaseCarouselNavButton
        :product-type="CAROUSEL_TYPE"
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
            <span>2/4</span>
          </div>
        </ImageAnchoredInfo>

        <Swiper
          ref="mainSwiperRef"
          :modules="[Navigation, Keyboard]"
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
          class="md:max-w-lg rounded-lg cursor-grab"
        >
          <!-- TODO use dynamic image data, src and alt -->
          <SwiperSlide
            v-for="(_, index) in 4"
            :key="index"
            class="animate-fade-in-down"
          >
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
    </div>

    <!-- Next image button -->
    <div class="hidden sm_plus:flex">
      <BaseCarouselNavButton
        :product-type="CAROUSEL_TYPE"
        direction="right"
        class="bg-cream w-9 h-9"
      />
    </div>
  </div>
</template>
