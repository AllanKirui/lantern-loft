<script setup lang="ts">
withDefaults(defineProps<{ size?: string }>(), {
  size: "18px"
})
const emit = defineEmits(["click"])
</script>

<template>
  <button class="btn-rounded" @click="$emit('click')">
    <BaseIcon
      name="close"
      class="duration-200"
      :stroke-width="2.5"
      :size="size"
    />
    <span class="sr-only">Close</span>
  </button>
</template>
