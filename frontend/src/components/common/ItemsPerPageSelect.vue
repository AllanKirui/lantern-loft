<script setup lang="ts">
import { inject, computed, watch } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import BaseSelect from "../base/BaseSelect.vue"

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const { meta, perPage, applyChanges } =
  inject<CollectionContext<ProductCardExtended>>("collection")!

// Make per page options dynamic
const itemsPerPageOptions = computed(() => {
  const total = meta.value?.total || 0
  const presets = [12, 24, 36]

  return presets.filter((n) => n <= total || n === 12)
})

const itemsPerPageSortOptions = computed(() =>
  itemsPerPageOptions.value.map((value) => ({
    value,
    label: `${value} per page`
  }))
)

function onPerPageChange(value: string | number) {
  const next = Number(value)

  const options = itemsPerPageOptions.value

  // If selected value is not valid, correct it before request
  const finalValue = options.includes(next) ? next : options[0]

  applyChanges({
    perPage: finalValue,
    query: { page: 1 }
  })
}

watch(itemsPerPageOptions, (options) => {
  if (!options.length) return

  if (!options.includes(perPage.value)) {
    // Correct the value shown on the select
    perPage.value = options[0]
  }
})
</script>

<template>
  <BaseSelect
    label="Items per page"
    :hide-label="true"
    select-id="perPage"
    :sort-options="itemsPerPageSortOptions"
    v-model="perPage"
    @change="onPerPageChange"
  />
</template>
