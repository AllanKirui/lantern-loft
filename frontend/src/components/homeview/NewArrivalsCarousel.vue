<script setup lang="ts">
import { computed } from "vue"
import { productService } from "@/services/productService"
import { useCarouselFetch } from "@/composables/useCarouselFetch"
import type { ProductCardBase } from "@/types/products/product-card-base"
import BaseCarousel from "../base/BaseCarousel.vue"
import NewProductCard from "../organisms/NewProductCard.vue"

const {
  items: products,
  isLoading,
  error
} = useCarouselFetch<ProductCardBase>(
  productService.fetchNewArrivals,
  "Failed to load new arrivals"
)

const subtitle = computed(() => {
  if (isLoading.value) return "Switching on something special…"

  if (error.value) return "Something dimmed the glow. Refresh to retry."

  return `${products.value.length} glowing ${
    products.value.length === 1 ? "newcomer" : "newcomers"
  }`
})

const sectionHeaderData = computed(() => ({
  tagline: "Trending right now",
  headingId: "new-arrivals-section",
  title: "What's new",
  subtitle: subtitle.value,
  link: {
    to: "/collections",
    text: "Shop all"
  },
  productType: "new" as const,
  withNavigation: true
}))
</script>

<template>
  <!-- New Arrivals -->
  <BaseCarousel
    :items="products"
    :is-loading="isLoading"
    :error="error"
    :section-header-data="sectionHeaderData"
    navigation-prefix="new"
    :slides-per-view="1.12"
    :space-between="16"
    :centered-slides="true"
    :skeleton-count="3"
    :is-for-new-products="true"
    :breakpoints="{
      640: {
        centeredSlides: false,
        slidesPerView: 2.1,
        spaceBetween: 16
      },
      768: {
        centeredSlides: false,
        slidesPerView: 2.2,
        spaceBetween: 18
      },
      976: {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 18
      }
    }"
    class="px-3.5"
  >
    <template #heading>
      Treat your home <br />
      to something new
    </template>

    <template #slide="{ item }">
      <NewProductCard :product="item" />
    </template>
  </BaseCarousel>
</template>
