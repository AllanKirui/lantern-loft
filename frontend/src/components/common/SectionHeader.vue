<script setup lang="ts">
import BaseCarouselNavButton from "../base/BaseCarouselNavButton.vue"

interface SectionHeader {
  tagline: string
  title: string
  headingId: string
  subheading?: {
    title: string
    subtitle: string
    link?: {
      to: string
      text: string
    }
  }
  withNavigation?: boolean
}

interface Props {
  data: SectionHeader
}

defineProps<Props>()
</script>

<template>
  <header class="px-[14px]">
    <div class="text-center">
      <div class="flex gap-1 justify-center items-center">
        <span
          class="inline-block w-[14px] h-[1px] md:w-6 md:h-[1.5px] bg-pale-brown"
        ></span>
        <p class="fs-tagline uppercase font-semibold">{{ data.tagline }}</p>
      </div>

      <h2
        :id="data.headingId"
        class="fs-h2 font-bold max-w-xs mx-auto leading-snug"
      >
        {{ data.title }}
      </h2>
    </div>

    <div class="sp-mt-section-sub-heading flex justify-between">
      <div>
        <h3 class="fs-h3 font-semibold leading-none">
          {{ data.subheading?.title }}
        </h3>
        <span
          class="fs-items-count text-pale-brown block mt-2 md:mt-[10px] font-medium leading-none"
          >{{ data.subheading?.subtitle }}</span
        >
      </div>

      <!-- Carousel navigation buttons and shop link-->
      <div class="flex md:items-center gap-3 h-fit bg-red-100">
        <div v-if="data.withNavigation" class="hidden md:flex gap-1">
          <BaseCarouselNavButton product-type="new" direction="left" />
          <BaseCarouselNavButton product-type="new" direction="right" />
        </div>
        <div v-if="data.subheading?.link?.to">
          <a
            :href="data.subheading?.link?.to"
            :data-replace="data.subheading?.link?.text"
            class="link-hover fs-shop-link font-medium"
            ><span>{{ data.subheading?.link?.text }}</span></a
          >
        </div>
      </div>
    </div>
  </header>
</template>
