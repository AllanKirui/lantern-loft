<script setup lang="ts">
import { reactive, watch } from "vue"
import type { priceRanges } from "@/types/products/product-filters"

interface Props {
  price: priceRanges
  draftFilters: Record<string, any>
  hasCleared: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "priceChange", value: Record<string, number>): void
}>()

const state = reactive({
  filters: {
    priceMin:
      Number(props.draftFilters.min_price) || Math.round(props.price.min),
    priceMax:
      Number(props.draftFilters.max_price) || Math.round(props.price.max)
  }
})

watch(
  () => props.hasCleared,
  (newVal) => {
    if (newVal) {
      state.filters.priceMin = Math.round(props.price.min)
      state.filters.priceMax = Math.round(props.price.max)
    }
  }
)
</script>

<template>
  <div class="mt-2">
    <!-- Price range sliders -->
    <div class="flex items-center gap-2">
      <div class="flex flex-col w-1/2 bg-red-100/0">
        <label for="min" class="text-sm">Min price</label>
        <input
          id="min"
          type="range"
          :min="price.min"
          :max="price.max"
          v-model.number="state.filters.priceMin"
          @change="$emit('priceChange', { min_price: state.filters.priceMin })"
          class="w-full mt-1"
        />
      </div>
      <div class="flex flex-col w-1/2 bg-red-100/0">
        <label for="max" class="text-sm text-right">Max price</label>
        <input
          id="max"
          type="range"
          :min="price.min"
          :max="price.max"
          v-model.number="state.filters.priceMax"
          @change="$emit('priceChange', { max_price: state.filters.priceMax })"
          class="w-full mt-1"
        />
      </div>
    </div>

    <div class="mt-1 flex justify-between text-pale-brown font-medium">
      <div>
        <span class="mr-0.5 text-sm">kes</span>
        <span>{{ state.filters.priceMin.toLocaleString() }}</span>
      </div>
      <div>
        <span class="mr-0.5 text-sm">kes</span>
        <span>{{ state.filters.priceMax.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>
