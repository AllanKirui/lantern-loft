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

const range = props.price.max - props.price.min
const STEP = range < 5000 ? 100 : range < 20000 ? 200 : 500 // dynamic step value
const roundedMin = roundDown(props.price.min, STEP)
const roundedMax = roundUp(props.price.max, STEP)

const state = reactive({
  filters: {
    priceMin: Number(props.draftFilters.min_price) || roundedMin,
    priceMax: Number(props.draftFilters.max_price) || roundedMax
  }
})

watch(
  () => props.hasCleared,
  (newVal) => {
    if (newVal) {
      state.filters.priceMin = roundedMin
      state.filters.priceMax = roundedMax
    }
  }
)

function handleMinChange() {
  const snapped = snapToStep(state.filters.priceMin, STEP)

  // prevent the min value from crossing the selected max price
  if (snapped > state.filters.priceMax) return

  state.filters.priceMin = snapped

  emit("priceChange", { min_price: state.filters.priceMin })
}

function handleMaxChange() {
  const snapped = snapToStep(state.filters.priceMax, STEP)

  // prevent the max value from crossing the selected min price
  if (snapped < state.filters.priceMin) return

  state.filters.priceMax = snapped

  emit("priceChange", { max_price: state.filters.priceMax })
}

// Helpers
function roundDown(value: number, step: number) {
  return Math.floor(value / step) * step
}

function roundUp(value: number, step: number) {
  return Math.ceil(value / step) * step
}

function snapToStep(value: number, step: number) {
  return Math.round(value / step) * step
}
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
          :min="roundedMin"
          :max="roundedMax"
          :step="STEP"
          v-model.number="state.filters.priceMin"
          @change="handleMinChange"
          class="w-full mt-1"
        />
      </div>
      <div class="flex flex-col w-1/2 bg-red-100/0">
        <label for="max" class="text-sm text-right">Max price</label>
        <input
          id="max"
          type="range"
          :min="roundedMin"
          :max="roundedMax"
          :step="STEP"
          v-model.number="state.filters.priceMax"
          @change="handleMaxChange"
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
