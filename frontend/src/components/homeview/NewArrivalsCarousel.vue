<script setup lang="ts">
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
  withNavigation: true
}
</script>

<template>
  <!-- New Arrivals -->
  <section :aria-labelledby="sectionHeaderData.headingId">
    <SectionHeader :data="sectionHeaderData" />
  </section>
</template>
