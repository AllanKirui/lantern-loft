<script setup lang="ts">
import TopNav from "@/components/nav/storefront/TopNav.vue"
import BottomNav from "@/components/nav/storefront/desktop/BottomNav.vue"
</script>

<template>
  <header class="w-full bg-black text-crayola relative z-[100]">
    <TopNav />

    <!-- Horizontal divider -->
    <span class="hidden md:block w-full h-[1px] bg-jet" />

    <BottomNav />
  </header>
</template>
