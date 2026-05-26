<script setup lang="ts">
import { useLayoutStore } from "@/stores/layout"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import GridListProductCard from "./GridListProductCard.vue"
import ProductCardSkeleton from "../common/ProductCardSkeleton.vue"

interface Props {
  isLoading: boolean
  products: ProductCardExtended[]
}
defineProps<Props>()

const layoutStore = useLayoutStore()
</script>

<template>
  <section>
    <!-- TODO add info card -->

    <!-- Products grid -->
    <div
      :class="[
        layoutStore.layout === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4'
          : 'space-y-4'
      ]"
      role="list"
    >
      <template v-if="isLoading">
        <ProductCardSkeleton
          v-for="n in 12"
          :key="n"
          :use-adaptive-layout="true"
        />
      </template>
      <template v-else v-for="(product, index) in products">
        <div class="card-hover lg:max-w-3xl lg:mx-auto rounded-md">
          <GridListProductCard
            :product="product"
            class="animate-fade-in-down"
            :style="{ animationDelay: `${index * 0.1}s` }"
            :use-adaptive-layout="true"
          />
        </div>
      </template>
    </div>
  </section>
</template>
