<script setup lang="ts">
withDefaults(defineProps<{ color?: string }>(), {
  color: "bg-pale-brown/50" // Tailwind bg classes
})
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="loader flex justify-between w-5 h-5">
      <div
        v-for="n in 3"
        :key="n"
        :class="['w-1 h-full origin-center animate-loading rounded', color]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.loader div:nth-child(2) {
  animation-delay: 0.15s;
}
.loader div:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
