<template>
  <div class="sp-mt-pdp-review-list flex flex-col items-center">
    <div>
      <!-- Empty star -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        stroke="currentColor"
        fill="none"
        :style="{ strokeWidth: 3, width: `36px`, height: `36px` }"
        class="-mx-[1px]"
      >
        <path
          d="M32.5,10.36l6.84,13.57a.55.55,0,0,0,.42.3L55,26.4a.57.57,0,0,1,.3,1L44.3,37.9a.56.56,0,0,0-.16.51l2.6,14.88a.56.56,0,0,1-.81.6l-13.67-7a.59.59,0,0,0-.52,0l-13.67,7a.56.56,0,0,1-.81-.6l2.6-14.88a.56.56,0,0,0-.16-.51l-11-10.52a.57.57,0,0,1,.3-1l15.26-2.17a.55.55,0,0,0,.42-.3L31.5,10.36A.56.56,0,0,1,32.5,10.36Z"
        />
      </svg>
    </div>

    <div class="sp-mt-pdp-no-reviews-section text-center">
      <p>No customer reviews for the moment.</p>
      <p class="mt-1">Be the first one to leave a review.</p>
    </div>

    <div class="sp-mt-pdp-no-reviews-section max-w-64 w-full">
      <button class="btn-secondary w-full">Write a Review</button>
      <small class="block italic text-center mt-2"
        >Let others know what you think.</small
      >
    </div>
  </div>
</template>
