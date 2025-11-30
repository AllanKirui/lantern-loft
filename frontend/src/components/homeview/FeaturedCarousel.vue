<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import SectionHeader from "../common/SectionHeader.vue"
import ProductCard from "../organisms/ProductCard.vue"

/* TODO fetch data using Axios from the API */
const featuredProducts = [
  {
    id: 1,
    name: "Luminous Sphere",
    reviewsCount: 0,
    rating: 0,
    finishesCount: 3,
    price: 2345,
    discountedPrice: 0,
    isNew: true,
    hasDiscount: false
  },
  {
    id: 2,
    name: "Glow Hive",
    reviewsCount: 123,
    rating: 4.7,
    finishesCount: 0,
    price: 2550,
    discountedPrice: 1950,
    isNew: false,
    hasDiscount: true
  },
  {
    id: 3,
    name: "Lantern's Delight",
    reviewsCount: 33,
    rating: 4.2,
    finishesCount: 17,
    price: 2800,
    discountedPrice: 0,
    isNew: false,
    hasDiscount: false
  },
  {
    id: 4,
    name: "Sparkle",
    reviewsCount: 12,
    rating: 4.7,
    finishesCount: 0,
    price: 3250,
    discountedPrice: 0,
    isNew: true,
    hasDiscount: false
  },
  {
    id: 5,
    name: "Luminous Sphere",
    reviewsCount: 230,
    rating: 5,
    finishesCount: 0,
    price: 3345,
    discountedPrice: 2345,
    isNew: false,
    hasDiscount: true
  },
  {
    id: 6,
    name: "Moon Light",
    reviewsCount: 44,
    rating: 4.5,
    finishesCount: 0,
    price: 4100,
    discountedPrice: 0,
    isNew: false,
    hasDiscount: false
  },
  {
    id: 7,
    name: "Starry Nights",
    reviewsCount: 1421,
    rating: 4.7,
    finishesCount: 32,
    price: 2600,
    discountedPrice: 0,
    isNew: false,
    hasDiscount: false
  },
  {
    id: 8,
    name: "Aurora Lamp",
    reviewsCount: 213,
    rating: 4.2,
    finishesCount: 0,
    price: 2345,
    discountedPrice: 0,
    isNew: false,
    hasDiscount: false
  }
]

const sectionHeaderData = {
  tagline: "Have you seen these future favorites?",
  headingId: "featured-products-section",
  subheading: {
    title: "We think you'll like",
    subtitle: `${featuredProducts.length} items`,
    link: {
      to: "/collections",
      text: "Shop all"
    }
  },
  productType: "featured" as "featured",
  withNavigation: true
}
</script>

<template>
  <!-- Featured Products -->
  <section
    :aria-labelledby="sectionHeaderData.headingId"
    class="sp-mt-storefront-section px-[14px]"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #title>
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
      <SwiperSlide
        v-for="(product, index) in featuredProducts"
        :key="product.id"
      >
        <ProductCard :index="index" :product="product" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>
