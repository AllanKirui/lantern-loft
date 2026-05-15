<script setup lang="ts">
import { computed, inject } from "vue"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import StarRatingDisplay from "@/components/common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!

const tagline = computed(() => {
  const p = product.value
  return p.tagline.charAt(0).toUpperCase() + p.tagline.slice(1)
})

const rating = computed(() => product.value.reviews.meta.averageRating)

const hasReviews = computed(() => product.value.reviews.meta.count > 0)

const reviewsLinkText = computed(() => {
  const count = product.value.reviews.meta.count
  return count > 1 ? `${count.toLocaleString()} reviews` : `${count} review`
})
</script>

<template>
  <div>
    <span
      v-if="product.isNew"
      class="py-[3px] px-2 text-[11.4px] font-medium bg-black text-crayola uppercase rounded"
      >New</span
    >

    <div class="flex justify-between gap-3">
      <div>
        <h1 class="mt-1 font-semibold fs-pdp-product-name capitalize">
          {{ product.name }}
        </h1>

        <!-- Tagline -->
        <p class="mt-1 font-medium fs-pdp-tagline">
          {{ tagline }}
        </p>

        <!-- Product Model, SKU -->
        <div class="mt-1">
          <small class="mr-3"
            ><strong class="font-medium">Model:</strong>
            {{ product.modelCode }}</small
          >
          <small
            ><strong class="font-medium">SKU:</strong> {{ product.sku }}</small
          >
        </div>
      </div>

      <div class="flex gap-1">
        <!-- TODO add share button -->
        <WishlistButton class="w-9 h-9" scope="page" />
      </div>
    </div>

    <!-- Ratings -->
    <div class="flex items-center gap-4 flex-wrap mt-2 md:mt-3">
      <div class="flex items-center gap-2">
        <span class="font-medium fs-pdp-rating leading-none">
          {{ rating.toFixed(1) }}</span
        >
        <StarRatingDisplay :rating="rating" :size="22" class="md:hidden" />
        <StarRatingDisplay :rating="rating" :size="24" class="hidden md:flex" />
      </div>

      <a
        v-if="hasReviews"
        href="#"
        class="flex-shrink-0 font-medium fs-pdp-reviews-count link-hover-alt"
        :data-replace="reviewsLinkText"
      >
        <span>{{ reviewsLinkText }}</span>
      </a>
      <a
        v-else
        href="#"
        class="font-medium fs-pdp-reviews-count link-hover-alt"
        data-replace="Be the first to leave a review"
      >
        <span>Be the first to leave a review</span>
      </a>
    </div>
  </div>
</template>
