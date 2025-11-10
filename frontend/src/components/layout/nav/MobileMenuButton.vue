<script setup lang="ts">
import { useMobileNavStore } from "@/stores/mobileNav"
import BaseMobileNavButton from "./BaseMobileNavButton.vue"

const mobileNavStore = useMobileNavStore()
</script>

<template>
  <BaseMobileNavButton
    type="button"
    text="Menu"
    @click="mobileNavStore.toggleDropdown('menu')"
    :aria-expanded="mobileNavStore.isMenuOpen"
    aria-controls="mobile-menu"
  >
    <!-- Hamburger Icon -->
    <div class="flex items-center justify-center w-5 sm:w-6 h-6">
      <div class="burger">
        <BaseIcon name="patty" class="line" />
        <BaseIcon name="patty" class="line" />
        <BaseIcon name="patty" class="line" />
      </div>
    </div>
  </BaseMobileNavButton>
</template>

<style scoped>
.burger {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 4px;
}

@media (min-width: 480px) {
  .burger {
    gap: 4px;
  }
}

.burger .line {
  width: 20px;
  height: 2px;
  transition: all 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}

.burger.open .line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.burger.open .line:nth-child(2) {
  opacity: 0;
}

.burger.open .line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
</style>
