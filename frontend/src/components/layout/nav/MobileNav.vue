<script setup lang="ts">
import { useMobileNavStore } from "@/stores/mobileNav"
import MobileAccountButton from "./MobileAccountButton.vue"
import MobileCartLink from "./MobileCartLink.vue"
import MobileMenuButton from "./MobileMenuButton.vue"
import MobileSearchButton from "./MobileSearchButton.vue"
import MobileMenuDropdown from "./MobileMenuDropdown.vue"
import MobileAccountDropdown from "./MobileAccountDropdown.vue"

const mobileNavStore = useMobileNavStore()
</script>

<template>
  <div
    class="relative md:hidden w-full h-full flex justify-between overflow-hidden"
  >
    <!-- Left buttons - Mobile -->
    <div class="flex items-center fluid-gap-xs">
      <MobileMenuButton />
      <MobileAccountButton />
    </div>

    <!-- Right buttons - Mobile -->
    <div class="flex items-center fluid-gap-xs">
      <MobileCartLink />
      <MobileSearchButton />
    </div>
  </div>

  <!-- Mobile Dropdown -->
  <transition name="slide-down">
    <MobileMenuDropdown v-if="mobileNavStore.isMenuOpen" />
    <MobileAccountDropdown v-else-if="mobileNavStore.isAccountOpen" />
  </transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: height 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1);
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  height: calc(100vh - 80px);
  opacity: 1;
}
.slide-down-leave-from {
  overflow-y: auto;
}

.slide-down-enter-active li,
.slide-down-leave-active li {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1);
}

.slide-down-enter-from li,
.slide-down-leave-to li {
  opacity: 0;
}

.slide-down-enter-to li,
.slide-down-leave-from li {
  opacity: 1;
}
</style>
