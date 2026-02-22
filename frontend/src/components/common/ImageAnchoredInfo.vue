<script setup lang="ts">
import { computed } from "vue"

interface Props {
  xPosition: "left" | "right"
  yPosition: "top" | "bottom"
}

const props = defineProps<Props>()

const positionClasses = computed(() => {
  let classes = ""

  switch (props.yPosition) {
    case "top":
      classes += "top-[10px] "
      break
    case "bottom":
      classes += "bottom-[10px] "
      break
  }

  switch (props.xPosition) {
    case "left":
      classes += "left-[10px] "
      break
    case "right":
      classes += "right-[10px] "
      break
  }

  return classes
})
</script>

<template>
  <div
    :class="[
      'absolute px-2 py-[2px] rounded bg-black/75 text-cosmic-latte text-sm z-10',
      positionClasses
    ]"
  >
    <slot />
  </div>
</template>
