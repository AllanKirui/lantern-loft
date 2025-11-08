<script setup lang="ts">
import { useMobileNavStore } from "@/stores/mobileNav"

const mobileNavStore = useMobileNavStore()

function uppercaseFirst(str: string) {
  const firstChar = str.charAt(0)
  return str.replace(firstChar, firstChar.toUpperCase())
}
</script>

<template>
  <div class="mobile-nav-dropdown">
    <!-- Header -->
    <div class="flex justify-between">
      <h2>{{ uppercaseFirst(mobileNavStore.activeDropdown as string) }}</h2>
      <button
        class="btn-hover flex items-center justify-center w-8 h-8 hover:after:bg-cream rounded-full"
      >
        <BaseIcon
          name="close"
          class="w-[18px] h-[18px] duration-200"
          :stroke-width="2.5"
        />
        <span class="sr-only">Close</span>
      </button>
    </div>

    <slot />
  </div>
</template>
