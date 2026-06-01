<script setup lang="ts">
import { useDesktopNavStore } from "@/stores/desktopNav"
import BaseCloseButton from "@/components/base/BaseCloseButton.vue"
import ComingSoonLink from "@/components/common/ComingSoonLink.vue"

interface Props {
  id: string
  title: string
  manageHref: string
}

defineProps<Props>()

const desktopNavStore = useDesktopNavStore()
</script>

<template>
  <div
    :id="id"
    class="nav-dropdown-width absolute right-0 px-4 py-3 text-chestnut-brown bg-cosmic-latte custom-shadow overflow-hidden rounded-b-md"
  >
    <!-- Header -->
    <div class="flex justify-between">
      <div class="flex items-center gap-3">
        <h2 class="fs-nav-h2 font-bold">{{ title }}</h2>

        <!-- Vertical divider -->
        <span class="w-[1px] h-5 bg-pale-brown" />

        <ComingSoonLink data-replace="Manage items" class="link-hover">
          <span>Manage items</span>
        </ComingSoonLink>
      </div>

      <BaseCloseButton
        class="hover:after:bg-cream"
        @click="desktopNavStore.closeAll"
      />
    </div>

    <!-- Horizontal divider -->
    <span class="block mt-3 w-full h-[1px] bg-bone" />

    <!-- Slot for dynamic content (like item list or empty state) -->
    <div class="mt-5">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.nav-dropdown-width {
  width: calc(100vw - 3rem);
}

@media (min-width: 976px) {
  .nav-dropdown-width {
    width: 48rem;
  }
}
</style>
