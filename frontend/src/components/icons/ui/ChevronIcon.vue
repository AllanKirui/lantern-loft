<script setup lang="ts">
defineProps<{
  strokeWidth?: number | string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 7.5"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    :stroke-width="strokeWidth"
  >
    <path
      d="M45.15 57.47 19.88 30.84 45.15 6.58"
      transform="matrix(0 -.21179 .21179 0 -.768 10.191)"
    />
  </svg>
</template>
