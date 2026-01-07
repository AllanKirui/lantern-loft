<script setup lang="ts">
import BaseCloseButton from "@/components/base/BaseCloseButton.vue"
import { useMobileNavStore } from "@/stores/mobileNav"

const mobileNavStore = useMobileNavStore()

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
      <h2 class="fs-mobile-nav-h2 font-bold first-letter:uppercase">
        {{ mobileNavStore.activeDropdown }}
      </h2>
      <BaseCloseButton
        class="hover:after:bg-cream"
        @click="mobileNavStore.closeAll"
      />
    </div>

    <slot />
  </div>
</template>
