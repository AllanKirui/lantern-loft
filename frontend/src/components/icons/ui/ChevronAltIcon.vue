<script setup lang="ts">
defineProps<{
  strokeWidth?: number | string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    stroke="currentColor"
    :stroke-width="strokeWidth"
  >
    <path
      fill-rule="evenodd"
      d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.416l-3.71 4.352a.75.75 0 01-1.138-.976l4.25-5a.75.75 0 011.138 0l4.25 5c.29.34.24.86-.02 1.06z"
      clip-rule="evenodd"
    />
  </svg>
</template>
