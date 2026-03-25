<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits(["toggle"])
</script>

<template>
  <button
    class="w-full text-left py-4 px-3 flex items-center justify-between"
    @click="$emit('toggle')"
  >
    <span class="font-medium fs-filters-accordion-label">{{ label }}</span>
    <slot />
  </button>
</template>
