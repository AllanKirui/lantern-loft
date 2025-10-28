<script setup lang="ts">
import { useOverlayStore } from "@/stores/overlay"

const overlayStore = useOverlayStore()

const emit = defineEmits(["close"])

function handleClick() {
  overlayStore.close()
  emit("close")
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="overlayStore.isActive"
      class="fixed inset-0 bg-black/75 z-[999]"
      @click="handleClick"
    ></div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
