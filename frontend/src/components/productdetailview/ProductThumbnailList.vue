<script setup lang="ts">
import { ref, computed } from "vue"

const product = ref({
  images: [
    { src: "/images/lamps/aurora-1.jpg", alt: "Aurora front" },
    { src: "/images/lamps/aurora-2.jpg", alt: "Aurora side" },
    { src: "/images/lamps/aurora-3.jpg", alt: "Aurora close up" },
    { src: "/images/lamps/aurora-4.jpg", alt: "Aurora in room" },
    { src: "/images/lamps/aurora-5.jpg", alt: "Aurora packaging" }
  ],
  imagesExtra: 0,
  imagesVisible: [] as any
})

// control how many thumbnails are visible in the preview pane
const thumbsVisible = ref(3) // visible count for large screens

const imagesVisible = computed(() => {
  // show only the first `thumbsVisible` thumbnails
  return product.value.images.slice(0, thumbsVisible.value)
})

const imagesExtra = computed(() => {
  const extra = product.value.images.length - thumbsVisible.value
  return extra > 0 ? extra : 0
})

// expose the computed image data used in template
product.value.imagesVisible = imagesVisible.value
product.value.imagesExtra = imagesExtra.value
</script>

<template>
  <template
    v-for="(img, index) in product.imagesVisible"
    :key="img.src + index"
  >
    <button
      class="sm_plus:w-16 md:w-[4.5rem] lg:w-20 relative rounded overflow-hidden border-2 border-pale-brown/30 focus:border-chestnut-brown group"
      :aria-label="`Show image ${index + 1}`"
    >
      <!-- TODO use dynamic image data, src and alt -->
      <figure class="aspect-square">
        <img
          src="@/assets/img/storefront/products/4-recopyright.png"
          :alt="img.alt || 'thumb ' + (index + 1)"
          class="w-full h-full object-cover group-hover:scale-110 duration"
        />
      </figure>

      <!-- overlay for last visible thumb if there are extras -->
      <div
        v-if="
          index === product.imagesVisible.length - 1 && product.imagesExtra > 0
        "
        class="absolute inset-0 flex items-center justify-center bg-black/55 group-hover:bg-black/35 duration text-cosmic-latte text-xl font-semibold"
      >
        {{ product.imagesExtra }}+
      </div>
    </button>
  </template>
</template>

<style scoped>
.duration {
  transition: all 0.25s cubic-bezier(0.3, 0, 0.7, 1);
}
</style>
