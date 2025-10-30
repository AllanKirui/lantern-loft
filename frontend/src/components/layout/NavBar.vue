<script setup lang="ts">
import TopNav from "./nav/TopNav.vue"
import BottomNav from "./nav/BottomNav.vue"
</script>

<template>
  <!-- TODO add a transition when resizing, so that the disappearing elements look smooth -->
  <header class="w-full bg-black text-crayola relative z-[100]">
    <!-- Top navigation -->
    <TopNav />

    <!-- Horizontal divider -->
    <span class="block w-full h-[1px] bg-jet" />

    <!-- Bottom navigation -->
    <BottomNav />

    <!-- TODO Mobile menu -->
  </header>
</template>
