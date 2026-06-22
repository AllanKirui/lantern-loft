<script setup lang="ts">
import { inject, computed } from "vue"
import type { ViewerContext } from "@/types/image-viewer"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import ProductImage from "@/components/common/ProductImage.vue"

const props = withDefaults(defineProps<{ showPartials?: boolean }>(), {
  showPartials: true
})

// inject the viewer instance coming from ProductDetailHero.vue
const viewer = inject<ViewerContext>("viewer")!

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!

const thumbImages = computed(() => {
  if (product.value?.images) {
    return product.value.images.map((img) => ({
      webp: img.webp.thumb,
      png: img.png.thumb,
      lqip: { webp: img.webp.lqip, png: img.png.lqip },
      alt: img.alt
    }))
  }

  return []
})

// control how many thumbnails are visible in the preview pane
const thumbsVisible = computed(() =>
  props.showPartials ? 3 : thumbImages.value.length
)

// show only the first `thumbsVisible` thumbnails
const imagesVisible = computed(() =>
  thumbImages.value.slice(0, thumbsVisible.value)
)

const imagesExtra = computed(() => {
  const extra = thumbImages.value.length - thumbsVisible.value
  return extra > 0 ? extra : 0
})

function setThumbClasses(index: number) {
  let classes =
    "relative rounded overflow-hidden border-2 sm_plus:focus:border-chestnut-brown group "

  if (props.showPartials) {
    classes += "sm_plus:w-16 md:w-[4.5rem] lg:w-20 "
  } else {
    classes += "w-20 sm_plus:w-16 flex-shrink-0 "
  }

  if (viewer?.currentIndex.value === index) {
    classes += "border-cosmic-latte sm_plus:border-chestnut-brown border-[3px] "
  } else {
    classes += "border-pale-brown/30 focus:outline-none "
  }

  return classes
}
</script>

<template>
  <template v-for="(img, index) in imagesVisible" :key="index">
    <button
      :class="setThumbClasses(index)"
      :aria-label="`Show image ${index + 1}`"
      @click="viewer?.goTo(index)"
    >
      <span class="absolute top-0 left-0 w-full h-full z-10"></span>

      <ProductImage :image="img" :show-loader="false" />

      <!-- overlay for last visible thumb if there are extras -->
      <template v-if="showPartials">
        <div
          v-if="index === imagesVisible.length - 1 && imagesExtra > 0"
          class="absolute inset-0 flex items-center justify-center bg-black/55 group-hover:bg-black/35 duration text-cosmic-latte text-xl font-semibold"
        >
          {{ imagesExtra }}+
        </div>
      </template>
    </button>
  </template>
</template>

<style scoped>
.duration {
  transition: all 0.25s cubic-bezier(0.3, 0, 0.7, 1);
}
</style>
