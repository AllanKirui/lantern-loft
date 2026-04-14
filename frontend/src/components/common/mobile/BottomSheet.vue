<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue"
import { useOverlayStore } from "@/stores/overlay"
import BaseCloseButton from "@/components/base/BaseCloseButton.vue"

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const overlayStore = useOverlayStore()

const SHEET_ID = "sort-sheet"

// close the sheet when it goes above 768px
function handleScreenResize() {
  if (window.innerWidth > 767) overlayStore.close()
}

function addResizeListener() {
  window.addEventListener("resize", handleScreenResize)
}

function removeResizeListener() {
  window.removeEventListener("resize", handleScreenResize)
}

// when sheet opens, activate overlay
watch(
  () => props.open,
  (val) => {
    if (val) {
      overlayStore.setZIndex(100)
      overlayStore.open(SHEET_ID)
      addResizeListener()
    } else {
      overlayStore.close(SHEET_ID)
      removeResizeListener()
    }
  }
)

// close the bottom sheet if it's top
watch(
  () => overlayStore.stack,
  () => {
    if (!overlayStore.isTop(SHEET_ID) && props.open) {
      emit("close")
    }
  }
)

onBeforeUnmount(removeResizeListener)
</script>

<template>
  <transition name="slide-up">
    <div v-show="open" class="bottom-sheet">
      <div
        class="absolute left-1/2 -translate-x-1/2 -top-12 bg-cosmic-latte rounded-full"
      >
        <BaseCloseButton
          class="w-9 h-9 hover:after:bg-cream"
          @click="$emit('close')"
        />
      </div>

      <slot />
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}
</style>
