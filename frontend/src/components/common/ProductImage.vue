<script setup lang="ts">
import { ref, watch } from "vue"
import { assetUrl } from "@/utils/assetUrl"
import type { ProductPreviewImage } from "@/types/products"
import PistonLoader from "./PistonLoader.vue"

interface Props {
  image: ProductPreviewImage
  useSlot?: boolean
  showLoader?: boolean
  imageLoaded?: boolean
  belongsToViewer?: boolean
  loadFullImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useSlot: false,
  showLoader: true,
  imageLoaded: false,
  belongsToViewer: false,
  loadFullImage: true
})

// Controls whether the full-size image has finished loading.
// Used to transition from the LQIP placeholder to the actual image.
const loaded = ref(false)

// In viewer mode, the parent component manages image loading state
// because the actual image element lives inside the slot rather than
// inside this component. Keep the local state synchronized with the
// parent-provided loading status.
watch(
  () => props.imageLoaded,
  (val) => {
    if (val) {
      loaded.value = val
    }
  }
)

// Tracks whether the full-size image has ever been requested.
//
// This enables a "load once, keep available" strategy:
//
// - Images start by showing only their LQIP placeholder.
// - When `loadFullImage` becomes true, the full image is requested.
// - Once requested, it remains eligible for rendering even if
//   `loadFullImage` later becomes false.
//
// This prevents repeatedly mounting and unmounting image elements
// as the user navigates through carousels.
const hasRequestedFullImage = ref(false)

watch(
  () => props.loadFullImage,
  (shouldLoad) => {
    if (shouldLoad) {
      hasRequestedFullImage.value = true
    }
  },
  { immediate: true }
)
</script>

<template>
  <figure class="product-image-wrapper">
    <!-- LQIP -->
    <picture v-if="!loaded">
      <source :srcset="assetUrl(image.lqip.webp)" type="image/webp" />

      <img
        :src="assetUrl(image.lqip.png)"
        alt=""
        class="lqip-image"
        :class="loaded ? 'opacity-0' : 'opacity-100'"
      />
    </picture>

    <PistonLoader v-if="!loaded && showLoader" />

    <!-- Full image -->
    <picture v-if="hasRequestedFullImage && !belongsToViewer">
      <source :srcset="assetUrl(image.webp)" type="image/webp" />

      <img
        :src="assetUrl(image.png)"
        :alt="image.alt"
        loading="lazy"
        class="actual-image"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        @load="loaded = true"
      />
    </picture>

    <!-- Viewer mode -->
    <template v-if="useSlot">
      <slot />
    </template>
  </figure>
</template>
