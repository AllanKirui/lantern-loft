<script setup lang="ts">
import { provide } from "vue"
import { useImageViewer } from "@/composables/useImageViewer"
import ProductOverviewTop from "./hero/ProductOverviewTop.vue"
import ProductThumbnailList from "./hero/ProductThumbnailList.vue"
import ProductGallery from "./hero/ProductGallery.vue"
import ProductOverview from "./hero/ProductOverview.vue"
import ProductOverviewBottom from "./hero/ProductOverviewBottom.vue"
import ImageViewer from "./viewer/ImageViewer.vue"
import Breadcrumbs from "../common/Breadcrumbs.vue"

// create a single shared instance of useImageViewer and provide it to child components
const viewer = useImageViewer()
provide("viewer", viewer)
</script>

<template>
  <div class="sp-mt-pdp-hero flex gap-4 justify-center">
    <section class="flex flex-col md:flex-row gap-4 overflow-hidden">
      <!-- Product Overview Mobile: Name and Ratings -->
      <div class="md:hidden">
        <ProductOverviewTop />
      </div>

      <!-- Thumbnails container for large screens -->
      <div class="hidden lg:flex flex-col gap-3">
        <ProductThumbnailList />
      </div>

      <div class="overflow-hidden flex gap-4">
        <!-- Thumbnails container shown between 640px and 768px -->
        <div class="hidden sm_plus:flex flex-col gap-3 md:hidden">
          <ProductThumbnailList />
        </div>

        <ProductGallery />
      </div>

      <!-- Product Overview Mobile: Price and Add to Cart -->
      <div class="md:hidden">
        <Breadcrumbs class="md:hidden" />
        <ProductOverviewBottom />
      </div>
    </section>

    <!-- Product Overview: Desktop -->
    <ProductOverview>
      <ProductOverviewTop />
      <ProductOverviewBottom />
    </ProductOverview>

    <ImageViewer />
  </div>
</template>
