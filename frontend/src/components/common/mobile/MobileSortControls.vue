<script setup lang="ts">
import { inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import { useMobileSheets } from "@/composables/useMobileSheets"

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const { perPage } =
  inject<CollectionContext<ProductCardExtended>>("collection")!

const { openSort, openPerPage } = useMobileSheets()
</script>

<template>
  <div class="flex gap-2 items-center">
    <button @click="openSort" class="mobile-sort-button">
      <span>Sort by</span>
      <BaseIcon name="chevron-alt" class="w-5 h-5 rotate-180" />
    </button>

    <button @click="openPerPage" class="mobile-sort-button">
      <span>{{ perPage }}</span>
      <BaseIcon name="chevron-alt" class="w-5 h-5 rotate-180" />
    </button>
  </div>
</template>
