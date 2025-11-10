<script setup lang="ts">
const emit = defineEmits(["click"])
</script>

<template>
  <button class="btn-rounded" @click="$emit('click')">
    <BaseIcon
      name="close"
      class="w-[18px] h-[18px] duration-200"
      :stroke-width="2.5"
    />
    <span class="sr-only">Close</span>
  </button>
</template>
