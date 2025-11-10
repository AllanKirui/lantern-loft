<script setup lang="ts">
import BaseCloseButton from "@/components/base/BaseCloseButton.vue"
import { useMobileNavStore } from "@/stores/mobileNav"

const mobileNavStore = useMobileNavStore()

function uppercaseFirst(str: string) {
  const firstChar = str.charAt(0)
  return str.replace(firstChar, firstChar.toUpperCase())
}

function setElementId(activeDropdown: string) {
  let id = ""

  switch (activeDropdown) {
    case "menu":
      id = "mobile-menu"
      break
    case "account":
      id = "mobile-account-menu"
      break
  }

  return id
}
</script>

<template>
  <div
    :id="setElementId(mobileNavStore.activeDropdown as string)"
    class="mobile-nav-dropdown"
  >
    <!-- Header -->
    <div class="flex justify-between">
      <h2 class="fs-mobile-nav-h2 font-bold">
        {{ uppercaseFirst(mobileNavStore.activeDropdown as string) }}
      </h2>
      <BaseCloseButton class="hover:after:bg-cream" />
    </div>

    <slot />
  </div>
</template>
