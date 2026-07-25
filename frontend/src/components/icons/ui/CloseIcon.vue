<script setup lang="ts">
defineProps<{
  strokeWidth?: number | string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    :stroke-width="strokeWidth"
  >
    <path d="M6 6 L18 18 M6 18 L18 6" />
  </svg>
</template>
