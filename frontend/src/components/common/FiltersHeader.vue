<script setup lang="ts">
import { useFiltersStore } from "@/stores/filters"
import BaseCloseButton from "../base/BaseCloseButton.vue"

const filtersStore = useFiltersStore()
</script>

<template>
  <div class="relative p-4 text-center">
    <h2 class="font-semibold fs-filters-sidebar-heading">Filters</h2>
    <BaseCloseButton
      class="absolute right-2 top-1/2 -translate-y-1/2 hover:after:bg-cream"
      @click="filtersStore.close"
    />
  </div>
</template>
