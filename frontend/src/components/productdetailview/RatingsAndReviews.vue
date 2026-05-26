<script setup lang="ts">
import { inject, computed } from "vue"
import type { ProductDetailContext } from "@/types/product-detail"
import type { Product } from "@/types/products"
import SectionHeader from "@/components/common/SectionHeader.vue"
import RatingsDistribution from "./reviews/RatingsDistribution.vue"
import ReviewList from "./reviews/ReviewList.vue"
import ReviewItem from "./reviews/ReviewItem.vue"
import NoReviewItemsFound from "./reviews/NoReviewItemsFound.vue"

// inject the productDetail instance coming from ProductDetailView.vue
const { product } = inject<ProductDetailContext<Product>>("productDetail")!

const reviews = computed(() => product.value.reviews)
const hasReviews = computed(() => product.value.reviews.meta.count > 0)

const MAX_REVIEWS_SHOWN = 7
const count = computed(() => reviews.value.meta.count)

const showViewMoreLink = computed(() =>
  count.value > MAX_REVIEWS_SHOWN ? true : false
)

const reviewsLink = computed(() => ({
  to: `/collections/${product.value.slug}/reviews`,
  text: "See all reviews"
}))

const subtitle = computed(() => {
  if (count.value === 1) return `Displaying 1 review`

  if (count.value <= MAX_REVIEWS_SHOWN)
    return `Displaying 1-${count.value} of ${count.value} reviews`

  return `Displaying 1-7 of ${count.value.toLocaleString()} reviews`
})

const sectionHeaderData = computed(() => {
  if (hasReviews.value)
    return {
      tagline: "Hear it from our customers",
      headingId: "ratings-and-reviews",
      title: "Customers are saying",
      subtitle: subtitle.value,
      link: showViewMoreLink.value ? reviewsLink.value : undefined
    }
  else
    return {
      tagline: "Hear it from our customers",
      headingId: "ratings-and-reviews"
    }
})

const viewedLabel = computed(() => {
  if (count.value <= MAX_REVIEWS_SHOWN) return "You've viewed all reviews"

  return `You've viewed 1-${MAX_REVIEWS_SHOWN} of ${count.value.toLocaleString()} reviews`
})

const viewMoreLink = computed(() => ({
  label: viewedLabel.value,
  to: `/collections/${product.value.slug}/reviews`,
  text: "View more"
}))
</script>

<template>
  <section
    id="reviews"
    :aria-labelledby="sectionHeaderData.headingId"
    class="sp-mt-storefront-section"
  >
    <SectionHeader :data="sectionHeaderData">
      <template #heading>Ratings & Reviews<br />by Lanterneers</template>
      <template v-if="hasReviews" #extras>
        <RatingsDistribution :reviews-meta="reviews.meta" />
      </template>
    </SectionHeader>

    <template v-if="hasReviews">
      <ReviewList>
        <ReviewItem
          v-for="(review, index) in reviews.items"
          :key="review.id"
          :review="review"
          :is-last-item="index + 1 === reviews.items.length"
        />
      </ReviewList>

      <div
        class="sp-mt-pdp-view-more-reviews-text flex items-center justify-between"
      >
        <div
          class="fs-pdp-view-more-reviews-text text-pale-brown font-medium leading-none"
        >
          {{ viewMoreLink.label }}
        </div>

        <div v-if="showViewMoreLink">
          <RouterLink
            :to="viewMoreLink.to"
            :data-replace="viewMoreLink.text"
            class="link-hover-alt md:link-hover fs-pdp-view-more-reviews-text font-medium text-pale-brown"
            ><span>{{ viewMoreLink.text }}</span></RouterLink
          >
        </div>
      </div>
    </template>

    <template v-else>
      <NoReviewItemsFound />
    </template>
  </section>
</template>
