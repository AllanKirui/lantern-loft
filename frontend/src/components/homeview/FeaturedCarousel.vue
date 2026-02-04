<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import type { ProductCardExtended } from "@/types/products/product-card-extended"
import { fetchFeatured } from "@/services/productService"
import SectionHeader from "../common/SectionHeader.vue"
import ProductCard from "../organisms/ProductCard.vue"
import ProductSkeleton from "../common/ProductSkeleton.vue"

const products = ref<ProductCardExtended[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchFeaturedProducts() {
  try {
    isLoading.value = true
    products.value = await fetchFeatured()
  } catch (err) {
    error.value = "Failed to load featured products"
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchFeaturedProducts)

const subtitle = computed(() => {
  if (isLoading.value) return "Polishing the bulbs…"
  if (error.value) return "Something dimmed the glow. Refresh to retry."
  return `${products.value.length} ${
    products.value.length === 1 ? "item" : "items"
  }`
})

const sectionHeaderData = computed(() => ({
  tagline: "Have you seen these future favorites?",
  headingId: "featured-products-section",
  title: "We think you'll like",
  subtitle: subtitle.value,
  link: {
    to: "/collections",
    text: "Shop all"
  },
  productType: "featured" as "featured",
  withNavigation: true
}))
</script>

<template>
  <!-- Featured Products -->
  <section
    :aria-labelledby="sectionHeaderData.headingId"
    class="sp-mt-storefront-section px-[14px]"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #heading>
        Explore our <br />
        ever-growing collection
      </template>
    </SectionHeader>

    <Swiper
      :modules="[Navigation, Keyboard]"
      :navigation="{
        prevEl: '.featured-prev',
        nextEl: '.featured-next'
      }"
      :keyboard="{
        enabled: true,
        onlyInViewport: true
      }"
      :slides-per-view="1.5"
      :space-between="16"
      :centered-slides="true"
      :centered-slides-bounds="true"
      :breakpoints="{
        640: {
          slidesPerView: 2.75,
          centeredSlides: false,
          spaceBetween: 12
        },
        768: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 14
        },
        976: {
          slidesPerView: 3.5,
          centeredSlides: false,
          spaceBetween: 14
        },
        1024: {
          slidesPerView: 4,
          centeredSlides: false,
          spaceBetween: 14
        }
      }"
      class="sp-mt-swiper-wrapper"
    >
      <template v-if="isLoading">
        <SwiperSlide v-for="n in 4" :key="n">
          <ProductSkeleton />
        </SwiperSlide>
      </template>
      <template v-else>
        <SwiperSlide
          v-for="(product, index) in products"
          :key="product.id"
          class="animate-fade-in-down"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <ProductCard :product="product" />
        </SwiperSlide>
      </template>
    </Swiper>
  </section>
</template>
