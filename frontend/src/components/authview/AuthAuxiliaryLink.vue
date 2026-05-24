<script setup lang="ts">
defineProps<{ to: string; title: string }>()
</script>

<template>
  <p class="text-center text-sm text-bone">
    <slot />

    <RouterLink :to="to" :data-replace="title" class="link-hover text-crayola">
      <span>{{ title }}</span>
    </RouterLink>
  </p>
</template>
