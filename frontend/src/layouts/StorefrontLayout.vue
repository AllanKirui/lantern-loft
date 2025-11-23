<script setup lang="ts">
import StorefrontNav from "@/components/layout/storefront/StorefrontNav.vue"
import StorefrontFooter from "@/components/layout/storefront/StorefrontFooter.vue"
</script>

<template>
  <div class="storefront-layout">
    <StorefrontNav />
    <RouterView />
    <StorefrontFooter />
  </div>
</template>
