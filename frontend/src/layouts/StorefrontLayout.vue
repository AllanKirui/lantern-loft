<script setup lang="ts">
import StorefrontNav from "@/components/layout/storefront/StorefrontNav.vue"
import StorefrontFooter from "@/components/layout/storefront/StorefrontFooter.vue"
import BackToTop from "@/components/common/BackToTop.vue"
import BaseOverlay from "@/components/base/BaseOverlay.vue"
import FiltersSidebar from "@/components/organisms/FiltersSidebar.vue"
</script>

<template>
  <div class="storefront-layout">
    <a href="#main-content" class="sr-only focus:not-sr-only"
      >Skip to main content</a
    >
    <StorefrontNav />
    <RouterView />
    <BackToTop />
    <StorefrontFooter />
    <FiltersSidebar />
    <BaseOverlay />
  </div>
</template>
