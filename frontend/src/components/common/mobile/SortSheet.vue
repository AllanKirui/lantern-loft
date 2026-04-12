<script setup lang="ts">
import { inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import BottomSheet from "./BottomSheet.vue"

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const { sort } = inject<CollectionContext<ProductCardExtended>>("collection")!

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const options = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price, Low to High" },
  { value: "price_desc", label: "Price, High to Low" },
  { value: "alpha_asc", label: "Alphabetically, A-Z" },
  { value: "alpha_desc", label: "Alphabetically, Z-A" }
]

function select(value: string) {
  // if the selected option is clicked, don't send an API request, just close the sheet
  if (value === sort.value) {
    emit("close")
    return
  }

  sort.value = value

  emit("close")
}
</script>

<template>
  <BottomSheet :open="open" @close="$emit('close')">
    <h2 class="sort-title">Sort By</h2>

    <ul class="space-y-1">
      <li
        v-for="option in options"
        :key="option.value"
        @click="select(option.value)"
        class="sort-option"
        :class="{ 'bg-cream': sort === option.value }"
      >
        <span>{{ option.label }}</span>

        <!-- <span v-if="sort === option.value">✓</span> -->
        <span class="selected-indicator">
          <span v-if="sort === option.value" class="active"></span>
        </span>
      </li>
    </ul>
  </BottomSheet>
</template>
