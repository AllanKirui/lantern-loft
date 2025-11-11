<script setup lang="ts">
// Allowed dropdown types
type DropdownName = "account" | "recent" | "wishlist"

interface Props {
  dropdown: DropdownName
  activeDropdown: DropdownName | null
  icon: string
  text: string
  controls: string
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: [value: DropdownName]
}>()
</script>

<template>
  <button
    @click="$emit('toggle', dropdown)"
    class="btn-hover relative py-2 px-4 flex items-center gap-2 hover:text-bone hover:after:bg-eerie-black/75 overflow-hidden duration-200"
    :class="{
      'bg-eerie-black/75 text-bone': activeDropdown === dropdown
    }"
    :aria-expanded="activeDropdown === dropdown"
    :aria-controls="controls"
  >
    <BaseIcon :name="icon" class="w-5 h-5" :stroke-width="3.5" />
    <span>{{ text }}</span>
    <BaseIcon
      name="chevron"
      class="w-[11px] h-[6.8px] text-bone duration-200"
      :class="{ 'rotate-180': activeDropdown === dropdown }"
      :stroke-width="5"
    />
    <!-- Pointer -->
    <span
      class="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cosmic-latte duration-200"
      :class="[
        activeDropdown === dropdown
          ? 'opacity-1 -bottom-2'
          : 'opacity-0 -bottom-4'
      ]"
    ></span>
  </button>
</template>
