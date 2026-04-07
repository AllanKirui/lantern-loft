<script setup lang="ts">
import BaseCarouselNavButton from "../base/BaseCarouselNavButton.vue"

interface SectionHeaderOptions {
  tagline: string
  headingId: string
  title?: string
  subtitle?: string
  link?: {
    to: string
    text: string
  }
  productType?: "new" | "featured"
  withNavigation?: boolean
}

interface Props {
  data: SectionHeaderOptions
}

defineProps<Props>()
</script>

<template>
  <header>
    <div class="text-center">
      <div class="flex gap-1 justify-center items-center">
        <span
          class="inline-block w-[14px] h-[1px] md:w-6 md:h-[1.5px] bg-pale-brown"
        ></span>
        <p class="text-xs uppercase font-semibold">{{ data.tagline }}</p>
      </div>

      <h2
        :id="data.headingId"
        class="fs-h2 font-bold max-w-xs mx-auto leading-snug"
      >
        <slot name="heading" />
      </h2>
    </div>

    <div
      v-if="data.title"
      class="sp-mt-section-sub-heading flex justify-between"
    >
      <div>
        <h3 class="fs-h3 font-semibold leading-none">
          {{ data.title }}
        </h3>
        <span
          class="fs-items-count text-pale-brown block mt-2 md:mt-[10px] font-medium leading-none"
          >{{ data.subtitle }}</span
        >
      </div>

      <!-- Carousel navigation buttons and shop link-->
      <div class="flex md:items-center gap-3 h-fit">
        <div v-if="data.withNavigation" class="hidden md:flex gap-1">
          <BaseCarouselNavButton
            :product-type="data.productType"
            direction="left"
          />
          <BaseCarouselNavButton
            :product-type="data.productType"
            direction="right"
          />
        </div>
        <div v-if="data.link">
          <RouterLink
            :to="data.link?.to"
            :data-replace="data.link?.text"
            class="link-hover fs-shop-link font-medium"
            ><span>{{ data.link?.text }}</span></RouterLink
          >
        </div>
      </div>
    </div>
  </header>
</template>
