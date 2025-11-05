<script setup lang="ts">
import BaseMobileNavButton from "./BaseMobileNavButton.vue"
</script>

<template>
  <BaseMobileNavButton type="button" text="Search">
    <div>
      <BaseIcon name="search" class="w-5 h-5 sm:w-6 sm:h-6" :stroke-width="4" />
    </div>
  </BaseMobileNavButton>
</template>
