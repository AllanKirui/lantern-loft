<script setup lang="ts">
import { useMobileNavStore } from "@/stores/mobileNav"
import BaseMobileNavButton from "./BaseMobileNavButton.vue"

const mobileNavStore = useMobileNavStore()
</script>

<template>
  <BaseMobileNavButton
    type="button"
    text="Account"
    @click="mobileNavStore.toggleDropdown('account')"
    :aria-expanded="mobileNavStore.isAccountOpen"
    aria-controls="mobile-account-menu"
  >
    <div class="w-auto h-6">
      <BaseIcon
        name="avatar"
        class="w-5 h-5 sm:w-6 sm:h-6"
        :stroke-width="3.5"
      />
    </div>
  </BaseMobileNavButton>
</template>
