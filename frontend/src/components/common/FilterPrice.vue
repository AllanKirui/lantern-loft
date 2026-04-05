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
  <div class="mt-2">
    <!-- Price range sliders -->
    <div class="flex items-center gap-2">
      <div class="flex flex-col w-1/2 bg-red-100/0">
        <label for="min" class="text-sm select-none">Min price</label>
        <input
          id="min"
          type="range"
          :min="roundedMin"
          :max="roundedMax"
          :step="step"
          v-model.number="state.filters.priceMin"
          @change="handleMinChange"
          class="w-full mt-1"
        />
      </div>
      <div class="flex flex-col w-1/2 bg-red-100/0">
        <label for="max" class="text-sm text-right select-none"
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
          class="w-full mt-1"
        />
      </div>
    </div>

    <div
      class="mt-1 flex justify-between text-pale-brown font-medium select-none"
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
