<script setup lang="ts">
import type { categories } from "@/types/products/product-filters"

interface Props {
  categories: categories
  draftFilters: Record<string, any>
}

defineProps<Props>()
defineEmits<{
  (e: "click", value: string): void
}>()
</script>

<template>
  <div class="space-y-1 mt-2 mb-4 px-5">
    <button
      v-for="cat in categories"
      :key="cat.slug"
      class="flex items-center capitalize btn-hover hover:after:bg-cream w-full p-1"
      @click="$emit('click', cat.slug)"
    >
      <span class="flex items-baseline gap-2">
        <span>{{ cat.name }}</span>
        <span class="text-sm text-pale-brown">{{ cat.productsCount }}</span>
      </span>

      <BaseIcon
        v-if="draftFilters.category?.includes(cat.slug)"
        name="round-check"
        class="w-4 h-4 ml-2.5 animate-scale-up"
      />
    </button>
  </div>
</template>
