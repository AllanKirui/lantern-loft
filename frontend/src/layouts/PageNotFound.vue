<script setup lang="ts">
import Logo from "@/components/common/Logo.vue"
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-cosmic-latte">
    <header class="px-4 w-full bg-black">
      <div class="wrapper relative">
        <div class="storefront-nav-logo-wrapper relative">
          <Logo />
        </div>
      </div>
    </header>

    <div
      class="wrapper absolute top-1/3 left-1/2 -translate-x-1/2 w-full px-4 sm_plus:px-10 md:px-20 lg:px-32 text-chestnut-brown"
    >
      <h1 class="fs-not-found-h1 font-medium">Uh oh!</h1>

      <p class="px-1 mt-2 md:mt-3 fs-not-found-body leading-normal">
        Sorry, the page you were looking for was not found.
      </p>

      <div class="flex items-center gap-2 mt-5">
        <BaseIcon
          name="chevron"
          class="w-[11px] h-[6.9px] rotate-90 text-chestnut-brown"
          :stroke-width="7"
        />
        <RouterLink
          to="/"
          class="link-hover-alt"
          data-replace="Get back to the store"
          ><span>Get back to the store</span></RouterLink
        >
      </div>
    </div>
  </div>
</template>
