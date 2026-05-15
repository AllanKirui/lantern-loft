<script setup lang="ts">
import { computed } from "vue"
import type { ReviewsMeta } from "@/types/reviews/reviews-meta"
import StarRatingDisplay from "@/components/common/StarRatingDisplay.vue"
import RecommendationPercentage from "./RecommendationPercentage.vue"

const props = defineProps<{ reviewsMeta: ReviewsMeta }>()

const reviewsCountText = computed(() => {
  if (props.reviewsMeta.count === 1) return "1 review"

  return `${props.reviewsMeta.count.toLocaleString()} reviews`
})

function getDistributionPercentage(distributionCount: number) {
  if (!props.reviewsMeta.count) return 0

  const percentage = (distributionCount / props.reviewsMeta.count) * 100

  // if resulting percentage is small, like 1 or 2%, set it to 4%, so it's visible in the UI
  return Math.round(percentage > 0 ? Math.max(percentage, 4) : 0)
}
</script>

<template>
  <!-- Ratings Overview -->
  <div
    class="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto sp-mt-pdp-ratings-distribution"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-center lg:w-full gap-6 md:gap-12 lg:gap-6"
    >
      <!-- Average Rating -->
      <div class="flex-shrink-0 w-fit lg:mx-auto">
        <div class="flex items-center gap-3 w-fit mx-auto">
          <div class="fs-pdp-reviews-average-rating font-bold">
            {{ reviewsMeta.averageRating.toFixed(1) }}
          </div>

          <div class="text-base text-center">
            <StarRatingDisplay :rating="reviewsMeta.averageRating" :size="26" />
            <span class="font-medium">{{ reviewsCountText }}</span>
          </div>
        </div>

        <RecommendationPercentage
          :percentage="reviewsMeta.recommendationPercentage"
          class="hidden md:flex mt-4"
        />
      </div>

      <!-- Ratings Distribution -->
      <div class="flex flex-col max-w-sm w-full">
        <div class="flex gap-5">
          <!-- Distribution Stars -->
          <div class="flex flex-col gap-2">
            <div
              v-for="distribution in reviewsMeta.distributions"
              :key="distribution.star"
              class="h-5 leading-none"
            >
              <div class="text-sm">{{ distribution.star }} Star</div>
            </div>
          </div>

          <!-- Distribution Bars -->
          <div class="flex-1 flex flex-col gap-2">
            <div
              v-for="distribution in reviewsMeta.distributions"
              :key="distribution.star"
              class="flex items-center h-5"
            >
              <div class="flex-1 h-3 bg-cream rounded-full overflow-hidden">
                <div
                  class="h-full bg-chestnut-brown rounded-l-full"
                  :style="{
                    width: getDistributionPercentage(distribution.count) + '%'
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Distribution Counts -->
          <div class="flex flex-col gap-2">
            <div
              v-for="distribution in reviewsMeta.distributions"
              :key="distribution.star"
              class="min-w-12 h-5 leading-none"
            >
              {{ distribution.count.toLocaleString() }}
            </div>
          </div>
        </div>

        <small class="mt-2 italic text-center"
          >Click on the rating bars above to filter reviews by rating.</small
        >
      </div>

      <RecommendationPercentage
        :percentage="reviewsMeta.recommendationPercentage"
        class="flex md:hidden"
      />
    </div>

    <!-- Leave a review button -->
    <div class="max-w-64 w-full h-fit m-auto">
      <button class="btn-secondary w-full">Write a Review</button>
      <small class="block italic text-center mt-2"
        >Let others know what you think.</small
      >
    </div>
  </div>
</template>
