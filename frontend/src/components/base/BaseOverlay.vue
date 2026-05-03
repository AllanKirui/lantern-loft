<script setup lang="ts">
import { useOverlayStore } from "@/stores/overlay"

const overlayStore = useOverlayStore()
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="overlayStore.isActive"
        :class="['fixed inset-0 bg-black/80', `z-[${overlayStore.z_index}]`]"
        @click="() => overlayStore.close()"
      ></div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
