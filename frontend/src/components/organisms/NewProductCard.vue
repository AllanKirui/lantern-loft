<script setup lang="ts">
import type { ProductCardBase } from "@/types/products/product-card-base"

interface Props {
  product: ProductCardBase
}

defineProps<Props>()
</script>

<template>
  <article role="article" :aria-labelledby="`new-arrival-item-${product.id}`">
    <div class="relative">
      <span class="absolute top-0 left-0 w-full h-full z-10"></span>
      <span class="new-arrival-label">New Arrival</span>
      <figure class="relative aspect-square bg-cream overflow-hidden">
        <img
          src="@/assets/img/storefront/products/4-recopyright.png"
          :alt="product.image?.alt"
          class="w-full h-auto object-cover"
          loading="lazy"
        />
      </figure>
    </div>
    <div class="text-center mt-2">
      <BaseIcon name="hanging-bulb" class="w-[10px] h-8" />
      <p class="text-xs uppercase font-medium mt-2">Why we love the</p>
      <h4
        :id="`new-arrival-item-${product.id}`"
        class="mt-1 md:mt-2 fs-new-product-title font-semibold capitalize"
      >
        {{ product.name }}
      </h4>
      <p class="max-w-xs mx-auto mt-3">{{ product.shortDescription }}</p>
      <RouterLink
        :to="`/collections/${product.slug}`"
        class="link-hover font-medium mt-3 md:mt-4"
        data-replace="Explore"
      >
        <span>Explore</span>
      </RouterLink>
    </div>
  </article>
</template>
