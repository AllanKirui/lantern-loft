<script setup lang="ts">
import { computed, inject } from "vue"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import PriceBlock from "../common/PriceBlock.vue"
import AddToCartButton from "./AddToCartButton.vue"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!

const effectivePrice = computed(
  () => product.value.discountPrice ?? product.value.price
)
</script>

<template>
  <div class="mt-4">
    <!-- Pricing -->
    <PriceBlock
      :price="product.price"
      :sale-price="product.discountPrice"
      :make-larger="true"
    />

    <!-- Availability -->
    <div class="mt-2">
      <p class="text-green-700 text-sm">Available</p>
    </div>

    <!-- Shipping Info -->
    <div class="mt-2">
      <p class="text-sm">
        <a href="#" data-replace="Shipping" class="link-hover font-medium"
          ><span>Shipping</span></a
        >
        calculated at checkout.
      </p>
      <p class="mt-2 text-sm">Ships in 3-5 business days.</p>
    </div>

    <!-- Add to Cart -->
    <div class="mt-5">
      <AddToCartButton class="hidden md:flex" />
      <AddToCartButton
        :show-price="true"
        :price="effectivePrice"
        class="flex md:hidden"
      />

      <small class="block italic text-center mt-2">Cart coming soon.</small>
    </div>
  </div>
</template>
