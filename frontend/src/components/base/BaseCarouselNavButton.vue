<script setup lang="ts">
import { ref } from "vue"

interface Props {
  productType?: "new" | "featured"
  direction: "left" | "right"
}

defineProps<Props>()

const showRipple = ref(false)

function handleClick() {
  showRipple.value = !showRipple.value

  setTimeout(() => {
    showRipple.value = false
  }, 320) // Set it to the duration of the circle-scale-up animation in index.css
}
</script>

<template>
  <button
    class="btn-rounded rounded-md has-ripple-primary hover:after:bg-cream text-chestnut-brown disabled:pointer-events-none disabled:text-chestnut-brown/30"
    :class="[
      direction === 'left' ? `${productType}-prev` : `${productType}-next`
    ]"
    disabled
    :title="direction === 'left' ? 'Previous' : 'Next'"
    @click="handleClick"
  >
    <BaseIcon
      name="chevron"
      class="relative w-[12px] h-[7.4px] z-10"
      :class="[direction === 'left' ? 'right-[1px] rotate-90' : '-rotate-90']"
      :stroke-width="6"
    />
    <span class="sr-only">{{
      direction === "left" ? "Previous" : "Next"
    }}</span>
    <span v-if="showRipple" class="circle"></span>
  </button>
</template>
