<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { usePagination } from "@/composables/usePagination"
import { productService } from "@/services/productService"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import CollectionsHeader from "@/components/productlistview/CollectionsHeader.vue"
import CollectionsMain from "@/components/productlistview/CollectionsMain.vue"
import ProductsGrid from "@/components/organisms/ProductsGrid.vue"
import Pagination from "@/components/common/Pagination.vue"

const route = useRoute()
const router = useRouter()
const {
  items: products,
  totalItems,
  currentPage,
  lastPage,
  from,
  to,
  isLoading,
  fetchPage
} = usePagination<ProductCardExtended>()

async function loadProducts(page = 1) {
  await fetchPage(productService.fetchAll, page)
}

function goToPage(page: number) {
  if (page === currentPage.value) return

  // Show current page on the URL
  router.push({
    query: {
      ...route.query,
      page
    }
  })

  loadProducts(page)
}

onMounted(() => loadProducts(Number(route.query.page ?? 1)))
</script>

<template>
  <div class="wrapper px-3.5">
    <CollectionsHeader :total-items="totalItems" :from="from" :to="to" />

    <CollectionsMain>
      <ProductsGrid :is-loading="isLoading" :products="products" />
      <Pagination
        v-show="!isLoading"
        :current-page="currentPage"
        :total-pages="lastPage"
        @page-change="goToPage"
      />
    </CollectionsMain>
  </div>
</template>
