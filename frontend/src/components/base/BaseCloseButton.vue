<script setup lang="ts">
const emit = defineEmits(["click"])
</script>

<template>
  <button class="btn-rounded" @click="$emit('click')">
    <slot />
    <span class="sr-only">Close</span>
  </button>
</template>
