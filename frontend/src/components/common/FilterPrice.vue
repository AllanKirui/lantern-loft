<script setup lang="ts">
import { reactive, watch } from "vue"
import { snapToStep } from "@/utils/price"

interface Props {
  roundedMin: number
  roundedMax: number
  step: number
  draftFilters: Record<string, any>
  hasCleared: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "priceChange", value: Record<string, number>): void
}>()

const state = reactive({
  filters: {
    priceMin: Number(props.draftFilters.min_price) || props.roundedMin,
    priceMax: Number(props.draftFilters.max_price) || props.roundedMax
  }
})

watch(
  () => props.hasCleared,
  (newVal) => {
    if (newVal) {
      state.filters.priceMin = props.roundedMin
      state.filters.priceMax = props.roundedMax
    }
  }
)

function handleMinChange() {
  const snapped = snapToStep(state.filters.priceMin, props.step)

  // prevent the min value from crossing the selected max price
  if (snapped > state.filters.priceMax) return

  state.filters.priceMin = snapped

  emit("priceChange", { min_price: state.filters.priceMin })
}

function handleMaxChange() {
  const snapped = snapToStep(state.filters.priceMax, props.step)

  // prevent the max value from crossing the selected min price
  if (snapped < state.filters.priceMin) return

  state.filters.priceMax = snapped

  emit("priceChange", { max_price: state.filters.priceMax })
}
</script>

<template>
  <div class="flex flex-col mt-2">
    <!-- Price range sliders -->
    <div class="order-2 sm:order-none flex items-center gap-2">
      <div class="flex flex-col w-1/2">
        <label
          for="min"
          class="order-2 sm:order-none mt-2.5 sm:mt-0 text-sm select-none"
          >Min price</label
        >
        <input
          id="min"
          type="range"
          :min="roundedMin"
          :max="roundedMax"
          :step="step"
          v-model.number="state.filters.priceMin"
          @change="handleMinChange"
          class="order-1 sm:order-none w-full range-slider"
        />
      </div>
      <div class="flex flex-col w-1/2">
        <label
          for="max"
          class="order-2 sm:order-none mt-2.5 sm:mt-0 text-sm text-right select-none"
          >Max price</label
        >
        <input
          id="max"
          type="range"
          :min="roundedMin"
          :max="roundedMax"
          :step="step"
          v-model.number="state.filters.priceMax"
          @change="handleMaxChange"
          class="order-1 sm:order-none w-full range-slider"
        />
      </div>
    </div>

    <div
      class="order-1 sm:order-none sm:mt-2.5 flex justify-between text-pale-brown font-medium select-none"
    >
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

<style scoped>
.range-slider {
  appearance: none;
  background: transparent;
}

/* Track */
.range-slider::-webkit-slider-runnable-track {
  margin-top: 10px;
  height: 6px;
  background: #e7d9cc;
  border-radius: 9999px;
}

/* Thumb */
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 9999px;
  background: #7a6153;
  margin-top: -5px; /* centers thumb */
  cursor: grab;
}

.range-slider:active::-webkit-slider-thumb {
  cursor: grabbing;
}
</style>
