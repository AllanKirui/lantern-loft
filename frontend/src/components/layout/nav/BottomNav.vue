<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"
import DropdownButton from "./DropdownButton.vue"
import AccountDropdown from "./AccountDropdown.vue"
import RecentItemsDropdown from "./RecentItemsDropdown.vue"
import WishlistDropdown from "./WishlistDropdown.vue"
import BaseOverlay from "@/components/base/BaseOverlay.vue"
import { useOverlayStore } from "@/stores/overlay"

// Allowed dropdown types
type DropdownName = "account" | "recent" | "wishlist"

const overlayStore = useOverlayStore()

const activeDropdown = ref<DropdownName | null>(null)

function toggleDropdown(menu: DropdownName) {
  const isSame = activeDropdown.value === menu
  activeDropdown.value = isSame ? null : menu
  overlayStore[isSame ? "close" : "open"]()
}

function closeDropdown() {
  activeDropdown.value = null
  overlayStore.close()
}

function handleScreenResize() {
  if (window.innerWidth < 768) closeDropdown()
}

function addResizeListener() {
  window.addEventListener("resize", handleScreenResize)
}

function removeResizeListener() {
  window.removeEventListener("resize", handleScreenResize)
}

watch(activeDropdown, (newVal) => {
  if (newVal) addResizeListener()
  else removeResizeListener()
})

onBeforeUnmount(removeResizeListener)

// Set the height and opacity of the dropdown element at the different <transition> stages
function beforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = "0"
  element.style.opacity = "0"
  const height = element.scrollHeight + "px"
  element.style.setProperty("--dropdown-height", height)
}

function enter(el: Element, done: () => void) {
  const element = el as HTMLElement
  const height = element.scrollHeight + "px"
  requestAnimationFrame(() => {
    element.style.height = height
    element.style.opacity = "1"
  })
  el.addEventListener("transitionend", done, { once: true })
}

function leave(el: Element, done: () => void) {
  const element = el as HTMLElement
  element.style.height = "0"
  element.style.opacity = "0"
  element.addEventListener("transitionend", done, { once: true })
}
</script>

<template>
  <!-- Bottom navigation for desktop -->
  <div class="wrapper hidden md:flex justify-end px-4 text-[15px]">
    <!-- Account Dropdown Container -->
    <div class="relative">
      <DropdownButton
        :active-dropdown="activeDropdown"
        icon="avatar"
        text="Account"
        dropdown="account"
        controls="account-menu"
        @toggle="toggleDropdown"
      />

      <transition
        name="dropdown"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <AccountDropdown v-if="activeDropdown === 'account'" />
      </transition>
    </div>

    <!-- Recent Items Button -->
    <DropdownButton
      :active-dropdown="activeDropdown"
      icon="history"
      text="Recently Viewed"
      dropdown="recent"
      controls="recent-items-dropdown"
      @toggle="toggleDropdown"
    />

    <!-- Wishlist Button -->
    <DropdownButton
      :active-dropdown="activeDropdown"
      icon="wishlist"
      text="Wishlist"
      dropdown="wishlist"
      controls="wishlist-dropdown"
      @toggle="toggleDropdown"
    />

    <!-- Recent Items and Wishlist Dropdown Container -->
    <div class="absolute bottom-0">
      <transition
        name="dropdown"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <RecentItemsDropdown
          v-if="activeDropdown === 'recent'"
          @close="closeDropdown"
        />
        <WishlistDropdown
          v-else-if="activeDropdown === 'wishlist'"
          @close="closeDropdown"
        />
      </transition>
    </div>

    <!-- Workshop link -->
    <div>
      <!-- TODO add path to admin login -->
      <a
        href="#"
        class="btn-hover relative flex items-center gap-2 py-2 px-4 hover:text-bone hover:after:bg-eerie-black/75 duration-200 overflow-hidden"
      >
        <BaseIcon
          name="bulb-off"
          class="w-[22px] h-[22px]"
          :stroke-width="1.3"
        />
        <span>The Workshop</span>
      </a>
    </div>

    <!-- Overlay -->
    <BaseOverlay @close="closeDropdown" />
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: height 300ms cubic-bezier(0.3, 0, 0.7, 1),
    opacity 300ms cubic-bezier(0.3, 0, 0.7, 1);
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  height: var(--dropdown-height);
  opacity: 1;
}

.dropdown-enter-active * {
  transition: opacity 400ms ease;
}

.dropdown-enter-from * {
  opacity: 0;
}

.dropdown-enter-to * {
  opacity: 1;
}
</style>
