<script setup lang="ts">
import { provide, watch } from "vue"
import { useRoute } from "vue-router"
import { useCollection } from "@/composables/useCollection"
import { useFiltersMeta } from "@/composables/useFiltersMeta"
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

// Provide the filtersMeta instance to child components
const filtersMeta = useFiltersMeta()
provide("filtersMeta", filtersMeta)

// clear filters when leaving the '/collections' route
watch(
  () => route.name,
  (newName, oldName) => {
    if (oldName === "collections" && newName !== "collections") {
      if (collection.hasFilters.value) collection.resetFilters()
    }
  }
)
</script>

<template>
  <div class="storefront-layout">
    <a href="#main-content" class="sr-only focus:not-sr-only"
      >Skip to main content</a
    >
    <StorefrontNav />

    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <BackToTop />
    <StorefrontFooter />
    <FiltersSidebar v-if="route.name === 'collections'" />
    <BaseOverlay />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
