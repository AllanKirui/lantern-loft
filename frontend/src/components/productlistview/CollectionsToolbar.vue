<template>
  <!-- Sort and Filter controls -->
  <div class="flex items-center justify-between gap-3 mt-3 custom-width">
    <slot />
  </div>
</template>

<style scoped>
@media (max-width: 830px) {
  .custom-width {
    width: 100%;
  }
}
@media (min-width: 831px) {
  .custom-width {
    width: unset;
  }
}
</style>
