<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex-1">
    <h2 class="hidden md:block text-lg font-medium">{{ title }}</h2>

    <div class="space-y-7 mt-5 md:mt-8">
      <slot />
    </div>
  </div>
</template>
