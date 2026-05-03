<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import BaseCarouselNavButton from "@/components/base/BaseCarouselNavButton.vue"
import ImageAnchoredInfo from "@/components/common/ImageAnchoredInfo.vue"

defineProps<{ imgSrc: string }>()

const CAROUSEL_TYPE = "viewer"
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
        <ImageAnchoredInfo x-position="right" y-position="top">
          <span class="text-base leading-none"
            >2/<span class="text-sm leading-none">4</span></span
          >
        </ImageAnchoredInfo>

        <Swiper
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
          class="sm_plus:max-w-sm"
        >
          <SwiperSlide
            v-for="(_, index) in 4"
            :key="index"
            class=""
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <figure class="aspect-square bg-cream overflow-hidden">
              <!-- TODO src and alt should be dynamic -->
              <img
                src="@/assets/img/storefront/products/4-recopyright.png"
                alt="img.alt || product.name + ' image ' + (idx + 1)"
                class="w-full md:max-w-lg h-auto object-contain"
              />
            </figure>
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
