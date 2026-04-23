<script setup lang="ts">
import StarRatingDisplay from "@/components/common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"

// TODO add dynamic product data
const product = {
  name: "Aurora Desk Lamp"
}
</script>

<template>
  <div>
    <span
      class="py-[3px] px-2 text-[11.4px] font-medium bg-black text-crayola uppercase rounded"
      >New</span
    >

    <div class="flex justify-between gap-3">
      <div>
        <h1 class="mt-1 font-semibold fs-pdp-product-name capitalize">
          {{ product.name }}
        </h1>

        <!-- Tagline -->
        <!-- TODO use dynamic data -->
        <p class="mt-1 font-medium fs-pdp-tagline">
          The perfect glow for every moment
        </p>

        <!-- Product Model, SKU -->
        <div class="mt-1">
          <!-- TODO use dynamic data -->
          <small class="mr-3"
            ><strong class="font-medium">Model:</strong> GLH-A1</small
          >
          <small><strong class="font-medium">SKU:</strong> 76342</small>
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
        <!-- TODO use dynamic data -->
        <span class="font-medium fs-pdp-rating leading-none">3.7</span>
        <StarRatingDisplay :rating="3.7" :size="22" class="md:hidden" />
        <StarRatingDisplay :rating="3.7" :size="24" class="hidden md:flex" />
      </div>

      <a
        v-if="true"
        href="#"
        class="flex-shrink-0 font-medium fs-pdp-reviews-count link-hover-alt"
        data-replace="1,234 reviews"
      >
        <span>{{ (1234).toLocaleString() }} reviews</span>
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
