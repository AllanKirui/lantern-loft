<script setup lang="ts">
import StarRatingDisplay from "../common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"

interface Product {
  id: number
  name: string
  reviewsCount: number
  finishesCount: number
  rating: number
  price: number
  discountedPrice: number
  isNew: boolean
  hasDiscount: boolean
}

interface Props {
  index: number
  product: Product
}

defineProps<Props>()
</script>

<template>
  <article
    role="article"
    :aria-labelledby="`featured-item-${index + 1}`"
    class="card-hover rounded-md m-[2px]"
  >
    <a href="#" :title="`Explore the ${product.name}`" class="group block">
      <!-- Product Image -->
      <div class="relative rounded-md overflow-hidden">
        <span class="absolute top-0 left-0 w-full h-full z-10"></span>
        <span v-if="product.isNew" class="new-arrival-label">New Arrival</span>
        <div class="absolute right-2 top-2 z-20">
          <WishlistButton />
        </div>
        <img
          src="@/assets/img/storefront/products/4-recopyright.png"
          class="w-full h-auto object-cover"
          :alt="product.name"
          loading="lazy"
        />
        <span
          v-if="product.finishesCount > 0"
          class="absolute bottom-2 left-2 px-1 py-[2px] rounded bg-black/75 text-cosmic-latte text-sm"
          >{{ `${product.finishesCount} finishes` }}</span
        >
      </div>

      <!-- Product Details -->
      <div class="py-3 px-[10px] md:px-3">
        <h4
          :id="`featured-item-${index + 1}`"
          class="fs-product-card-name font-semibold leading-none"
        >
          {{ product.name }}
        </h4>
        <p class="flex items-center gap-[6px] mt-[10px] leading-none">
          <StarRatingDisplay
            :product-id="product.id"
            :rating="product.rating"
          />
          <span
            v-if="product.reviewsCount > 0"
            class="text-sm font-medium leading-none"
            >({{ product.reviewsCount.toLocaleString() }})</span
          >
        </p>

        <!-- Previous price -->
        <div
          v-if="product.hasDiscount"
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
              (product.price - product.discountedPrice).toLocaleString()
            }}</span>
          </p>
        </div>

        <!-- Current Price -->
        <p class="mt-1 font-semibold">
          <span class="mr-[2px] fs-product-card-currency leading-none"
            >kes</span
          >
          <span v-if="product.hasDiscount" class="text-[22px] leading-none">{{
            product.discountedPrice.toLocaleString()
          }}</span>
          <span v-else class="text-[22px] leading-none">
            {{ product.price.toLocaleString() }}</span
          >
        </p>
      </div>
    </a>
  </article>
</template>

<style scoped>
.card-hover {
  transition: all 0.2s cubic-bezier(0.3, 0, 0.7, 1);
}
.card-hover:hover {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.08) 0px 1px 3px -1px;
  transform: translateY(-2px);
}
</style>
