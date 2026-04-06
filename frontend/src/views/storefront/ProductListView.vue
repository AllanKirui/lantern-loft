<script setup lang="ts">
import { inject } from "vue"
import type { CollectionContext } from "@/types/collection"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import CollectionsHeader from "@/components/productlistview/CollectionsHeader.vue"
import CollectionsMain from "@/components/productlistview/CollectionsMain.vue"
import ProductsGrid from "@/components/organisms/ProductsGrid.vue"
import Pagination from "@/components/common/Pagination.vue"
import ActiveFilters from "@/components/common/ActiveFilters.vue"
import NoItemsFound from "@/components/common/NoItemsFound.vue"

const collection = inject<CollectionContext<ProductCardExtended>>("collection")!

const {
  items: products,
  meta,
  isLoading,
  error,
  setPage,
  hasFilters,
  hasItems: hasProducts
} = collection
</script>

<template>
  <div class="wrapper px-3.5">
    <CollectionsHeader
      :meta="meta"
      :is-loading="isLoading"
      :error="error"
      :has-products="hasProducts"
    />

    <ActiveFilters v-if="!isLoading && !error && hasFilters" />

    <CollectionsMain>
      <ProductsGrid :is-loading="isLoading" :products="products" />

      <template v-if="!isLoading && !hasProducts">
        <NoItemsFound>
          <template #message>
            <div v-if="hasFilters && !error">
              <p>That combination didn't light up anything.</p>
              <p class="mt-2">Try another.</p>
            </div>
            <div v-else>
              <p>Looks like the lights flickered.</p>
              <p class="mt-2">Try again.</p>
            </div>
          </template>
        </NoItemsFound>
      </template>

      <template v-if="meta && meta.lastPage > 1 && hasProducts">
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
