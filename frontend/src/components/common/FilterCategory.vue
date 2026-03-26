<script setup lang="ts">
import type { categories } from "@/types/products/product-filters"

interface Props {
  categories: categories
  query: Record<string, any>
}

defineProps<Props>()
defineEmits<{
  (e: "click", value: string): void
}>()
</script>

<template>
  <div class="space-y-2">
    <button
      v-for="cat in categories"
      :key="cat.slug"
      class="flex items-center capitalize btn-hover hover:after:bg-cream w-full p-1"
      @click="$emit('click', cat.slug)"
    >
      <span class="flex items-baseline gap-2">
        <span>{{ cat.name }}</span>
        <!-- TODO add product count -->
        <span class="text-sm text-pale-brown">{{
          Math.round(5 + Math.random() * 20)
        }}</span>
      </span>

      <BaseIcon
        v-if="query.category?.includes(cat.slug)"
        name="round-check"
        class="w-4 h-4 ml-2.5"
      />
    </button>
  </div>
</template>
