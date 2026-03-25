<script setup lang="ts">
import { useFiltersStore } from "@/stores/filters"

const filtersStore = useFiltersStore()
</script>

<template>
  <button
    class="flex items-center gap-2 btn-secondary py-[5px] px-2 min-h-[34px] fs-filters-sidebar-toggle"
    @click="filtersStore.toggleSidebar"
  >
    <BaseIcon name="filter" class="w-4 h-4" />
    <span class="hidden md:flex"
      >{{ filtersStore.sidebarVisible ? "Hide" : "Show" }} filters (0)</span
    >
    <span class="flex md:hidden">Filters (0)</span>
  </button>
</template>
