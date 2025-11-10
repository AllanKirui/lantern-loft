<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue"
import { useMobileNavStore } from "@/stores/mobileNav"
import MobileAccountButton from "./MobileAccountButton.vue"
import MobileCartLink from "./MobileCartLink.vue"
import MobileMenuButton from "./MobileMenuButton.vue"
import MobileSearchButton from "./MobileSearchButton.vue"
import MobileMenuDropdown from "./MobileMenuDropdown.vue"
import MobileAccountDropdown from "./MobileAccountDropdown.vue"
import BaseOverlay from "@/components/base/BaseOverlay.vue"

const mobileNavStore = useMobileNavStore()

function handleScreenResize() {
  if (window.innerWidth > 767) mobileNavStore.closeAll()
}

function addResizeListener() {
  window.addEventListener("resize", handleScreenResize)
}

function removeResizeListener() {
  window.removeEventListener("resize", handleScreenResize)
}

watch(
  () => mobileNavStore.activeDropdown,
  (newVal) => {
    if (newVal) addResizeListener()
    else removeResizeListener()
  }
)

onBeforeUnmount(removeResizeListener)
</script>

<template>
  <div
    class="relative md:hidden w-full h-full flex justify-between overflow-hidden"
  >
    <!-- Left buttons - Mobile -->
    <div class="flex items-center gap-mobile-nav-buttons">
      <MobileMenuButton />
      <MobileAccountButton />
    </div>

    <!-- Right buttons - Mobile -->
    <div class="flex items-center gap-mobile-nav-buttons">
      <MobileCartLink />
      <MobileSearchButton />
    </div>
  </div>

  <!-- Mobile Dropdown -->
  <transition name="slide-down">
    <MobileMenuDropdown v-if="mobileNavStore.isMenuOpen" />
    <MobileAccountDropdown v-else-if="mobileNavStore.isAccountOpen" />
  </transition>

  <!-- Overlay -->
  <BaseOverlay
    v-if="mobileNavStore.activeDropdown"
    @close="mobileNavStore.closeAll"
  />
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

.slide-down-enter-active * {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.6, 1);
}

.slide-down-enter-from * {
  opacity: 0;
}

.slide-down-enter-to * {
  opacity: 1;
}
</style>
