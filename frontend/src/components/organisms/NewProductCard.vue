<script setup lang="ts">
interface NewProduct {
  id: number
  title: string
  description: string
}

interface Props {
  index: number
  product: NewProduct
}

defineProps<Props>()
</script>

<template>
  <article role="article" :aria-labelledby="`new-arrival-item-${index + 1}`">
    <div class="relative">
      <span class="absolute top-0 left-0 w-full h-full z-10"></span>
      <span class="new-arrival-label">New Arrival</span>
      <img
        src="@/assets/img/storefront/products/4-recopyright.png"
        :alt="product.title"
        class="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
    <div class="text-center mt-2">
      <BaseIcon name="hanging-bulb" class="w-[10px] h-8" />
      <p class="text-xs uppercase font-medium mt-2">Why we love the</p>
      <h4
        :id="`new-arrival-item-${index + 1}`"
        class="mt-1 md:mt-2 fs-new-product-title font-semibold"
      >
        {{ product.title }}
      </h4>
      <p class="max-w-xs mx-auto mt-3">
        {{ product.description }}
      </p>
      <a
        href="#"
        class="link-hover font-medium mt-3 md:mt-4"
        data-replace="Explore"
      >
        <span>Explore</span>
      </a>
    </div>
  </article>
</template>
