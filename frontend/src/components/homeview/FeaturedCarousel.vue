<script setup lang="ts">
import { computed } from "vue"
import { productService } from "@/services/productService"
import { useCarouselFetch } from "@/composables/useCarouselFetch"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import BaseCarousel from "../base/BaseCarousel.vue"
import ProductCard from "../organisms/ProductCard.vue"

const {
  items: products,
  isLoading,
  error
} = useCarouselFetch<ProductCardExtended>(
  productService.fetchFeatured,
  "Failed to load featured products"
)

const subtitle = computed(() => {
  if (isLoading.value) return "Polishing the bulbs…"

  if (error.value) return "Something dimmed the glow. Refresh to retry."

  return `${products.value.length} curated ${
    products.value.length === 1 ? "pick" : "picks"
  }`
})

const sectionHeaderData = computed(() => ({
  tagline: "Have you seen these future favorites?",
  headingId: "featured-products-section",
  title: "We think you'll like",
  subtitle: subtitle.value,
  link: {
    to: "/collections",
    text: "Shop all"
  },
  productType: "featured" as const,
  withNavigation: true
}))
</script>

<template>
  <!-- Featured Products -->
  <BaseCarousel
    :items="products"
    :is-loading="isLoading"
    :error="error"
    :section-header-data="sectionHeaderData"
    navigation-prefix="featured"
    :slides-per-view="1.5"
    :space-between="16"
    :centered-slides="true"
    :skeleton-count="4"
    :breakpoints="{
      640: {
        slidesPerView: 2.75,
        centeredSlides: false,
        spaceBetween: 12
      },
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 14
      },
      976: {
        slidesPerView: 3.5,
        centeredSlides: false,
        spaceBetween: 14
      },
      1024: {
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 14
      }
    }"
    class="px-3.5"
  >
    <template #heading>
      Lamps your space <br />
      will thank you for
    </template>

    <template #slide="{ item }">
      <ProductCard :product="item" />
    </template>
  </BaseCarousel>
</template>
