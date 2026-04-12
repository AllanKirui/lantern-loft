<script setup lang="ts">
import { inject, computed } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import BottomSheet from "./BottomSheet.vue"

// Inject the collection instance coming from layout (StorefrontLayout.vue)
const { meta, perPage, applyChanges } =
  inject<CollectionContext<ProductCardExtended>>("collection")!

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const options = computed(() => {
  const total = meta.value?.total || 0
  const presets = [12, 24, 36]

  return presets.filter((n) => n <= total || n === 12)
})

function select(value: number) {
  // if the selected option is clicked, don't send an API request, just close the sheet
  if (value === perPage.value) {
    emit("close")
    return
  }

  applyChanges({
    perPage: value,
    query: { page: 1 }
  })

  emit("close")
}
</script>

<template>
  <BottomSheet :open="open" @close="$emit('close')">
    <h2 class="sort-title">Items Per Page</h2>

    <ul class="space-y-1">
      <li
        v-for="option in options"
        :key="option"
        @click="select(option)"
        class="sort-option"
        :class="{ 'bg-cream': perPage === option }"
      >
        <span>{{ option }} items</span>

        <span class="selected-indicator">
          <span v-if="perPage === option" class="active"></span>
        </span>
      </li>
    </ul>
  </BottomSheet>
</template>
