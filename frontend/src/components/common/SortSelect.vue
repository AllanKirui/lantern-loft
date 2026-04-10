<script setup lang="ts">
import { inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import BaseSelect from "../base/BaseSelect.vue"

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const { sort } = inject<CollectionContext<ProductCardExtended>>("collection")!

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price, Low to High" },
  { value: "price_desc", label: "Price, High to Low" },
  { value: "alpha_asc", label: "Alphabetically, A-Z" },
  { value: "alpha_desc", label: "Alphabetically, Z-A" }
]
</script>

<template>
  <BaseSelect
    label="Sort by"
    select-id="sort"
    :sort-options="sortOptions"
    v-model="sort"
  />
</template>
