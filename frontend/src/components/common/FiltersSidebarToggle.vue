<script setup lang="ts">
import { inject } from "vue"
import { useFiltersStore } from "@/stores/filters"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"

const filtersStore = useFiltersStore()

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const collection = inject<CollectionContext<ProductCardExtended>>("collection")!
</script>

<template>
  <button
    class="flex items-center gap-2 btn-secondary py-[5px] px-2 min-h-[34px] fs-filters-sidebar-toggle"
    @click="filtersStore.toggleSidebar"
  >
    <BaseIcon name="filter" class="w-4 h-4" />
    <span class="hidden md:flex"
      >{{ filtersStore.sidebarVisible ? "Hide" : "Show" }} filters ({{
        collection.filterCount
      }})</span
    >
    <span class="flex md:hidden">Filters ({{ collection.filterCount }})</span>
  </button>
</template>
