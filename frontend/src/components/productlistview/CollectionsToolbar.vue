<template>
  <!-- Sort and Filter controls -->
  <div
    class="flex items-center justify-between gap-3 animate-fade-in-down custom-width"
  >
    <slot />
  </div>
</template>

<style scoped>
@media (max-width: 830px) {
  .custom-width {
    width: 100%;
    margin-top: 14px;
  }
}
@media (min-width: 831px) {
  .custom-width {
    width: unset;
  }
}
</style>
