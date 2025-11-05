<script setup lang="ts">
import Logo from "@/components/common/Logo.vue"
</script>

<template>
  <!-- Top navigation -->
  <div
    class="wrapper relative flex items-center justify-between px-fluid-xs h-20"
  >
    <!-- Logo -->
    <div class="storefront-nav-logo-wrapper">
      <Logo href="/" />
    </div>

    <!-- Center links -->
    <nav class="hidden md:flex gap-6">
      <a href="/" data-replace="Home" class="fs-nav-lg link-hover"
        ><span>Home</span></a
      >
      <a href="/collections" data-replace="Shop" class="fs-nav-lg link-hover"
        ><span>Shop</span></a
      >
    </nav>

    <!-- Right buttons -->
    <div class="flex items-center gap-4">
      <a
        href="/cart"
        class="flex items-center gap-[10px] hover:text-bone duration-200"
      >
        <div class="relative">
          <BaseIcon name="cart" class="w-7 h-7" />
          <div
            class="absolute min-w-5 min-h-5 -top-1/3 -right-2 flex items-center justify-center bg-black rounded-full"
          >
            <span class="fs-nav-cart-count text-cosmic-latte">3</span>
          </div>
        </div>
        <span class="fs-nav-lg">Cart</span>
      </a>

      <!-- Vertical divider -->
      <span class="w-[1px] h-5 bg-crayola" />

      <button
        class="group btn-hover flex items-center justify-center w-8 h-8 hover:after:bg-eerie-black rounded-full"
      >
        <BaseIcon
          name="search"
          class="w-6 h-6 group-hover:text-cosmic-latte duration-200"
          :stroke-width="4"
        />
        <span class="sr-only">Search</span>
      </button>
    </div>
  </div>
</template>
