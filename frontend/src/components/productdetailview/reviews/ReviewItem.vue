<script setup lang="ts">
import { computed } from "vue"
import type { ReviewItem } from "@/types/reviews/review-item"
import StarRatingDisplay from "@/components/common/StarRatingDisplay.vue"

interface Props {
  review: ReviewItem
  isLastItem: boolean
}

const props = defineProps<Props>()

function uppercaseFirstLetter(word: string | null) {
  if (!word) return

  return word.charAt(0).toUpperCase() + word.slice(1)
}

function simplifyName(names: string) {
  const firstName = names.split(" ")[0]
  const lastName = names.split(" ")[1]

  return firstName + " " + lastName.charAt(0) + "."
}

const isLengthy = computed(() => props.review.comment.length > 300)
</script>

<template>
  <li :class="[`${isLastItem ? 'mb-0' : 'mb-5'}`]">
    <div>
      <StarRatingDisplay :rating="review.rating" class="md:hidden" />
      <StarRatingDisplay
        :rating="review.rating"
        :size="22"
        class="hidden md:flex"
      />

      <div class="mt-1 font-semibold">
        {{ uppercaseFirstLetter(review.reviewTitle) }}
      </div>
    </div>

    <div class="flex items-center justify-between mt-2 w-full">
      <div class="text-sm font-medium">
        {{ simplifyName(review.authorName) }}
      </div>
      <div
        v-if="review.isVerified"
        class="inline-flex items-center gap-1 text-xs uppercase font-medium"
      >
        <BaseIcon name="round-check" class="w-4 h-4 text-esmerald" />
        Verified Purchaser
      </div>
    </div>

    <!-- TODO add dynamic review and purchase dates -->
    <!-- <div
      class="flex items-center justify-between mt-2 w-full text-pale-brown font-medium text-xs"
    >
      <div>16 days ago</div>
      <div>Purchased on May 13, 2025</div>
    </div> -->

    <p
      class="mt-3 leading-normal review-text"
      :class="{
        expanded: review.expanded,
        blurred: isLengthy
      }"
    >
      {{ review.comment }}
    </p>

    <!-- Read more button -->
    <div v-if="isLengthy && !review.expanded" class="mt-2">
      <button
        @click="review.expanded = true"
        class="inline-flex items-center px-1.5 py-1 text-[15px] font-medium rounded btn-hover hover:after:bg-bone/50 duration-200"
      >
        Show more
        <BaseIcon
          name="chevron-alt"
          class="w-[18px] h-[18px] rotate-180"
          :stroke-width="7"
        />
      </button>
    </div>

    <div v-if="review.recommends" class="flex items-center gap-1 mt-3">
      <BaseIcon name="round-check" class="w-3.5 h-3.5" />
      <span class="italic text-pale-brown"
        >Yes, I would recommend this product</span
      >
    </div>

    <!-- Horizontal divider -->
    <span
      :class="[
        `${isLastItem ? 'hidden' : 'mt-3 block w-full h-[1px] bg-bone'}`
      ]"
    />
  </li>
</template>

<style scoped>
.review-text {
  max-height: 6rem;
  overflow: hidden;
  position: relative;
}
.review-text.expanded {
  max-height: none;
}
.review-text.blurred::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.5rem;
  background: linear-gradient(
    180deg,
    rgba(254, 250, 234, 0) 0%,
    rgba(254, 250, 234, 1) 80%
  );
}
.review-text.expanded::after {
  display: none;
}
</style>
