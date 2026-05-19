<template>
  <div class="wrapper px-3.5">
    <!-- Breadcrumbs for large screens -->
    <div
      class="skeleton hidden md:flex md:w-4/12 lg:w-3/12 h-3 mt-3 bg-cream rounded"
    ></div>

    <!-- Hero Section -->
    <div
      class="flex flex-col md:flex-row justify-center max-w-[1080px] mx-auto sp-mt-pdp-hero"
    >
      <!-- Overview Top Mobile -->
      <div class="md:hidden w-full space-y-5">
        <div class="space-y-3.5">
          <!-- Title -->
          <div class="skeleton w-1/2 sm_plus:w-5/12 h-5 bg-cream rounded"></div>

          <!-- Tagline -->
          <div
            class="skeleton w-8/12 sm_plus:w-1/2 h-3.5 bg-cream rounded"
          ></div>

          <!-- Model & SKU -->
          <div class="flex gap-3">
            <div
              class="skeleton w-1/4 sm_plus:w-1/6 h-3 bg-cream rounded"
            ></div>
            <div
              class="skeleton w-1/4 sm_plus:w-1/6 h-3 bg-cream rounded"
            ></div>
          </div>

          <!-- Rating -->
          <div class="flex gap-3">
            <div
              class="skeleton w-2/6 sm_plus:w-3/12 h-4 bg-cream rounded"
            ></div>
            <div
              class="skeleton w-2/6 sm_plus:w-3/12 h-4 bg-cream rounded"
            ></div>
          </div>
        </div>
      </div>

      <!-- Thumbnails for large screens -->
      <div class="hidden lg:flex flex-col space-y-3">
        <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
        <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
        <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
      </div>

      <div class="flex md:flex-col justify-center w-full">
        <!-- Thumbnails for mid screens 640px and 768px -->
        <div
          class="hidden sm_plus:flex flex-col md:hidden mt-5 md:mt-0 space-y-3"
        >
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
        </div>

        <!-- Image -->
        <div class="mt-5 md:mt-0 w-full">
          <div
            class="skeleton mx-auto w-full sm_plus:max-w-lg sm_plus:w-10/12 aspect-square bg-cream rounded-lg"
          ></div>
        </div>

        <!-- Thumbnails container for medium screens -->
        <div class="ml-[10%] hidden md:flex gap-3 mt-4 lg:hidden">
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
          <div class="skeleton aspect-square h-20 bg-cream rounded"></div>
        </div>
      </div>

      <!-- Overview Desktop -->
      <div
        class="hidden md:block md:max-w-[280px] lg:max-w-xs w-full h-fit space-y-5 p-4 bg-cream rounded-lg"
      >
        <div class="space-y-3.5">
          <!-- Title -->
          <div class="skeleton w-3/4 h-5 bg-bone/65 rounded"></div>

          <!-- Tagline -->
          <div class="skeleton w-full h-3.5 bg-bone/65 rounded"></div>

          <!-- Model & SKU -->
          <div class="flex gap-3">
            <div class="skeleton w-1/4 h-3 bg-bone/65 rounded"></div>
            <div class="skeleton w-1/4 h-3 bg-bone/65 rounded"></div>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex gap-3">
          <div class="skeleton w-2/6 h-4 bg-bone/65 rounded"></div>
          <div class="skeleton w-2/6 h-4 bg-bone/65 rounded"></div>
        </div>

        <!-- Price -->
        <div class="skeleton w-1/2 h-5 bg-bone/65 rounded"></div>

        <!-- Availability & Shipping -->
        <div class="space-y-3">
          <div class="skeleton w-1/4 h-3 bg-bone/65 rounded"></div>
          <div class="skeleton w-5/6 h-3 bg-bone/65 rounded"></div>
          <div class="skeleton w-2/3 h-3 bg-bone/65 rounded"></div>
        </div>

        <!-- Button -->
        <div class="skeleton w-full h-12 bg-bone/65 rounded"></div>
      </div>

      <!-- Breadcrumbs for small screens -->
      <div
        class="skeleton md:hidden w-8/12 sm_plus:w-1/2 h-3 mt-3 bg-cream rounded"
      ></div>

      <!-- Overview Bottom Mobile -->
      <div class="md:hidden mt-5 w-full space-y-5">
        <!-- Price -->
        <div class="skeleton w-1/2 sm_plus:w-1/5 h-5 bg-cream rounded"></div>

        <!-- Availability & Shipping -->
        <div class="space-y-3">
          <div class="skeleton w-1/4 sm_plus:w-1/5 h-3 bg-cream rounded"></div>
          <div class="skeleton w-5/6 sm_plus:w-1/2 h-3 bg-cream rounded"></div>
          <div class="skeleton w-2/3 sm_plus:w-2/6 h-3 bg-cream rounded"></div>
        </div>

        <!-- Button -->
        <div
          class="skeleton w-full sm_plus:max-w-96 mx-auto h-12 bg-cream rounded"
        ></div>
      </div>
    </div>

    <!-- Description -->
    <div class="sp-mt-storefront-section max-w-4xl mx-auto">
      <div class="space-y-4">
        <div class="skeleton w-5/12 md:w-3/12 h-5 bg-cream"></div>

        <div class="space-y-3">
          <div class="skeleton w-full h-3.5 bg-cream"></div>
          <div class="skeleton w-full h-3.5 bg-cream"></div>
          <div class="skeleton md:hidden w-full h-3.5 bg-cream"></div>
          <div class="skeleton w-1/2 h-3.5 bg-cream"></div>
        </div>
      </div>
    </div>

    <!-- Details -->
    <div class="sp-mt-storefront-section max-w-4xl mx-auto">
      <div class="space-y-4">
        <div class="skeleton w-5/12 md:w-3/12 h-5 bg-cream"></div>

        <div class="space-y-3">
          <div class="skeleton w-7/12 md:w-4/12 h-3.5 bg-cream"></div>
          <div class="skeleton w-7/12 md:w-4/12 h-3.5 bg-cream"></div>
          <div class="skeleton w-7/12 md:w-4/12 h-3.5 bg-cream"></div>
        </div>
      </div>
    </div>

    <!-- Specs -->
    <div class="sp-mt-storefront-section max-w-4xl mx-auto">
      <div class="space-y-4">
        <div class="skeleton w-5/12 md:w-3/12 h-5 bg-cream"></div>

        <div class="skeleton w-full h-64 bg-cream"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(122, 97, 83, 0.15),
    transparent
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  100% {
    left: 100%;
  }
}
</style>
