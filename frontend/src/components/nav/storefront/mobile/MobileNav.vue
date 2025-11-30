<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, defineAsyncComponent } from "vue"
import { useMobileNavStore } from "@/stores/mobileNav"
import MobileAccountButton from "./MobileAccountButton.vue"
import MobileCartLink from "./MobileCartLink.vue"
import MobileMenuButton from "./MobileMenuButton.vue"
import MobileSearchButton from "./MobileSearchButton.vue"

const MobileMenuDropdown = defineAsyncComponent(
  () => import("./MobileMenuDropdown.vue")
)
const MobileAccountDropdown = defineAsyncComponent(
  () => import("./MobileAccountDropdown.vue")
)

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

function calculateMobileNavDropdownHeight() {
  const dropdownHeight = window.innerHeight - 80 // Minus 80px for the nav height
  document.documentElement.style.setProperty(
    "--mobile-nav-dropdown-height",
    `${dropdownHeight}px`
  )
}

onMounted(calculateMobileNavDropdownHeight)
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
</template>

<style scoped>
.slide-down-leave-active,
.slide-down-enter-active {
  transition: all 0.32s;
  overflow: hidden;
}
.slide-down-leave-to,
.slide-down-enter-from {
  height: 0;
  opacity: 0;
  visibility: hidden;
}
.slide-down-enter-to,
.slide-down-leave-from {
  height: var(--mobile-nav-dropdown-height);
  opacity: 1;
  visibility: visible;
}
.slide-down-enter-active * {
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.6, 1);
}
.slide-down-enter-from * {
  opacity: 0;
}
.slide-down-enter-to * {
  opacity: 1;
}
</style>
