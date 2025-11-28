<script setup lang="ts">
import { computed } from "vue"
import { useMobileNavStore } from "@/stores/mobileNav"

const props = defineProps<{ text: "menu" | "account" | "search" }>()

defineEmits(["click"])

const mobileNavStore = useMobileNavStore()

const selected = computed(() => props.text.toLowerCase())
</script>

<template>
  <button
    class="mobile-nav-button"
    :class="{
      'text-bone': mobileNavStore.activeDropdown === selected
    }"
    @click="$emit('click')"
  >
    <slot />
    <span class="fs-nav-sm uppercase leading-none">{{ text }}</span>

    <!-- Pointer -->
    <span
      class="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cosmic-latte duration-300"
      :class="[
        mobileNavStore.activeDropdown === selected
          ? 'opacity-1 -bottom-[22px]'
          : 'opacity-0 -bottom-8'
      ]"
    ></span>
  </button>
</template>
