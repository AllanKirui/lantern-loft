<script setup lang="ts">
import Logo from "@/components/common/Logo.vue"
import MobileNav from "./MobileNav.vue"
</script>

<template>
  <!-- Top navigation -->
  <div
    class="wrapper relative flex items-center justify-between fluid-nav-px h-20"
  >
    <!-- Logo -->
    <div class="storefront-nav-logo-wrapper">
      <Logo href="/" />
    </div>

    <!-- Center links - Desktop -->
    <nav class="hidden md:flex gap-6">
      <a href="/" data-replace="Home" class="fs-nav-lg link-hover"
        ><span>Home</span></a
      >
      <a href="/collections" data-replace="Shop" class="fs-nav-lg link-hover"
        ><span>Shop</span></a
      >
    </nav>

    <!-- Right buttons - Desktop -->
    <div class="hidden md:flex items-center gap-4">
      <!-- Cart -->
      <a
        href="/cart"
        class="flex items-center gap-[10px] hover:text-bone duration-200"
      >
        <div class="relative">
          <BaseIcon name="cart" class="w-7 h-7" :stroke-width="3" />
          <div
            class="absolute min-w-5 min-h-5 -top-1/3 -right-2 flex items-center justify-center bg-black rounded-full"
          >
            <span class="text-[14px] text-cosmic-latte">5</span>
          </div>
        </div>
        <span class="fs-nav-lg">Cart</span>
      </a>

      <!-- Vertical divider -->
      <span class="w-[1px] h-5 bg-crayola" />

      <!-- Search Button -->
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

    <!-- Mobile Nav -->
    <MobileNav />
  </div>
</template>
