<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import type { ProductCardBase } from "@/types/products/product-card-base"
import { fetchNewArrivals } from "@/services/productService"
import NewProductCard from "../organisms/NewProductCard.vue"
import SectionHeader from "../common/SectionHeader.vue"

const products = ref<ProductCardBase[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function fetchNewProducts() {
  try {
    isLoading.value = true
    products.value = await fetchNewArrivals()
  } catch (err) {
    error.value = "Failed to load new arrivals"
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchNewProducts)

const subtitle = computed(() => {
  if (isLoading.value) return "Switching on something special…"
  if (error.value) return "Something dimmed the glow. Refresh to retry."
  return `${products.value.length} ${
    products.value.length === 1 ? "item" : "items"
  }`
})

const sectionHeaderData = computed(() => ({
  tagline: "Trending right now",
  headingId: "new-arrivals-section",
  title: "What's new",
  subtitle: subtitle.value,
  link: {
    to: "/collections",
    text: "Shop all"
  },
  productType: "new" as "new",
  withNavigation: true
}))

const swiperRef = ref<any | null>(null)

function onGrabStart() {
  const el = swiperRef.value.$el
  el.classList.add("cursor-grabbing")
  el.classList.remove("cursor-grab")
}

function onGrabEnd() {
  const el = swiperRef.value.$el
  el.classList.add("cursor-grab")
  el.classList.remove("cursor-grabbing")
}
</script>

<template>
  <!-- New Arrivals -->
  <section
    :aria-labelledby="sectionHeaderData.headingId"
    class="sp-mt-storefront-section px-[14px]"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #title>
        Treat your home <br />
        to something new
      </template>
    </SectionHeader>

    <Swiper
      ref="swiperRef"
      :modules="[Navigation, Keyboard]"
      :navigation="{
        prevEl: '.new-prev',
        nextEl: '.new-next'
      }"
      :keyboard="{
        enabled: true,
        onlyInViewport: true
      }"
      :slides-per-view="1.12"
      :space-between="16"
      :centered-slides="true"
      :centered-slides-bounds="true"
      :breakpoints="{
        640: {
          centeredSlides: false,
          slidesPerView: 2.1,
          spaceBetween: 16
        },
        768: {
          centeredSlides: false,
          slidesPerView: 2.2,
          spaceBetween: 18
        },
        976: {
          centeredSlides: false,
          slidesPerView: 3,
          spaceBetween: 18
        }
      }"
      @touchStart="onGrabStart"
      @touchEnd="onGrabEnd"
      class="sp-mt-swiper-wrapper cursor-grab"
    >
      <SwiperSlide v-for="product in products" :key="product.id">
        <NewProductCard :product="product" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>
