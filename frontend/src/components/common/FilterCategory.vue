<script setup lang="ts">
import type { categories } from "@/types/products/product-filters"

interface Props {
  categories: categories
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-2 mt-2">
    <button
      v-for="cat in categories"
      :key="cat.slug"
      class="flex items-baseline gap-2 capitalize"
    >
      <span>{{ cat.name }}</span>
      <!-- TODO add product count -->
      <span class="text-sm text-pale-brown">{{
        Math.round(5 + Math.random() * 20)
      }}</span>
    </button>
  </div>
</template>
