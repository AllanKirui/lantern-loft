<script setup lang="ts">
interface Props {
  belongsTo: "account" | "recent" | "wishlist"
  activeDropdown: string | null
  icon: string
  text: string
  controls: string
}

defineProps<Props>()

const emit = defineEmits(["toggle"])
</script>

<template>
  <button
    @click="emit('toggle', belongsTo)"
    class="btn-hover py-2 px-4 hover:after:bg-eerie-black/75 flex items-center gap-2 group-hover:text-bone overflow-hidden duration-200"
    :class="{
      'bg-eerie-black/75 text-bone': activeDropdown === 'account'
    }"
    :aria-expanded="activeDropdown === 'account'"
    :aria-controls="controls"
  >
    <BaseIcon :name="icon" class="w-5 h-5" :stroke-width="3.5" />
    <span>{{ text }}</span>
    <BaseIcon
      name="chevron"
      class="w-[11px] h-[6.8px] text-bone duration-200"
      :class="{ 'rotate-180': activeDropdown === 'account' }"
      :stroke-width="5"
    />
    <!-- Pointer -->
    <span
      class="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cosmic-latte duration-200"
      :class="[
        activeDropdown === belongsTo
          ? 'opacity-1 -bottom-2'
          : 'opacity-0 -bottom-4'
      ]"
    ></span>
  </button>
</template>
