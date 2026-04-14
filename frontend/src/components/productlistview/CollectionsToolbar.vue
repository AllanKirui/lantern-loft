<template>
  <!-- Sort and Filter controls -->
  <div
    class="flex items-center justify-between flex-wrap gap-3 animate-fade-in-down custom-width"
  >
    <slot />
  </div>
</template>

<style scoped>
@media (max-width: 849px) {
  .custom-width {
    width: 100%;
    margin-top: 14px;
  }
}
@media (min-width: 850px) {
  .custom-width {
    width: unset;
  }
}
</style>
