<script setup lang="ts">
import PistonLoader from "./PistonLoader.vue"

withDefaults(defineProps<{ isForNewProducts?: boolean }>(), {
  isForNewProducts: false
})
</script>

<template>
  <div class="bg-bone rounded-md overflow-hidden shadow-sm">
    <div
      class="relative aspect-square flex items-center justify-center bg-cream rounded-md"
    >
      <PistonLoader />
    </div>
    <div class="p-3 space-y-3">
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
