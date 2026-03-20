<script setup lang="ts">
import { computed } from "vue"
import { useLayoutStore } from "@/stores/layout"
import PistonLoader from "./PistonLoader.vue"

withDefaults(defineProps<{ isForNewProducts?: boolean }>(), {
  isForNewProducts: false
})

const layoutStore = useLayoutStore()
const layout = computed(() => layoutStore.layout)
</script>

<template>
  <div
    :class="[
      'bg-bone/65 rounded-md overflow-hidden shadow-sm',
      layout === 'grid'
        ? ''
        : 'lg:max-w-3xl mx-auto grid grid-cols-5 sm_plus:grid-cols-4'
    ]"
  >
    <div
      :class="[
        'relative aspect-square flex items-center justify-center bg-cream rounded-md',
        layout === 'grid' ? '' : 'col-span-2 sm_plus:col-span-1'
      ]"
    >
      <PistonLoader />
    </div>

    <div
      :class="[
        'p-3 space-y-3',
        layout === 'grid' ? '' : 'col-span-3 w-full my-auto'
      ]"
    >
      <template v-if="layout === 'grid'">
        <template v-if="isForNewProducts">
          <div class="skeleton w-1/2 mx-auto"></div>
          <div class="skeleton w-5/6 mx-auto"></div>
          <div class="skeleton w-5/6 mx-auto"></div>
          <div class="skeleton w-5/6 mx-auto"></div>
        </template>
        <template v-else>
          <div class="skeleton"></div>
          <div class="skeleton w-1/2"></div>
        </template>
      </template>

      <template v-else>
        <div class="skeleton w-1/2"></div>
        <div class="skeleton w-1/3"></div>
        <div class="skeleton w-full"></div>
        <div class="skeleton w-full"></div>
        <div class="skeleton w-3/4"></div>
        <div class="skeleton w-1/4"></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  position: relative;
  height: 0.875rem;
  background-color: rgb(122, 97, 83, 0.3);
  border-radius: 0.25rem;
  overflow: hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(122, 97, 83, 0.3),
    transparent
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  100% {
    left: 100%;
  }
}
</style>
