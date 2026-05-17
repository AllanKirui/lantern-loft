<script setup lang="ts">
import { inject, computed } from "vue"
import { productService } from "@/services/productService"
import { useCarouselFetch } from "@/composables/useCarouselFetch"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import type { ProductCardExtended } from "@/types/products"
import BaseCarousel from "../base/BaseCarousel.vue"
import ProductCard from "../organisms/ProductCard.vue"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!

const {
  items: products,
  isLoading,
  error
} = useCarouselFetch<ProductCardExtended>(
  () => productService.fetchRecommended(product.value.slug),
  "Failed to load recommendations"
)

const subtitle = computed(() => {
  if (isLoading.value) return "Finding your next favorite…"

  if (error.value) return "Something dimmed the glow. Refresh to retry."

  return `${products.value.length} ${
    products.value.length === 1 ? "suggestion" : "suggestions"
  } for you`
})

const sectionHeaderData = computed(() => ({
  tagline: "Have you seen these future favorites?",
  headingId: "recommended-products-section",
  title: "You may also like",
  subtitle: subtitle.value,
  link: {
    to: "/collections",
    text: "Shop all"
  },
  productType: "recommended" as const,
  withNavigation: true
}))
</script>

<template>
  <BaseCarousel
    :items="products"
    :is-loading="isLoading"
    :error="error"
    :section-header-data="sectionHeaderData"
    navigation-prefix="recommended"
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
    class="px-0"
  >
    <template #heading>
      Your next favorite thing <br />
      might be right here
    </template>

    <template #slide="{ item }">
      <ProductCard :product="item" />
    </template>
  </BaseCarousel>
</template>
