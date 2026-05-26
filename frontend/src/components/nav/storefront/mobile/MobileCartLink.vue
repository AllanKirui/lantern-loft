<template>
  <RouterLink to="/cart" class="mobile-nav-button">
    <div class="relative w-auto h-6">
      <BaseIcon name="cart" class="w-5 h-5 sm:w-6 sm:h-6" :stroke-width="3.5" />
      <!-- Items Count -->
      <div
        class="absolute -top-1/4 -right-2 min-w-4 min-h-4 flex items-center justify-center bg-black rounded-full"
      >
        <span class="fs-nav-cart-count text-cosmic-latte leading-none">0</span>
      </div>
    </div>

    <span class="fs-nav-sm uppercase leading-none">Cart</span>
  </RouterLink>
</template>
