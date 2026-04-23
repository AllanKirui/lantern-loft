<script setup lang="ts">
import ProductOverviewTop from "./ProductOverviewTop.vue"
import ProductOverview from "./ProductOverview.vue"
import ProductOverviewBottom from "./ProductOverviewBottom.vue"
</script>

<template>
  <div class="sp-mt-pdp-hero flex gap-4 justify-center">
    <section class="flex flex-col md:flex-row gap-4 overflow-hidden">
      <!-- Product Overview Mobile: Name and Ratings -->
      <div class="md:hidden">
        <ProductOverviewTop />
      </div>

      <!-- Product Overview Mobile: Price and Add to Cart -->
      <div class="md:hidden">
        <!-- TODO add breadcrumbs here -->
        <ProductOverviewBottom />
      </div>
    </section>

    <!-- Product Overview: Desktop -->
    <ProductOverview>
      <ProductOverviewTop />
      <ProductOverviewBottom />
    </ProductOverview>
  </div>
</template>
