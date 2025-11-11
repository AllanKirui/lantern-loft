<script setup lang="ts">
import { computed } from "vue"
import { useMobileNavStore } from "@/stores/mobileNav"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  type: "link" | "button"
  text: string
  href?: string
}>()

const mobileNavStore = useMobileNavStore()

const selected = computed(() => props.text.toLowerCase())
</script>

<template>
  <component
    :is="type === 'link' ? 'a' : 'button'"
    :href="type === 'link' ? href : undefined"
    :type="type === 'button' ? 'button' : undefined"
    class="relative -bottom-1 flex flex-col items-center gap-2 hover:text-bone duration-200"
    :class="{
      'text-bone': mobileNavStore.activeDropdown === selected
    }"
    v-bind="$attrs"
  >
    <slot />
    <span class="fs-nav-sm uppercase leading-none">
      {{ text }}
    </span>

    <!-- Pointer -->
    <span
      class="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cosmic-latte duration-300"
      :class="[
        mobileNavStore.activeDropdown === selected
          ? 'opacity-1 -bottom-[22px]'
          : 'opacity-0 -bottom-8'
      ]"
    ></span>
  </component>
</template>
