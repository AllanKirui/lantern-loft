<script setup lang="ts">
import { assetUrl } from "@/utils/assetUrl"
import SectionHeader from "../common/SectionHeader.vue"

const sectionHeaderData = {
  tagline: "Shop our collection",
  headingId: "categories-section"
}

// TODO add correct image URLs
const categoryData = [
  {
    link: {
      to: "/collections?category=table-lamps",
      text: "Shop table lamps"
    },
    image: {
      webp: "/products/1/medium/main.webp",
      png: "/products/1/medium/main.png",
      alt: "Table lamps category image"
    }
  },
  {
    link: {
      to: "/collections?category=floor-lamps",
      text: "Shop floor lamps"
    },
    image: {
      webp: "/products/24/medium/main.webp",
      png: "/products/24/medium/main.png",
      alt: "Floor lamps category image"
    }
  }
]
</script>

<template>
  <!-- Categories Section -->
  <section
    :aria-labelledby="sectionHeaderData.headingId"
    class="wrapper sp-mt-storefront-section px-[14px]"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #heading> Find the perfect lamp<br />for your home </template>
    </SectionHeader>

    <div
      class="sp-mt-categories-wrapper flex flex-col lg:flex-row items-center justify-center gap-categories-section"
    >
      <!-- Categories about -->
      <div class="max-w-lg text-center">
        <p class="fs-footer-about">
          Every great collection starts with a spark. Right now, we’re focused
          on perfecting the essentials — floor lamps and table lamps — the
          timeless pieces that bring both function and atmosphere to any room.
        </p>
        <p class="fs-footer-about sp-mt-categories-about">
          As Lantern Loft grows, so will our range. Keep an eye out for new
          additions, because this is just the beginning of your glow journey.
        </p>
      </div>

      <!-- Category links -->
      <div class="flex gap-4">
        <RouterLink
          v-for="category in categoryData"
          :key="category.link.to"
          :to="category.link.to"
          class="card-hover bg-cream/75 rounded-md"
        >
          <figure
            class="relative aspect-square bg-cream rounded overflow-hidden"
          >
            <picture>
              <source
                :srcset="assetUrl(category.image.webp)"
                type="image/webp"
              />

              <img
                :src="assetUrl(category.image.png)"
                :alt="assetUrl(category.image.alt)"
                class="w-56 h-auto object-cover"
                loading="lazy"
              />
            </picture>
          </figure>

          <div class="p-3 text-center font-medium capitalize">
            {{ category.link.text }}
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
