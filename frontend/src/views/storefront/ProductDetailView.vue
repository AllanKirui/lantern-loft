<script setup lang="ts">
import { provide, watch } from "vue"
import { useRoute } from "vue-router"
import { useProductDetail } from "@/composables/useProductDetail"
import { productService } from "@/services/productService"
import type { Product } from "@/types/products"
import ProductDetailHero from "@/components/productdetailview/ProductDetailHero.vue"

const route = useRoute()

// create a single shared instance
const productDetail = useProductDetail<Product>(productService.fetchBySlug)

// provide the instance to child components
provide("productDetail", productDetail)

watch(
  () => route.params.slug,
  (slug) => {
    if (typeof slug === "string") {
      productDetail.load(slug)
    }
  },
  { immediate: true }
)
</script>

<template>
  <main id="main-content" class="wrapper px-3.5">
    <!-- TODO add breadcrumbs here -->
    <ProductDetailHero />
  </main>
</template>
