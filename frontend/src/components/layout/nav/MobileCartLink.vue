<script setup lang="ts">
import BaseMobileNavButton from "./BaseMobileNavButton.vue"
</script>

<template>
  <BaseMobileNavButton type="link" href="/cart" text="Cart">
    <div class="relative">
      <BaseIcon name="cart" class="w-5 h-5 sm:w-6 sm:h-6" :stroke-width="3.5" />
      <!-- Items Count -->
      <div
        class="absolute -top-1/4 -right-2 min-w-4 min-h-4 flex items-center justify-center bg-black rounded-full"
      >
        <span class="fs-nav-cart-count text-cosmic-latte leading-none">3</span>
      </div>
    </div>
  </BaseMobileNavButton>
</template>
