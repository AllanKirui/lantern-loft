<script setup lang="ts">
defineProps<{
  href: string
  height?: string // tailwind classes e.g h-20, h-32, h-[100px]
}>()
</script>

<template>
  <a :href="href">
    <!-- Logo fallback text -->
    <span
      class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium fs-logo-fallback whitespace-nowrap text-cosmic-latte"
      >Lantern Loft</span
    >

    <!-- Logo -->
    <div class="relative z-40">
      <img
        src="@/assets/img/logo.svg"
        alt="Lantern Loft Logo"
        class="w-auto"
        :class="height ? height : 'h-20'"
      />
    </div>
  </a>
</template>
