<script setup lang="ts">
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Keyboard } from "swiper/modules"
import NewProductCard from "../organisms/NewProductCard.vue"
import SectionHeader from "../common/SectionHeader.vue"

/* TODO fetch data using Axios from the API */
const newArrivals = [
  {
    id: 1,
    title: "Luminous Sphere",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  },
  {
    id: 2,
    title: "New Product 2",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  },
  {
    id: 3,
    title: "New Product 3",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  },
  {
    id: 4,
    title: "New Product 4",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  },
  {
    id: 5,
    title: "New Product 5",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  },
  {
    id: 6,
    title: "New Product 6",
    description:
      "It's a spark of elegance. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sodales orci nec ligula. Nam consectetuer mollis dolor."
  }
]

const sectionHeaderData = {
  tagline: "Trending right now",
  title: "Treat your home to something new",
  headingId: "new-arrivals-section",
  subheading: {
    title: "What's new",
    subtitle: `${newArrivals.length} items`,
    link: {
      to: "/collections",
      text: "Shop all"
    }
  },
  productType: "new" as "new",
  withNavigation: true
}

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
    <SectionHeader :data="sectionHeaderData" />

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
      <SwiperSlide v-for="(product, index) in newArrivals" :key="product.id">
        <NewProductCard :index="index" :product="product" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>
