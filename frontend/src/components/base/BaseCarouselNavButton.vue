<script setup lang="ts">
interface Props {
  productType: "new" | "featured"
  direction: "left" | "right"
}

defineProps<Props>()
</script>

<template>
  <button
    class="btn-hover flex items-center justify-center w-8 h-8 rounded-md hover:after:bg-cream text-chestnut-brown disabled:pointer-events-none disabled:text-chestnut-brown/30"
    :class="[
      direction === 'left' ? `${productType}-prev` : `${productType}-next`
    ]"
    disabled
  >
    <BaseIcon
      name="chevron"
      class="relative w-[12px] h-[7.4px] duration-200"
      :class="[direction === 'left' ? 'right-[1px] rotate-90' : '-rotate-90']"
      :stroke-width="6"
    />
    <span class="sr-only">{{
      direction === "left" ? "Previous" : "Next"
    }}</span>
  </button>
</template>
