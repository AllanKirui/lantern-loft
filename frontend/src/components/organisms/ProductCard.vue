<script setup lang="ts">
import ImageAnchoredInfo from "../common/ImageAnchoredInfo.vue"
import StarRatingDisplay from "../common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"
import PriceBlock from "../common/PriceBlock.vue"
import type { ProductCardExtended } from "@/types/products/product-card-extended"

interface Props {
  product: ProductCardExtended
}

defineProps<Props>()
</script>

<template>
  <article
    role="article"
    :aria-labelledby="`product-card-item-${product.id}`"
    class="card-hover rounded-md m-[2px]"
  >
    <a
      :href="`/collections/${product.slug}`"
      :title="`Explore the ${product.name}`"
      class="group block"
    >
      <!-- Product Image -->
      <div class="relative rounded-md overflow-hidden">
        <span class="absolute top-0 left-0 w-full h-full z-10"></span>
        <span v-if="product.isNew" class="new-arrival-label">New Arrival</span>
        <div class="absolute right-2 top-2 z-20">
          <WishlistButton />
        </div>
        <figure class="relative aspect-square bg-cream rounded overflow-hidden">
          <!-- TODO add correct image src from image.url, to NewProductCard as well -->
          <img
            src="@/assets/img/storefront/products/4-recopyright.png"
            class="w-full h-auto object-cover"
            :alt="product.image?.alt"
            loading="lazy"
          />
          <ImageAnchoredInfo
            v-if="product.finishesCount > 0"
            x-position="left"
            y-position="bottom"
          >
            {{
              `${product.finishesCount} ${
                product.finishesCount === 1 ? "finish" : "finishes"
              }`
            }}
          </ImageAnchoredInfo>
        </figure>
      </div>

      <!-- Product Details -->
      <div class="py-3 px-[10px] md:px-3">
        <h4
          :id="`product-card-item-${product.id}`"
          class="fs-product-card-name font-semibold leading-snug capitalize"
        >
          {{ product.name }}
        </h4>
        <div class="flex items-center gap-[6px] mt-[10px] leading-none">
          <StarRatingDisplay :rating="product.rating" />
          <span
            v-if="product.reviewCount > 0"
            class="text-sm font-medium leading-none"
            >({{ product.reviewCount.toLocaleString() }})</span
          >
        </div>

        <PriceBlock
          :price="product.price"
          :sale-price="product.discountPrice"
        />
      </div>
    </a>
  </article>
</template>
