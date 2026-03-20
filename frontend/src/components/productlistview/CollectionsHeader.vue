<script setup lang="ts">
import { computed } from "vue"

interface Props {
  totalItems: number
  from: number
  to: number
  isLoading: boolean
  error: string | null
}

const props = defineProps<Props>()

const message = computed(() => {
  if (props.isLoading) return "Good things take time to shine…"
  if (props.error) return "Something dimmed the glow. Refresh to retry."
})
</script>

<template>
  <header class="sp-mt-collections-header">
    <div class="text-center">
      <div class="flex gap-1 justify-center items-center">
        <span
          class="inline-block w-[14px] h-[1px] md:w-6 md:h-[1.5px] bg-pale-brown"
        ></span>
        <p class="text-xs uppercase font-semibold">
          Have you seen these future favorites?
        </p>
      </div>

      <h1 class="fs-h2 font-bold max-w-xs mx-auto leading-snug">
        Explore our <br />
        ever-growing collection
      </h1>

      <p
        class="sp-mt-section-sub-heading fs-collections-header-about max-w-xl mx-auto"
      >
        Browse our collection of lamps and a wide range of finishes to find the
        lamp, pattern and color that's 100% right for you.
      </p>
    </div>

    <div
      class="sp-mt-section-sub-heading flex flex-col flex-wrap md:flex-row md:justify-between md:gap-2"
    >
      <div v-if="isLoading || error">
        <h3 class="fs-h3 font-semibold leading-none">
          {{ message }}
        </h3>
      </div>
      <div v-else>
        <h3 class="fs-h3 font-semibold leading-none">
          {{ `${totalItems} products` }}
        </h3>
        <span
          class="fs-items-count text-pale-brown block mt-2 md:mt-[10px] font-medium leading-none"
          >{{ `Displaying ${from}-${to} of ${totalItems} products` }}</span
        >
      </div>
    </div>
  </header>
</template>
