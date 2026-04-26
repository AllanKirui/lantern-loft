<script setup lang="ts">
import { computed, ref } from "vue"

interface Props {
  carouselType?: "new" | "featured" | "detail" | "viewer"
  direction: "left" | "right"
}

const props = defineProps<Props>()

const showRipple = ref(false)

function handleClick() {
  showRipple.value = !showRipple.value

  setTimeout(() => {
    showRipple.value = false
  }, 320) // Set it to the duration of the circle-scale-up animation in index.css
}

const baseIconClasses = computed(() => {
  let classes = "relative z-10 "

  if (props.carouselType === "detail" || props.carouselType === "viewer") {
    classes += "w-[14px] h-[8.6px] "
  } else {
    classes += "w-[12px] h-[7.4px] "
  }

  if (props.direction === "left") {
    classes += "right-[1px] rotate-90 "
  } else {
    classes += "left-[1px] -rotate-90 "
  }

  return classes
})
</script>

<template>
  <button
    class="btn-rounded rounded-md has-ripple-primary hover:after:bg-cream text-chestnut-brown disabled:pointer-events-none disabled:text-chestnut-brown/30"
    :class="[
      direction === 'left' ? `${carouselType}-prev` : `${carouselType}-next`
    ]"
    disabled
    :title="direction === 'left' ? 'Previous' : 'Next'"
    @click="handleClick"
  >
    <BaseIcon name="chevron" :class="baseIconClasses" :stroke-width="6" />
    <span class="sr-only">{{
      direction === "left" ? "Previous" : "Next"
    }}</span>
    <span v-if="showRipple" class="circle"></span>
  </button>
</template>
