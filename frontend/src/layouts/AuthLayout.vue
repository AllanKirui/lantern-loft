<script setup lang="ts">
import AuthNav from "@/components/layout/auth/AuthNav.vue"
import AuthFooter from "@/components/layout/auth/AuthFooter.vue"
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-black text-cosmic-latte">
    <AuthNav />

    <RouterView />

    <AuthFooter />
  </div>
</template>
