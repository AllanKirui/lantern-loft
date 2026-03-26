<script setup lang="ts">
import { reactive } from "vue"
import type { priceRanges } from "@/types/products/product-filters"

interface Props {
  price: priceRanges
  query: Record<string, any>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "priceChange", value: Record<string, number>): void
}>()

const state = reactive({
  filters: {
    priceMin: Number(props.query.min_price) || Math.round(props.price.min),
    priceMax: Number(props.query.max_price) || Math.round(props.price.max)
  }
})
</script>

<template>
  <div class="mt-3">
    <!-- Price range sliders -->
    <div class="flex items-center gap-2">
      <input
        type="range"
        :min="price.min"
        :max="price.max"
        v-model.number="state.filters.priceMin"
        @change="$emit('priceChange', { min_price: state.filters.priceMin })"
        class="w-1/2"
      />
      <input
        type="range"
        :min="price.min"
        :max="price.max"
        v-model.number="state.filters.priceMax"
        @change="$emit('priceChange', { max_price: state.filters.priceMax })"
        class="w-1/2"
      />
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

    <small class="block text-sm mt-2">
      Showing items priced between
      <strong class="whitespace-nowrap"
        >kes {{ state.filters.priceMin.toLocaleString() }}</strong
      >
      and
      <strong class="whitespace-nowrap"
        >kes {{ state.filters.priceMax.toLocaleString() }}</strong
      >
    </small>
  </div>
</template>
