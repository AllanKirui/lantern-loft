<script setup lang="ts">
import { computed } from "vue"
import * as uiIcons from "@/components/icons/ui"
import * as socialIcons from "@/components/icons/social"

type IconNames =
  | "avatar"
  | "bulbOff"
  | "cart"
  | "chevronAlt"
  | "chevron"
  | "close"
  | "filter"
  | "fullStar"
  | "grid"
  | "hangingBulb"
  | "history"
  | "key"
  | "list"
  | "package"
  | "patty"
  | "photo"
  | "roundCheck"
  | "search"
  | "wishlist"
  | "facebook"
  | "instagram"

const props = withDefaults(
  defineProps<{
    name: IconNames
    iconType?: "ui" | "social"
    strokeWidth?: number | string
  }>(),
  {
    iconType: "ui",
    strokeWidth: 1.5
  }
)

const component = computed(() => {
  return props.iconType === "social"
    ? socialIcons[props.name as keyof typeof socialIcons]
    : uiIcons[props.name as keyof typeof uiIcons]
})
</script>

<template>
  <component
    :is="component"
    class="inline-block"
    :style="{ '--icon-stroke-width': strokeWidth }"
  />
</template>
