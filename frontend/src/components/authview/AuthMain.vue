<script setup lang="ts">
withDefaults(defineProps<{ makeWider?: boolean }>(), {
  makeWider: false
})
</script>

<template>
  <main
    class="flex-1 flex items-center justify-center relative px-4 py-8 z-10 animate-fade-in-down"
  >
    <section
      class="w-full max-w-md sm_plus:p-6 md:p-8 rounded-lg bg-black shadowed"
      :class="{ 'md:max-w-3xl': makeWider }"
      aria-labelledby="auth-title"
    >
      <slot />
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 640px) {
  .shadowed {
    box-shadow: rgba(243, 152, 82, 0.75) 0px 1px 5px -1px,
      rgba(243, 152, 82, 0.75) 0px 1px 2px -1px;
  }
}
</style>
