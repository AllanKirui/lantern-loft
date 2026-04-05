<script setup lang="ts">
import { computed, inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { FiltersMetaContext } from "@/types/filters-meta"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import { capitalizeWords } from "@/utils/capitalizeWords"
import BaseCloseButton from "../base/BaseCloseButton.vue"

const meta = inject<FiltersMetaContext>("filtersMeta")!
const { roundedMax, roundedMin } = meta

const collection = inject<CollectionContext<ProductCardExtended>>("collection")!

const { filters, query, removeFilter } = collection

const minPrice = computed(() => filters.value.min_price)
const maxPrice = computed(() => filters.value.max_price)
const category = computed(() => query.value.category)

const activeFilters = computed(() => {
  const list: any[] = []

  if (category.value) {
    list.push({
      type: "category",
      label: category.value
    })
  }

  if (minPrice.value || maxPrice.value) {
    list.push({
      type: "price",
      label: `${(minPrice.value ?? roundedMin.value).toLocaleString()} - 
      ${(maxPrice.value ?? roundedMax.value).toLocaleString()}`
    })
  }

  // TODO add rating

  return list
})
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-3">
    <span
      v-for="(f, index) in activeFilters"
      :key="f.type"
      class="filter-badge animate-fade-in-down"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <span v-if="f.type === 'price'">
        <span class="mr-0.5 text-sm">kes</span>
        <span>
          {{ f.label }}
        </span>
      </span>
      <span v-else>{{ capitalizeWords(f.label) }}</span>

      <BaseCloseButton
        class="filter-badge-btn"
        title="Remove filter"
        :size="`16px`"
        @click="() => removeFilter(f.type)"
      />
    </span>
  </div>
</template>
