<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  strokeWidth: { type: [Number, String], default: 1.5 }
})
</script>

<template>
  <svg
    class="inline-block"
    aria-hidden="true"
    :style="{ '--icon-stroke-width': strokeWidth }"
  >
    <use :href="`/src/assets/icons/ui/${name}.svg`" />
  </svg>
</template>
