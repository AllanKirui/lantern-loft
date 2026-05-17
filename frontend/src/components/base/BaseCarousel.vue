<script setup lang="ts">
import { computed, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import type { SectionHeaderOptions } from "@/types/section-header-options"
import SectionHeader from "@/components/common/SectionHeader.vue"
import ProductSkeleton from "@/components/common/ProductSkeleton.vue"
import NoItemsFound from "@/components/common/NoItemsFound.vue"

interface Props {
  items: any[]
  isLoading: boolean
  error: string | null
  sectionHeaderData: SectionHeaderOptions
  slidesPerView: number
  spaceBetween: number
  navigationPrefix: string
  centeredSlides?: boolean
  breakpoints?: Record<string, any>
  skeletonCount?: number
  isForNewProducts?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  skeletonCount: 4,
  centeredSlides: false,
  isForNewProducts: false
})

const swiperRef = ref<any | null>(null)

function onGrabStart() {
  const el = swiperRef.value?.$el

  if (!el) return

  el.classList.add("cursor-grabbing")
  el.classList.remove("cursor-grab")
}

function onGrabEnd() {
  const el = swiperRef.value?.$el

  if (!el) return

  el.classList.add("cursor-grab")
  el.classList.remove("cursor-grabbing")
}

const navigation = computed(() => ({
  prevEl: `.${props.navigationPrefix}-prev`,
  nextEl: `.${props.navigationPrefix}-next`
}))
</script>

<template>
  <section
    :aria-labelledby="sectionHeaderData.headingId"
    class="sp-mt-storefront-section px-[14px]"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #heading>
        <slot name="heading" />
      </template>
    </SectionHeader>

    <Swiper
      ref="swiperRef"
      :modules="[Navigation, Keyboard]"
      :navigation="navigation"
      :keyboard="{
        enabled: true,
        onlyInViewport: true
      }"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :centered-slides="centeredSlides"
      :centered-slides-bounds="centeredSlides"
      :breakpoints="breakpoints"
      @touchStart="onGrabStart"
      @touchEnd="onGrabEnd"
      class="sp-mt-swiper-wrapper"
      :class="{ 'cursor-grab': !isLoading }"
    >
      <template v-if="isLoading">
        <SwiperSlide v-for="n in skeletonCount" :key="n">
          <ProductSkeleton :is-for-new-products="isForNewProducts" />
        </SwiperSlide>
      </template>

      <template v-else>
        <SwiperSlide
          v-for="(item, index) in items"
          :key="item.id"
          class="animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <slot name="slide" :item="item" />
        </SwiperSlide>
      </template>
    </Swiper>

    <NoItemsFound v-if="error">
      <template #message>
        <div>
          <p>Looks like the lights flickered.</p>
          <p class="mt-2">Try again.</p>
        </div>
      </template>
    </NoItemsFound>
  </section>
</template>
