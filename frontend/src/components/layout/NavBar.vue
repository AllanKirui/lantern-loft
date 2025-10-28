<script setup lang="ts">
import Logo from "../common/Logo.vue"
</script>

<template>
  <header class="w-full bg-black text-crayola">
    <!-- Top navigation -->
    <div
      class="wrapper relative flex items-center justify-between px-fluid-xs h-20"
    >
      <!-- Logo -->
      <div class="w-[126px]">
        <a href="/">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 font-medium fs-logo-fallback whitespace-nowrap"
            >Lantern Loft</span
          >
          <Logo />
        </a>
      </div>

      <!-- Center links -->
      <nav class="hidden md:flex gap-6">
        <a href="/" class="fs-nav-lg">Home</a>
        <a href="/collections" class="fs-nav-lg">Shop</a>
      </nav>

      <!-- Right buttons -->
      <div class="flex items-center gap-4">
        <a href="/cart" class="flex items-center gap-[10px]">
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
          class="group flex items-center justify-center w-8 h-8 hover:bg-eerie-black duration-200 rounded-full"
        >
          <BaseIcon
            name="search"
            class="w-6 h-6 group-hover:text-cosmic-latte"
            :stroke-width="4"
          />
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>

    <!-- Horizontal divider -->
    <span class="block w-full h-[1px] bg-jet" />

    <!-- Bottom navigation for desktop -->
    <div class="wrapper hidden md:flex justify-end gap-8 py-2 px-4 text-[15px]">
      <div class="group relative">
        <a
          href="/account"
          class="flex items-center gap-2 group-hover:text-bone"
        >
          <BaseIcon name="avatar" class="w-5 h-5" :stroke-width="3.5" />
          <span>Account</span>
          <BaseIcon
            name="chevron"
            class="w-3 h-[7.5px] text-bone"
            :stroke-width="5"
          />
        </a>
      </div>

      <div class="group relative">
        <a
          href="/recent-items"
          class="flex items-center gap-2 group-hover:text-bone"
        >
          <BaseIcon name="history" class="w-5 h-5" :stroke-width="3.5" />
          <span>Recently Viewed</span>
          <BaseIcon
            name="chevron"
            class="w-3 h-[7.5px] text-bone"
            :stroke-width="5"
          />
        </a>
      </div>

      <div class="group relative">
        <a
          href="/wishlist"
          class="flex items-center gap-2 group-hover:text-bone"
        >
          <BaseIcon name="wishlist" class="w-5 h-5" :stroke-width="3.5" />
          <span>Wishlist</span>
          <BaseIcon
            name="chevron"
            class="w-3 h-[7.5px] text-bone"
            :stroke-width="5"
          />
        </a>
      </div>

      <div>
        <!-- TODO add link to admin login -->
        <a href="#" class="flex items-center gap-2 hover:text-bone">
          <BaseIcon name="bulb-off" class="w-[22px] h-[22px]" />
          <span>The Workshop</span>
        </a>
      </div>
    </div>

    <!-- TODO Mobile menu -->
  </header>
</template>
