<script setup lang="ts">
import BaseMobileNavButton from "./BaseMobileNavButton.vue"
</script>

<template>
  <BaseMobileNavButton type="button" text="Account">
    <div>
      <BaseIcon
        name="avatar"
        class="w-5 h-5 sm:w-6 sm:h-6"
        :stroke-width="3.5"
      />
    </div>
  </BaseMobileNavButton>
</template>
