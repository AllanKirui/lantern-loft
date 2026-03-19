<script setup lang="ts">
import { onMounted } from "vue"
import { usePagination } from "@/composables/usePagination"
import { productService } from "@/services/productService"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import CollectionsHeader from "@/components/productlistview/CollectionsHeader.vue"
import CollectionsMain from "@/components/productlistview/CollectionsMain.vue"
import ProductsGrid from "@/components/organisms/ProductsGrid.vue"

const { items: products, fetchPage } = usePagination<ProductCardExtended>()

async function loadProducts(page = 1) {
  await fetchPage(productService.fetchAll, page)
}

onMounted(() => loadProducts())
</script>

<template>
  <div class="wrapper px-3.5">
    <CollectionsHeader />

    <CollectionsMain>
      <ProductsGrid :products="products" />
    </CollectionsMain>
  </div>
</template>
