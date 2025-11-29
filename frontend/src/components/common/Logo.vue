<script setup lang="ts">
withDefaults(defineProps<{ href: string; height?: string }>(), {
  height: "h-20"
})
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
      <span class="absolute top-0 left-0 w-full h-full"></span>
      <img
        src="@/assets/img/logo.svg"
        alt="Lantern Loft Logo"
        :class="['w-auto', height]"
      />
    </div>
  </a>
</template>
