<script setup lang="ts">
import { provide, watch } from "vue"
import { useRoute } from "vue-router"
import { useProductDetail } from "@/composables/useProductDetail"
import { productService } from "@/services/productService"
import type { Product } from "@/types/products"
import ProductDetailHero from "@/components/productdetailview/ProductDetailHero.vue"
import ProductDescription from "@/components/productdetailview/ProductDescription.vue"
import ProductFeaturesList from "@/components/productdetailview/ProductFeaturesList.vue"
import NoItemsFound from "@/components/common/NoItemsFound.vue"

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
  <!-- TODO add a PDP skeleton -->
  <div v-if="productDetail.isLoading.value">PDP loading...</div>

  <main
    v-else-if="productDetail.product.value"
    id="main-content"
    class="wrapper px-3.5"
  >
    <!-- TODO add breadcrumbs here -->
    <ProductDetailHero />
    <ProductDescription />
    <ProductFeaturesList />
  </main>

  <NoItemsFound v-else class="h-[65vh]">
    <template #message>
      <div>
        <h1 class="text-2xl font-medium">Oops!</h1>
        <p class="mt-3">Looks like the lights flickered.</p>
        <RouterLink
          to="/collections"
          class="btn-primary mt-6 text-base mx-auto max-w-96"
          >Continue Shopping</RouterLink
        >
      </div>
    </template>
  </NoItemsFound>
</template>
