<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <svg class="w-5 h-5" aria-hidden="true">
    <use :href="`/src/assets/icons/ui/${name}.svg`"></use>
  </svg>
</template>
