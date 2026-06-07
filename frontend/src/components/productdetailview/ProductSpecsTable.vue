<script setup lang="ts">
import { inject } from "vue"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import { humanizeKey } from "@/utils/humanizeKey"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!
</script>

<template>
  <section class="sp-mt-storefront-section max-w-4xl mx-auto">
    <h2 class="font-semibold text-lg">Technical specifications</h2>

    <div class="mt-3 overflow-x-auto">
      <table class="w-full">
        <tbody>
          <tr
            v-for="(val, key, index) in product.specs"
            :key="key"
            class="leading-normal"
            :class="{ 'bg-cream': index % 2 === 0 }"
          >
            <td class="p-2 font-medium w-1/3">
              {{ humanizeKey(key) }}
            </td>
            <td class="p-2">
              {{ key === "dimmable" ? (val ? "Yes" : "No") : val }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
