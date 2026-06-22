<script setup lang="ts">
import { ref, watch } from "vue"
import type { ProductPreviewImage } from "@/types/products"
import PistonLoader from "./PistonLoader.vue"

interface Props {
  image: ProductPreviewImage
  useSlot?: boolean
  showLoader?: boolean
  imageLoaded?: boolean
  belongsToViewer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  useSlot: false,
  showLoader: true,
  imageLoaded: false,
  belongsToViewer: false
})

const loaded = ref(false)

watch(
  () => props.imageLoaded,
  (val) => {
    if (val) {
      loaded.value = val
    }
  }
)
</script>

<template>
  <figure class="product-image-wrapper">
    <!-- LQIP -->
    <picture>
      <source :srcset="image.lqip.webp" type="image/webp" />

      <img
        :src="image.lqip.png"
        alt=""
        class="lqip-image"
        :class="loaded ? 'opacity-0' : 'opacity-100'"
      />
    </picture>

    <PistonLoader v-if="!loaded && showLoader" />

    <!-- Actual image -->
    <picture v-if="!belongsToViewer">
      <source :srcset="image.webp" type="image/webp" />

      <img
        :src="image.png"
        :alt="image.alt"
        loading="lazy"
        class="actual-image"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        @load="loaded = true"
      />
    </picture>

    <template v-if="useSlot">
      <slot />
    </template>
  </figure>
</template>
