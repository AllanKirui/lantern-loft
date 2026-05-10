<script setup lang="ts">
import { inject } from "vue"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!
</script>

<template>
  <section class="sp-mt-storefront-section max-w-4xl mx-auto">
    <h2 class="font-semibold text-lg">Product details</h2>

    <ul class="mt-3 list-disc pl-6">
      <li
        v-for="(detail, index) in product.details"
        :key="index"
        class="leading-normal"
      >
        {{ detail }}
      </li>
    </ul>
  </section>
</template>
