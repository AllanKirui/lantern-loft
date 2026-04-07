<script setup lang="ts">
import SectionHeader from "../common/SectionHeader.vue"

const sectionHeaderData = {
  tagline: "Shop our collection",
  headingId: "categories-section"
}

// TODO add correct image URLs
const categoryData = [
  {
    link: {
      to: "/collections/table-lamps",
      text: "Shop table lamps"
    },
    image: {
      url: "src/assets/img/storefront/products/4-recopyright.png",
      alt: "Table lamps category image"
    }
  },
  {
    link: {
      to: "/collections/floor-lamps",
      text: "Shop floor lamps"
    },
    image: {
      url: "src/assets/img/storefront/products/4-recopyright.png",
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
            <img
              :src="category.image.url"
              :alt="category.image.alt"
              class="w-56 h-auto object-cover"
              loading="lazy"
            />
          </figure>
          <div class="p-3 text-center font-medium capitalize">
            {{ category.link.text }}
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
