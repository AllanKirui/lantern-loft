<script setup lang="ts">
import { provide } from "vue"
import { useRoute } from "vue-router"
import { useCollection } from "@/composables/useCollection"
import { productService } from "@/services/productService"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import StorefrontNav from "@/components/layout/storefront/StorefrontNav.vue"
import StorefrontFooter from "@/components/layout/storefront/StorefrontFooter.vue"
import BackToTop from "@/components/common/BackToTop.vue"
import BaseOverlay from "@/components/base/BaseOverlay.vue"
import FiltersSidebar from "@/components/organisms/FiltersSidebar.vue"

const route = useRoute()

// Create a single shared instance
const collection = useCollection<ProductCardExtended>(productService.fetchAll)

// Provide the collection instance to child components
provide("collection", collection)
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
    <FiltersSidebar v-if="route.name === 'collections'" />
    <BaseOverlay />
  </div>
</template>
