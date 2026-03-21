<script setup lang="ts">
import { computed } from "vue"
import { useLayoutStore } from "@/stores/layout"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import StarRatingDisplay from "../common/StarRatingDisplay.vue"
import WishlistButton from "../common/WishlistButton.vue"
import PriceBlock from "../common/PriceBlock.vue"

interface Props {
  product: ProductCardExtended
  useAdaptiveLayout?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useAdaptiveLayout: false
})

const layoutStore = useLayoutStore()
const layout = computed(() => {
  if (props.useAdaptiveLayout) return layoutStore.layout
  else return "grid"
})
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
      <div
        :class="{ 'grid grid-cols-5 sm_plus:grid-cols-4': layout === 'list' }"
      >
        <!-- Product Image -->
        <div
          :class="[
            'relative rounded-md overflow-hidden',
            layout === 'list' ? 'col-span-2 sm_plus:col-span-1' : ''
          ]"
        >
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
        <div
          :class="[
            'py-3 px-[10px] md:px-3',
            layout === 'list' ? 'col-span-3 pt-2 pb-1' : ''
          ]"
        >
          <h4
            :id="`product-${product.id}`"
            class="fs-product-card-name font-semibold leading-snug capitalize"
          >
            {{ product.name }}
          </h4>

          <template v-if="layout === 'list'">
            <small class="font-medium fs-product-card-tagline"
              >The perfect glow for every moment</small
            >
            <p class="mt-1 md:overflow-visible md:whitespace-normal">
              {{ product.shortDescription }}
            </p>
          </template>

          <div class="flex items-center gap-1.5 mt-2 leading-none">
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
      </div>
    </a>
  </article>
</template>
