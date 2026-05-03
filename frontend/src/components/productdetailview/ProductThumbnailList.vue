<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<{ showPartials?: boolean }>(), {
  showPartials: true
})

// TODO replace with real API data that should come from useProductDetail composable
const images = [
  { src: "/images/lamps/aurora-1.jpg", alt: "Aurora front" },
  { src: "/images/lamps/aurora-2.jpg", alt: "Aurora side" },
  { src: "/images/lamps/aurora-3.jpg", alt: "Aurora close up" },
  { src: "/images/lamps/aurora-4.jpg", alt: "Aurora in room" },
  { src: "/images/lamps/aurora-5.jpg", alt: "Aurora packaging" }
]

// control how many thumbnails are visible in the preview pane
const thumbsVisible = computed(() => (props.showPartials ? 3 : images.length))

// show only the first `thumbsVisible` thumbnails
const imagesVisible = computed(() => images.slice(0, thumbsVisible.value))

const imagesExtra = computed(() => {
  const extra = images.length - thumbsVisible.value
  return extra > 0 ? extra : 0
})
</script>

<template>
  <template v-for="(img, index) in imagesVisible" :key="img.src + index">
    <button
      class="relative rounded overflow-hidden border-2 border-pale-brown/30 focus:border-chestnut-brown group"
      :class="[
        showPartials
          ? 'sm_plus:w-16 md:w-[4.5rem] lg:w-20'
          : 'w-20 sm_plus:w-16 flex-shrink-0'
      ]"
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
