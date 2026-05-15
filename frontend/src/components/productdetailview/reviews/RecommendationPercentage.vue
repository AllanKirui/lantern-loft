<script setup lang="ts">
defineProps<{ percentage: number }>()
</script>

<template>
  <div v-if="percentage > 0" class="items-center gap-2 font-medium">
    <BaseIcon name="round-check" class="w-5 h-5 md:w-6 md:h-6" />

    <div class="flex items-center gap-3">
      <span class="fs-pdp-reviews-recommendation-percentage"
        >{{ percentage }}%</span
      >
      <span class="fs-pdp-reviews-recommendation-percentage-text"
        >of reviewers would <br />recommend this to a friend</span
      >
    </div>
  </div>
</template>
