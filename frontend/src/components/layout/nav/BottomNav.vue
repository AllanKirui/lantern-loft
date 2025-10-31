<script setup lang="ts">
import { ref } from "vue"
import DropdownButton from "./DropdownButton.vue"
import AccountDropdown from "./AccountDropdown.vue"
import BaseOverlay from "@/components/base/BaseOverlay.vue"
import { useOverlayStore } from "@/stores/overlay"

const overlayStore = useOverlayStore()

const activeDropdown = ref<string | null>(null)

function toggleDropdown(menu: string) {
  activeDropdown.value = activeDropdown.value === menu ? null : menu

  if (activeDropdown.value !== null) overlayStore.open()
  else overlayStore.close()
}

function closeDropdown() {
  activeDropdown.value = null
  overlayStore.close()
}

// Set the height and opacity of the dropdown element at the different <transition> stages
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = "0"
  element.style.opacity = "0"
  const height = element.scrollHeight + "px"
  element.style.setProperty("--dropdown-height", height)
}

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  const height = element.scrollHeight + "px"
  requestAnimationFrame(() => {
    element.style.height = height
    element.style.opacity = "1"
  })
  el.addEventListener("transitionend", done, { once: true })
}

const leave = (el: Element, done: () => void) => {
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
    <div class="group relative">
      <DropdownButton
        :active-dropdown="activeDropdown"
        icon="avatar"
        text="Account"
        belongsTo="account"
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

    <!-- Overlay -->
    <Teleport to="body">
      <BaseOverlay @close="closeDropdown" />
    </Teleport>
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

.dropdown-enter-active li a,
.dropdown-leave-active li a {
  transition: opacity 400ms ease;
}

.dropdown-enter-from li a,
.dropdown-leave-to li a {
  opacity: 0;
}

.dropdown-enter-to li a,
.dropdown-leave-from li a {
  opacity: 1;
}
</style>
