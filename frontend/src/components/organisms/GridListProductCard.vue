<script setup lang="ts">
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import StarRatingDisplay from "../common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"

interface Props {
  product: ProductCardExtended
}

defineProps<Props>()
</script>

<template>
  <article
    role="listitem"
    :aria-labelledby="`product-${product.id}`"
    class="m-[2px]"
  >
    <a
      :href="`/collections/${product.slug}`"
      :title="`Explore the ${product.name}`"
      class="group block"
    >
      <div>
        <!-- Product Image -->
        <div class="relative rounded-md overflow-hidden">
          <span class="absolute top-0 left-0 w-full h-full z-10"></span>
          <span v-if="product.isNew" class="new-arrival-label"
            >New Arrival</span
          >
          <div class="absolute right-2 top-2 z-20">
            <WishlistButton />
          </div>

          <figure
            class="relative aspect-square bg-cream rounded overflow-hidden"
          >
            <img
              src="@/assets/img/storefront/products/4-recopyright.png"
              class="w-full h-auto object-cover"
              :alt="product.name"
              loading="lazy"
            />
          </figure>
        </div>

        <!-- Product Details -->
        <div class="py-3 px-[10px] md:px-3">
          <h4
            :id="`product-${product.id}`"
            class="fs-product-card-name font-semibold leading-snug capitalize"
          >
            {{ product.name }}
          </h4>

          <p class="flex items-center gap-1.5 mt-2 leading-none">
            <StarRatingDisplay
              :product-id="product.id"
              :rating="product.rating"
            />
            <span
              v-if="product.reviewCount > 0"
              class="text-sm font-medium leading-none"
              >({{ product.reviewCount.toLocaleString() }})</span
            >
          </p>

          <!-- Previous price -->
          <!-- TODO use PriceBlock component -->
          <div
            v-if="product.discountPrice"
            class="flex items-center gap-2 flex-wrap mt-1"
          >
            <p
              class="flex items-baseline whitespace-nowrap mt-[1px] font-semibold text-pale-brown"
            >
              <span class="mr-[2px] text-sm leading-none">Was kes</span>
              <span class="leading-none">{{
                product.price.toLocaleString()
              }}</span>
            </p>
            <p
              class="flex items-baseline whitespace-nowrap px-1 py-[2px] rounded font-semibold text-cosmic-latte bg-red-pigment"
            >
              <span class="mr-[2px] text-sm leading-none">Save kes</span>
              <span class="leading-none">{{
                (product.price - product.discountPrice).toLocaleString()
              }}</span>
            </p>
          </div>

          <!-- Current Price -->
          <p class="mt-1 font-semibold">
            <span class="mr-[2px] fs-product-card-currency leading-none"
              >kes</span
            >
            <span class="text-[22px] leading-none">{{
              (product.discountPrice || product.price).toLocaleString()
            }}</span>
          </p>
        </div>
      </div>
    </a>
  </article>
</template>
