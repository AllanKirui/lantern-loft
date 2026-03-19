<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import GridListProductCard from "./GridListProductCard.vue"
import PriceBlock from "../common/PriceBlock.vue"

interface Props {
  products: ProductCardExtended[]
}
defineProps<Props>()

const route = useRoute()
const routeName = computed(() => route.name as string)
</script>

<template>
  <section>
    <!-- TODO add info card -->

    <!-- Products grid -->
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
      role="list"
    >
      <template v-for="(product, index) in products">
        <div class="card-hover lg:max-w-3xl lg:mx-auto rounded-md">
          <GridListProductCard
            :product="product"
            class="animate-fade-in-down"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <PriceBlock
              :route-name="routeName"
              :price="product.price"
              :sale-price="product.discountPrice"
            />
          </GridListProductCard>
        </div>
      </template>
    </div>
  </section>
</template>
