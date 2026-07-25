<script setup lang="ts">
import { inject } from "vue"
import type { ViewerContext } from "@/types/image-viewer"
import BaseCloseButton from "@/components/base/BaseCloseButton.vue"
import ImageViewerZoom from "./ImageViewerZoom.vue"
import ProductThumbnailList from "../hero/ProductThumbnailList.vue"

// inject the viewer instance coming from ProductDetailHero.vue
const viewer = inject<ViewerContext>("viewer")!
</script>

<template>
  <div
    class="flex flex-col sm_plus:px-4 sm_plus:py-2 w-full h-full sm_plus:w-[56rem] sm_plus:max-w-[90vw] sm_plus:max-h-[90vh] xl:w-[64rem] sm_plus:bg-cosmic-latte"
  >
    <header
      class="flex items-center justify-end sm_plus:justify-between w-full px-2 pb-2 h-20 sm_plus:h-auto mb-auto"
    >
      <h2 class="hidden sm_plus:flex font-semibold">
        Photos ({{ viewer.images.value.length }})
      </h2>
      <BaseCloseButton
        class="text-cosmic-latte sm_plus:text-chestnut-brown hover:after:bg-jet sm_plus:hover:after:bg-cream"
        @click="viewer.close"
      >
        <BaseIcon name="close" class="w-[18px] h-[18px]" :stroke-width="2.5" />
      </BaseCloseButton>
    </header>

    <!-- Horizontal divider -->
    <span class="hidden sm_plus:block w-full h-[1px] bg-bone" />

    <div class="my-auto">
      <!-- Main Image with Zoom -->
      <ImageViewerZoom />

      <!-- Controls -->
      <div class="mt-3 w-full hidden sm_plus:flex justify-end gap-2">
        <button
          class="px-2 py-0.5 font-medium uppercase rounded btn-hover hover:after:bg-bone/50 disabled:text-chestnut-brown/30 hover:after:disabled:bg-transparent"
          @click="viewer.zoomIn"
        >
          + <span class="text-xs">Zoom in</span>
        </button>
        <button
          class="px-2 py-0.5 font-medium uppercase rounded btn-hover hover:after:bg-bone/50 disabled:text-chestnut-brown/30 hover:after:disabled:bg-transparent duration-200"
          @click="viewer.zoomOut"
          :disabled="viewer.scale.value === 1"
        >
          - <span class="text-xs">Zoom out</span>
        </button>
      </div>

      <div
        class="flex gap-2.5 mt-4 px-3 pb-2 max-w-fit mx-auto overflow-x-auto"
      >
        <ProductThumbnailList :show-partials="false" />
      </div>
    </div>
  </div>
</template>
