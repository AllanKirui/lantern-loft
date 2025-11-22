<!-- Star ratings - display only, no interactions -->
<script setup lang="ts">
import { computed } from "vue"

interface Props {
  productId: number
  rating: number
  maxStars?: number // default 5
}

const props = withDefaults(defineProps<Props>(), {
  maxStars: 5
})

const hasPartialStar = computed(() => props.rating % 1 >= 0.01)

// get the decimal part of the rating, multiply it by 10 to get a percentage
const fillPartialStarBy = computed(
  () => parseInt(props.rating.toString().slice(-1)) * 10
)
</script>

<template>
  <span class="flex">
    <template v-for="star in maxStars" :key="star">
      <svg
        v-if="star <= Math.floor(rating)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        stroke="currentColor"
        fill="currentColor"
        class="w-[19px] h-[19px] -mx-[1px]"
        style="stroke-width: 2"
      >
        <!-- Full Star -->
        <path
          d="M32.5,10.36l6.84,13.57a.55.55,0,0,0,.42.3L55,26.4a.57.57,0,0,1,.3,1L44.3,37.9a.56.56,0,0,0-.16.51l2.6,14.88a.56.56,0,0,1-.81.6l-13.67-7a.59.59,0,0,0-.52,0l-13.67,7a.56.56,0,0,1-.81-.6l2.6-14.88a.56.56,0,0,0-.16-.51l-11-10.52a.57.57,0,0,1,.3-1l15.26-2.17a.55.55,0,0,0,.42-.3L31.5,10.36A.56.56,0,0,1,32.5,10.36Z"
        />
      </svg>
      <svg
        v-else-if="star === Math.ceil(rating) && hasPartialStar"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        stroke="currentColor"
        fill="none"
        class="w-[19px] h-[19px] -mx-[1px]"
        style="stroke-width: 2"
      >
        <!-- Partially Filled Star -->
        <defs>
          <linearGradient :id="`partialGradient-${productId}-${star}`">
            <stop :offset="`${fillPartialStarBy}%`" stop-color="#5f4235" />
            <stop offset="0%" stop-color="transparent" />
          </linearGradient>
        </defs>
        <path
          :fill="`url(#partialGradient-${productId}-${star})`"
          d="M32.5,10.36l6.84,13.57a.55.55,0,0,0,.42.3L55,26.4a.57.57,0,0,1,.3,1L44.3,37.9a.56.56,0,0,0-.16.51l2.6,14.88a.56.56,0,0,1-.81.6l-13.67-7a.59.59,0,0,0-.52,0l-13.67,7a.56.56,0,0,1-.81-.6l2.6-14.88a.56.56,0,0,0-.16-.51l-11-10.52a.57.57,0,0,1,.3-1l15.26-2.17a.55.55,0,0,0,.42-.3L31.5,10.36A.56.56,0,0,1,32.5,10.36Z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        stroke="currentColor"
        fill="none"
        class="w-[19px] h-[19px] -mx-[1px]"
        style="stroke-width: 2"
      >
        <!-- Empty Star -->
        <path
          d="M32.5,10.36l6.84,13.57a.55.55,0,0,0,.42.3L55,26.4a.57.57,0,0,1,.3,1L44.3,37.9a.56.56,0,0,0-.16.51l2.6,14.88a.56.56,0,0,1-.81.6l-13.67-7a.59.59,0,0,0-.52,0l-13.67,7a.56.56,0,0,1-.81-.6l2.6-14.88a.56.56,0,0,0-.16-.51l-11-10.52a.57.57,0,0,1,.3-1l15.26-2.17a.55.55,0,0,0,.42-.3L31.5,10.36A.56.56,0,0,1,32.5,10.36Z"
        />
      </svg>
    </template>
  </span>
</template>
