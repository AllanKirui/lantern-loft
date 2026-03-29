<script setup lang="ts">
import { inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import CollectionsHeader from "@/components/productlistview/CollectionsHeader.vue"
import CollectionsMain from "@/components/productlistview/CollectionsMain.vue"
import ProductsGrid from "@/components/organisms/ProductsGrid.vue"
import Pagination from "@/components/common/Pagination.vue"

const collection = inject<CollectionContext<ProductCardExtended>>("collection")!

const { items: products, meta, isLoading, error, setPage } = collection
</script>

<template>
  <div class="wrapper px-3.5">
    <CollectionsHeader :meta="meta" :is-loading="isLoading" :error="error" />

    <CollectionsMain>
      <ProductsGrid :is-loading="isLoading" :products="products" />
      <template v-if="meta">
        <Pagination
          v-show="!isLoading && !error"
          :current-page="meta.currentPage"
          :total-pages="meta.lastPage"
          @page-change="setPage"
        />
      </template>
    </CollectionsMain>
  </div>
</template>
