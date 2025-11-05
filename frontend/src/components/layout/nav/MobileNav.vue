<script setup lang="ts">
import MobileAccountButton from "./MobileAccountButton.vue"
import MobileCartLink from "./MobileCartLink.vue"
import MobileMenuButton from "./MobileMenuButton.vue"
import MobileSearchButton from "./MobileSearchButton.vue"
</script>

<template>
  <!-- Left buttons - Mobile -->
  <div class="md:hidden flex items-center fluid-gap-xs">
    <MobileMenuButton />
    <MobileAccountButton />
  </div>

  <!-- Right buttons - Mobile -->
  <div class="md:hidden flex items-center fluid-gap-xs">
    <MobileCartLink />
    <MobileSearchButton />
  </div>
</template>
